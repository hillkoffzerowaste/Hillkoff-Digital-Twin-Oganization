"use client";

import { Bot, Send, Sparkles } from "lucide-react";
import { useState, useTransition } from "react";
import { runAgentCommand } from "@/app/actions/ai";
import { agents } from "@/data/platform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AiCommandCenter() {
  const [agentId, setAgentId] = useState("ceo");
  const [message, setMessage] = useState("ทำไมยอดขายสัปดาห์นี้ลดลง และควรให้ใครรับ action ต่อ?");
  const [answer, setAnswer] = useState("เลือก Agent แล้วถามคำถามเกี่ยวกับยอดขาย งานส่ง สต็อก ESG หรือความรู้องค์กรได้ทันที");
  const [isPending, startTransition] = useTransition();
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];

  function submit() {
    startTransition(async () => {
      const result = await runAgentCommand({ agentId, message });
      setAnswer(result.answer);
    });
  }

  return (
    <Card id="command-center" className="overflow-hidden">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            AI Command Center
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{selectedAgent.mission}</p>
        </div>
        <Badge>{selectedAgent.department}</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setAgentId(agent.id)}
              className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                agent.id === agentId ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <span className="block font-medium">{agent.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{agent.tone}</span>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-accent" />
              Live Response
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{isPending ? "กำลังวิเคราะห์ข้อมูล..." : answer}</p>
          </div>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-28 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="ถาม AI Agent..."
          />
          <Button onClick={submit} disabled={isPending || !message.trim()}>
            <Send className="h-4 w-4" />
            ส่งคำถาม
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
