const fs = require('fs');

async function searchCity(cityName) {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName.query}`, {
      headers: {
        'X-RapidAPI-Key': "1092460963msh629c5ce84f775f9p16d1a9jsn9acca9ce7b3b",
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      }
    });
    const cityData = response.data.data[0];
    const { id, name } = cityData.result_object;
    const dataToWrite = { id, name };
    fs.writeFileSync(`./cities/${cityName.query}.json`, JSON.stringify(dataToWrite), () => {
      console.log(`Data written to file ${cityName.query}.json`);
    });
    return dataToWrite;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = {
  searchCity: searchCity
};
