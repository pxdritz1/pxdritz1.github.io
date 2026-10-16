import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { galleryItems } from "../data/site.js";
import PageIntro from "../components/PageIntro.jsx";
import RevealImage from "../components/RevealImage.jsx";
import RevealItem from "../components/RevealItem.jsx";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef(null);
  const closeGallery = () => {
    if (!selected || isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 260);
  };
  useEffect(() => {
    const close = (event) => event.key === "Escape" && closeGallery();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected, isClosing]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  return (
    <main className="mx-auto max-w-6xl px-4 pb-4 pt-20">
      <PageIntro
        title="a little gallery of things."
        copy="wallpapers, commissions, and experiments. click around, there are nice pixels hiding here."
      />
      <div className="columns-1 gap-4 sm:columns-2">
        {galleryItems
          .filter(([src]) => !src.endsWith("/cujos.png"))
          .map(([src, title, type], index) => (
            <RevealItem
              as="button"
              key={src}
              index={index}
              onClick={() => {
                window.clearTimeout(closeTimer.current);
                setIsClosing(false);
                setSelected({ src, title });
              }}
              className="group relative mb-4 block w-full overflow-hidden rounded-3xl border border-ink/10 bg-blush text-left shadow-soft"
            >
              <RevealImage
                src={src}
                alt={title}
                className="w-full"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-5 pt-14 text-white">
                <span>
                  <strong className="block font-display text-xl">
                    {title}
                  </strong>
                  <small className="text-white/65">{type}</small>
                </span>
                <ImageIcon size={18} />
              </span>
            </RevealItem>
          ))}
      </div>
      {selected && (
        <div
          className={`gallery-modal fixed inset-0 z-50 grid place-items-center bg-transparent p-4 ${isClosing ? "gallery-modal-closing" : ""}`}
          onClick={closeGallery}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-xl bg-white/10 p-3 text-white"
            aria-label="close image"
            onClick={(event) => {
              event.stopPropagation();
              closeGallery();
            }}
          >
            <X size={22} />
          </button>
          <div className="gallery-modal-frame max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]">
            <img
              src={selected.src}
              alt={selected.title}
              className="gallery-modal-image h-auto w-auto max-h-[calc(100vh-2.75rem)] max-w-[calc(100vw-2.75rem)] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
