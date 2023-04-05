const axios = require('axios');
const fs = require('fs');


function searchCity(cityName) {
  return axios.get(`https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName.query}`, {
    params: {
      query: cityName
    },
    headers: {
        'X-RapidAPI-Key': "1092460963msh629c5ce84f775f9p16d1a9jsn9acca9ce7b3b",
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    }
  })
  .then(response => {
    // console.log(response);
    fs.writeFileSync(`./cities/${cityName.query}.json`, JSON.stringify(response.data), () => {
      console.log('Data written to file');
    });
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = {
  searchCity: searchCity
};
