import { Wallet, Play, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Wallet,
    title: "Fund Your Meter",
    description: "Deposit XLM to your personal smart contract. Your funds stay secure and under your control.",
  },
  {
    icon: Play,
    title: "Watch & Stream",
    description: "Start watching any video. Pay automatically per second watched. No subscriptions needed.",
  },
  {
    icon: Shield,
    title: "Keep the Rest",
    description: "Stop watching anytime. Your remaining funds stay safe in your smart contract for next time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Three simple steps to start streaming with blockchain-powered micropayments
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden p-8" data-testid={`card-step-${index + 1}`}>
              <div className="absolute right-4 top-4 text-6xl font-bold text-muted/10">
                {index + 1}
              </div>
              <div className="relative">
                <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
