import { useInView } from "../hooks/useInView.js";

export default function WordReveal({ lines, className = "", startDelay = 0 }) {
  const [ref, visible] = useInView();
  let wordIndex = 0;
  const label = lines.map((line) => line.text).join(" ");
  return (
    <h1
      ref={ref}
      className={`word-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--word-start": `${startDelay}ms` }}
      aria-label={label}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={`${line.text}-${lineIndex}`}
          className={`word-reveal-line ${line.className || ""}`}
          aria-hidden="true"
        >
          {line.text.split(/(\s+)/).map((part, partIndex) => {
            if (/^\s+$/.test(part)) return part;
            const delay = wordIndex++ * 65;
            return (
              <span
                key={`${part}-${partIndex}`}
                className="word-reveal-word"
                style={{ "--word-delay": `${delay}ms` }}
              >
                {part}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
