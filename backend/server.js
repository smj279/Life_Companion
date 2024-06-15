require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
