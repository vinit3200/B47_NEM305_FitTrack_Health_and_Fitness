import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';

export default function Nutrition(){
  let [list, setList] = useState([]);
  let [form, setForm] = useState({ food:'Apple', calories:95, protein:0.5, carbs:25, fat:0.3 });

  let fetch = async () => { let res = await API.get('/api/nutrition'); setList(res.data); };
  useEffect(()=>{ fetch(); }, []);

  let add = async e => { e.preventDefault(); await API.post('/api/nutrition', form); fetch(); };

  let searchFood = async q => {
    let res = await API.get(`/api/food/search?q=${encodeURIComponent(q)}`);
    console.log(res.data);
    alert('Check console for Edamam results (raw). Implement selection UI as needed.');
  };

  return (
    <div>
      <h3>Nutrition</h3>
      <form onSubmit={add}>
        <input value={form.food} onChange={e=>setForm({...form,food:e.target.value})}/>
        <input type="number" value={form.calories} onChange={e=>setForm({...form,calories:+e.target.value})}/>
        <button>Add</button>
        <button type="button" onClick={()=>searchFood(form.food)}>Search Food</button>
      </form>
      <ul>{list.map(n=> <li key={n._id}>{n.food} — {n.calories} cal</li>)}</ul>
    </div>
  );
}
