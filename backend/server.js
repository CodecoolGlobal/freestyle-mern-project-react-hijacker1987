const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const port = 3000;
let Fruit = require(`./model/Animals`);
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); 
    next();
});

mongoose.connect(`/?retryWrites=true&w=majority`);

app.listen(port, () => console.log(`Server running on: http://127.0.0.1:${port}`));