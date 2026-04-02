import React from "react";
import "./Project.css";
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/projects`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="modern-projects-section">
      <div className="project-container">
        <header className="project-header">
          <h1 className="section-title">Latest <span>Works</span></h1>
          <p>A collection of my recent development projects</p>
        </header>

        <div className="projects-grid">
          {loading ? (
            // Skeleton Loop: Loading ke waqt 4 project boxes dikhayega
            [1, 2, 3, 4].map((item) => (
              <div className="project-item skeleton-active" key={item}>
                <div className="project-image-box">
                  <div className="skeleton skeleton-project-img"></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project, idx) => (
              <div className="project-item" key={idx}>
                <div className="project-image-box">
                  <img
                    src={
                      project.image?.startsWith('http')
                        ? project.image
                        : `${BASE_URL}${project.image?.startsWith('/') ? '' : '/'}${project.image}`.replace(/([^:]\/)\/+/g, "$1")
                    }
                    alt={project.title}
                    className="project-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250?text=Project+Preview";
                    }}
                  />

                  {/* Modern Hover Overlay */}
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <span className="project-tag">{project.tag}</span>
                      <h2>{project.title}</h2>
                      <a href={project.link} className="project-link">
                        View Details <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
