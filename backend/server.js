let express = require('express');
let cors = require('cors');
let dotenv = require('dotenv');
let connectDB = require('./config/db');
let workoutRoutes = require('./routes/workout.routes');
let nutritionRoutes = require('./routes/nutrition.routes');
let authRoutes = require('./routes/auth.routes');
let progressRoutes = require('./routes/progress.routes');
let foodRoutes = require('./routes/food.routes');
let goalRoutes = require('./routes/goal.routes');
let fitbitRoutes = require('./routes/fitbit.routes');

dotenv.config();
connectDB();

let app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api', foodRoutes);
app.use('/goals', goalRoutes);
app.use('/', fitbitRoutes);

app.get('/', (req, res) => res.send('FitTrack API Running'));

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
