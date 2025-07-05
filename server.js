const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true, // if you're using cookies or authorization headers
}));

const PORT = process.env.PORT || 3001; 

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes); 

// Database synchronization
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });