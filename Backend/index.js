const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const compression = require('compression');

const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(compression());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use("/api",productRoutes);
app.use("/api",userRoute);
app.get("/",(req,res) =>{
  res.send("Server is running");
})

PORT = 5000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));