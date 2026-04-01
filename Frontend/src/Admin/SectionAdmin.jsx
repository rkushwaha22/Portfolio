
import { useState, useEffect } from "react";
import axios from "axios";
import "./All-Css/Admin.css";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function SectionAdmin({ apiUrl, fields, fieldsType, isReadOnly = false }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Nayi file ke liye alag state


  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      setLoading(true);
      const isSingleObject = apiUrl === "/api/hero" || apiUrl === "/api/contact-info";

      const url = isSingleObject
        ? `${BASE_URL}${apiUrl}`
        : `${BASE_URL}${apiUrl}/all`;

      // Token ko header mein bhejien
      const res = await axios.get(url, {
        headers: { token: `Bearer ${token}` }
      });

      const result = res.data;
      setData(Array.isArray(result) ? result : result ? [result] : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      // Agar token expire ho jaye toh user ko wapas login par bhej sakte hain
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => { fetchData(); }, [apiUrl]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Validation Check: Dekho ki saare fields bhare hain ya nahi
    const isFormValid = fields.every(f => {
      if (f === "image") return selectedFile || form[f]; // Image check
      return form[f] && form[f].toString().trim() !== ""; // Text fields check
    });

    if (!isFormValid) {
      alert("Bhai, saare fields bharna zaroori hai!");
      return; // Code yahi ruk jayega, aage nahi badhega
    }


    try {
      const formData = new FormData();

      fields.forEach(f => {
        if (fieldsType?.[f] === "array") {
          const arrayVal = typeof form[f] === "string"
            ? form[f].split(",").map(item => item.trim())
            : form[f];
          formData.append(f, JSON.stringify(arrayVal));
        } else if (f === "image") {
          if (selectedFile) {
            formData.append("image", selectedFile);
          } else {
            formData.append("image", form[f] || "");
          }
        } else {
          formData.append(f, form[f] || "");
        }
      });

      // TOKEN ADD  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": `Bearer ${localStorage.getItem("adminToken")}` // Backend check karega
        }
      };

      if (editId) {
        await axios.put(`${BASE_URL}${apiUrl}/${editId}`, formData, config);
        alert("Updated Successfully!");
      } else {
        await axios.post(`${BASE_URL}${apiUrl}`, formData, config);
        alert("Added Successfully!");
      }

      setForm({});
      setSelectedFile(null);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Submit Error:", err);
      // Agar token invalid ho toh error message dikhayein
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired! Please login again.");
      } else {
        alert("Kuch galat hua!");
      }
    }
  };




  const handleEdit = (item) => {
    const newForm = { ...item };

    // Array fields handling
    Object.keys(fieldsType || {}).forEach(f => {
      if (fieldsType[f] === "array") {
        // Safe check: Agar array hai toh join karein, warna empty string
        newForm[f] = Array.isArray(item[f]) ? item[f].join(", ") : "";
      }
    });

    setForm(newForm);
    setEditId(item._id);
    setSelectedFile(null); // Purani image path 'form.image' mein hi rahegi
  };


  const handleDelete = async (id) => {
    // Confirmation hamesha achhi rehti hai
    if (!window.confirm("Bhai, pakka delete karna hai?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      // Backend ko token bhejna zaroori hai
      await axios.delete(`${BASE_URL}${apiUrl}/${id}`, {
        headers: {
          token: `Bearer ${token}`
        }
      });

      alert("Delete Successful!");
      fetchData(); // List ko refresh karne ke liye
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session Expired! Please login again.");
      } else {
        alert("Delete fail ho gaya. Backend check karein!");
      }
    }
  };

return (
    <div style={{ padding: "10px", maxWidth: "100%", overflowX: "hidden" }}>
      <h2 style={{ textTransform: "capitalize", color: "#333", fontSize: "1.5rem" }}>
        Manage {apiUrl.split("/").pop()} Section
      </h2>

      {/* Form Section - Made Responsive */}
      {!isReadOnly && (
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            marginBottom: 30, 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px", 
            width: "100%", // Mobile par full width
            maxWidth: "500px", // PC par limit
            padding: "15px", 
            border: "1px solid #eee", 
            borderRadius: "8px", 
            background: "#f9f9f9",
            boxSizing: "border-box" // Very Important!
          }}
        >
          {fields.map(f => (
            <div key={f} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontWeight: "bold", textTransform: "capitalize" }}>{f}:</label>
              {f === "image" ? (
                <input
                  type="file"
                  accept="image/*"
                  style={{ width: "100%" }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if(file) {
                      setSelectedFile(file);
                      setForm({ ...form, imagePreview: URL.createObjectURL(file) });
                    }
                  }}
                />
              ) : (
                <input
                  placeholder={`Enter ${f}...`}
                  value={form[f] || ""}
                  onChange={e => setForm({ ...form, [f]: e.target.value })}
                  style={{ 
                    padding: "10px", 
                    borderRadius: "4px", 
                    border: "1px solid #ccc",
                    fontSize: "16px" // Mobile zoom prevent karne ke liye
                  }}
                />
              )}
            </div>
          ))}

          {/* Image Preview Fix */}
          {(selectedFile || form.image) && (
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "12px", color: "#666" }}>Preview:</p>
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : form.image?.startsWith('http')
                      ? form.image.replace(/ /g, "%20")
                      : `${BASE_URL}/${form.image?.replace(/ /g, "%20")}`
                }
                alt="Preview"
                style={{ width: "100px", height: "auto", borderRadius: "4px" }}
              />
            </div>
          )}

          <button type="submit" style={{ padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            {editId ? "Update Data" : "Add New Entry"}
          </button>
          
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({}); setSelectedFile(null); }} style={{ background: "#6c757d", color: "white", border: "none", padding: "10px", borderRadius: "4px" }}>
              Cancel
            </button>
          )}
        </form>
      )}

      <hr />

      {/* List Section - Responsive Grid */}
      <h3 style={{ marginTop: "20px" }}>Existing Records</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", // 300px se 280px kiya for small phones
          gap: "15px" 
        }}>
          {data.length > 0 ? data.map(item => (
            <div key={item._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              {fields.map(f => (
                f === "image" && item[f] ? (
                  <img
                    key={f}
                    src={
                      item[f].startsWith('http')
                        ? item[f].replace(/ /g, "%20")
                        : `${BASE_URL}${item[f].startsWith('/') ? '' : '/'}${item[f]}`.replace(/([^:]\/)\/+/g, "$1")
                    }
                    alt="img"
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
                  />
                ) : f !== "image" && (
                  <p key={f} style={{ margin: "5px 0", fontSize: "14px", wordBreak: "break-word" }}>
                    <strong>{f}:</strong> {Array.isArray(item[f]) ? item[f].join(", ") : item[f]?.toString()}
                  </p>
                )
              ))}

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                {!isReadOnly && (
                  <button onClick={() => handleEdit(item)} style={{ flex: 1, padding: "8px", background: "#ffc107", border: "none", borderRadius: "4px" }}>Edit</button>
                )}
                <button onClick={() => handleDelete(item._id)} style={{ flex: 1, padding: "8px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}>Delete</button>
              </div>
            </div>
          )) : <p>No records found.</p>}
        </div>
      )}
    </div>
  );

}










