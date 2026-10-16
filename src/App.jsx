import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { useProjectData } from "./hooks/useProjectData.js";
import { useRoute } from "./hooks/useRoute.js";
import Gallery from "./pages/Gallery.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";

export default function App() {
  const route = useRoute();
  const projectData = useProjectData();
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  const avatar = projectData.avatar;
  const page =
    route === "projects" ? (
      <Projects data={projectData} />
    ) : route === "gallery" ? (
      <Gallery />
    ) : (
      <Home avatar={avatar} initialSection={route} />
    );
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-paper">
        <div className="background-dots absolute inset-0" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-yellow/30 blur-3xl dark:hidden" />
        <div className="absolute -right-24 top-[28rem] h-96 w-96 rounded-full bg-coral/10 blur-3xl dark:hidden" />
      </div>
      <Navbar avatar={avatar} dark={dark} setDark={setDark} />
      <div
        key={route === "about" || route === "contact" ? "home" : route}
        className="route-content"
      >
        {page}
      </div>
      <Footer avatar={avatar} />
    </div>
  );
}
