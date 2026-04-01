import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./All-Css/LoginPage.css"; 

const BASE_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/hero');
    } catch (err) {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <div className="input-group">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const BASE_URL = import.meta.env.VITE_API_URL


// const LoginPage = () => {

//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL }/api/auth/login`, credentials);
//       localStorage.setItem('adminToken', res.data.token); // Token save kar liya
//       navigate('/admin/hero'); // Admin panel bhej diya
//     } catch (err) {
//       setError('Invalid Username or Password');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: ' #0a0f1a' }}>
//       <form onSubmit={handleLogin} style={{ padding: '2rem', width: '450px', height: '250px', background: '#f3f4f6', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
//         <h2>Admin Login</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <div style={{ marginBottom: '1rem' }}>
//           <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
//         </div>
//         <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;