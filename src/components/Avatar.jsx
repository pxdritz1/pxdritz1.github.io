import { fallbackAvatar } from "../data/site.js";

export default function Avatar({ src, className = "" }) {
  return (
    <img
      className={`m3-outline ${className}`}
      src={src || fallbackAvatar}
      alt="pxdritz"
      onError={(event) => {
        event.currentTarget.src = fallbackAvatar;
      }}
    />
  );
}
