const express = require(`express`);
const mongoose = require(`mongoose`);
const { token, API_key } = require("./tokenFile");

const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
const saltRounds = 2;

const Animal = require(`./model/Animals`);
const RegUser = require(`./model/Registration`)

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); 
    next();
});

const fetchData = async (api) => {
  try {
    const response = await fetch(api, {
      headers: {
        'X-Api-Key': API_key,
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log('Error fetching Data:', error);
    throw new Error('Error fetching data');
  }
};

app.get('/v1/api/data', async (req, res) => {
  try {
    const { name } = req.query;
    const api = `https://api.api-ninjas.com/v1/dogs?name=${name}`;
    const jsonData = await fetchData(api);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/v1/api/animals', async (req, res) => {
  try {
    const getData = await Animal.find();
    res.json(getData);
  } catch (err) {
    res.status(500).send('An error occurred while fetching animal data.');
  }
});

app.get('/v1/api/animals/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const getData = await Animal.findById(id);
    res.json(getData);
  } catch (err) {
    res.status(500).send('An error occurred while fetching animal data.');
  }
});

app.post(`/v1/api/animals`, async (req, res) => {
  console.log(req.body);
  try {
        const { name, image, energy, barking, good_with_children, good_with_other_dogs, good_with_strangers, playfulness, min_weight_female, max_weight_female, min_weight_male, max_weight_male, min_height_female, max_height_female, min_height_male, max_height_male, min_life_expentancy} = req.body;
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

        // Add the newly posted animal's ID to the user's dogReference field
        const users = await RegUser.find();
        const updatedDogReference = users.map(user => ({ userId: user._id, dogId: savedAnimal._id }));
        await Promise.all(updatedDogReference.map(async ({ userId, dogId }) => {
          await RegUser.findOneAndUpdate(
            { _id: userId },
            { $push: { dogReference: dogId } }
          );
        }));

        res.json(savedAnimal);
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

app.patch(`/v1/api/user/:id`, async (req, res, next) => {
  try {
    const user = await RegUser.findById(req.params.id);
    const updatedDogReference = [...user.dogReference, req.body];
    const updatedUser = await RegUser.findOneAndUpdate(
      { _id: req.params.id },
      { dogReference: updatedDogReference },
      { new: true }
      );
      return res.json(updatedUser);
  } catch (err) {
    return next(err);
  }
});

app.delete(`/v1/api/animals`, async (req, res) => {
    try {
        const animalName = req.body.name;
        await Animal.deleteOne({ name: animalName });
        res.send(`Delete successful!`);
    } catch (err) {
        res.status(500).send(`An error occurred during deletion.`);
    }
});

const generateCyberSecurity = async (element) => {
    const generatedSecurePassword = await bcrypt.hash(element, saltRounds);
    return generatedSecurePassword;
};

app.post(`/v1/api/userRegister`, async (req, res) => {
    try {
        const { name, date_of_birth, gender, country, city, street, user_name, password, e_mail_address, tel_number, credit_card, expiration_date, created_at } = req.body;
        const hashedPassword = await generateCyberSecurity(password);
        // const hashedCreditCard = await generateCyberSecurity(credit_card);
        const newUser = new RegUser({
        name: name,
        date_of_birth: date_of_birth,
        gender: gender,
        country: country,
        city: city,
        street: street,
        user_name: user_name,
        password: hashedPassword,
        e_mail_address: e_mail_address,
        tel_number: tel_number,
        credit_card: credit_card,
        expiration_date: expiration_date,
        created_at: created_at
        });
        const savedRegUser = await newUser.save();
        res.json(savedRegUser);
    } catch (err) {
        res.status(500).send(`An error occurred during register.`);
    }
});

app.delete(`/v1/api/delete`, async (req, res) => {
    try {
      const deleteAcc = req.body.username;
      await RegUser.deleteOne({ user_name: deleteAcc});
      res.send(`Delete successful!`);
    } catch (err) {
        res.status(500).send(`An error occured during deletion.`);
    }
})

const comparePasswords = async (notCyberSecurity, yesCyberSecurity) => {
  try {
    const result = await bcrypt.compare(notCyberSecurity, yesCyberSecurity);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

RegUser.findByName = async function (userName) {
    return await this.findOne({ userName });
};

RegUser.findAgain = async function (user) {
  return await this.findOne({ user_name: user.userName });
};

app.get('/v1/api/login', async (req, res) => {
  try {
        const query = JSON.parse(req.query.query);
        const registeredUser = await RegUser.findAgain(query);
        const success = await comparePasswords(query.password, registeredUser.password) && (query.userName === registeredUser.user_name);
        res.json({ success, user_name: registeredUser.user_name, _id: registeredUser._id, dogReference: registeredUser.dogReference });
    } catch (err) {
        res.status(500).send('An error occurred during login.');
    }
  });

app.patch(`/v1/api/:user`, async (req, res) => {
  const userName = req.params.user;
  const updatedData = req.body;
  updatedData.password = await generateCyberSecurity(req.body.password);

  try {
        const registeredUser = await RegUser.findByName(userName.name);
        const updatedRegUser = await RegUser.findByIdAndUpdate(registeredUser._id, updatedData, { new: true });
        if (!updatedRegUser) {
          res.status(404).send('User not found.');
          return;
        }
        res.json(updatedRegUser);
    } catch (err) {
        res.status(500).json({ success: false });
    }
  });

app.listen(port, () => console.log(`Server running on: http://127.0.0.1:${port}`));

mongoose.connect(token);