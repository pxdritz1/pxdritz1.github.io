import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Coffee,
  ExternalLink,
  Image as ImageIcon,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import './index.css'

const githubUser = 'pxdritz1'
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const fallbackAvatar = asset('/assets/oc-icon.png')
const galleryItems = [
  [asset('/assets/unitedtrans.png'), 'united trans', 'poster study'],
  [asset('/assets/vectorbloom_lain.png'), 'vectorbloom lain', 'vector study'],
  [asset('/assets/cujos.png'), 'cujos', 'character art'],
  [asset('/assets/6e86120b-b056-46f7-978f-c517e3c1884e.png'), 'abstract', 'wallpaper'],
  [asset('/assets/dragona.png'), 'dragona', 'wallpaper'],
  [asset('/assets/joedio.png'), 'joedio', 'wallpaper'],
  [asset('/assets/jojo.png'), 'jojo', 'wallpaper'],
  [asset('/assets/jolyne.png'), 'jolyne', 'wallpaper'],
  [asset('/assets/madoka_lesbian_debian.png'), 'madoka lesbian debian', 'wallpaper'],
]
const homeWallpapers = galleryItems.filter(([src]) => !src.endsWith('/cujos.png'))
const languages = [
  ['html', 'https://developer.mozilla.org/en-US/docs/Web/HTML'],
  ['css', 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
  ['kotlin', 'https://kotlinlang.org/'],
  ['java', 'https://www.java.com/'],
  ['lua', 'https://www.lua.org/'],
  ['cs', 'https://dotnet.microsoft.com/en-us/languages/csharp'],
  ['rust', 'https://www.rust-lang.org/'],
  ['python', 'https://www.python.org/'],
  ['js', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
  ['ts', 'https://www.typescriptlang.org/'],
  ['go', 'https://go.dev/'],
  ['cpp', 'https://en.cppreference.com/w/'],
]
const projects = [
  ['https://cdn.modrinth.com/data/zLOxi2dV/8156284569e35a77d98e6a0730579df2ca175868_96.webp', 'blokkusus', '126+ new building blocks for minecraft, made to sit naturally beside vanilla.', 'modrinth.com/project/blokkusus'],
  ['https://cdn.modrinth.com/data/mUSAnHRV/e5a283057d3b1573f722cad5fb34f15f42134d96_96.webp', 'mercurizer', 'a sodium addon for low-end hardware, tuned for a smoother little world.', 'modrinth.com/project/mercurizer'],
  ['https://cdn.modrinth.com/data/sSJDIG90/ddd4d49b3a52c8bad5851b72a4504c295f4da8de_96.webp', 'potato optimizer', 'a lightweight modpack for high fps with sodium, lithium, and friends.', 'modrinth.com/modpack/potatooptimizer'],
]
const navItems = [['home', 'home'], ['projects', 'projects'], ['gallery', 'gallery'], ['about', 'about'], ['contact', 'contact']]

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`request failed: ${response.status}`)
  return response.json()
}

function useProjectData() {
  const [data, setData] = useState({ modrinth: [], github: [], loading: true, error: false })
  useEffect(() => {
    let active = true
    Promise.all([
      fetchJson('https://api.modrinth.com/v2/user/pxotitas/projects'),
      fetchJson(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`),
    ]).then(async ([modrinth, repositories]) => {
      const github = await Promise.all(repositories.map(async (repository) => {
        const commits = await fetchJson(`https://api.github.com/repos/${githubUser}/${repository.name}/commits?per_page=3`).catch(() => [])
        return { ...repository, commits }
      }))
      if (active) setData({ modrinth, github, loading: false, error: false })
    }).catch(() => {
      if (active) setData((current) => ({ ...current, loading: false, error: true }))
    })
    return () => { active = false }
  }, [])
  return data
}

function useRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || 'home')
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || 'home')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  return route
}

function Avatar({ src, className = '' }) {
  return <img className={`m3-outline ${className}`} src={src || fallbackAvatar} alt="pxdritz" onError={(event) => { event.currentTarget.src = fallbackAvatar }} />
}