//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textTransform: "capitalize", color: "#333" }}>
//         Manage {apiUrl.split("/").pop()} Section
//       </h2>

//       {/* Form Section */}
//       {!isReadOnly && (
//         <form onSubmit={handleSubmit} style={{ marginBottom: 30, display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px", padding: "15px", border: "1px solid #eee", borderRadius: "8px", background: "#f9f9f9" }}>
//           {fields.map(f => (
//             <div key={f} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//               <label style={{ fontWeight: "bold", textTransform: "capitalize" }}>{f}:</label>
//               {f === "image" ? (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={e => {
//                     const file = e.target.files[0];
//                     setSelectedFile(file);
//                     setForm({ ...form, imagePreview: URL.createObjectURL(file) });
//                   }}
//                 />
//               ) : (
//                 <input
//                   placeholder={`Enter ${f}...`}
//                   value={form[f] || ""}
//                   onChange={e => setForm({ ...form, [f]: e.target.value })}
//                   style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                 />
//               )}
//             </div>
//           ))}

//           {/* --- FORM IMAGE PREVIEW FIX --- */}
//           {(selectedFile || form.image) && (
//             <div style={{ marginTop: "10px" }}>
//               <p style={{ fontSize: "12px", color: "#666" }}>Preview:</p>
//               <img
//                 src={
//                   selectedFile
//                     ? URL.createObjectURL(selectedFile)
//                     : form.image?.startsWith('http')
//                       ? form.image.replace(/ /g, "%20")
//                       : `${BASE_URL}/${form.image?.replace(/ /g, "%20")}`
//                 }
//                 alt="Preview"
//                 style={{ width: "120px", height: "auto", borderRadius: "4px", border: "1px solid #ddd" }}
//                 onError={(e) => { e.target.src = "https://via.placeholder.com/120?text=Error"; }}
//               />
//             </div>
//           )}

//           <button type="submit" style={{ padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
//             {editId ? "Update Data" : "Add New Entry"}
//           </button>
//           {editId && <button type="button" onClick={() => { setEditId(null); setForm({}); setSelectedFile(null); }} style={{ background: "#6c757d", color: "white", border: "none", padding: "10px", borderRadius: "4px" }}>Cancel Edit</button>}
//         </form>
//       )}
//       <hr />

//       {/* List Section */}
//       <h3 style={{ marginTop: "20px" }}>Existing Records</h3>
//       {loading ? (
//         <p>Loading data...</p>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
//           {data.length > 0 ? data.map(item => (
//             <div key={item._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
//               {fields.map(f => (
//                 f === "image" && item[f] ? (
//                   <img
//                     key={f}
//                     src={
//                       item[f].startsWith('http')
//                         ? item[f].replace(/ /g, "%20")
//                         : `${BASE_URL}${item[f].startsWith('/') ? '' : '/'}${item[f]}`.replace(/([^:]\/)\/+/g, "$1")
//                       // Ye regex ensure karega ki double slash (//) na bane
//                     }
//                     alt="img"
//                     style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
//                     onError={(e) => {
//                       console.log("Failed URL:", e.target.src);
//                       e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
//                     }}
//                   />
//                 ) : f !== "image" && (
//                   <p key={f} style={{ margin: "5px 0" }}>
//                     <strong>{f}:</strong> {Array.isArray(item[f]) ? item[f].join(", ") : item[f]?.toString()}
//                   </p>
//                 )
//               ))}

//               <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//                 {!isReadOnly && (
//                   <button onClick={() => handleEdit(item)} style={{ flex: 1, padding: "8px", background: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
//                 )}
//                 <button onClick={() => handleDelete(item._id)} style={{ flex: 1, padding: "8px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
//               </div>
//             </div>
//           )) : <p>No records found.</p>}
//         </div>
//       )}
//     </div>
//   );

// }

