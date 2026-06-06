import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  return (
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
          <p>&copy; {new Date().getFullYear()} Alessandro. Built with React & TypeScript.</p>
        </div>
      </footer>
    </div>
  )
}
