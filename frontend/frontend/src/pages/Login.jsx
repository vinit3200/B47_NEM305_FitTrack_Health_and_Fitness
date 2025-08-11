import React, { useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  let [form, setForm] = useState({ email:'', password:'' });
  let { login } = useContext(AuthContext);
  let nav = useNavigate();
  let handle = e => setForm({...form, [e.target.name]: e.target.value});

  let submit = async (e) => {
    e.preventDefault();
    try{
      let res = await API.post('/api/auth/login', form);
      login(res.data.token, res.data.user);
      nav('/dashboard');
    }catch(err){ alert(err.response?.data?.msg || err.message); }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input name="email" onChange={handle} placeholder="email" />
      <input name="password" type="password" onChange={handle} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
