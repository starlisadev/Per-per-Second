import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BillingMeter } from "@/components/BillingMeter";
import { TopUpModal } from "@/components/TopUpModal";
import { LiveMeterOverlay } from "@/components/LiveMeterOverlay";
import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { type Content } from "@shared/schema";
import cookingThumbnail from "@assets/generated_images/Cooking_tutorial_video_thumbnail_f4135d3c.png";

export default function VideoPlayer() {
  const [, params] = useRoute("/video/:id");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);
  const [balance, setBalance] = useState(10.5);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [walletConnected] = useState(true);
  const [videoDetails, setVideoDetails] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const balanceRef = useRef(balance);

  const videoId = params?.id || "1";
  const walletAddress = "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO";

  // Keep balance ref in sync with balance state
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  // Fetch video details from API
  useEffect(() => {
    fetch(`/api/content/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setVideoDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch video details:", err);
        setLoading(false);
      });
  }, [videoId]);

  // Set up WebSocket connection
  useEffect(() => {
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${wsProtocol}://${window.location.host}`);
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onclose = () => console.log("WebSocket disconnected");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "tick") {
        setBalance(parseFloat(data.newBalance));
        console.log("Balance updated:", data.newBalance);
      } else if (data.type === "error") {
        console.error("WebSocket error:", data.message);
        setIsPlaying(false);
        alert(`Payment error: ${data.message}`);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  // Manage billing heartbeat
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying && socketRef.current) {
      sendPing();
      intervalRef.current = setInterval(sendPing, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, videoId]);

  const sendPing = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log("Sending billing ping with balance:", balanceRef.current);
      socketRef.current.send(JSON.stringify({
        type: "ping",
        videoId: videoId,
        currentBalance: balanceRef.current
      }));
      setTimeWatched((prev) => prev + 10);
    }
  };

  useEffect(() => {
    if (balance < 0.1 && isPlaying) {
      setIsPlaying(false);
      setTopUpModalOpen(true);
    }
  }, [balance, isPlaying]);

  const handleTopUp = (amount: number) => {
    console.log("Topped up:", amount);
    setBalance((prev) => prev + amount);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Loading video...</p>
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Video not found</p>
      </div>
    );
  }

  const pricePerSecond = parseFloat(videoDetails.pricePerTick) / 10;

  return (
    <div className="min-h-screen bg-background">
      <Header
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        balance={balance.toFixed(4)}
        onConnectWallet={() => console.log("Connect wallet")}
        onDisconnect={() => console.log("Disconnect")}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="group relative aspect-video overflow-hidden rounded-xl bg-black">
              <LiveMeterOverlay balance={balance} isStreaming={isPlaying} />
              
              <img
                src={cookingThumbnail}
                alt={videoDetails.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  className="h-20 w-20 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-testid="button-play-pause"
                >
                  {isPlaying ? (
                    <Pause className="h-10 w-10" />
                  ) : (
                    <Play className="h-10 w-10 fill-current" />
                  )}
                </Button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <Slider defaultValue={[30]} max={100} step={1} className="mb-4" />
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white"
                    onClick={() => setIsPlaying(!isPlaying)}
                    data-testid="button-control-play"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-white" />
                      <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
                    </div>
                    <Button size="icon" variant="ghost" className="text-white" data-testid="button-fullscreen">
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {!isPlaying && balance > 0 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="mb-2 text-sm text-white/80">Click to start streaming</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-3xl font-bold" data-testid="text-video-title">
                {videoDetails.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  CM
                </div>
                <div>
                  <p className="font-semibold" data-testid="text-creator-name">
                    {videoDetails.creator}
                  </p>
                  <p className="text-sm text-muted-foreground">Content Creator</p>
                </div>
              </div>
              <p className="text-muted-foreground" data-testid="text-description">
                {videoDetails.description}
              </p>
            </div>
          </div>

          <div>
            <BillingMeter
              balance={balance}
              pricePerSecond={pricePerSecond}
              isStreaming={isPlaying}
              timeWatched={timeWatched}
              onTopUp={() => setTopUpModalOpen(true)}
            />
          </div>
        </div>
      </main>

      <Footer />

      <TopUpModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        currentBalance={balance.toFixed(4)}
        onTopUp={handleTopUp}
      />
    </div>
  );
}
