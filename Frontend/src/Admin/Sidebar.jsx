import { Link } from "react-router-dom";
import "./All-Css/Admin.css"; // Nayi CSS file banayenge

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin</h2>
        <button className="logout-btn-mobile" onClick={handleLogout}>Logout</button>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/admin/hero">Hero</Link></li>
        <li><Link to="/admin/services">Services</Link></li>
        <li><Link to="/admin/skills">Skills</Link></li>
        <li><Link to="/admin/projects">Projects</Link></li>
        <li><Link to="/admin/contact">Contact</Link></li>
        <li><Link to="/admin/contact-msg">Messages</Link></li>
      </ul>
      <button className="logout-btn-desktop" onClick={handleLogout}>Logout</button>
    </nav>
  );
}





















// import { Link } from "react-router-dom";

// export default function Sidebar() {

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken'); // Token uda do
//     window.location.href = '/login'; // Refresh karke login par bhej do
//   };

//   return (
//     <>
//       <nav style={{ width: "220px", background: "#222", color: "#fff", padding: "20px" }}>
//         <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>
//         <ul style={{
//           listStyle: "none",
//           padding: 0,
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px"
//         }}>
//           <li><Link to="/admin/hero" style={{ color: "#fff", textDecoration: "none" }}>Hero</Link></li>
//           <li><Link to="/admin/services" style={{ color: "#fff", textDecoration: "none" }}>Services</Link></li>
//           <li><Link to="/admin/skills" style={{ color: "#fff", textDecoration: "none" }}>Skills</Link></li>
//           <li><Link to="/admin/projects" style={{ color: "#fff", textDecoration: "none" }}>Projects</Link></li>
//           <li><Link to="/admin/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link></li>
//           <li><Link to="/admin/contact-msg" style={{ color: "#fff", textDecoration: "none" }}>Contact-msg</Link></li>
//         </ul>
//         <button style={{ position: "absolute", padding: "8px", top: "20px", right: "50px", background: "rgb(220, 53, 69)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleLogout}>Logout</button>
//       </nav>

//     </>
//   );
// }