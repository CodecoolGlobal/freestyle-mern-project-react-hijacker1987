const express = require(`express`);
const mongoose = require(`mongoose`);
const { token, API_key } = require("./tokenFile");
const axios = require('axios');

const app = express();
const port = 3000;

let Animal = require(`./model/Animals`);

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); 
    next();
});

mongoose.connect(token);

app.get(`/`, (req, res) => {
    res.redirect(`/v1/api/animals`);
})

app.get(`/v1/api/animals`, async (req, res) => {

    const apiUrl = `https://api.api-ninjas.com/v1/dogs?name=Cane Corso`;

    axios.get(apiUrl, {
      headers: {
        'X-Api-Key': `${API_key}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
  });

app.listen(port, () => console.log(`Server running on: http://127.0.0.1:${port}`));