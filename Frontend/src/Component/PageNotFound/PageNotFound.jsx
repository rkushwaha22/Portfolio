import React from 'react'
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "80px", color: "#ff6b6b", margin: 0 }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>Bhai, lagta hai aap galat raste par aa gaye ho.</p>
      <Link 
        to="/" 
        style={{ 
          display: "inline-block", 
          marginTop: "20px", 
          padding: "10px 20px", 
          background: "#007bff", 
          color: "white", 
          textDecoration: "none", 
          borderRadius: "5px" 
        }}
      >
        Wapas Home Par Chalo
      </Link>
    </div>
  )
}
