import { Play, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VideoCardProps {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  pricePerSecond: string;
  views?: number;
  onClick?: () => void;
}

export function VideoCard({
  title,
  creator,
  thumbnail,
  duration,
  pricePerSecond,
  views,
  onClick,
}: VideoCardProps) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden hover-elevate active-elevate-2 transition-all"
      onClick={onClick}
      data-testid={`card-video-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-primary p-4">
            <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
          </div>
        </div>
        <Badge className="absolute bottom-2 right-2 gap-1" variant="secondary">
          <Clock className="h-3 w-3" />
          {duration}
        </Badge>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug" data-testid="text-video-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground" data-testid="text-creator-name">
          {creator}
        </p>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {pricePerSecond} XLM/sec
          </Badge>
          {views !== undefined && (
            <span className="text-xs text-muted-foreground" data-testid="text-view-count">
              {views.toLocaleString()} views
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
