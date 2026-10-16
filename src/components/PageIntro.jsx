import RevealItem from "./RevealItem.jsx";
import WordReveal from "./WordReveal.jsx";

export default function PageIntro({ title, copy }) {
  return (
    <div className="mb-10 max-w-2xl">
      <WordReveal
        lines={[{ text: title }]}
        className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-ink sm:text-7xl"
        startDelay={80}
      />
      <RevealItem delayOffset={480} className="mt-5 max-w-xl text-lg leading-8 text-ink/60">
        {copy}
      </RevealItem>
    </div>
  );
}
