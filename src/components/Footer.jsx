import { Code2, Coffee } from "lucide-react";
import { githubUser } from "../data/site.js";
import Avatar from "./Avatar.jsx";
import RevealItem from "./RevealItem.jsx";

export default function Footer({ avatar }) {
  return (
    <footer className="mx-auto mt-20 flex max-w-6xl flex-col gap-4 border-t border-ink/10 px-4 py-8 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
      <RevealItem index={0}>
        <Avatar src={avatar} className="h-8 w-8 rounded-full object-cover" />
      </RevealItem>
      <div className="flex items-center gap-4">
        <RevealItem
          as="a"
          index={1}
          href={`https://github.com/${githubUser}`}
          target="_blank"
          rel="noreferrer"
          aria-label="github"
        >
          <Code2 size={17} />
        </RevealItem>
        <RevealItem
          as="a"
          index={2}
          href="https://ko-fi.com/pxdritz1"
          target="_blank"
          rel="noreferrer"
          aria-label="ko-fi"
        >
          <Coffee size={17} />
        </RevealItem>
        <RevealItem as="span" index={3}>© 2026</RevealItem>
      </div>
    </footer>
  );
}
