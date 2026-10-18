import { useInView } from "../hooks/useInView.js";

export default function RevealItem({
  as: Element = "div",
  index = 0,
  delayOffset = 0,
  className = "",
  style,
  children,
  ...props
}) {
  const [ref, visible] = useInView();
  return (
    <Element
      ref={ref}
      className={`reveal-item ${visible ? "is-visible" : ""} ${className}`}
      style={{
        ...style,
        "--reveal-delay": `${delayOffset + Math.min(index, 8) * 65}ms`,
      }}
      {...props}
    >
      {children}
    </Element>
  );
}
