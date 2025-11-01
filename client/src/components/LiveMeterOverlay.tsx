import { Badge } from "@/components/ui/badge";

interface LiveMeterOverlayProps {
  balance: number;
  isStreaming: boolean;
}

export function LiveMeterOverlay({ balance, isStreaming }: LiveMeterOverlayProps) {
  return (
    <div className="absolute left-4 top-4 z-10">
      <Badge 
        variant={isStreaming ? "default" : "secondary"}
        className="gap-2 bg-background/90 px-4 py-2 text-sm font-mono font-semibold backdrop-blur"
        data-testid="overlay-live-meter"
      >
        {isStreaming ? (
          <>
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
            <span className="text-green-600 dark:text-green-400">STREAMING</span>
          </>
        ) : (
          <>
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
            <span>PAUSED</span>
          </>
        )}
        <span className="mx-1">|</span>
        <span data-testid="text-overlay-balance">{balance.toFixed(4)} XLM</span>
      </Badge>
    </div>
  );
}
