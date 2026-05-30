import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: DivProps) {
  return (
    <section className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </section>
  );
}

export function CardHeader({ children, className, ...props }: DivProps) {
  return (
    <div className={cn("border-b px-4 py-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className, ...props }: DivProps) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}
