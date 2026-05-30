"use server";

import OpenAI from "openai";
import { z } from "zod";
import { agents, characters, inventory, deliveries, knowledgeDocs } from "@/data/platform";

const commandSchema = z.object({
  agentId: z.string().min(1),
  message: z.string().min(2).max(2000)
});

export async function runAgentCommand(input: z.infer<typeof commandSchema>) {
  const parsed = commandSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, answer: "คำสั่งไม่ถูกต้อง กรุณาตรวจสอบข้อความอีกครั้ง" };
  }

  const agent = agents.find((item) => item.id === parsed.data.agentId) ?? agents[0];
  const context = {
    inventory,
    deliveries,
    knowledgeDocs,
    characters: characters.map(({ name, role, expertise }) => ({ name, role, expertise }))
  };

  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: true,
      answer: `โหมดตัวอย่าง: ${agent.name} พร้อมช่วยตอบ "${parsed.data.message}" โดยจะใช้ข้อมูล deliveries, inventory, knowledge และ character memory เมื่อเชื่อมต่อ OPENAI_API_KEY`
    };
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `คุณคือ ${agent.name}. ภารกิจ: ${agent.mission}. น้ำเสียง: ${agent.tone}. ตอบภาษาไทย กระชับ มี action และใช้ข้อมูล context เมื่อเกี่ยวข้อง.`
      },
      {
        role: "user",
        content: JSON.stringify({ question: parsed.data.message, context })
      }
    ],
    temperature: 0.4
  });

  return {
    ok: true,
    answer: response.choices[0]?.message.content ?? "ไม่พบคำตอบจาก AI"
  };
}
