import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';

export default function Workouts(){
  let [list, setList] = useState([]);
  let [form, setForm] = useState({ type:'Running', duration:30, calories:200 });

  let fetch = async () => {
    let res = await API.get('/api/workouts');
    setList(res.data);
  };
  useEffect(()=>{ fetch(); }, []);

  let add = async (e) => {
    e.preventDefault();
    await API.post('/api/workouts', form);
    setForm({ type:'Running', duration:30, calories:200 });
    fetch();
  };

  return (
    <div>
      <h3>Workouts</h3>
      <form onSubmit={add}>
        <input value={form.type} onChange={e=>setForm({...form,type:e.target.value})} />
        <input type="number" value={form.duration} onChange={e=>setForm({...form,duration:+e.target.value})} />
        <input type="number" value={form.calories} onChange={e=>setForm({...form,calories:+e.target.value})} />
        <button>Add</button>
      </form>
      <ul>{list.map(w=> <li key={w._id}>{w.type} — {w.duration}min — {w.calories} cal</li>)}</ul>
    </div>
  );
}
