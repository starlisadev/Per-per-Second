import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopUpModal } from "@/components/TopUpModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingDown, ArrowUpRight, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Account() {
  const [balance, setBalance] = useState("4.88");
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [walletConnected] = useState(true);

  const walletAddress = "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO";

  const handleTopUp = (amount: number) => {
    console.log("Topped up:", amount);
    const newBalance = parseFloat(balance) + amount;
    setBalance(newBalance.toFixed(4));
  };

  const handleWithdraw = () => {
    console.log("Withdraw to wallet clicked");
  };

  const transactions = [
    {
      id: "1",
      date: "11/01/2025 1:12 PM",
      type: "deposit",
      content: "Deposit",
      amount: "+5.00",
      status: "Confirmed",
    },
    {
      id: "2",
      date: "11/01/2025 1:14 PM",
      type: "payment",
      content: "Italian Pasta Cooking Masterclass",
      amount: "-0.01",
      status: "Confirmed",
    },
    {
      id: "3",
      date: "11/01/2025 1:14 PM",
      type: "payment",
      content: "Italian Pasta Cooking Masterclass",
      amount: "-0.01",
      status: "Confirmed",
    },
    {
      id: "4",
      date: "11/01/2025 1:15 PM",
      type: "payment",
      content: "Italian Pasta Cooking Masterclass",
      amount: "-0.01",
      status: "Confirmed",
    },
    {
      id: "5",
      date: "11/01/2025 1:15 PM",
      type: "payment",
      content: "Italian Pasta Cooking Masterclass",
      amount: "-0.01",
      status: "Confirmed",
    },
    {
      id: "6",
      date: "11/01/2025 1:16 PM",
      type: "payment",
      content: "React Hooks Complete Guide",
      amount: "-0.012",
      status: "Confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        balance={balance}
        onConnectWallet={() => console.log("Connect wallet")}
        onDisconnect={() => console.log("Disconnect")}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-bold">Account</h1>
          <p className="text-muted-foreground">
            Manage your streaming meter balance and view transaction history
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="mb-1 text-sm font-medium text-muted-foreground">
                Current Meter Balance
              </h2>
              <div className="font-mono text-5xl font-bold" data-testid="text-account-balance">
                {balance} XLM
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-muted p-4">
              <p className="mb-1 text-sm text-muted-foreground">Smart Contract Address</p>
              <p className="font-mono text-xs break-all" data-testid="text-contract-address">
                GCXYZ123ABCDEFGHIJKLMNOPQRSTUVWXYZ456789
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full gap-2"
                onClick={() => setTopUpModalOpen(true)}
                data-testid="button-account-top-up"
              >
                <Wallet className="h-4 w-4" />
                Top Up Meter
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleWithdraw}
                data-testid="button-withdraw"
              >
                <ArrowUpRight className="h-4 w-4" />
                Withdraw to Wallet
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Your funds are always under your control. Withdraw anytime to return remaining
              balance to your main wallet.
            </p>
          </Card>

          <Card className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Usage Stats</h2>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4" />
                  Total Spent
                </div>
                <div className="font-mono text-2xl font-bold">0.12 XLM</div>
                <p className="mt-1 text-xs text-muted-foreground">~$0.01 USD</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm text-muted-foreground">Videos Watched</div>
                <div className="text-2xl font-bold">3</div>
                <p className="mt-1 text-xs text-muted-foreground">2 hours 15 minutes total</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm text-muted-foreground">Avg Cost per Hour</div>
                <div className="font-mono text-2xl font-bold">0.053 XLM</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <p className="text-sm text-muted-foreground">
                Verified on-chain transactions from your smart contract
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2" data-testid="button-export">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} data-testid={`row-transaction-${tx.id}`}>
                    <TableCell className="font-mono text-xs">{tx.date}</TableCell>
                    <TableCell>{tx.content}</TableCell>
                    <TableCell
                      className={`text-right font-mono font-medium ${
                        tx.type === "deposit" ? "text-green-600" : "text-muted-foreground"
                      }`}
                    >
                      {tx.amount} XLM
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>

      <Footer />

      <TopUpModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        currentBalance={balance}
        onTopUp={handleTopUp}
      />
    </div>
  );
}
