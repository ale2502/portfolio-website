import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const drawerLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Me' },
  { to: '/contact', label: 'Contact' },
];

export default function NavDrawer() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (location.pathname === '/') return null;

  return (
    <>
      <button
        className={`hamburger-btn ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.nav
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <ul className="drawer-links">
                {drawerLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} onClick={() => setDrawerOpen(false)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
