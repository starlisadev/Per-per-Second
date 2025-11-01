import { DollarSign, Calendar, Lock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: DollarSign,
    title: "True Micropayments",
    description: "Pay fractions of a cent per second. Traditional payment systems can't handle transactions this small.",
    color: "text-green-500",
  },
  {
    icon: Calendar,
    title: "No Subscriptions",
    description: "Cancel anytime with zero penalty. No monthly commitments, no hidden fees. Pay only for what you consume.",
    color: "text-blue-500",
  },
  {
    icon: Lock,
    title: "Trustless & Secure",
    description: "Smart contracts handle all payments. Your funds are always under your control, never locked by the platform.",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    title: "Instant Creator Payouts",
    description: "Creators receive payments every 10 seconds. No waiting 30 days for platform processing.",
    color: "text-orange-500",
  },
];

export function Benefits() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold">Why StellarStream?</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The future of content monetization is here
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8" data-testid={`card-benefit-${index + 1}`}>
              <div className="mb-4">
                <div className={`inline-flex rounded-lg bg-muted p-3 ${benefit.color}`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
