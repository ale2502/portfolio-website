import { Link } from 'react-router-dom';

export default function BackHome() {
  return (
    <Link to="/" className="back-home-link">
      <svg>
        <use href="/icons.svg#arrow-left-icon" />
      </svg>
      Home
    </Link>
  );
}
