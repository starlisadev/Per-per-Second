import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { VideoGallery, type Video } from "@/components/VideoGallery";
import { Footer } from "@/components/Footer";
import { TopUpModal } from "@/components/TopUpModal";
import { type Content } from "@shared/schema";

import cookingThumbnail from "@assets/generated_images/Cooking_tutorial_video_thumbnail_f4135d3c.png";
import yogaThumbnail from "@assets/generated_images/Fitness_yoga_video_thumbnail_7e1ac9ae.png";
import codingThumbnail from "@assets/generated_images/Coding_tutorial_video_thumbnail_311abd21.png";
import travelThumbnail from "@assets/generated_images/Travel_vlog_video_thumbnail_880c13d5.png";
import musicThumbnail from "@assets/generated_images/Music_production_video_thumbnail_6d77c268.png";
import scienceThumbnail from "@assets/generated_images/Science_education_video_thumbnail_2b76134a.png";

const thumbnailMap: Record<string, string> = {
  "cooking-thumbnail": cookingThumbnail,
  "yoga-thumbnail": yogaThumbnail,
  "coding-thumbnail": codingThumbnail,
  "travel-thumbnail": travelThumbnail,
  "music-thumbnail": musicThumbnail,
  "science-thumbnail": scienceThumbnail,
};

export default function Browse() {
  const [, setLocation] = useLocation();
  const [walletConnected, setWalletConnected] = useState(true);
  const [balance, setBalance] = useState("10.5");
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const walletAddress = "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO";

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: Content[]) => {
        const mappedVideos: Video[] = data.map((content) => ({
          id: content.id,
          title: content.title,
          creator: content.creator,
          thumbnail: thumbnailMap[content.thumbnailUrl] || cookingThumbnail,
          duration: content.duration,
          pricePerSecond: (parseFloat(content.pricePerTick) / 10).toFixed(4),
          views: content.views,
        }));
        setVideos(mappedVideos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch content:", err);
        setLoading(false);
      });
  }, []);

  const handleDisconnect = () => {
    console.log("Disconnecting wallet...");
    setWalletConnected(false);
    setBalance("0");
  };

  const handleTopUp = (amount: number) => {
    console.log("Topped up:", amount);
    const newBalance = parseFloat(balance) + amount;
    setBalance(newBalance.toString());
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        balance={balance}
        onConnectWallet={() => console.log("Connect wallet")}
        onDisconnect={handleDisconnect}
      />
      <main className="py-8">
        <VideoGallery videos={videos} onVideoClick={(id) => setLocation(`/video/${id}`)} />
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
