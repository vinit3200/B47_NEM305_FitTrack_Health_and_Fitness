import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Progress(){
  let [data, setData] = useState(null);
  useEffect(()=>{ API.get('/api/visuals/calories').then(r=>setData(r.data)); }, []);
  if(!data) return <div>Loading progress...</div>;

  let chart = {
    labels: ['Calories'],
    datasets: [
      { label: 'Burned', data: [data.burned] },
      { label: 'Consumed', data: [data.consumed] }
    ]
  };
  return (
    <div>
      <h3>Calories: Burned vs Consumed</h3>
      <Bar data={chart} />
    </div>
  );
}
