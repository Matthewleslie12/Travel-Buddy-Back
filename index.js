const express = require('express');
const city = require('./services/city');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/search', (req, res) => {
    // console.log(req.query)
    const cityName = req.query;

  city.searchCity(cityName)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
