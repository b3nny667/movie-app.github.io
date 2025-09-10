import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaStar, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import '../css/Nav.css';

function Nav({ isLoggedIn, onLogout, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const username = user?.email ? user.email.split('@')[0] : 'My Account';

  const handleGenreClick = (genre) => {
    navigate(`/?genre=${genre}`);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar-horizontal">
      <div className="nav-left">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
        <span className="site-title" style={{ whiteSpace: 'nowrap' }}>Place of Dreams</span>
      </div>

      <ul className={`nav-list-horizontal ${mobileMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li className="nav-item dropdown">
          <span className="nav-button">Genres ▾</span>
          <ul className="dropdown-content">
            <li onClick={() => handleGenreClick("Action")}>Action</li>
            <li onClick={() => handleGenreClick("Comedy")}>Comedy</li>
            <li onClick={() => handleGenreClick("Drama")}>Drama</li>
            <li onClick={() => handleGenreClick("Horror")}>Horror</li>
            <li onClick={() => handleGenreClick("Sci-Fi")}>Sci-Fi</li>
          </ul>
        </li>

        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/favorites" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                <FaStar size={14} style={{ marginRight: '6px' }} />
                Favorites
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/watched" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                <FaUser size={16} className="user-icon" />
                <span>{username}</span>
              </Link>
            </li>

            <li className="nav-item">
              <button onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }} className="nav-button">
                Sign out
              </button>
            </li>
            
            <li className="nav-item theme-toggle-item">
              <button 
                className="theme-toggle nav-button"
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/register" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign" className="nav-button" onClick={() => setMobileMenuOpen(false)}>
                Sign in
              </Link>
            </li>
            <li className="nav-item theme-toggle-item">
              <button 
                className="theme-toggle nav-button"
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;