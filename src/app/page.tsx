import {
  AlertTriangle,
  Bell,
  Box,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  MessageSquare,
  PackageCheck,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Truck,
  UsersRound,
  WalletCards
} from "lucide-react";
import { AiCommandCenter } from "@/components/ai-command-center";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { deliveries, inventory } from "@/data/platform";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "ยอดขายวันนี้", value: "฿1,248,650", delta: "+12.5% จากเมื่อวาน", tone: "emerald", icon: ShoppingBag },
  { label: "ยอดขายเดือนนี้", value: "฿24,785,000", delta: "+8.3% จากเดือนที่แล้ว", tone: "blue", icon: BriefcaseBusiness },
  { label: "งานส่งวันนี้", value: "48 งาน", delta: "+5.2% จากเมื่อวาน", tone: "violet", icon: Truck },
  { label: "งานค้างส่ง", value: "7 งาน", delta: "-2.1% จากเมื่อวาน", tone: "orange", icon: ClipboardCheck },
  { label: "สินค้าใกล้หมด", value: "12 รายการ", delta: "ต้องสั่งซื้อเพิ่ม", tone: "amber", icon: Box }
];

const chartPoints = [
  { x: 8, y: 58 },
  { x: 23, y: 52 },
  { x: 38, y: 56 },
  { x: 53, y: 38 },
  { x: 68, y: 36 },
  { x: 83, y: 44 },
  { x: 96, y: 45 }
];

const orgNodes = [
  { name: "CEO", person: "คุณธนกร", level: "top", x: "50%", y: "8%" },
  { name: "Sales Manager", person: "คุณปวีณ์", level: "mid", x: "18%", y: "37%" },
  { name: "Warehouse Manager", person: "คุณศักดิ์", level: "mid", x: "40%", y: "37%" },
  { name: "Delivery Manager", person: "คุณอนันต์", level: "mid", x: "62%", y: "37%" },
  { name: "Finance Manager", person: "คุณสุภาพ", level: "mid", x: "84%", y: "37%" },
  { name: "Driver", person: "เจษฎา", level: "low", x: "23%", y: "72%" },
  { name: "Driver", person: "วิชัย", level: "low", x: "45%", y: "72%" },
  { name: "ESG Officer", person: "คุณลินดา", level: "low", x: "67%", y: "72%" },
  { name: "HR Officer", person: "คุณนิดา", level: "low", x: "87%", y: "72%" }
];

function Panel({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn("overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm", className)}>
      {children}
    </section>
  );
}

