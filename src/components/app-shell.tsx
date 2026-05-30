import { BarChart3, BookOpen, BrainCircuit, Leaf, Package, Route, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "#dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "#command-center", label: "AI", icon: BrainCircuit },
  { href: "#delivery", label: "Delivery", icon: Route },
  { href: "#inventory", label: "Inventory", icon: Package },
  { href: "#esg", label: "ESG", icon: Leaf },
  { href: "#knowledge", label: "Knowledge", icon: BookOpen },
  { href: "#simulator", label: "Simulator", icon: UsersRound },
  { href: "#security", label: "Security", icon: ShieldCheck }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-x-0 bottom-0 z-20 border-t bg-card/95 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-t-0">
        <div className="hidden px-5 py-5 md:block">
          <p className="text-base font-semibold">Hillkoff Digital Twin</p>
          <p className="mt-1 text-xs text-muted-foreground">Living Digital Organization</p>
        </div>
        <nav className="grid grid-cols-8 gap-1 p-2 md:grid-cols-1 md:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex min-h-12 items-center justify-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground md:justify-start md:text-sm">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="pb-20 md:ml-64 md:pb-0">{children}</main>
    </div>
  );
}
