const express = require(`express`);
const mongoose = require(`mongoose`);
const { token } = require("./tokenFile");

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

app.post(`v1/api/animals`, async (req, res) => {
    try {
        const {name, image, energy, barking, good_with_children, good_with_other_dogs, good_with_strangers, playfulness, min_weight_female, max_weight_female, min_weight_male, max_weight_male, min_height_female, max_height_female, min_height_male, max_height_male, min_life_expentancy} = req.body;
        const newAnimal = new Animal({
            name: name,
            image: image,
            energy: energy,
            barking: barking,
            good_with_children: good_with_children,
            good_with_other_dogs: good_with_other_dogs,
            good_with_strangers: good_with_strangers,
            playfulness: playfulness,
            min_weight_female: min_weight_female,
            max_weight_female: max_weight_female,
            min_weight_male: min_weight_male,
            max_weight_male: max_weight_male,
            min_height_female: min_height_female,
            max_height_female: max_height_female,
            min_height_male: min_height_male,
            max_height_male: max_height_male,
            min_life_expentancy: min_life_expentancy,
        });
        const savedAnimal = await newAnimal.save();
        res.json(savedAnimal);
    } catch (err) {
        res.status(400).json({ success: false });
    }
})

app.delete(`/v1/api/animals`, async (req, res) => {
    try {
        const animalName = req.body.name;
        await Animal.deleteOne({ name: animalName });
        res.send(`Delete successful!`);
    } catch (err) {
        res.status(500).send(`An error occured during deletion.`);
    }
})

app.listen(port, () => console.log(`Server running on: http://127.0.0.1:${port}`));