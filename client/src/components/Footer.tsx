import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-display text-xl font-bold">StellarStream</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Pay-per-second streaming powered by Stellar blockchain.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-github">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-pricing">
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-stellar">
                  Stellar Docs
                </a>
              </li>
              <li>
                <a href="https://soroban.stellar.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-soroban">
                  Soroban Guide
                </a>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest updates on new features and platform news.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="text-sm"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; 2025 StellarStream. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-foreground" data-testid="link-footer-terms">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground" data-testid="link-footer-privacy">
              Privacy
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Stellar Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
