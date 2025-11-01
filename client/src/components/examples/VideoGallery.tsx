import { VideoGallery } from "../VideoGallery";
import cookingThumbnail from "@assets/generated_images/Cooking_tutorial_video_thumbnail_f4135d3c.png";
import yogaThumbnail from "@assets/generated_images/Fitness_yoga_video_thumbnail_7e1ac9ae.png";
import codingThumbnail from "@assets/generated_images/Coding_tutorial_video_thumbnail_311abd21.png";
import travelThumbnail from "@assets/generated_images/Travel_vlog_video_thumbnail_880c13d5.png";

export default function VideoGalleryExample() {
  const videos = [
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
  ];

  return (
    <VideoGallery
      videos={videos}
      onVideoClick={(id) => console.log("Video clicked:", id)}
    />
  );
}
