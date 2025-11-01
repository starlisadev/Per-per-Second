import { VideoCard } from "./VideoCard";

export interface Video {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  pricePerSecond: string;
  views: number;
}

interface VideoGalleryProps {
  videos: Video[];
  onVideoClick?: (videoId: string) => void;
}

export function VideoGallery({ videos, onVideoClick }: VideoGalleryProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="mb-4 font-display text-4xl font-bold">Browse Videos</h2>
          <p className="text-lg text-muted-foreground">
            Discover content from creators around the world. Pay only for what you watch.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              onClick={() => onVideoClick?.(video.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
