import { useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { githubUser, navItems } from "../data/site.js";
import Avatar from "./Avatar.jsx";
import RevealItem from "./RevealItem.jsx";

function ThemeToggle({ dark, setDark }) {
  const toggleTheme = () => {
    const updateTheme = () => setDark(!dark);
    if (document.startViewTransition) {
      document.startViewTransition(updateTheme);
    } else {
      updateTheme();
    }
  };
  return (
    <button
      className="hover-surface rounded-xl p-2 text-ink"
      onClick={toggleTheme}
      aria-label={dark ? "switch to light theme" : "switch to dark theme"}
      title={dark ? "light theme" : "dark theme"}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export default function Navbar({ avatar, dark, setDark }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 px-4 pt-4">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-ink/10 bg-paper/80 px-3 py-2 shadow-soft backdrop-blur-md"
        aria-label="main navigation"
      >
        <RevealItem
          as="a"
          index={0}
          href="#home"
          className="hover-surface flex items-center gap-2 rounded-xl px-2 py-1.5 font-display text-sm font-semibold tracking-tight text-ink"
        >
          <Avatar
            src={avatar}
            className="h-7 w-7 rounded-lg object-cover ring-2 ring-lavender/20"
          />
          <span>
            pxdritz<span className="text-lavender">.</span>
          </span>
        </RevealItem>
        <button
          className="rounded-xl p-2 text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div
          className={`${open ? "flex" : "hidden"} absolute left-4 right-4 top-[4.5rem] flex-col gap-1 rounded-2xl border border-ink/10 bg-paper p-2 shadow-soft md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navItems.slice(1).map(([path, label], index) => (
            <RevealItem
              as="a"
              key={path}
              index={index + 1}
              href={`#${path}`}
              onClick={() => setOpen(false)}
              className={`hover-surface rounded-xl px-3 py-2 text-sm text-ink/65 hover:text-ink ${window.location.hash === `#${path}` ? "bg-ink text-paper hover:bg-ink hover:text-paper" : ""}`}
            >
              {label}
            </RevealItem>
          ))}
          <RevealItem index={5}>
            <ThemeToggle dark={dark} setDark={setDark} />
          </RevealItem>
          <RevealItem
            as="a"
            index={6}
            href="https://pxdritz1.github.io/BrainShake/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="ml-0 inline-flex items-center justify-center gap-1 rounded-xl bg-lilac px-3 py-2 text-sm font-semibold text-ink shadow-sm hover:bg-lavender hover:text-white md:ml-1"
          >
            BrainShake <ArrowUpRight size={14} />
          </RevealItem>
          <RevealItem
            as="a"
            index={7}
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-xl bg-lavender px-3 py-2 text-sm font-semibold text-white hover:bg-lavender-dark"
          >
            github <ArrowUpRight size={14} />
          </RevealItem>
        </div>
      </nav>
    </header>
  );
}
