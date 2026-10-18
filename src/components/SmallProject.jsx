import { ArrowUpRight } from "lucide-react";
import RevealItem from "./RevealItem.jsx";

export default function SmallProject({ icon, title, copy, link, index = 0 }) {
  return (
    <RevealItem
      as="a"
      index={index}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 rounded-3xl border border-ink/10 bg-lilac/50 p-5 hover-surface"
    >
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lilac text-ink">
        {icon}
      </span>
      <span className="flex-1">
        <strong className="font-display text-lg text-ink">{title}</strong>
        <span className="mt-1 block text-sm text-ink/50">{copy}</span>
      </span>
      <ArrowUpRight size={18} className="text-ink/40" />
    </RevealItem>
  );
}
