import shopee from "../assets/shopee.svg?raw";
import mercadoLivre from "../assets/mercado-livre.svg?raw";
import github from "../assets/github.svg?raw";
import stripe from "../assets/stripe.svg?raw";
import ifood from "../assets/ifood.svg?raw";
import discord from "../assets/discord.svg?raw";
import { asset } from "../data/site.js";
import RevealItem from "./RevealItem.jsx";
import Typewriter from "./Typewriter.jsx";

const socialMarks = [
  { name: "Shopee", href: "https://shopee.com/", logo: shopee },
  {
    name: "Mercado Livre",
    href: "https://www.mercadolivre.com.br/",
    logo: mercadoLivre,
  },
  { name: "GitHub", href: "https://github.com/", logo: github },
  { name: "Stripe", href: "https://stripe.com/", logo: stripe },
  { name: "iFood", href: "https://www.ifood.com.br/", logo: ifood },
  { name: "Discord", href: "https://discord.com/", logo: discord },
];

export default function SocialProof() {
  return (
    <section className="social-proof mt-20 border-t border-ink/10 pt-6">
      <h2 className="mb-7 text-center font-display text-xl font-semibold text-ink sm:text-2xl">
        <Typewriter text="a few names from around here" />
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7 sm:justify-between">
        {socialMarks.map(({ name, href, logo }, index) => (
          <RevealItem
            as="a"
            key={name}
            index={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="social-proof-link"
            aria-label={name}
            title={name}
          >
            <span
              className="social-proof-svg"
              role="img"
              aria-label={name}
              dangerouslySetInnerHTML={{
                __html: logo
                  .replace("<svg", '<svg fill="currentColor"')
                  .replace(/#[0-9a-fA-F]{6}/g, "currentColor"),
              }}
            />
          </RevealItem>
        ))}
        <RevealItem
          as="a"
          index={6}
          href="https://mush.com.br/"
          target="_blank"
          rel="noreferrer"
          className="social-proof-link"
          aria-label="MushMC"
          title="MushMC"
        >
          <img
            src={asset("/assets/mushmc.png")}
            alt="MushMC"
            className="social-proof-raster social-proof-mushmc"
          />
        </RevealItem>
        <RevealItem
          as="a"
          index={7}
          href="https://edonme.dev"
          target="_blank"
          rel="noreferrer"
          className="social-proof-link"
          aria-label="EdonMe Studios"
          title="EdonMe Studios"
        >
          <img
            src={asset("/assets/EDONME.png")}
            alt="EdonMe Studios"
            className="social-proof-raster social-proof-edonme"
          />
        </RevealItem>
      </div>
    </section>
  );
}
