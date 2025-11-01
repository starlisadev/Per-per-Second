import { Upload, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreatorCTA() {
  return (
    <section className="bg-gradient-to-b from-background to-muted/30 py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 font-display text-4xl font-bold">
              Start Earning from Your Content
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Upload your videos and receive instant micropayments every 10 seconds. No platform fees, no revenue sharing. You keep what you earn.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Receive payments every 10 seconds</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Set your own price per second</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>100% of viewer payments go to you</span>
              </li>
            </ul>
            <Button size="lg" className="gap-2" data-testid="button-start-earning">
              <Upload className="h-5 w-5" />
              Start Uploading
            </Button>
          </div>

          <Card className="p-8">
            <h3 className="mb-6 text-xl font-semibold">List Your Video</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="video-title">Video Title</Label>
                <Input id="video-title" placeholder="Enter video title" data-testid="input-video-title" />
              </div>
              <div>
                <Label htmlFor="wallet-address">Creator Wallet Address</Label>
                <Input
                  id="wallet-address"
                  placeholder="GXXXXXXXXXXXXXXX..."
                  data-testid="input-wallet-address"
                />
              </div>
              <div>
                <Label htmlFor="price-per-second">Price Per Second (XLM)</Label>
                <Input
                  id="price-per-second"
                  type="number"
                  step="0.0001"
                  placeholder="0.001"
                  data-testid="input-price-per-second"
                />
              </div>
              <Button className="w-full" data-testid="button-submit-video">
                Submit Video
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
