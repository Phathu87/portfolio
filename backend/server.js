const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://phathurakhunwana:<password>@cluster0.urunzpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
