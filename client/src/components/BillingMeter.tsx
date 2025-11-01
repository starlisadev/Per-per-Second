import { useState, useEffect } from "react";
import { Wallet, Zap, Clock, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BillingMeterProps {
  balance: number;
  pricePerSecond: number;
  isStreaming: boolean;
  timeWatched: number;
  onTopUp?: () => void;
}

export function BillingMeter({
  balance,
  pricePerSecond,
  isStreaming,
  timeWatched,
  onTopUp,
}: BillingMeterProps) {
  const [totalSpent, setTotalSpent] = useState(0);
  const [balanceJustChanged, setBalanceJustChanged] = useState(false);

  useEffect(() => {
    setTotalSpent(timeWatched * pricePerSecond);
  }, [timeWatched, pricePerSecond]);

  useEffect(() => {
    if (isStreaming) {
      setBalanceJustChanged(true);
      const timeout = setTimeout(() => setBalanceJustChanged(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [balance, isStreaming]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const remainingTime = balance / pricePerSecond;
  const progressValue = (balance / 10) * 100;
  const isLowBalance = balance < 1;

  const pricePerHour = (pricePerSecond * 3600).toFixed(2);

  return (
    <Card className="sticky top-24 p-6" data-testid="card-billing-meter">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Meter Balance</h3>
          <div className={`font-mono text-3xl font-bold transition-all ${balanceJustChanged ? 'text-primary scale-105' : ''}`} data-testid="text-balance">
            {balance.toFixed(4)} XLM
          </div>
        </div>
        <Badge 
          variant={isStreaming ? "default" : "secondary"} 
          className="gap-1.5 px-3" 
          data-testid="badge-status"
        >
          {isStreaming ? (
            <>
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="font-medium">STREAMING</span>
            </>
          ) : (
            <>
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>PAUSED</span>
            </>
          )}
        </Badge>
      </div>

      <Progress value={progressValue} className="mb-6" />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Zap className="h-4 w-4" />
            Price
          </span>
          <span className="font-mono font-medium" data-testid="text-price-per-hour">
            {pricePerHour} XLM/hour
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            Time watched
          </span>
          <span className="font-medium" data-testid="text-time-watched">
            {formatTime(timeWatched)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <TrendingDown className="h-4 w-4" />
            Total spent
          </span>
          <span className="font-mono font-medium" data-testid="text-total-spent">
            {totalSpent.toFixed(4)} XLM
          </span>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <div className="mb-1 text-xs text-muted-foreground">Remaining time</div>
          <div className="font-medium" data-testid="text-remaining-time">
            ~{formatTime(Math.floor(remainingTime))}
          </div>
        </div>

        {isLowBalance && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            Low balance! Top up to continue streaming.
          </div>
        )}

        <Button
          variant={isLowBalance ? "default" : "outline"}
          className="w-full gap-2"
          onClick={onTopUp}
          data-testid="button-top-up-meter"
        >
          <Wallet className="h-4 w-4" />
          Top Up Meter
        </Button>
      </div>
    </Card>
  );
}
