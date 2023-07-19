const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const registerSchema = new Schema({
    name: String,
    date_of_birth: Date,
    gender: String,
    country: String,
    city: String,
    street: String,
    user_name: String,
    password: String,
    e_mail_adress: String,
    tel_number: String,
    credit_card: String,
    cvc: String,
    expiration_date: String,
    created_at: Date,
    dogReference: [{
        type: Schema.Types.ObjectId,
        ref: `Animal`,
      }],
})

const RegUser = model(`User`, registerSchema, "Registered Users");

module.exports = RegUser;
