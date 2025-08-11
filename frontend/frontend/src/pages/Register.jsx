import React, { useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  let [form, setForm] = useState({ username:'', email:'', password:'' });
  let { login } = useContext(AuthContext);
  let nav = useNavigate();

  let handle = e => setForm({...form, [e.target.name]: e.target.value });
  let submit = async (e) => {
    e.preventDefault();
    try{
      await API.post('/api/auth/register', form); 
      let res = await API.post('/api/auth/login', { email: form.email, password: form.password });
      login(res.data.token, res.data.user);
      nav('/dashboard');
    }catch(err){ alert(err.response?.data?.msg || err.message); }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input name="username" onChange={handle} placeholder="username" />
      <input name="email" onChange={handle} placeholder="email" />
      <input name="password" type="password" onChange={handle} placeholder="password" />
      <button type="submit">Register</button>
    </form>
  );
}