function ThemeToggle({ dark, setDark }) {
  const toggleTheme = () => {
    const updateTheme = () => setDark(!dark)
    if (document.startViewTransition) {
      document.startViewTransition(updateTheme)
    } else {
      updateTheme()
    }
  }
  return <button className="rounded-xl p-2 text-ink hover:bg-white/70 dark:hover:bg-white/10" onClick={toggleTheme} aria-label={dark ? 'switch to light theme' : 'switch to dark theme'} title={dark ? 'light theme' : 'dark theme'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
}

function Header({ avatar, dark, setDark }) {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-30 px-4 pt-4">
    <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-ink/10 bg-paper/80 px-3 py-2 shadow-soft backdrop-blur-md" aria-label="main navigation">
      <a href="#home" className="flex items-center gap-2 rounded-xl px-2 py-1.5 font-display text-sm font-semibold tracking-tight text-ink hover:bg-white/70">
        <Avatar src={avatar} className="h-7 w-7 rounded-lg object-cover ring-2 ring-coral/20" />
        <span>pxdritz<span className="text-coral">.</span></span>
      </a>
      <button className="rounded-xl p-2 text-ink md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="toggle navigation">{open ? <X size={18} /> : <Menu size={18} />}</button>
      <div className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-[4.5rem] flex-col gap-1 rounded-2xl border border-ink/10 bg-paper p-2 shadow-soft md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        {navItems.slice(1).map(([path, label]) => <a key={path} href={`#${path}`} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2 text-sm text-ink/65 hover:bg-white/70 hover:text-ink ${window.location.hash === `#${path}` ? 'bg-ink text-paper hover:bg-ink hover:text-paper' : ''}`}>{label}</a>)}
        <ThemeToggle dark={dark} setDark={setDark} /><a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-2 rounded-xl bg-coral px-3 py-2 text-sm font-semibold text-white hover:bg-coral-dark">github <ArrowUpRight size={14} /></a>
      </div>
    </nav>
  </header>
}

function Footer({ avatar }) {
  return <footer className="mx-auto mt-20 flex max-w-6xl flex-col gap-4 border-t border-ink/10 px-4 py-8 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
    <div><Avatar src={avatar} className="h-8 w-8 rounded-full object-cover" /></div>
    <div className="flex items-center gap-4"><a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" aria-label="github"><Code2 size={17} /></a><a href="https://ko-fi.com/pxdritz1" target="_blank" rel="noreferrer" aria-label="ko-fi"><Coffee size={17} /></a><span>© 2026</span></div>
  </footer>
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

function PageIntro({ eyebrow, title, copy }) {
  const [ref, visible] = useReveal()
  return <div ref={ref} className={`${visible ? 'reveal-visible' : 'reveal-hidden'} mb-10 max-w-2xl`}><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-coral">{eyebrow}</p><h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-ink sm:text-7xl">{title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-ink/60">{copy}</p></div>
}

function Home({ avatar, projectCount, artCount }) {
  return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><div className="grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr] lg:pt-14"><div><div className="mb-7 flex items-center gap-3 text-sm text-ink/50"><span className="h-2 w-2 rounded-full bg-mint" /> currently building things & making art</div><h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.9] tracking-[-0.075em] text-ink sm:text-8xl">soft ideas,<br /><span className="text-coral">sharp tools.</span></h1><p className="mt-8 max-w-xl text-lg leading-8 text-ink/60">developer and artist making minecraft mods, tiny tools, and wallpapers with a quiet amount of care.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-coral">see my projects <ChevronRight size={16} /></a><a href="#gallery" className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white/50 px-5 py-3 text-sm font-semibold text-ink hover:border-coral hover:text-coral">browse the gallery <ImageIcon size={16} /></a></div></div><div className="float-slow relative rounded-[2rem] border border-ink/10 bg-blush p-5 shadow-soft"><div className="absolute -right-3 -top-3 grid h-14 w-14 rotate-6 place-items-center rounded-2xl bg-yellow text-ink shadow-soft"><Sparkles size={22} /></div><div className="overflow-hidden rounded-[1.4rem] bg-paper"><img src={asset('/assets/dragona_cute.png')} alt="cute dragon artwork" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div><div className="flex items-center justify-between px-2 pb-1 pt-5 text-sm"><span className="font-semibold text-ink">a tiny corner of the internet</span><span className="text-ink/45">01 / 04</span></div></div></div><div className="mt-24 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-3"><Stat value="03" label="minecraft projects" /><Stat value="04" label="art pieces" /><Stat value=":3" label="moved by tea" /></div></main>
  const [wallpaper] = useState(() => homeWallpapers[Math.floor(Math.random() * homeWallpapers.length)])
  return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><div className="grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr] lg:pt-14"><div><div className="mb-7 flex items-center gap-3 text-sm text-ink/50"><span className="h-2 w-2 rounded-full bg-mint" /> currently building things & making art</div><h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.9] tracking-[-0.075em] text-ink sm:text-8xl">soft ideas,<br /><span className="text-coral">sharp tools.</span></h1><p className="mt-8 max-w-xl text-lg leading-8 text-ink/60">developer and artist making minecraft mods, tiny tools, and wallpapers with a quiet amount of care.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-coral">see my projects <ChevronRight size={16} /></a><a href="#gallery" className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white/50 px-5 py-3 text-sm font-semibold text-ink hover:border-coral hover:text-coral">browse the gallery <ImageIcon size={16} /></a></div></div><div className="float-slow relative rounded-[2rem] border border-ink/10 bg-blush p-5 shadow-soft"><div className="overflow-hidden rounded-[1.4rem] bg-paper"><img src={wallpaper[0]} alt={`${wallpaper[1]} wallpaper`} className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div><div className="flex items-center justify-between px-2 pb-1 pt-5 text-sm"><span className="font-semibold text-ink">{wallpaper[1]}</span><span className="text-ink/45">a tiny corner of the internet</span></div></div></div><div className="mt-24 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-3"><Stat value={projectCount ?? '...'} label="projects" /><Stat value={artCount ?? '...'} label="art pieces" /><Stat value=":3" label="moved by tea" /></div></main>
}

function Stat({ value, label }) { return <div><p className="font-display text-3xl font-bold tracking-tight text-ink">{value}</p><p className="mt-1 text-sm text-ink/50">{label}</p></div> }

function ProjectCard({ project, type }) {
  const isGithub = type === 'github'
  const title = isGithub ? project.name : project.title
  const description = isGithub ? (project.description || 'a github project by pxdritz1.') : (project.description || 'a project published on modrinth.')
  const link = isGithub ? project.html_url : `https://modrinth.com/project/${project.slug}`
  const icon = isGithub ? null : project.icon_url
  return <article className="card-enter group flex flex-col rounded-3xl border border-ink/10 bg-white/60 p-5 shadow-soft transition-transform hover:-translate-y-1"><div className="mb-8 flex items-start justify-between"><div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-mint/20 text-coral">{icon ? <img src={icon} alt="" className="h-full w-full object-cover" /> : <Code2 size={25} />}</div><span className="rounded-full bg-mint/20 px-2.5 py-1 font-mono text-xs text-ink/50">{isGithub ? 'github' : 'modrinth'}</span></div><h2 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-ink/55">{description}</p>{isGithub && project.commits?.length > 0 && <div className="mt-5 border-t border-ink/10 pt-4"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-coral">recent commits</p><ul className="space-y-1.5">{project.commits.map((commit) => <li key={commit.sha} className="truncate text-xs text-ink/50">{commit.commit.message.split('\n')[0]}</li>)}</ul></div>}<div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4 text-xs"><span className="text-ink/45">{isGithub ? `${project.stargazers_count} stars` : (project.downloads ? `${project.downloads.toLocaleString()} downloads` : 'published project')}</span><a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-coral">open <ExternalLink size={13} /></a></div></article>
}

function DynamicProjects({ data }) {
  if (data.loading) return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="selected work" title="projects, but make them useful." copy="loading projects and recent commits..." /><div className="grid gap-4 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-64 animate-pulse rounded-3xl bg-ink/5" />)}</div></main>
  return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="selected work" title="projects, but make them useful." copy="everything published on modrinth and github, kept fresh through their public apis." />{data.error && <p className="mb-6 rounded-2xl bg-coral/10 p-4 text-sm text-ink/60">some live project data could not be loaded right now.</p>}<section><h2 className="mb-4 font-display text-2xl font-bold text-ink">modrinth</h2><div className="grid gap-4 lg:grid-cols-3">{data.modrinth.map((project) => <ProjectCard key={project.id} project={project} type="modrinth" />)}</div></section><section className="mt-12"><h2 className="mb-4 font-display text-2xl font-bold text-ink">github</h2><div className="grid gap-4 lg:grid-cols-3">{data.github.map((project) => <ProjectCard key={project.id} project={project} type="github" />)}</div></section><div className="mt-4 grid gap-4 md:grid-cols-2"><SmallProject icon={<BriefcaseBusiness size={20} />} title="edonme studios" copy="coordination, process, and digital project delivery." link="https://edonme.dev" /><SmallProject icon={<Code2 size={20} />} title="tools & scripts" copy="python utilities and automation for better workflows." link={`https://github.com/${githubUser}`} /></div></main>
}

function Projects() {
  return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="selected work" title="projects, but make them useful." copy="small tools and minecraft things, built for people who like their games cozy and their fps high." /><div className="grid gap-4 lg:grid-cols-3">{projects.map(([icon, title, copy, link], index) => <article key={title} className="card-enter group flex flex-col rounded-3xl border border-ink/10 bg-white/60 p-5 shadow-soft transition-transform hover:-translate-y-1"><div className="mb-8 flex items-start justify-between"><img src={icon} alt="" className="h-14 w-14 rounded-2xl" /><span className="font-mono text-xs text-ink/35">0{index + 1}</span></div><h2 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-ink/55">{copy}</p><div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4 text-xs"><span className="rounded-full bg-mint/30 px-2.5 py-1 text-ink/65">fabric / modrinth</span><a href={`https://${link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-coral">open <ExternalLink size={13} /></a></div></article>)}</div><div className="mt-4 grid gap-4 md:grid-cols-2"><SmallProject icon={<BriefcaseBusiness size={20} />} title="edonme studios" copy="coordination, process, and digital project delivery." link="https://edonme.dev" /><SmallProject icon={<Code2 size={20} />} title="tools & scripts" copy="python utilities and automation for better workflows." link={`https://github.com/${githubUser}`} /></div></main>
}

function SmallProject({ icon, title, copy, link }) { return <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-3xl border border-ink/10 bg-yellow/25 p-5 hover:bg-yellow/45"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-yellow text-ink">{icon}</span><span className="flex-1"><strong className="font-display text-lg text-ink">{title}</strong><span className="mt-1 block text-sm text-ink/50">{copy}</span></span><ArrowUpRight size={18} className="text-ink/40" /></a> }

function Gallery() {
  const [selected, setSelected] = useState(null)
  useEffect(() => { const close = (event) => event.key === 'Escape' && setSelected(null); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  return <main className="page-enter mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="visual notes" title="a little gallery of things." copy="wallpapers, commissions, and experiments. click around, there are nice pixels hiding here." /><div className="columns-1 gap-4 sm:columns-2">{galleryItems.filter(([src]) => !src.endsWith('/cujos.png')).map(([src, title, type]) => <button key={src} onClick={() => setSelected({ src, title })} className="card-enter group relative mb-4 block w-full overflow-hidden rounded-3xl border border-ink/10 bg-blush text-left shadow-soft"><img src={src} alt={title} className="w-full transition duration-500 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-5 pt-14 text-white"><span><strong className="block font-display text-xl">{title}</strong><small className="text-white/65">{type}</small></span><ImageIcon size={18} /></span></button>)}</div>{selected && <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4" onClick={() => setSelected(null)}><button className="absolute right-5 top-5 rounded-xl bg-white/10 p-3 text-white" aria-label="close image"><X size={22} /></button><img src={selected.src} alt={selected.title} className="max-h-[88vh] max-w-full rounded-2xl object-contain" onClick={(event) => event.stopPropagation()} /></div>}</main>
}

function About({ avatar }) {
  return <main className="mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="a bit about me" title="curious by default." copy="i like simple solutions, elegant code, and visual details that feel a little alive." /><div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><div className="rounded-3xl bg-profile p-6 text-ink shadow-soft"><Avatar src={avatar} className="h-24 w-24 rounded-[1.5rem] object-cover ring-4 ring-coral" /><p className="mt-12 font-display text-3xl font-bold leading-tight">hello, i'm pxdritz<span className="text-coral">.</span></p><p className="mt-4 text-sm leading-6 text-ink/60">coo at edonme studios, maker of mods, tools, and art.</p></div><div className="rounded-3xl border border-ink/10 bg-white/60 p-6 sm:p-8"><p className="max-w-2xl text-lg leading-8 text-ink/70">i work with <strong className="text-ink">java</strong>, <strong className="text-ink">python</strong>, and <strong className="text-ink">lua</strong> to make minecraft mods and useful little tools. i also make wallpapers and commissioned artwork when the right idea comes along.</p><div className="mt-8 rounded-2xl bg-mint/20 p-4"><p className="font-mono text-xs uppercase tracking-[0.18em] text-coral">minecraft pvp era</p><p className="mt-2 text-sm leading-6 text-ink/65">i was a frequent minecraft 1.8.9 pvp player, known on NameMC as <strong className="text-ink">pxdritz</strong>.</p><a href="https://namemc.com/profile/pxdritz" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coral">view NameMC <ExternalLink size={13} /></a></div><div className="mt-8"><p className="mb-4 font-display text-lg font-bold text-ink">languages & tools</p><div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-paper p-4">{languages.map(([name, link]) => <a key={name} href={link} target="_blank" rel="noreferrer" className="rounded-xl p-1 transition hover:-translate-y-1 hover:bg-ink/5" title={`learn more about ${name}`}><img src={`https://skillicons.dev/icons?i=${name}`} alt={name} className="h-10 w-10" /></a>)}<a href="https://fabricmc.net/" target="_blank" rel="noreferrer" className="rounded-xl p-1 transition hover:-translate-y-1 hover:bg-ink/5" title="learn more about fabric"><img src="https://docs.fabricmc.net/logo.png" alt="fabric" className="h-10 w-auto" /></a></div></div></div></div></main>
}

function Contact() {
  const links = [['discord', 'pxotitas', 'chat, commissions, friendly hellos', <MessageCircle size={21} />, 'https://discord.com/users/pxotitas'], ['github', 'pxdritz1', 'code, experiments, and public things', <Code2 size={21} />, `https://github.com/${githubUser}`], ['modrinth', 'pxotitas', 'mods and modpacks', <Code2 size={21} />, 'https://modrinth.com/user/pxotitas'], ['ko-fi', 'pxdritz1', 'support the little studio', <Sparkles size={21} />, 'https://ko-fi.com/pxdritz1'], ['server', "px's server", 'a brazilian community for friends and minecraft', <MessageCircle size={21} />, 'https://discord.gg/fMkj87H2ds'], ['server', "code's café", 'a brazilian programming and tech community', <MessageCircle size={21} />, 'https://discord.gg/BDKNDHvjrD'], ['server', 'servidor dos programadores', 'a brazilian server for people who code', <MessageCircle size={21} />, 'https://discord.gg/programador']]
  return <main className="mx-auto max-w-6xl px-4 pb-4 pt-20"><PageIntro eyebrow="say hello" title="let's make something nice." copy="for commissions, collaborations, or just a friendly wave, discord is the fastest way to find me." /><div className="grid gap-3 sm:grid-cols-2">{links.map(([name, handle, copy, icon, link], index) => <a key={`${name}-${handle}-${index}`} href={link} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-3xl border border-ink/10 bg-white/60 p-5 hover:border-coral hover:bg-blush"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow text-ink">{icon}</span><span className="flex-1"><strong className="font-display text-lg text-ink">{name} / {handle}</strong><span className="mt-1 block text-sm text-ink/50">{copy}</span></span><ArrowUpRight size={18} className="text-ink/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}</div><div className="mt-8 flex items-start gap-3 rounded-3xl border border-dashed border-coral/35 bg-coral/5 p-5 text-sm leading-6 text-ink/55"><MessageCircle size={18} className="mt-1 shrink-0 text-coral" /><span>all three servers above are brazilian communities. portuguese is the main language, and most people can also speak english.</span></div><div className="mt-4 flex items-center gap-3 rounded-3xl border border-dashed border-coral/35 bg-coral/5 p-5 text-sm text-ink/55"><Mail size={18} className="text-coral" /> usually replies within a few hours, give or take a snack break.</div></main>
}

function App() {
  const route = useRoute()
  const projectData = useProjectData()
  const [avatar, setAvatar] = useState(fallbackAvatar)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { fetch(`https://api.github.com/users/${githubUser}`).then((response) => response.ok ? response.json() : Promise.reject()).then((user) => user.avatar_url && setAvatar(user.avatar_url)).catch(() => {}) }, [])
  const projectCount = projectData.loading ? null : projectData.modrinth.length + projectData.github.length
  const artCount = galleryItems.filter(([src]) => !src.endsWith('/cujos.png')).length
  const page = route === 'projects' ? <DynamicProjects data={projectData} /> : route === 'gallery' ? <Gallery /> : route === 'about' ? <About avatar={avatar} /> : route === 'contact' ? <Contact /> : <Home avatar={avatar} projectCount={projectCount} artCount={artCount} />
  return <div className="min-h-screen overflow-hidden"><div className="pointer-events-none fixed inset-0 -z-10 bg-paper"><div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-yellow/30 blur-3xl dark:hidden" /><div className="absolute -right-24 top-[28rem] h-96 w-96 rounded-full bg-coral/10 blur-3xl dark:hidden" /></div><Header avatar={avatar} dark={dark} setDark={setDark} />{page}<Footer avatar={avatar} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)