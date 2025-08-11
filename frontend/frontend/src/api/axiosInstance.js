import axios from 'axios';
let API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((req)=>{
  let token = localStorage.getItem('token');
  if(token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
