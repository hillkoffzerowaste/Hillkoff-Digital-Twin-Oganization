import { AlertTriangle, CheckCircle2, Clock3, Database, FileSearch, Leaf, Lock, MessageSquareText, PackageOpen, Route, UsersRound } from "lucide-react";
import { AiCommandCenter } from "@/components/ai-command-center";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { agents, characters, dashboardMetrics, deliveries, inventory, knowledgeDocs, scenarios } from "@/data/platform";
import { cn } from "@/lib/utils";

const statusMap = {
  queued: "รอจัดส่ง",
  assigned: "มอบหมายแล้ว",
  in_transit: "กำลังส่ง",
  delivered: "สำเร็จ",
  blocked: "ติดขัด"
};

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <section id="dashboard" className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <div className="rounded-lg border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge className="border-primary/30 text-primary">Realtime Firebase + AI Agents</Badge>
                  <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">Hillkoff Digital Twin Organization</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    องค์กรดิจิทัลที่ให้ผู้ใช้สนทนากับข้อมูล งานส่ง สต็อก เอกสาร ความรู้ และ AI Character เพื่อวิเคราะห์ จำลอง ฝึกอบรม และตัดสินใจแบบ real-time
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md border p-3">
                    <p className="text-xl font-semibold">{agents.length}</p>
                    <p className="text-xs text-muted-foreground">Agents</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xl font-semibold">{characters.length}</p>
                    <p className="text-xs text-muted-foreground">Characters</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-xl font-semibold">{scenarios.length}</p>
                    <p className="text-xs text-muted-foreground">Simulators</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardMetrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                แจ้งเตือนสำคัญ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["SKU Espresso Dark ต่ำกว่า reorder point", "งานส่ง D-1026 ต้อง reroute", "ลูกค้า VIP รอคำตอบ complaint", "ESG waste report รออนุมัติ"].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border p-3 text-sm">
                  <Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <AiCommandCenter />

        <section className="grid gap-4 lg:grid-cols-2">
          <Card id="delivery">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                Delivery Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deliveries.map((job) => (
                <div key={job.id} className="grid gap-2 rounded-md border p-3 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                  <p className="font-medium">{job.id}</p>
                  <div>
                    <p className="text-sm">{job.customer}</p>
                    <p className="text-xs text-muted-foreground">{job.route} · Driver: {job.driver}</p>
                  </div>
                  <Badge className={cn(job.status === "blocked" && "border-destructive/40 text-destructive")}>{statusMap[job.status]} · {job.eta}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="inventory">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageOpen className="h-4 w-4 text-primary" />
                Inventory Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventory.map((item) => {
                const low = item.stock < item.reorderPoint;
                return (
                  <div key={item.id} className="grid gap-2 rounded-md border p-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku} · {item.category} · Location {item.location}</p>
                    </div>
                    <Badge className={cn(low && "border-destructive/40 text-destructive")}>{item.stock} / ROP {item.reorderPoint}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card id="esg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                ESG Center
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {[
                ["Carbon Footprint", "14.2 tCO2e", "-8% MoM"],
                ["Waste Sorted", "72%", "+11 pts"],
                ["Circular Packaging", "38%", "+6 pts"]
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-2 text-xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-primary">{delta}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="knowledge">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-primary" />
                Knowledge Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {knowledgeDocs.map((doc) => (
                <div key={doc.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{doc.title}</p>
                    <Badge>{doc.type}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{doc.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="simulator" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Organization Simulator</h2>
            <p className="mt-1 text-sm text-muted-foreground">Meeting, Training, Customer, Crisis, Executive และ Story Mode พร้อม character memory</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {scenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle>{scenario.title}</CardTitle>
                    <Badge>{scenario.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{scenario.prompt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {scenario.participants.map((person) => (
                      <Badge key={person}>{person}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-primary" />
                Character System
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {characters.map((character) => (
                <div key={character.id} className="rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">{character.avatar}</div>
                    <div>
                      <p className="text-sm font-medium">{character.name}</p>
                      <p className="text-xs text-muted-foreground">{character.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{character.personality}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="security">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Security & Data Foundation
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                ["RBAC", "Admin, Management, Sales, Warehouse, Driver, Employee, Guest"],
                ["Audit Logging", "ทุก action สำคัญบันทึกลง audit_logs"],
                ["Realtime Data", "Firestore collections สำหรับ operations, memories และ simulations"],
                ["AI Ready", "OpenAI server action, RAG-ready knowledge, long-term memory collection"]
              ].map(([title, body]) => (
                <div key={title} className="flex items-start gap-3 rounded-md border p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs leading-5 text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Database className="h-4 w-4 text-primary" />
            Firestore Collections
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["users", "departments", "products", "inventory", "orders", "deliveries", "drivers", "customers", "suppliers", "esg", "knowledge", "notifications", "audit_logs", "ai_conversations", "agent_memories", "character_profiles", "simulations", "meetings", "training_sessions", "reports", "settings"].map((name) => (
              <Badge key={name}>{name}</Badge>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
