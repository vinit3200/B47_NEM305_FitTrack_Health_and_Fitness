import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/visuals/calories', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setCalories(res.data));
  }, []);

  return (
    <div>
      <h1>Calories Overview</h1>
      {calories && (
        <div>
          <p>Burned: {calories.burned}</p>
          <p>Consumed: {calories.consumed}</p>
        </div>
      )}
    </div>
  );
}

export default App;
