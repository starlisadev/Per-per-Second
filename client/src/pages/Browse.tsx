import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { VideoGallery, type Video } from "@/components/VideoGallery";
import { Footer } from "@/components/Footer";
import { TopUpModal } from "@/components/TopUpModal";

import cookingThumbnail from "@assets/generated_images/Cooking_tutorial_video_thumbnail_f4135d3c.png";
import yogaThumbnail from "@assets/generated_images/Fitness_yoga_video_thumbnail_7e1ac9ae.png";
import codingThumbnail from "@assets/generated_images/Coding_tutorial_video_thumbnail_311abd21.png";
import travelThumbnail from "@assets/generated_images/Travel_vlog_video_thumbnail_880c13d5.png";
import musicThumbnail from "@assets/generated_images/Music_production_video_thumbnail_6d77c268.png";
import scienceThumbnail from "@assets/generated_images/Science_education_video_thumbnail_2b76134a.png";

export default function Browse() {
  const [, setLocation] = useLocation();
  const [walletConnected, setWalletConnected] = useState(true);
  const [balance, setBalance] = useState("10.5");
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const walletAddress = "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO";

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

  const videos: Video[] = [
    {
      id: "1",
      title: "Italian Pasta Cooking Masterclass",
      creator: "Chef Maria",
      thumbnail: cookingThumbnail,
      duration: "24:15",
      pricePerSecond: "0.001",
      views: 12543,
    },
    {
      id: "2",
      title: "Morning Yoga Flow for Beginners",
      creator: "Yoga with Sarah",
      thumbnail: yogaThumbnail,
      duration: "18:30",
      pricePerSecond: "0.0008",
      views: 8921,
    },
    {
      id: "3",
      title: "React Hooks Complete Guide",
      creator: "CodeMaster",
      thumbnail: codingThumbnail,
      duration: "42:20",
      pricePerSecond: "0.0012",
      views: 15782,
    },
    {
      id: "4",
      title: "Swiss Alps Travel Vlog",
      creator: "Wanderlust Adventures",
      thumbnail: travelThumbnail,
      duration: "31:45",
      pricePerSecond: "0.0009",
      views: 21045,
    },
    {
      id: "5",
      title: "Music Production in FL Studio",
      creator: "BeatMaker Pro",
      thumbnail: musicThumbnail,
      duration: "36:12",
      pricePerSecond: "0.0011",
      views: 9834,
    },
    {
      id: "6",
      title: "Chemistry Experiments for Kids",
      creator: "Science Fun Lab",
      thumbnail: scienceThumbnail,
      duration: "15:48",
      pricePerSecond: "0.0007",
      views: 18234,
    },
    {
      id: "7",
      title: "Advanced JavaScript Patterns",
      creator: "CodeMaster",
      thumbnail: codingThumbnail,
      duration: "52:30",
      pricePerSecond: "0.0013",
      views: 11245,
    },
    {
      id: "8",
      title: "Mediterranean Diet Guide",
      creator: "Chef Maria",
      thumbnail: cookingThumbnail,
      duration: "28:45",
      pricePerSecond: "0.0009",
      views: 14567,
    },
  ];

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
