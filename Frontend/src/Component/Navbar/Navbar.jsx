import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Navbar/Navbar.css"

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Change background when scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when link is clicked
    const closeMenu = () => setOpen(false);

    return (
        <>
            <nav className={`nav-container ${scrolled ? "nav-scrolled" : ""} ${open ? "nav-open" : ""}`}>
                <div className="nav-wrapper">
                    <div className="nav-logo">
                        <Link to="/" onClick={closeMenu}>
                            Rk<span>.</span>Portfolio
                        </Link>
                    </div>

                    <ul className={`nav-links ${open ? "active" : ""}`}>
                        <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""} onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/service" className={location.pathname === "/service" ? "active-link" : ""} onClick={closeMenu}>Services</Link></li>
                        <li><Link to="/project" className={location.pathname === "/project" ? "active-link" : ""} onClick={closeMenu}>Projects</Link></li>
                        <li><Link to="/skills" className={location.pathname === "/skills" ? "active-link" : ""} onClick={closeMenu}>Skills</Link></li>
                        <li><Link to="/contact" className="nav-cta" onClick={closeMenu}>Hire Me</Link></li>
                    </ul>

                    <div className={`nav-burger ${open ? "toggle" : ""}`} onClick={() => setOpen(!open)}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>
            <div className={`nav-overlay ${open ? "show" : ""}`} onClick={closeMenu}></div>
            <Outlet/>
        </>
    )
}

