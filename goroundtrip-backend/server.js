const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/forms'); // Make sure routes/forms.js exists

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logs to verify it's loading properly
console.log("✅ Importing formRoutes...");
app.use('/api', formRoutes);
console.log("✅ Routes registered at /api");

// Basic GET route for test
app.get('/', (req, res) => {
  res.send('🌐 GoRoundTrip backend is live 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
