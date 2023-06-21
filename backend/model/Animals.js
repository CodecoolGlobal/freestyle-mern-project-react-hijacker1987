const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const animalSchema = new Schema({
    name: String,
    image: String,
    energy: Number,
    barking: Number,
    good_with_children: Number,
    good_with_other_dogs: Number,
    good_with_strangers: Number,
    playfulness: Number,
    min_weight_female: Number,
    max_weight_female: Number,
    min_weight_male: Number,
    max_weight_male: Number,
    min_height_female: Number,
    max_height_female: Number,
    min_height_male: Number,
    max_height_male: Number,
    min_life_expentancy: Number
})

const Animal = model(`Animal`, animalSchema, "FavAnimals");

module.exports = Animal;
