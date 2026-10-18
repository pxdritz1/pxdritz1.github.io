import { useEffect, useState } from "react";

export function useRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "home");
  useEffect(() => {
    const update = () => {
      const nextRoute = window.location.hash.slice(1) || "home";
      const changeRoute = () => setRoute(nextRoute);
      if (document.startViewTransition) {
        document.startViewTransition(changeRoute);
      } else {
        changeRoute();
      }
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}
