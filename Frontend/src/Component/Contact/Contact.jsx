import React from 'react';
import "./Contact.css";
import axios from "axios"
import { useState } from 'react';
import { useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_API_URL


export default function Contact() {

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await axios.post(`${BASE_URL}/api/contact-msg`, formData);

      alert("Message sent ✅");

      // reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/api/contact-info`)
      .then(res => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });


  }, [])


  return (
    <section id="modern-contact-section">
      <div className="contact-glow"></div>

      <div className="contact-wrapper">
        <header className="contact-header">
          <h1>Work <span>Together</span></h1>
          <p>Have a project in mind? Let's build something extraordinary.</p>
        </header>
        {
          loading ? (
            <p>Loading Contact information..... </p>
          ) : (

            <div className="contact-grid">
              {/* Info Side */}
              <div className="contact-info-card">
                <h2>Contact Information</h2>
                <p>{info.description}</p>

                <div className="info-links">
                  <div className="info-item">
                    <div className="icon-box"><i className="fa-solid fa-location-dot"></i></div>
                    <div className="text-box">
                      <label>Location</label>
                      <span>{info.location}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="icon-box"><i className="fa-solid fa-phone"></i></div>
                    <div className="text-box">
                      <label>Phone</label>
                      <span>{info.phone}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                    <div className="text-box">
                      <label>Email</label>
                      <span>{info.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="contact-form-card">
                <form className="modern-form" onSubmit={formHandler}>
                  <div className="input-group">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required placeholder=" " />
                    <label htmlFor="name">Full Name</label>
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required placeholder=" " />
                    <label htmlFor="email">Email Address</label>
                  </div>

                  <div className="input-group">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required placeholder=" ">
                    </textarea>

                    <label htmlFor="message">Your Message</label>
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Send Message</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

          )}
      </div>
    </section>
  );
}



