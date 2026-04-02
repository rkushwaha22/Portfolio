import { useEffect, useState } from 'react';
import './Hero.css';
import Typed from 'typed.js';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL

export default function Hero() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/hero`)
            .then(res => {
                setHero(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (hero?.roles) {
            const typed = new Typed("#element", {
                strings: hero.roles,
                typeSpeed: 60,
                backSpeed: 30,
                loop: true,
            });
            return () => typed.destroy();
        }
    }, [hero]);

    // if (!hero) return null;


    return (
        <section className="hero-modern-section" id="home">

            {
                loading ? (
                    <p>Loading Data...</p>
                ) : hero ? (

                    <div className="hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">Available for Projects</span>
                            <h1 className="hero-title">
                                Hi, I'm <span className="coral-text">{hero.name}</span>
                            </h1>

                            <div className="typed-container">
                                <span id="element"></span>
                            </div>

                            <p className="hero-subtitle">
                                {hero.subtitle}
                            </p>

                            <div className="hero-actions">

                                {/* Download CV Button */}
                                {/* <a href="/Resume.pdf"
                            download="My_Resume.pdf" // Isse click karte hi file download hogi
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="btn-primary">Download CV</button>
                        </a> */}

                                <a href="https://forms.gle/8ck5s1SCwDcwWyhZA" target="_blank" rel="noreferrer">
                                    <button className="btn-primary">Get In Touch</button>
                                </a>

                                <div className="hero-socials">
                                    <a href={hero.social.facebook} target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                                    <a href={hero.social.instagram} target="_blank"><i className="fa-brands fa-instagram"></i></a>
                                    <a href={hero.social.linkedin} target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>

                           <div className="hero-visual">
                            <div className="image-wrapper">
                                {/* Glowing Background */}
                                <div className="glow-ring"></div>

                                <img
                                    src={
                                        hero.image?.startsWith('http')
                                            ? hero.image
                                            : `${BASE_URL}${hero.image?.startsWith('/') ? '' : '/'}${hero.image}`.replace(/([^:]\/)\/+/g, "$1")
                                    }
                                    alt={hero.name}
                                    className="hero-img-3d"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/500?text=Developer+Photo";
                                    }}
                                />

                                {/* 3D Floating Bento Card */}
                                <div className="floating-card">
                                    <span className="dot"></span>{hero.experience}
                                </div>
                            </div>
                        </div>                    

                    </div>
                 ) : (
                    <p>Failed to load profile data. Please try again later.</p>
                )} 

        </section>
    );
}


































