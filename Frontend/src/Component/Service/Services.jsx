import React, { useEffect, useState } from 'react';
import "./Service.css";
import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL
export default function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/services`)
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }, [])

    return (
        <section id="modern-services-section">
            <div className="services-container">
                <header className="services-header">
                    <h1 className="section-title">Specialized <span>Services</span></h1>
                    <p>Solutions tailored to your digital needs</p>
                </header>
                {
                    loading ? (
                        <p>Loding services.....</p>
                    ) : (

                        <div className="services-list-grid">
                            {services.map((service, index) => (
                                <div className="service-glass-card" key={service._id}>
                                    <div className="service-number">0{index + 1}</div>
                                    <div className="service-image-box">
                                        {/* <img src={service.image} alt={service.title} /> */}
                                        <img
                                            src={
                                                service.image?.startsWith('http')
                                                    ? service.image
                                                    : `${BASE_URL}/${service.image}`.replace(/([^:]\/)\/+/g, "$1")
                                            }
                                            alt={service.title}
                                            onError={(e) => {
                                                console.log("Service Image Error URL:", e.target.src);
                                                e.target.src = "https://via.placeholder.com/300?text=Service+Icon";
                                            }}
                                        />
                                    </div>
                                    <div className="service-info">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                    <div className="service-arrow">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </section>
    );
}

