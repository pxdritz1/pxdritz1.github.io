import { ExternalLink } from "lucide-react";
import { languages } from "../data/site.js";
import Avatar from "../components/Avatar.jsx";
import PageIntro from "../components/PageIntro.jsx";
import RevealImage from "../components/RevealImage.jsx";
import RevealItem from "../components/RevealItem.jsx";
import { KofiWidget, SpotifyWidget } from "../components/MediaWidgets.jsx";

export default function About({ avatar }) {
  return (
    <section id="about" className="page-section mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <PageIntro
        title="curious by default."
        copy="i like simple solutions, elegant code, and visual details that feel a little alive."
      />
      <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
        <div className="grid content-start gap-5">
          <RevealItem className="rounded-3xl bg-profile p-6 text-ink shadow-soft">
            <Avatar
              src={avatar}
              className="h-24 w-24 rounded-[1.5rem] object-cover ring-4 ring-coral"
            />
            <p className="mt-12 font-display text-3xl font-bold leading-tight">
              hello, i'm chloe, nice to meet you!!!<span className="text-coral">
                .
              </span>
            </p>
            <p className="mt-4 text-sm leading-6 text-ink/60">
              coo at edonme studios, maker of mods, tools, and art.
            </p>
            <div className="mt-8 border-t border-ink/10 pt-6 text-sm leading-6 text-ink/65">
              <p>
                i love tea, traveling, programming, helping beginners, and
                meditating.
              </p>
              <p className="mt-4">
                i consider myself a creative person who is always thinking
                outside the box.
              </p>
            </div>
          </RevealItem>
          <RevealItem index={1}>
            <SpotifyWidget />
          </RevealItem>
        </div>
        <RevealItem className="rounded-3xl border border-ink/10 bg-white/60 p-6 sm:p-8">
          <p className="max-w-2xl text-lg leading-8 text-ink/70">
            i work with <strong className="text-ink">java</strong>,{" "}
            <strong className="text-ink">kotlin</strong>,{" "}
            <strong className="text-ink">go</strong>, and{" "}
            <strong className="text-ink">rust</strong> to make minecraft mods
            and useful little tools. i also make wallpapers and commissioned
            artwork when the right idea comes along.
          </p>
          <div className="mt-8 rounded-2xl bg-mint/20 p-4">
            <p className="text-sm leading-6 text-ink/65">
              i was a frequent minecraft 1.8.9 pvp player, known on NameMC as{" "}
              <strong className="text-ink">pxdritz</strong>.
            </p>
            <a
              href="https://namemc.com/profile/pxdritz"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coral"
            >
              view NameMC <ExternalLink size={13} />
            </a>
          </div>
          <div className="mt-8">
            <p className="mb-4 font-display text-lg font-bold text-ink">
              languages & tools
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-paper p-4">
              {languages.map(([name, link]) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-surface rounded-xl p-1 transition hover:-translate-y-1"
                  title={`learn more about ${name}`}
                >
                  <RevealImage
                    src={`https://skillicons.dev/icons?i=${name}`}
                    alt={name}
                    className="h-10 w-10"
                  />
                </a>
              ))}
              <a
                href="https://fabricmc.net/"
                target="_blank"
                rel="noreferrer"
                className="hover-surface rounded-xl p-1 transition hover:-translate-y-1"
                title="learn more about fabric"
              >
                <RevealImage
                  src="https://docs.fabricmc.net/logo.png"
                  alt="fabric"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <KofiWidget />
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
