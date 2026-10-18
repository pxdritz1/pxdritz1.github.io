import {
  ArrowUpRight,
  Code2,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { githubUser } from "../data/site.js";
import PageIntro from "../components/PageIntro.jsx";
import RevealItem from "../components/RevealItem.jsx";

export default function Contact() {
  const links = [
    [
      "discord",
      "pxotitas",
      "chat, commissions, friendly hellos",
      <MessageCircle size={21} />,
      "https://discord.com/users/pxotitas",
    ],
    [
      "github",
      "pxdritz1",
      "code, experiments, and public things",
      <Code2 size={21} />,
      `https://github.com/${githubUser}`,
    ],
    [
      "modrinth",
      "pxotitas",
      "mods and modpacks",
      <Code2 size={21} />,
      "https://modrinth.com/user/pxotitas",
    ],
    [
      "ko-fi",
      "pxdritz1",
      "support the little dev :p",
      <Sparkles size={21} />,
      "https://ko-fi.com/pxdritz1",
    ],
    [
      "server",
      "code's café",
      "a brazilian programming and tech community",
      <MessageCircle size={21} />,
      "https://discord.gg/BDKNDHvjrD",
    ],
  ];
  return (
    <section id="contact" className="page-section mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <PageIntro
        title="let's make something nice."
        copy="for commissions, collaborations, or just a friendly wave, discord is the fastest way to find me."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map(([name, handle, copy, icon, link], index) => (
          <RevealItem
            as="a"
            key={`${name}-${handle}-${index}`}
            index={index}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-3xl border border-ink/10 bg-white/60 p-5 hover-surface hover:border-coral"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow text-ink">
              {icon}
            </span>
            <span className="flex-1">
              <strong className="font-display text-lg text-ink">
                {name} / {handle}
              </strong>
              <span className="mt-1 block text-sm text-ink/50">{copy}</span>
            </span>
            <ArrowUpRight
              size={18}
              className="text-ink/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </RevealItem>
        ))}
      </div>
      <RevealItem index={5} className="mt-8 flex items-start gap-3 rounded-3xl border border-dashed border-coral/35 bg-coral/5 p-5 text-sm leading-6 text-ink/55">
        <MessageCircle size={18} className="mt-1 shrink-0 text-coral" />
        <span>
          code's café is a brazilian programming and tech community. portuguese
          is the main language, but most people can also speak english.
        </span>
      </RevealItem>
      <RevealItem index={6} className="mt-4 flex items-center gap-3 rounded-3xl border border-dashed border-coral/35 bg-coral/5 p-5 text-sm text-ink/55">
        <Mail size={18} className="text-coral" /> usually replies within a few
        hours, give or take a snack break.
      </RevealItem>
    </section>
  );
}
