import { NavLink, Outlet } from 'react-router-dom';
import CodeRain from './CodeRain';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  return (
    <div className="layout">
      <CodeRain />
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
  );
}
