import { Hero } from "../Hero";

export default function HeroExample() {
  return (
    <Hero
      onStartWatching={() => console.log("Start watching clicked")}
      onLearnMore={() => console.log("Learn more clicked")}
    />
  );
}
