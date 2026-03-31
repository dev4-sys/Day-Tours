const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Allows React to talk to this server
app.use(express.json());

// Mock Data (Replace this with your SQL queries later)
const tours = [
  { id: 1, title: "Hobbiton Movie Set Tour", price: 150, location: "Matamata" },
  { id: 2, title: "Milford Sound Cruise", price: 210, location: "Fiordland" }
];

app.get('/api/tours', (req, res) => {
  res.json(tours);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));