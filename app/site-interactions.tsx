'use client';

import { useEffect } from 'react';

const WHATSAPP_NUMBER = '6285727058005';

export default function SiteInteractions() {
  useEffect(() => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navMenu = document.getElementById('navMenu');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    if (!menuToggle || !sidebar || !navMenu || !sidebarBackdrop) return;

    const setSidebar = (open: boolean) => {
      sidebar.classList.toggle('open', open);
      sidebarBackdrop.classList.toggle('visible', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
      document.body.classList.toggle('sidebar-open', open);
    };

    const onMenuToggle = () => setSidebar(menuToggle.getAttribute('aria-expanded') !== 'true');
    const onBackdrop = () => setSidebar(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebar(false);
    };
    menuToggle.addEventListener('click', onMenuToggle);
    sidebarBackdrop.addEventListener('click', onBackdrop);
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', onBackdrop));
    document.addEventListener('keydown', onKeyDown);

    const filterHandlers: Array<() => void> = [];
    const registerFilters = (
      buttonSelector: string,
      categorySelector: string,
      dataAttribute: 'rawFilter' | 'cookedFilter',
      cardAttribute: 'rawCategory' | 'cookedCategory',
    ) => {
      document.querySelectorAll<HTMLButtonElement>(buttonSelector).forEach((button) => {
        const handler = () => {
          document.querySelectorAll(buttonSelector).forEach((item) => item.classList.remove('active'));
          button.classList.add('active');
          const filter = button.dataset[dataAttribute] || 'all';
          document.querySelectorAll<HTMLElement>(categorySelector).forEach((card) => {
            card.classList.toggle('is-hidden', filter !== 'all' && card.dataset[cardAttribute] !== filter);
          });
        };
        button.addEventListener('click', handler);
        filterHandlers.push(() => button.removeEventListener('click', handler));
      });
    };

    registerFilters('[data-raw-filter]', '[data-raw-category]', 'rawFilter', 'rawCategory');
    registerFilters('[data-cooked-filter]', '[data-cooked-category]', 'cookedFilter', 'cookedCategory');

    const productHandlers: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>('[data-product]').forEach((link) => {
      const handler = (event: Event) => {
        if (!link.classList.contains('product-link') && !link.classList.contains('product-arrow')) return;
        event.preventDefault();
        const product = link.dataset.product || 'produk ikan';
        const message = `Halo UD Pratama Mulya, saya ingin bertanya tentang ${product}. Mohon informasi spesifikasi, harga, dan minimum pemesanan.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      };
      link.addEventListener('click', handler);
      productHandlers.push(() => link.removeEventListener('click', handler));
    });

    const motionHandlers: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>('.button, .nav-cta, .filter-btn, .product-arrow').forEach((control) => {
      const handler = (event: MouseEvent) => {
        control.classList.remove('tap-pulse');
        void control.offsetWidth;
        control.classList.add('tap-pulse');
        window.setTimeout(() => control.classList.remove('tap-pulse'), 420);
        const rect = control.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.6;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        control.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 600);
      };
      control.addEventListener('click', handler);
      motionHandlers.push(() => control.removeEventListener('click', handler));
    });

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');
    const sectionIds = ['beranda', 'tentang', 'produk', 'olahan', 'proses', 'kontak'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      sections.forEach((section) => observer?.observe(section));
    }

    return () => {
      menuToggle.removeEventListener('click', onMenuToggle);
      sidebarBackdrop.removeEventListener('click', onBackdrop);
      navMenu.querySelectorAll('a').forEach((link) => link.removeEventListener('click', onBackdrop));
      document.removeEventListener('keydown', onKeyDown);
      filterHandlers.forEach((cleanup) => cleanup());
      productHandlers.forEach((cleanup) => cleanup());
      motionHandlers.forEach((cleanup) => cleanup());
      observer?.disconnect();
    };
  }, []);

  return null;
}
