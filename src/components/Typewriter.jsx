import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView.js";

export default function Typewriter({ text, className = "" }) {
  const [ref, visible, reducedMotion] = useInView();
  const [displayedText, setDisplayedText] = useState(
    reducedMotion ? text : "",
  );

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(text);
      return undefined;
    }
    if (!visible) return undefined;
    let index = 0;
    let timer;
    setDisplayedText("");
    const typeNext = () => {
      const character = text[index];
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index < text.length) {
        const baseDelay = 24 + ((index * 7) % 4) * 7;
        const pause = /[,.!?]/.test(character) ? 90 : 0;
        timer = window.setTimeout(typeNext, baseDelay + pause);
      }
    };
    timer = window.setTimeout(typeNext, 30);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, text, visible]);

  return (
    <span
      ref={ref}
      className={`typewriter ${visible ? "is-visible" : ""} ${reducedMotion ? "reduced-motion" : ""} ${displayedText === text ? "is-complete" : ""} ${className}`}
      aria-label={text}
    >
      <span className="typewriter-reserve" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-display" aria-hidden="true">
        {displayedText}
      </span>
    </span>
  );
}
