import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Footer } from './components/Footer';
import { Navbar, RoutePath } from './components/Navbar';
import { PAGE_META, ServiceId } from './data/content';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';

function parseHashRoute(): RoutePath {
  const raw = window.location.hash.replace(/^#/, '');
  if (raw === '/about' || raw === '/services' || raw === '/contact') {
    return raw;
  }
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() => parseHashRoute());
  const [focusedService, setFocusedService] = useState<ServiceId | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const metaKey =
      route === '/about'
        ? 'about'
        : route === '/services'
          ? 'services'
          : route === '/contact'
            ? 'contact'
            : 'home';

    const meta = PAGE_META[metaKey];
    document.title = meta.title;

    const updateMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', 'name', 'description', meta.description);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  }, [route]);

  const navigate = useCallback((path: RoutePath, serviceFocus?: ServiceId) => {
    setFocusedService(serviceFocus ?? null);
    setRoute(path);
    const targetHash = `#${path}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    if (!serviceFocus) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#F4F2EC]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C8FF2E] focus:text-[#0B0C0E] focus:font-semibold focus:rounded-sm"
        >
          Skip to main content
        </a>

        <Navbar currentPath={route} onNavigate={(path) => navigate(path)} />

        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {route === '/' && <HomePage onNavigate={navigate} />}
              {route === '/about' && <AboutPage onNavigate={(path) => navigate(path)} />}
              {route === '/services' && (
                <ServicesPage focusedService={focusedService} onNavigate={navigate} />
              )}
              {route === '/contact' && <ContactPage preselectedService={focusedService} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={(path) => navigate(path)} />
      </div>
    </MotionConfig>
  );
}
