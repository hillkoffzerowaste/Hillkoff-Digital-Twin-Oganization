import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metric } from "@/types/domain";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : ArrowRight;
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <Icon className={cn("h-4 w-4", metric.trend === "up" && "text-primary", metric.trend === "down" && "text-destructive")} />
        </div>
        <div>
          <p className="text-2xl font-semibold">{metric.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{metric.delta}</p>
        </div>
      </CardContent>
    </Card>
  );
}
