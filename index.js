const fs = require("fs");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/search", (req, res) => {
  const city = req.query.query;
  axios
    .get(`https://travel-advisor.p.rapidapi.com/locations/search`, {
      params: {
        query: city,
      },
      headers: {
        "X-RapidAPI-Key": "e28df7b453msh34b1e8e2cdbb234p1da484jsne5d62d435a2b",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    })
    .then((response) => {
      const data = response.data;
      fs.writeFileSync(`./cities/${city}.json`, JSON.stringify(data));
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/cities/:cityName", (req, res) => {
    const cityName = req.params.cityName;
    const filePath = `./cities/${cityName}.json`;
    const cityData = fs.readFileSync(filePath);
  
    res.json(JSON.parse(cityData));
  });
  
  app.listen(8082, () => {
    console.log("Server started on port 8082");
  });