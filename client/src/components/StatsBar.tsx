import { TrendingUp, Users, DollarSign } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Videos Streamed",
  },
  {
    icon: DollarSign,
    value: "$50K+",
    label: "Paid to Creators",
  },
  {
    icon: TrendingUp,
    value: "0.0001 XLM",
    label: "Avg Transaction Fee",
  },
];

export function StatsBar() {
  return (
    <section className="border-y bg-muted/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center" data-testid={`stat-${index + 1}`}>
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-2 font-display text-4xl font-bold" data-testid={`text-stat-value-${index + 1}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index + 1}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
