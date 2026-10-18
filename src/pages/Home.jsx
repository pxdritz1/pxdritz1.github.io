import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Image as ImageIcon } from "lucide-react";
import { homeWallpapers } from "../data/site.js";
import RevealImage from "../components/RevealImage.jsx";
import RevealItem from "../components/RevealItem.jsx";
import SocialProof from "../components/SocialProof.jsx";
import WordReveal from "../components/WordReveal.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";

export default function Home({ avatar, initialSection = "home" }) {
  const [wallpaperIndex, setWallpaperIndex] = useState(
    () => Math.floor(Math.random() * homeWallpapers.length),
  );
  const wallpaper = homeWallpapers[wallpaperIndex];
  useEffect(() => {
    if (!["home", "about", "contact"].includes(initialSection)) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(initialSection)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialSection]);
  return (
    <>
    <main className="mx-auto max-w-6xl px-4 pb-4 pt-20">
      <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr] lg:pt-14">
        <div>
          <WordReveal
            lines={[
              { text: "soft ideas," },
              { text: "sharp tools.", className: "text-lavender" },
            ]}
            className="max-w-4xl font-display text-6xl font-bold leading-[0.9] tracking-[-0.075em] text-ink sm:text-8xl"
            startDelay={450}
          />
          <RevealItem index={0} delayOffset={1320} className="mt-8 max-w-xl text-lg leading-8 text-ink/60">
            developer and artist making minecraft mods, tools, and
            wallpapers with care.
          </RevealItem>
          <div className="mt-9 flex flex-wrap gap-3">
            <RevealItem
              as="a"
              index={0}
              delayOffset={1690}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-lavender"
            >
              see my projects! <ChevronRight size={16} />
            </RevealItem>
            <RevealItem
              as="a"
              index={1}
              delayOffset={1690}
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white/50 px-5 py-3 text-sm font-semibold text-ink hover:border-lavender hover:text-lavender"
            >
              browse the gallery <ImageIcon size={16} />
            </RevealItem>
            <RevealItem
              as="a"
              index={2}
              delayOffset={1690}
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white/50 px-5 py-3 text-sm font-semibold text-ink hover:border-lavender hover:text-lavender"
            >
              about <ArrowUpRight size={16} />
            </RevealItem>
          </div>
        </div>
        <RevealItem
          as="button"
          index={0}
          delayOffset={840}
          type="button"
          onClick={() =>
            setWallpaperIndex(
              (currentIndex) => (currentIndex + 1) % homeWallpapers.length,
            )
          }
          className="float-slow group relative rounded-[2rem] border border-ink/10 bg-blush p-4 text-left shadow-soft"
          aria-label="show next wallpaper"
          title="show next wallpaper"
        >
          <div className="overflow-hidden rounded-[1.2rem]">
            <RevealImage
              src={wallpaper[0]}
              alt={`${wallpaper[1]} wallpaper`}
              className="block h-auto w-full transition duration-700 hover:scale-105"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="flex items-center justify-between px-2 pb-1 pt-5 text-sm">
            <span className="font-semibold text-ink">{wallpaper[1]}</span>
            <span className="flex items-center gap-1 text-ink/45 transition-colors group-hover:text-lavender">
              next wallpaper <ChevronRight size={16} />
            </span>
          </div>
        </RevealItem>
      </div>
      <SocialProof />
    </main>
    <About avatar={avatar} />
    <Contact />
    </>
  );
}
