import { LiveMeterOverlay } from "../LiveMeterOverlay";

export default function LiveMeterOverlayExample() {
  return (
    <div className="relative h-64 bg-black rounded-xl overflow-hidden">
      <LiveMeterOverlay balance={4.87} isStreaming={true} />
      <div className="flex items-center justify-center h-full text-white/50">
        Video content would be here
      </div>
    </div>
  );
}
