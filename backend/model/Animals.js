const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const animalSchema = new Schema({
    name: String,
    breed: String,
    sex: String,
    Age: Number
})

const Animal = model(`Animal`, animalSchema);

module.exports = Animal;