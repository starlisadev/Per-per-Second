import { Play, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Hero_blockchain_streaming_visualization_13ca15f3.png";

interface HeroProps {
  onStartWatching?: () => void;
  onLearnMore?: () => void;
}

export function Hero({ onStartWatching, onLearnMore }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="container relative mx-auto grid min-h-screen items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="z-10 flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Built on Stellar
            </Badge>
            <Badge variant="secondary">Zero Subscriptions</Badge>
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            Stream Content.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pay Only for What You Watch.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground lg:text-xl">
            Blockchain-powered micropayments. Pay per second. Keep your funds safe. No monthly fees, no commitments.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={onStartWatching} className="gap-2" data-testid="button-start-watching">
              <Play className="h-5 w-5" />
              Start Watching
            </Button>
            <Button size="lg" variant="outline" onClick={onLearnMore} data-testid="button-learn-more">
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>0.001 XLM/sec average</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span>Trustless smart contracts</span>
            <div className="h-4 w-px bg-border" />
            <span>Instant creator payouts</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
            <img
              src={heroImage}
              alt="Blockchain streaming visualization"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between rounded-lg bg-background/90 p-4 backdrop-blur">
                <div>
                  <p className="text-xs text-muted-foreground">Streaming Meter</p>
                  <p className="font-mono text-2xl font-bold">4.87 XLM</p>
                </div>
                <Badge variant="default" className="gap-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
