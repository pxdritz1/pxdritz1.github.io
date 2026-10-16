import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

export function KofiWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    const initializeWidget = () => {
      if (!window.kofiwidget2 || !containerRef.current) return;
      window.kofiwidget2.init("Support me on Ko-fi", "#e96858", "A6A42663NV");
      containerRef.current.innerHTML = window.kofiwidget2.getHTML();
    };
    const existingScript = document.getElementById("kofi-widget-script");
    if (existingScript) {
      initializeWidget();
      existingScript.addEventListener("load", initializeWidget);
      return () => {
        existingScript.removeEventListener("load", initializeWidget);
        if (containerRef.current) containerRef.current.innerHTML = "";
      };
    }

    const script = document.createElement("script");
    script.id = "kofi-widget-script";
    script.type = "text/javascript";
    script.src = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";
    script.addEventListener("load", initializeWidget);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", initializeWidget);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-6 flex items-center justify-center rounded-2xl border border-ink/10 bg-coral/10 p-4"
      aria-label="support me on Ko-fi"
    />
  );
}

export function SpotifyWidget() {
  return (
    <section
      className="rounded-[2rem] border border-ink/10 bg-white/60 p-4 shadow-soft"
      aria-label="spotify now playing"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">
            a little song for the road
          </h2>
        </div>
        <a
          href="https://open.spotify.com/intl-pt/track/6xUrOmjUxQDd2QLtwtxSqg"
          target="_blank"
          rel="noreferrer"
          className="hover-surface rounded-xl p-2 text-ink"
          aria-label="open song on Spotify"
          title="open on Spotify"
        >
          <ExternalLink size={16} />
        </a>
      </div>
      <iframe
        title="Spotify player"
        src="https://open.spotify.com/embed/track/6xUrOmjUxQDd2QLtwtxSqg?utm_source=generator&theme=0"
        className="h-[152px] w-full rounded-xl"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
}
