import { useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import CodeRain from './CodeRain';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const smoothWrapperRef = useRef(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: '#smooth-content',
      smooth: 1.4,
      effects: true,
    });
  });
  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef}>
      <CodeRain />
      <div id="smooth-content">
        <div className="layout">
          <header className="header">
            <nav className="container nav">
              <span className="logo">Alessandro</span>
              <ul className="nav-links">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main>
            <Outlet />
          </main>
          <footer className="footer">
            <div className="container">
              <p>
                &copy; {new Date().getFullYear()} Alessandro. Built with React &
                TypeScript.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
