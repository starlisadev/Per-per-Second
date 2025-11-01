import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  walletConnected?: boolean;
  walletAddress?: string;
  balance?: string;
  onConnectWallet?: () => void;
  onDisconnect?: () => void;
}

export function Header({
  walletConnected = false,
  walletAddress = "",
  balance = "0",
  onConnectWallet,
  onDisconnect,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="font-display text-xl font-bold">StellarStream</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#how-it-works" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-how-it-works">
            How It Works
          </Link>
          <Link href="/browse" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-browse">
            Browse Videos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {walletConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" data-testid="button-wallet-menu">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">{truncateAddress(walletAddress)}</span>
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {balance} XLM
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="gap-2" data-testid="button-copy-address">
                  <span className="font-mono text-xs">{walletAddress}</span>
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="button-view-transactions">
                  View Transactions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDisconnect} data-testid="button-disconnect">
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onConnectWallet} className="gap-2" data-testid="button-connect-wallet">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </Button>
          )}

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t bg-background p-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/#how-it-works" className="text-sm font-medium" data-testid="link-mobile-how-it-works">
              How It Works
            </Link>
            <Link href="/browse" className="text-sm font-medium" data-testid="link-mobile-browse">
              Browse Videos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
