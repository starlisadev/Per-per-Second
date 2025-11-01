import { VideoCard } from "../VideoCard";
import cookingThumbnail from "@assets/generated_images/Cooking_tutorial_video_thumbnail_f4135d3c.png";

export default function VideoCardExample() {
  return (
    <div className="max-w-sm">
      <VideoCard
        id="1"
        title="Italian Pasta Cooking Masterclass"
        creator="Chef Maria"
        thumbnail={cookingThumbnail}
        duration="24:15"
        pricePerSecond="0.001"
        views={12543}
        onClick={() => console.log("Video clicked")}
      />
    </div>
  );
}
