"use client";

import { BarChart3, BookOpen, Bot, Briefcase, Headphones, Leaf, MoreVertical, Send, Settings, ShieldCheck, UserRound } from "lucide-react";
import { useState, useTransition } from "react";
import { runAgentCommand } from "@/app/actions/ai";
import { agents } from "@/data/platform";
import { Button } from "@/components/ui/button";

const agentIcons = {
  ceo: UserRound,
  sales: Briefcase,
  delivery: ShieldCheck,
  warehouse: Bot,
  esg: Leaf,
  hr: UserRound,
  finance: Briefcase,
  knowledge: BookOpen,
  customer: Headphones,
  analytics: BarChart3
};

export function AiCommandCenter() {
  const [agentId, setAgentId] = useState("ceo");
  const [message, setMessage] = useState("สรุปภาพรวมสถานการณ์วันนี้ให้ผู้บริหาร พร้อม action ที่ควรทำต่อ");
  const [answer, setAnswer] = useState("สวัสดีครับ! ผม CEO Agent ยินดีให้ข้อมูลและวิเคราะห์ภาพรวมของบริษัทให้คุณครับ");
  const [isPending, startTransition] = useTransition();
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];

  function submit() {
    startTransition(async () => {
      const result = await runAgentCommand({ agentId, message });
      setAnswer(result.answer);
    });
  }

  return (
    <section id="command-center" className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="bg-[#07101b] p-4 text-white">
        <div>
          <h2 className="text-lg font-semibold">AI Command Center</h2>
          <p className="mt-1 text-xs text-white/60">เลือก AI Agent เพื่อสนทนาและวิเคราะห์ข้อมูล</p>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          {agents.map((agent) => {
            const Icon = agentIcons[agent.id];
            const active = agent.id === agentId;
            return (
              <button key={agent.id} onClick={() => setAgentId(agent.id)} className="group flex flex-col items-center gap-2">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                    active ? "border-[#f6a623] bg-white text-[#07101b]" : "border-white/25 bg-white/8 text-white group-hover:border-white/60"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="max-w-[64px] truncate text-center text-[10px] text-white/80">{agent.name.replace(" Agent", "")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-800">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{selectedAgent.name}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                ออนไลน์
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Agent settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-100 p-4 text-sm leading-6 text-slate-700">
          {isPending ? "กำลังวิเคราะห์ข้อมูล..." : answer}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["สรุปผลประกอบการวันนี้", "เปรียบเทียบยอดขายรายเดือน", "ปัญหาที่ต้องระวัง", "โอกาสทางธุรกิจ"].map((prompt) => (
            <button key={prompt} onClick={() => setMessage(prompt)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-md border border-slate-200 bg-white p-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
            placeholder="พิมพ์คำถามของคุณ..."
          />
          <Button onClick={submit} disabled={isPending || !message.trim()} className="h-9 w-9 p-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
