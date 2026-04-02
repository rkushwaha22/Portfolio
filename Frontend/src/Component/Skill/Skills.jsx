import React, { useEffect, useState } from 'react';
import "./Skills.css";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Skills() {
  const [active, setActive] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setActive(true), 300);
    axios.get(`${BASE_URL}/api/skills`)
      .then(res => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="modern-skills-section">
      <div className="bento-container">
        <header className="bento-header">
          <h2>Tech <span>Stack</span></h2>
          <p>Mastery in modern web technologies</p>
        </header>

        <div className="bento-grid">
          {loading ? (
            // Loading State: 6 Bento Skeleton Cards
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div className={`bento-card skeleton-active`} key={item}>
                <div className="card-content">
                  <div className="card-top">
                    <div className="skeleton skeleton-icon-sq"></div>
                    <div className="skeleton skeleton-circle-loader"></div>
                  </div>
                  <div className="skeleton skeleton-title-sm" style={{marginTop: '20px'}}></div>
                  <div className="tags" style={{marginTop: '10px', display: 'flex', gap: '5px'}}>
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            skills.map((skill, idx) => (
              <div className={`bento-card card-${idx}`} key={idx}>
                <div className="card-content">
                  <div className="card-top">
                    <span className="card-icon">{skill.icon}</span>
                    <div className="circle-box">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle"
                          style={{ strokeDasharray: active ? `${skill.percent}, 100` : "0, 100" }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="percentage">{skill.percent}%</span>
                    </div>
                  </div>
                  <h3>{skill.name}</h3>
                  <div className="tags">
                    {skill.items.map(item => <span key={item}>{item}</span>)}
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
