import { useEffect, useRef, useState } from "react";

export function useInView() {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(motionQuery.matches);
      if (motionQuery.matches) setVisible(true);
    };
    motionQuery.addEventListener("change", updateMotionPreference);
    if (motionQuery.matches || !ref.current || !window.IntersectionObserver) {
      setVisible(true);
      return () =>
        motionQuery.removeEventListener("change", updateMotionPreference);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return [ref, visible, reducedMotion];
}