function PanelHeader({ icon, title, action }: { icon: React.ReactNode; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center justify-between bg-[#07101b] px-4 text-white">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </h2>
      {action}
    </div>
  );
}

function KpiCard({ item }: { item: (typeof kpis)[number] }) {
  const Icon = item.icon;
  const tone = {
    emerald: "from-emerald-400 to-emerald-600 text-emerald-600",
    blue: "from-blue-400 to-blue-600 text-blue-600",
    violet: "from-violet-400 to-violet-600 text-violet-600",
    orange: "from-orange-400 to-orange-600 text-orange-600",
    amber: "from-amber-400 to-amber-600 text-amber-600"
  }[item.tone];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${(tone ?? "from-slate-500 to-slate-700 text-slate-700").split(" text-")[0]} text-white shadow-lg`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-600">{item.label}</p>
          <p className="mt-2 text-xl font-bold tracking-tight text-slate-950">{item.value}</p>
          <p className={`mt-2 text-xs ${tone.includes("orange") ? "text-red-500" : "text-emerald-600"}`}>{item.delta}</p>
        </div>
      </div>
    </div>
  );
}

function SalesChart() {
  const path = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  return (
    <Panel className="min-h-[378px]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">ยอดขาย 7 วันที่ผ่านมา</h2>
          <p className="mt-1 text-xs text-slate-500">หน่วย: บาท</p>
        </div>
        <select className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700">
          <option>7 วัน</option>
          <option>30 วัน</option>
        </select>
      </div>
      <div className="relative h-[300px] px-5 pb-5 pt-4">
        <div className="absolute left-7 right-5 top-6 grid h-[230px] grid-rows-4 text-xs text-slate-400">
          {["2.0M", "1.5M", "1.0M", "500K"].map((label) => (
            <div key={label} className="border-b border-slate-200">
              <span>{label}</span>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 104 72" className="absolute left-14 right-6 top-10 h-[210px] w-[calc(100%-5rem)] overflow-visible">
          <path d={path} fill="none" stroke="#8b5a2b" strokeWidth="1.2" />
          {chartPoints.map((point) => (
            <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="1.4" fill="#8b5a2b" />
          ))}
        </svg>
        <div className="absolute bottom-5 left-14 right-5 grid grid-cols-7 text-xs text-slate-500">
          {["10 พ.ค.", "11 พ.ค.", "12 พ.ค.", "13 พ.ค.", "14 พ.ค.", "15 พ.ค.", "16 พ.ค."].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="absolute right-10 top-36 rounded-md border border-slate-200 bg-white p-3 text-xs shadow-lg">
          <p className="font-semibold text-slate-900">16 พฤษภาคม 2567</p>
          <p className="mt-1 text-slate-600">ยอดขาย: ฿1,248,650</p>
        </div>
      </div>
    </Panel>
  );
}

function AlertsPanel() {
  const alerts = [
    { icon: AlertTriangle, title: "สินค้าใกล้หมด", desc: "เมล็ดกาแฟ Brazil - คงเหลือ 8 kg", time: "10 นาทีที่แล้ว", tone: "red" },
    { icon: Truck, title: "งานส่งล่าช้า", desc: "งานส่ง #D-240516-07 ล่าช้า 45 นาที", time: "25 นาทีที่แล้ว", tone: "amber" },
    { icon: FileText, title: "ใบสั่งซื้อรออนุมัติ", desc: "PO-240516-09 รอการอนุมัติ", time: "1 ชั่วโมงที่แล้ว", tone: "emerald" }
  ];

  return (
    <Panel className="min-h-[378px]">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-950">แจ้งเตือนสำคัญ</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.title} className="flex items-start gap-4 px-5 py-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                  alert.tone === "red" && "bg-red-500",
                  alert.tone === "amber" && "bg-amber-500",
                  alert.tone === "emerald" && "bg-emerald-500"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{alert.desc}</p>
              </div>
              <span className="text-xs text-slate-400">{alert.time}</span>
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <button className="h-10 w-full rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">ดูทั้งหมด</button>
      </div>
    </Panel>
  );
}

function DeliveryPanel() {
  const statusStyle = {
    queued: "bg-amber-100 text-amber-700",
    assigned: "bg-blue-100 text-blue-700",
    in_transit: "bg-emerald-100 text-emerald-700",
    delivered: "bg-emerald-100 text-emerald-700",
    blocked: "bg-red-100 text-red-700"
  };

  return (
    <Panel id="delivery" className="min-h-[350px]">
      <PanelHeader icon={<Truck className="h-4 w-4 text-amber-300" />} title="Delivery Management" action={<button className="rounded border border-white/20 px-3 py-1 text-xs">+ สร้างงานส่ง</button>} />
      <div className="grid grid-cols-4 gap-2 p-4">
        {[
          ["48", "งานวันนี้", "text-sky-600"],
          ["7", "งานค้างส่ง", "text-amber-600"],
          ["3", "งานล่าช้า", "text-red-600"],
          ["42", "งานสำเร็จ", "text-emerald-600"]
        ].map(([value, label, color]) => (
          <div key={label} className="rounded-md border border-slate-100 bg-slate-50 p-3">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="mt-1 text-xs text-slate-600">{label}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <p className="mb-3 text-sm font-semibold text-slate-900">รายการงานส่งล่าสุด</p>
        <div className="overflow-hidden rounded-md border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2">เลขที่งาน</th>
                <th className="px-3 py-2">ลูกค้า</th>
                <th className="px-3 py-2">ปลายทาง</th>
                <th className="px-3 py-2">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((job) => (
                <tr key={job.id}>
                  <td className="px-3 py-2 font-medium">{job.id}</td>
                  <td className="px-3 py-2">{job.customer}</td>
                  <td className="px-3 py-2">{job.route.split(" - ")[0]}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-1 ${statusStyle[job.status]}`}>{job.status === "blocked" ? "Delayed" : "In Progress"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
}

function InventoryPanel() {
  return (
    <Panel id="inventory" className="min-h-[350px]">
      <PanelHeader icon={<PackageCheck className="h-4 w-4 text-blue-300" />} title="Inventory Overview" />
      <div className="grid grid-cols-4 gap-2 p-4">
        {[
          ["สินค้าทั้งหมด", "256", "รายการ", "text-slate-900"],
          ["มูลค่าสินค้าคงคลัง", "฿5,245,000", "", "text-slate-900"],
          ["ใกล้หมดสต็อก", "12", "รายการ", "text-red-600"],
          ["หมดสต็อก", "2", "รายการ", "text-red-600"]
        ].map(([label, value, suffix, color]) => (
          <div key={label} className="rounded-md border border-slate-100 bg-white p-3">
            <p className="text-[11px] font-medium text-slate-500">{label}</p>
            <p className={`mt-2 text-lg font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-400">{suffix}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <p className="mb-3 text-sm font-semibold text-slate-900">สินค้าคงคลังใกล้หมด</p>
        <div className="overflow-hidden rounded-md border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2">สินค้า</th>
                <th className="px-3 py-2">คงเหลือ</th>
                <th className="px-3 py-2">ขั้นต่ำ</th>
                <th className="px-3 py-2">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => {
                const low = item.stock < item.reorderPoint;
                return (
                  <tr key={item.id}>
                    <td className="px-3 py-2 font-medium">{item.name}</td>
                    <td className="px-3 py-2">{item.stock}</td>
                    <td className="px-3 py-2">{item.reorderPoint}</td>
                    <td className="px-3 py-2">
                      <span className={cn("rounded-full px-2 py-1", low ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>{low ? "หมดสต็อก" : "ใกล้หมด"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
}

function OrgSimulator() {
  return (
    <Panel id="simulator" className="min-h-[350px]">
      <PanelHeader icon={<UsersRound className="h-4 w-4 text-amber-300" />} title="Organization Simulator" />
      <div className="border-b border-slate-100 px-4 pt-3">
        <div className="grid grid-cols-5 text-center text-xs font-medium text-slate-600">
          {["แผนผังองค์กร", "ประชุมจำลอง", "ฝึกอบรม", "จำลองวิกฤต", "ลูกค้าจำลอง"].map((tab, index) => (
            <div key={tab} className={cn("border-b-2 px-2 pb-3", index === 0 ? "border-slate-900 text-slate-950" : "border-transparent")}>{tab}</div>
          ))}
        </div>
      </div>
      <div className="relative h-[250px] p-4">
        <div className="absolute left-[18%] right-[14%] top-[73px] h-px bg-slate-300" />
        <div className="absolute left-1/2 top-[73px] h-[42px] w-px bg-slate-300" />
        <div className="absolute left-[25%] top-[146px] h-px w-[42%] bg-slate-300" />
        {orgNodes.map((node) => (
          <div
            key={`${node.name}-${node.person}`}
            className={cn(
              "absolute flex -translate-x-1/2 items-center gap-2 rounded-md border bg-white p-2 shadow-sm",
              node.level === "top" ? "w-[130px] border-blue-400" : "w-[128px] border-slate-200"
            )}
            style={{ left: node.x, top: node.y }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {node.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold text-blue-700">{node.name}</p>
              <p className="truncate text-[10px] text-slate-600">{node.person}</p>
            </div>
          </div>
        ))}
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-[#07101b] px-5 py-2 text-xs font-semibold text-white">เริ่มการประชุมจำลอง</button>
      </div>
    </Panel>
  );
}

function SimulatorStrip() {
  const panels = [
    {
      title: "AI Meeting Simulator",
      subtitle: "ประชุมจำลอง : วิเคราะห์ยอดขายที่ลดลง",
      wide: true,
      body: (
        <div className="grid gap-3 md:grid-cols-5">
          {["CEO\nทำไมยอดขายภาคเหนือลดลง?", "Sales Manager\nลูกค้าหลักลดคำสั่งซื้อ 12% ครับ", "Warehouse Manager\nสินค้าบางรายการขาดสต็อกครับ", "Delivery Manager\nมีงานล่าช้า 5 งานในสัปดาห์นี้", "สรุปโดย CEO\n1. ลูกค้าหลักลดคำสั่งซื้อ\n2. สินค้าบางรายการขาดสต็อก\n3. งานล่าช้าส่งผลต่อความพึงพอใจ"].map((text) => (
            <div key={text} className="rounded-md bg-white p-3 text-xs leading-5 text-slate-700 shadow-sm">
              {text.split("\n").map((line) => (
                <p key={line} className={line.includes("CEO") || line.includes("Manager") ? "font-semibold text-blue-700" : ""}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Training Simulator",
      subtitle: "ฝึกอบรมพนักงานขาย",
      body: <SmallScenario name="ลูกค้าถามว่า เมล็ดกาแฟ Brazil มีรสชาติแบบไหน?" action="เริ่มการฝึกอบรม" />
    },
    {
      title: "Customer Simulator",
      subtitle: "ลูกค้าจำลอง : ลูกค้า VIP",
      body: <SmallScenario name="ต้องการกาแฟคุณภาพสูง จัดส่งตรงเวลา และบริการหลังการขายดีเยี่ยม" action="เริ่มจำลองการสนทนา" />
    },
    {
      title: "Crisis Simulator",
      subtitle: "จำลองวิกฤต : รถเสีย 2 คัน",
      body: <SmallScenario name="ผลกระทบที่อาจเกิดขึ้น: งานส่งล่าช้า 15 งาน ลูกค้าได้รับผลกระทบ 8 ราย รายได้สูญเสีย 45,000 บาท" action="เริ่มจำลองวิกฤต" warning />
    }
  ];

  return (
    <div className="grid gap-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
      {panels.map((panel) => (
        <section key={panel.title} className="rounded-lg border border-slate-800 bg-gradient-to-br from-[#102033] to-[#07101b] p-4 text-white shadow-sm">
          <h3 className="text-sm font-semibold">{panel.title}</h3>
          <p className="mt-2 text-xs text-white/70">{panel.subtitle}</p>
          <div className="mt-4">{panel.body}</div>
          {panel.wide ? (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-6 w-6 rounded-full bg-red-500" />
              <span className="h-6 w-6 rounded-full bg-white" />
              <span className="h-6 w-6 rounded-full bg-white" />
              <span className="text-xs text-emerald-300">00:05:23</span>
              <button className="ml-5 rounded-md bg-red-500 px-8 py-2 text-xs font-semibold">จบการประชุม</button>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function SmallScenario({ name, action, warning }: { name: string; action: string; warning?: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-20 w-16 items-center justify-center rounded-lg text-2xl", warning ? "bg-slate-700" : "bg-slate-100 text-slate-800")}>{warning ? "🚚" : "AI"}</div>
        <div className="rounded-md bg-white p-3 text-xs leading-5 text-slate-700">{name}</div>
      </div>
      <button className="h-9 w-full rounded-md border border-white/30 text-xs font-semibold text-white hover:bg-white/10">{action}</button>
    </div>
  );
}

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1720px] space-y-4 px-4 py-4 sm:px-5">
        <header id="dashboard" className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">ภาพรวมธุรกิจวันนี้</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 shadow-sm sm:w-[360px]">
              <Search className="h-4 w-4 text-slate-400" />
              <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="ค้นหาอะไรให้ AI ช่วย..." />
            </div>
            <button className="relative hidden h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-white sm:flex">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] leading-4 text-white">5</span>
            </button>
            <button className="hidden h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-white sm:flex">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="hidden h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-white sm:flex">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {kpis.map((item) => (
            <KpiCard key={item.label} item={item} />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.45fr_0.84fr_1.1fr]">
          <SalesChart />
          <AlertsPanel />
          <AiCommandCenter />
        </section>

        <section className="grid gap-2 xl:grid-cols-[1.15fr_1fr_1.25fr]">
          <DeliveryPanel />
          <InventoryPanel />
          <OrgSimulator />
        </section>

        <SimulatorStrip />

        <section className="grid gap-2 pb-4 lg:grid-cols-4">
          {[
            ["ESG Center", "Carbon Footprint 14.2 tCO2e และ Waste Sorted 72%", "esg"],
            ["Knowledge Center", "SOP, คู่มือ, Product Knowledge และ RAG-ready docs", "knowledge"],
            ["Finance", "Margin, cashflow, cost trend และ forecast", "finance"],
            ["Firestore Foundation", "Realtime collections, RBAC, audit logs และ memory", "settings"]
          ].map(([title, body, id]) => (
            <section key={title} id={id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
                <Database className="h-4 w-4 text-slate-400" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{body}</p>
            </section>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
