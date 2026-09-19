(function() {
  'use strict';

  
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    if (!lightbox || !lightboxImg || !lightboxClose) return;

    document.querySelectorAll('.frame').forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-full');
        lightboxImg.src = src;
        lightboxImg.alt = btn.querySelector('img')?.alt || 'Image';
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  
  function initMobileMenu() {
    const btn = document.getElementById('nav-menu-btn');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      links.classList.toggle('open');
      const expanded = links.classList.contains('open');
      btn.setAttribute('aria-expanded', String(expanded));
    });

    
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  
  function initActiveNav() {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/+$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }

  
  async function initModrinth() {
    const container = document.getElementById('modrinth-projects');
    if (!container) return;

    container.innerHTML = Array(4).fill('<div class="skeleton" style="height:200px;"></div>').join('');

    try {
      const res = await fetch('https://api.modrinth.com/v2/user/pxotitas/projects');
      if (!res.ok) throw new Error('Failed to fetch Modrinth projects');
      const projects = await res.json();
      renderModrinthProjects(projects, container);
    } catch (err) {
      console.error(err);
      container.innerHTML = `
        <div class="text-center" style="grid-column: 1 / -1; padding: 3rem 1rem;">
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">Unable to load projects from Modrinth.</p>
          <a href="https://modrinth.com/user/pxotitas" target="_blank" rel="noopener" class="link">View on Modrinth →</a>
        </div>
      `;
    }
  }

  function renderModrinthProjects(projects, container) {
    container.innerHTML = '';

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project modrinth-card';

      const icon = project.icon_url
        ? `<img class="project-icon" src="${escapeHtml(project.icon_url)}" alt="${escapeHtml(project.title)}" loading="lazy">`
        : '';

      const categories = [
        ...(project.categories || []),
        ...(project.additional_categories || [])
      ].slice(0, 4);

      const tags = categories.map(c => `<span class="tag">${escapeHtml(c)}</span>`).join('');

      const description = project.description
        ? escapeHtml(project.description)
        : 'No description available.';

      const loaders = (project.loaders || []).map(l => escapeHtml(l)).join(', ');

      card.innerHTML = `
        ${icon}
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${description}</p>
          <div class="project-meta">
            ${loaders ? `<span class="tag">${loaders}</span>` : ''}
            ${tags}
          </div>
          <a href="https://modrinth.com/project/${escapeHtml(project.slug)}" target="_blank" rel="noopener" class="link">View project →</a>
        </div>
      `;

      container.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initMobileMenu();
    initActiveNav();
    initModrinth();
  });
})();