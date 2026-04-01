import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./All-Css/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <Sidebar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}












// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function AdminLayout() {

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar />
  
//       <main style={{ flex: 1, padding: "20px", background: "#f9f9f9" }}>
//         <Outlet /> {/* Child routes render yahin */}
//       </main>
//     </div>
//   );
// }

