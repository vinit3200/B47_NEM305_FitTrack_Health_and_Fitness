import React from 'react';
import Workouts from './Workouts';
import Nutrition from './Nutrition';
import Progress from './Progress';
export default function Dashboard(){
  return (
    <div>
      <h1>Dashboard</h1>
      <Workouts />
      <Nutrition />
      <Progress />
    </div>
  );
}
