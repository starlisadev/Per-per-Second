import { useState } from "react";
import { Wallet, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TopUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance?: string;
  onTopUp?: (amount: number) => void;
}

export function TopUpModal({
  open,
  onOpenChange,
  currentBalance = "0",
  onTopUp,
}: TopUpModalProps) {
  const [amount, setAmount] = useState("5");
  const [loading, setLoading] = useState(false);

  const presetAmounts = [5, 10, 25, 50];

  const calculateStreamingTime = (xlm: number) => {
    const secondsPerXLM = 1 / 0.001;
    const totalSeconds = xlm * secondsPerXLM;
    const hours = Math.floor(totalSeconds / 3600);
    return hours > 0 ? `~${hours} hours` : `~${Math.floor(totalSeconds / 60)} minutes`;
  };

  const handleTopUp = async () => {
    setLoading(true);
    console.log("Top up triggered with amount:", amount);
    
    // TODO: Integrate with Freighter wallet and Stellar smart contract
    // This is a placeholder implementation
    // User needs to configure:
    // 1. SMART_METER_CONTRACT_ID - The deployed smart contract ID
    // 2. Freighter wallet integration for signing transactions
    // Example implementation:
    // 
    // import { isConnected, getPublicKey, signTransaction } from "@stellar/freighter-api";
    // const contractId = "YOUR_CONTRACT_ID_HERE";
    // const amount = parseFloat(amount);
    // 
    // if (await isConnected()) {
    //   const publicKey = await getPublicKey();
    //   // Build and sign transaction to deposit to smart contract
    //   // See Stellar SDK documentation for full implementation
    // }
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onTopUp?.(parseFloat(amount));
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="modal-top-up">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Add Funds to Streaming Meter
          </DialogTitle>
          <DialogDescription>
            Deposit XLM to your personal smart contract to start streaming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <div className="mb-1 text-sm text-muted-foreground">Current Balance</div>
            <div className="font-mono text-2xl font-bold" data-testid="text-current-balance">
              {currentBalance} XLM
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="amount">Amount (XLM)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.1"
              data-testid="input-top-up-amount"
            />
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  data-testid={`button-preset-${preset}`}
                >
                  {preset} XLM
                </Button>
              ))}
            </div>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Estimated streaming time:</p>
                <p className="text-muted-foreground">
                  {calculateStreamingTime(parseFloat(amount))} at avg 0.001 XLM/sec
                </p>
              </div>
            </div>
          )}

          <Button
            className="w-full gap-2"
            onClick={handleTopUp}
            disabled={!amount || parseFloat(amount) <= 0 || loading}
            data-testid="button-confirm-top-up"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                Deposit {amount} XLM
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            This will open your Freighter wallet to confirm the transaction
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
