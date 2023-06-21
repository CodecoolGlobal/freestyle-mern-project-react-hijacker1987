const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const registerSchema = new Schema({
    name: String,
    date_of_birth: Date,
    gender: String,
    country: String,
    city: String,
    street: String,
    userName: String,
    password: String,
    e_mail_adress: String,
    tel_number: Number,
    credit_card: Number,
    cvc: Number,
    expirationDate: Number
})

const RegUser = model(`User`, registerSchema, "Registered Users");

module.exports = RegUser;
