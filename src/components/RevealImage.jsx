import { useInView } from "../hooks/useInView.js";

export default function RevealImage({ className = "", ...props }) {
  const [ref, visible] = useInView();
  return (
    <img
      ref={ref}
      className={`reveal-image ${visible ? "is-visible" : ""} ${className}`}
      {...props}
    />
  );
}
