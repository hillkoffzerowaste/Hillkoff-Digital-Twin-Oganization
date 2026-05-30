import {
  BarChart3,
  BookOpen,
  Bot,
  Box,
  Building2,
  ClipboardList,
  Cog,
  CreditCard,
  Home,
  Leaf,
  Package,
  Route,
  ShoppingCart,
  Users,
  Warehouse
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "#dashboard", label: "Dashboard", icon: Home, active: true },
  { href: "#command-center", label: "AI Command Center", icon: Bot },
  { href: "#sales", label: "Sales", icon: ShoppingCart },
  { href: "#delivery", label: "Delivery", icon: Route },
  { href: "#inventory", label: "Inventory", icon: Package },
  { href: "#warehouse", label: "Warehouse", icon: Warehouse },
  { href: "#esg", label: "ESG Center", icon: Leaf },
  { href: "#knowledge", label: "Knowledge Center", icon: BookOpen },
  { href: "#finance", label: "Finance", icon: CreditCard },
  { href: "#hr", label: "HR", icon: Building2 },
  { href: "#customers", label: "Customers", icon: Users },
  { href: "#reports", label: "Reports", icon: ClipboardList },
  { href: "#simulator", label: "Simulator", icon: BarChart3 },
  { href: "#settings", label: "Settings", icon: Cog }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[228px] flex-col border-r border-white/10 bg-[#07101b] text-white shadow-2xl lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#a57545] to-[#3b2617] text-lg font-semibold">
            H
          </div>
          <div>
            <p className="text-base font-bold tracking-wide">HILLKOFF</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/60">AI Command Center</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-10 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition ${
                  item.active ? "bg-[#8b623f] text-white shadow-lg shadow-black/20" : "text-white/82 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {!item.active && item.label !== "Dashboard" ? <span className="text-white/35">›</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-md bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#07101b]">AD</div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">สวัสดีครับ,</p>
              <p className="truncate text-xs text-white/70">Admin User</p>
              <p className="truncate text-[10px] text-white/45">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t bg-[#07101b] p-2 text-white lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[10px] text-white/75">
              <Icon className="h-4 w-4" />
              <span className="max-w-full truncate">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>

      <main className="pb-20 lg:ml-[228px] lg:pb-0">{children}</main>
    </div>
  );
}
