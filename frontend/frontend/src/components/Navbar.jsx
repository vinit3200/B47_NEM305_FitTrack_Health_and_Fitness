import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar(){
  let { user, logout } = useContext(AuthContext);
  let nav = useNavigate();
  let handleLogout = () => { logout(); nav('/'); };

  return (
    <nav style={{ padding: '10px', borderBottom:'1px solid #ddd' }}>
      <Link to="/">FitTrack</Link> | <Link to="/dashboard">Dashboard</Link>
      <span style={{ float:'right' }}>
        {user ? (<>
          <span>{user.email}</span>
          <button onClick={handleLogout} style={{marginLeft:10}}>Logout</button>
        </>) : (<><Link to="/login">Login</Link> <Link to="/register">Register</Link></>)}
      </span>
    </nav>
  );
}
