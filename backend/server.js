require('dotenv').config();
let express = require('express');
let cors = require('cors');
let connectDB = require('./db');

let authRoutes = require('./routes/auth.routes');
let workoutRoutes = require('./routes/workout.routes');
let nutritionRoutes = require('./routes/nutrition.routes');
let progressRoutes = require('./routes/progress.routes');
let goalRoutes = require('./routes/goal.routes');
let foodRoutes = require('./routes/food.routes');
let syncRoutes = require('./routes/sync.routes');
let visualRoutes = require('./routes/visual.routes');

connectDB();
let app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/visuals', visualRoutes);

app.get('/', (req, res) => res.send('FitTrack API'));

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
