const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

//middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


//connecting with db
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


//using routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);


//starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
