import logo from '../assets/images/logo-small.jpg';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ scrollToHomePage, scrollToWhyDonateSection, scrollToHowItWorksSection }) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand ms-5" href="#home">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          Punah-Luga
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav justify-content-center w-100">
            <li className="nav-item mx-5">
              <Link className="nav-link" to="/" onClick={scrollToHomePage}>Home</Link>
            </li>
            <li className="nav-item mx-5">
              <Link className="nav-link" to="/about_us">About Us</Link>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link" href="#" onClick={scrollToWhyDonateSection}>Why Donate Clothes</a>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link" href="#" onClick={scrollToHowItWorksSection}>How it works</a>
            </li>
            <li className="nav-item mx-5">
            <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
