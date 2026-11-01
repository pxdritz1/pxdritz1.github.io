(() => {
  'use strict';

  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverPreference = window.matchMedia('(hover: hover) and (pointer: fine)');
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let reducedMotion = motionPreference.matches;

  root.classList.add('js-motion');
  root.dataset.motion = reducedMotion ? 'reduced' : 'full';

  const toast = $('#toast');
  let toastTimer;
  function announce(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.hidden = true;
    }, 2800);
  }

  // The distance field gives the active icon and its neighbours one shared spring.
  const dock = $('#dock');
  const dockItems = dock ? $$('.dock-item', dock) : [];
  const dockCaption = $('#dock-caption');
  const defaultDockCaption = dockCaption?.textContent.trim() || 'A few things in my orbit.';
  const dockStates = dockItems.map(() => ({ scale: 1, lift: 0, shift: 0 }));
  let dockPointerX = null;
  let focusedDockItem = null;
  let activeDockItem = null;
  let dockFrame = 0;
  let lastDockTime = 0;
  let dockCenters = [];

  function setDockCaption(item) {
    if (activeDockItem === item) return;
    activeDockItem = item;
    dockItems.forEach((entry) => entry.classList.toggle('is-active', entry === item));
    if (!dockCaption) return;
    dockCaption.textContent = item
      ? item.dataset.description || item.dataset.name || defaultDockCaption
      : defaultDockCaption;
  }

  function getDockCenters() {
    if (!dock) return [];
    const dockLeft = dock.getBoundingClientRect().left;
    return dockItems.map((item) => {
      // offsetLeft remains stable while transforms enlarge and lift the icon.
      let localLeft = item.offsetLeft;
      let parent = item.offsetParent;
      while (parent && parent !== dock) {
        localLeft += parent.offsetLeft;
        parent = parent.offsetParent;
      }
      if (parent !== dock) {
        const state = dockStates[dockItems.indexOf(item)];
        return item.getBoundingClientRect().left + item.getBoundingClientRect().width / 2 - state.shift;
      }
      return dockLeft + localLeft + item.offsetWidth / 2;
    });
  }

  function animateDock(timestamp) {
    dockFrame = 0;
    const elapsed = lastDockTime ? Math.min(40, timestamp - lastDockTime) : 16.67;
    lastDockTime = timestamp;
    const blend = 1 - Math.exp(-elapsed / 52);
    const centers = dockCenters.length ? dockCenters : (dockCenters = getDockCenters());
    const focusedIndex = dockItems.indexOf(focusedDockItem);
    const targetX = dockPointerX ?? (focusedIndex >= 0 ? centers[focusedIndex] : null);
    const canMagnify = !reducedMotion && hoverPreference.matches;
    const scales = centers.map((center) => {
      const distance = targetX === null ? Infinity : Math.abs(center - targetX);
      const influence = distance < 190 ? Math.exp(-(distance ** 2) / (2 * 54 ** 2)) : 0;
      return canMagnify ? 1 + 0.32 * influence : 1;
    });
    const extraWidths = scales.map((scale, index) => (scale - 1) * dockItems[index].offsetWidth);
    const totalExtra = extraWidths.reduce((sum, value) => sum + value, 0);
    let leftExtra = 0;
    let unsettled = false;

    dockItems.forEach((item, index) => {
      const state = dockStates[index];
      const scale = scales[index];
      const lift = -37.5 * (scale - 1);
      const shift = (2 * leftExtra + extraWidths[index] - totalExtra) / 2;
      leftExtra += extraWidths[index];
      const targets = { scale, lift, shift };
      for (const key of ['scale', 'lift', 'shift']) {
        const delta = targets[key] - state[key];
        state[key] = reducedMotion || Math.abs(delta) < 0.002 ? targets[key] : state[key] + delta * blend;
        if (Math.abs(targets[key] - state[key]) > 0.002) unsettled = true;
      }
      const transform = `translate(${state.shift.toFixed(3)}px, ${state.lift.toFixed(3)}px) scale(${state.scale.toFixed(4)})`;
      if (item.style.transform !== transform) item.style.transform = transform;
    });
    if (unsettled) dockFrame = window.requestAnimationFrame(animateDock);
    else lastDockTime = 0;
  }

  function queueDock() {
    if (!dockFrame && dockItems.length) dockFrame = window.requestAnimationFrame(animateDock);
  }

  dock?.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    dockPointerX = event.clientX;
    const item = event.target.closest('.dock-item');
    if (item && dock.contains(item)) setDockCaption(item);
    queueDock();
  });
  dock?.addEventListener('pointerleave', () => {
    dockPointerX = null;
    setDockCaption(focusedDockItem);
    queueDock();
  });
  dockItems.forEach((item) => {
    item.addEventListener('focus', () => {
      focusedDockItem = item;
      dockPointerX = null;
      setDockCaption(item);
      queueDock();
    });
    item.addEventListener('blur', () => {
      focusedDockItem = null;
      if (dockPointerX === null) setDockCaption(null);
      queueDock();
    });
    item.addEventListener('click', () => setDockCaption(item));
  });
  window.addEventListener('resize', () => {
    dockCenters = [];
    queueDock();
  }, { passive: true });

  // Chapter changes preserve a readable foreground and move the page's colour field.
  const chapters = $$('[data-chapter][data-bg]');
  const sectionLinks = $$('[data-section-link]');
  let chapterFrame = 0;
  let currentChapter = null;
  function updateChapters() {
    chapterFrame = 0;
    const readingLine = window.innerHeight * 0.4;
    const active = chapters.reduce((last, section) => (
      section.getBoundingClientRect().top <= readingLine ? section : last
    ), chapters[0]);
    const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
    root.style.setProperty('--scroll-progress', clamp(window.scrollY / scrollable, 0, 1).toFixed(4));
    if (!active || active === currentChapter) return;
    currentChapter = active;
    document.body.style.setProperty('--page-bg', active.dataset.bg);
    document.body.dataset.chapter = active.dataset.chapter || active.id;
    if (active.dataset.inkColor) document.body.style.setProperty('--page-ink', active.dataset.inkColor);
    chapters.forEach((section) => section.classList.toggle('is-active', section === active));
    sectionLinks.forEach((link) => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function queueChapters() {
    if (!chapterFrame) chapterFrame = window.requestAnimationFrame(updateChapters);
  }
  window.addEventListener('scroll', queueChapters, { passive: true });
  window.addEventListener('resize', queueChapters, { passive: true });
  updateChapters();

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!link.hash || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return;
      let target;
      try { target = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', link.hash);
    });
  });

  // Menus remain normal buttons/links, with the expanded state exposed to assistive tools.
  const menuToggle = $('#menu-toggle');
  const menu = $('#site-menu');
  const workToggle = $('#work-menu-toggle');
  const workMenu = $('#work-submenu');
  function setWorkMenu(open) {
    if (!workToggle || !workMenu) return;
    workToggle.setAttribute('aria-expanded', String(open));
    workMenu.hidden = !open;
  }
  function setMenu(open, returnFocus = false) {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    root.classList.toggle('menu-open', open);
    if (!open) setWorkMenu(false);
    if (returnFocus) menuToggle.focus({ preventScroll: true });
  }
  function closeMenu(returnFocus = false) { setMenu(false, returnFocus); }
  menuToggle?.addEventListener('click', () => setMenu(menu?.hidden ?? false));
  workToggle?.addEventListener('click', () => setWorkMenu(workMenu?.hidden ?? false));
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) closeMenu();
  });
  document.addEventListener('pointerdown', (event) => {
    if (!menu?.hidden && !menu?.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
    if (!workMenu?.hidden && !workMenu?.contains(event.target) && !workToggle?.contains(event.target)) setWorkMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (workMenu && !workMenu.hidden) {
      setWorkMenu(false);
      workToggle?.focus();
    } else if (menu && !menu.hidden) closeMenu(true);
  });

  const filterButtons = $$('[data-filter]');
  const projects = $$('[data-project][data-category]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((entry) => {
        const selected = entry === button;
        entry.setAttribute('aria-pressed', String(selected));
        entry.classList.toggle('is-active', selected);
      });
      projects.forEach((project) => {
        const categories = project.dataset.category.split(/\s+/);
        project.hidden = filter !== 'all' && !categories.includes(filter);
      });
      queueChapters();
    });
  });

  const artDialog = $('#art-dialog');
  const dialogImage = $('#dialog-image');
  const dialogTitle = $('#dialog-title');
  const dialogDownload = $('#dialog-download');
  let artOpener = null;
  let previousOverflow = '';
  function closeArt() {
    if (!artDialog?.open) return;
    if (typeof artDialog.close === 'function') artDialog.close();
    else {
      artDialog.removeAttribute('open');
      document.body.style.overflow = previousOverflow;
      artOpener?.focus({ preventScroll: true });
    }
  }
  $$('[data-art]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!artDialog || !dialogImage || !button.dataset.src) return;
      artOpener = button;
      previousOverflow = document.body.style.overflow;
      const title = button.dataset.title || 'Artwork by Chloe';
      dialogImage.alt = title;
      artDialog.dataset.state = 'loading';
      dialogImage.onload = () => { artDialog.dataset.state = 'ready'; };
      dialogImage.onerror = () => {
        artDialog.dataset.state = 'error';
        announce('This image could not be loaded. Please try another artwork.');
      };
      dialogImage.src = button.dataset.src;
      if (dialogTitle) dialogTitle.textContent = title;
      if (dialogDownload) {
        dialogDownload.href = button.dataset.src;
        dialogDownload.download = button.dataset.src.split('/').pop();
      }
      if (!artDialog.open) {
        if (typeof artDialog.showModal === 'function') artDialog.showModal();
        else artDialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    });
  });
  $$('[data-close-dialog]').forEach((button) => button.addEventListener('click', closeArt));
  artDialog?.addEventListener('click', (event) => {
    if (event.target !== artDialog) return;
    const bounds = artDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeArt();
  });
  artDialog?.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    artOpener?.focus({ preventScroll: true });
  });

  async function copyText(value) {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch { /* Older browser permissions can still permit the selection fallback. */ }
    }
    const field = document.createElement('textarea');
    const focused = document.activeElement;
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    focused?.focus({ preventScroll: true });
    return copied;
  }
  $$('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      if (!value) return;
      const copied = await copyText(value);
      button.classList.toggle('is-copied', copied);
      announce(copied ? `Copied ${value}` : `Copy this handle: ${value}`);
      window.setTimeout(() => button.classList.remove('is-copied'), 1800);
    });
  });

  const shuffleButton = $('#shuffle-art');
  const heroImage = $('#hero-image');
  const heroArt = $('.hero-art');
  const heroImages = [
    { src: 'assets/jolyne-butterfly-aesthetic.png', alt: 'Jolyne and butterflies, artwork by Chloe' },
    { src: 'assets/jolyne.png', alt: 'Jolyne, artwork by Chloe' },
    { src: 'assets/cujos.png', alt: 'JoJo character study, artwork by Chloe' },
  ];
  let heroIndex = 0;
  let heroLoad = 0;
  shuffleButton?.addEventListener('click', () => {
    if (!heroImage) return;
    const next = (heroIndex + 1) % heroImages.length;
    const art = heroImages[next];
    const requestId = ++heroLoad;
    const preload = new Image();
    shuffleButton.setAttribute('aria-busy', 'true');
    preload.onload = () => {
      if (requestId !== heroLoad) return;
      heroIndex = next;
      heroImage.src = art.src;
      heroImage.alt = art.alt;
      const creditIndex = $('.credit-index');
      const creditTitle = $('.art-credit > span:last-child');
      if (creditIndex) creditIndex.textContent = `${String(next + 1).padStart(2, '0')} / 03`;
      if (creditTitle) creditTitle.textContent = ['Jolyne, through my lens.', 'Jolyne, in another light.', 'Cujos, a character study.'][next];
      shuffleButton.removeAttribute('aria-busy');
      if (!reducedMotion && typeof heroImage.animate === 'function') {
        heroImage.animate([
          { opacity: 0.3 },
          { opacity: 1 },
        ], { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    };
    preload.onerror = () => {
      if (requestId !== heroLoad) return;
      shuffleButton.removeAttribute('aria-busy');
      announce('This artwork could not be loaded. Please try again.');
    };
    preload.src = art.src;
  });

  const inkButtons = $$('button[data-ink]');
  inkButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (heroArt) heroArt.dataset.ink = button.dataset.ink;
      inkButtons.forEach((entry) => entry.setAttribute('aria-pressed', String(entry === button)));
    });
  });
  const tasteButtons = $$('[data-taste]');
  const tasteCaption = $('#taste-caption');
  tasteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (tasteCaption) tasteCaption.textContent = button.dataset.caption || button.textContent.trim();
      tasteButtons.forEach((entry) => {
        const selected = entry === button;
        entry.setAttribute('aria-pressed', String(selected));
        entry.classList.toggle('is-active', selected);
      });
    });
  });

  // Only opt in to entrance motion after the browser can reveal every observed item.
  const revealItems = $$('[data-reveal]');
  let revealObserver;
  function revealAll() {
    revealItems.forEach((item) => item.classList.add('is-revealed'));
    revealObserver?.disconnect();
  }
  if (!reducedMotion && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
    root.classList.add('reveal-ready');
  } else revealAll();

  // Pointer feedback is expressed through CSS variables so focus and press styles can coexist.
  const tactileItems = $$('[data-project], .hero-art, [data-tactile]');
  tactileItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      if (reducedMotion || !hoverPreference.matches || event.pointerType === 'touch') return;
      const bounds = item.getBoundingClientRect();
      const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
      item.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
      item.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
      item.style.setProperty('--tilt-x', `${((0.5 - y) * 3).toFixed(2)}deg`);
      item.style.setProperty('--tilt-y', `${((x - 0.5) * 3).toFixed(2)}deg`);
    });
    item.addEventListener('pointerleave', () => {
      item.style.setProperty('--tilt-x', '0deg');
      item.style.setProperty('--tilt-y', '0deg');
    });
  });
  motionPreference.addEventListener('change', (event) => {
    reducedMotion = event.matches;
    root.dataset.motion = reducedMotion ? 'reduced' : 'full';
    if (reducedMotion) {
      revealAll();
      tactileItems.forEach((item) => {
        item.style.setProperty('--tilt-x', '0deg');
        item.style.setProperty('--tilt-y', '0deg');
      });
    }
    queueDock();
  });
  hoverPreference.addEventListener('change', queueDock);
})();
