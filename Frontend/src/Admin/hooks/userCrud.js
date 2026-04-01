// src/Admin/hooks/useCrud.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useCrud(apiBaseUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${apiBaseUrl}/all`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // 'isFormData' flag add kiya hai taaki hook ko pata chale ki headers kya rakhne hain
    const createItem = async (item, isFormData = false) => {
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        await axios.post(apiBaseUrl, item, config);
        fetchData();
    };

    const updateItem = async (id, item, isFormData = false) => {
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        await axios.put(`${apiBaseUrl}/${id}`, item, config);
        fetchData();
    };

    const deleteItem = async (id) => {
        await axios.delete(`${apiBaseUrl}/${id}`);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, createItem, updateItem, deleteItem, fetchData };
}











// // src/Admin/hooks/useCrud.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useCrud(apiBaseUrl) {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(`${apiBaseUrl}/all`);
//             setData(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const createItem = async (item) => {
//         await axios.post(apiBaseUrl, item);
//         fetchData();
//     };

//     const updateItem = async (id, item) => {
//         await axios.put(`${apiBaseUrl}/${id}`, item);
//         fetchData();
//     };

//     const deleteItem = async (id) => {
//         await axios.delete(`${apiBaseUrl}/${id}`);
//         fetchData();
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return { data, loading, createItem, updateItem, deleteItem };
// }