import { React, useEffect, useState } from 'react';

import './design/DogDetails.css';

export default function DogDetails({ pickedDog, loggedIn, id, loginUser }) {
    const [ switchMeasure, setSwitchMeasure ] = useState(true);
    const [ weightMeasure, setWeightMeasure ] = useState(1);
    const [ heightMeasure, setHeightMeasure ] = useState(1);
    const [ weightString, setWeightString ] = useState("pounds");
    const [ heightString, setHeightString ] = useState("inches");
    const [ selectedFav, setSelectedFav ] = useState(false);
    const [ animalData, setAnimalData ] = useState([]);
    const [ gender, setGender ] = useState(false);
    const [ whichGender, setWhichGender ] = useState("Male");

    const [ favAnimal, _setFavAnimal] = useState({
        name: pickedDog.name,
        image: pickedDog.image_link,
        energy: pickedDog.energy,
        barking: pickedDog.barking,
        good_with_children: pickedDog.good_with_children,
        good_with_other_dogs: pickedDog.good_with_other_dogs,
        good_with_strangers: pickedDog.good_with_strangers,
        playfulness: pickedDog.playfulness,
        min_weight_female: pickedDog.min_weight_female,
        max_weight_female: pickedDog.max_weight_female,
        min_weight_male: pickedDog.min_weight_male,
        max_weight_male: pickedDog.max_weight_male,
        min_height_female: pickedDog.min_height_female,
        max_height_female: pickedDog.max_height_female,
        min_height_male: pickedDog.min_height_male,
        max_height_male: pickedDog.max_height_male,
        min_life_expentancy: pickedDog.min_life_expentancy
    })

    const switchHandler = () => {
        if (!switchMeasure) {
            setWeightMeasure(1);
            setHeightMeasure(1);
            setSwitchMeasure(true);
            setWeightString("pounds");
            setHeightString("inches");
        } else {
            setWeightMeasure(0.45359237);
            setHeightMeasure(2.54);
            setSwitchMeasure(false);
            setWeightString("kilograms");
            setHeightString("centimeters");
        }
    };

    const addToFavourites = async (dogID) => {
        setSelectedFav(true);
        try {
          await fetch('http://127.0.0.1:3000/v1/api/animals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(favAnimal),
          });
    
          // Call getData to add dogReference to users
          await getData(dogID.name);
        } catch (err) {
          console.log(err);
        }
      };

    const removeFromFavourites = async () => {
        try {
            await fetch(`http://127.0.0.1:3000/v1/api/animals`, {
                method: `DELETE`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pickedDog)
            });
            setSelectedFav(false);
        } catch (err) {
            console.log(err);
        }
    }

    const getAnimals = async () => {
        try {
          const response = await fetch("http://127.0.0.1:3000/v1/api/animals");
      
          if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
          }
      
          const data = await response.json();
          setAnimalData(data);
        } catch (error) {
          console.log('Error fetching animal data:', error);
        }
      };

    const addFavAnimalsToUser = async (user) => {
        try {
            await fetch(`http://127.0.0.1:3000/v1/api/user/${user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favAnimal),
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateUser = async (user) => {
        const dogID = user.dogReference;
        const updatedUser = {...user, dogReference: dogID};
        addFavAnimalsToUser(updatedUser)
    }

    const getData = async (name) => {
        const updatedAnimalData = await getAnimals();
        if (updatedAnimalData && updatedAnimalData.length > 0) {
          const newID = updatedAnimalData.find((dog) => dog.name === name);
          if (newID) {
            const usersToUpdate = animalData.map((user) => ({
              ...user,
              dogReference: newID._id,
            }));
            for (const user of usersToUpdate) {
              await handleUpdateUser(user);
            }
          }
        }
      };

    const switchGender = () => {
        setGender(!gender);
        whichGender === "Male" ? setWhichGender("Female") : setWhichGender("Male");
    }

  return (
    <div className="dog-details">
        {loggedIn ? (
        <div>
            {!selectedFav ? (<button
                                type="submit"
                                onClick={() => addToFavourites(animalData, id)}
                                className="toggle-favorites-button"
                                >
                                Add to favourites
                            </button>
                        ) : (<button type="Submit" onClick = { removeFromFavourites } className="toggle-favorites-button" >Remove from favourites</button>)}            
            <div><span className="detail-label">Energy level:</span><span className="detail-value">{pickedDog.energy} / 5</span></div>
            <div><span className="detail-label">Barking level:</span><span className="detail-value">{pickedDog.barking} / 5</span></div>
            <div><span className="detail-label">Good with children:</span><span className="detail-value">{pickedDog.good_with_children} / 5</span></div>
            <div><span className="detail-label">Good with other dogs:</span><span className="detail-value">{pickedDog.good_with_other_dogs} / 5</span></div>
            <div><span className="detail-label">Good with strangers:</span><span className="detail-value">{pickedDog.good_with_strangers} / 5</span></div>
            <div><span className="detail-label">Playfulness level:</span><span className="detail-value">{pickedDog.playfulness} / 5</span></div>

            {pickedDog.min_weight_female !== pickedDog.max_weight_female && gender
                ? (
                    <div>
                        <span className="detail-label">Female Weight: </span>
                        <span>{Math.floor(pickedDog.min_weight_female * weightMeasure)} to {Math.ceil(pickedDog.max_weight_female * weightMeasure)} {weightString}</span>
                    </div>
                ) : (
                    <div>
                        <span className="detail-label">Female Weight: </span>
                        <span>up to {Math.ceil(pickedDog.max_weight_female * weightMeasure)} {weightString}</span>
                    </div>
                    )}

            {pickedDog.min_height_female !== pickedDog.max_height_female && gender
                ? (
                    <div>
                        <span className="detail-label">and Height: </span>
                        <span>{Math.floor(pickedDog.min_height_female * heightMeasure)} to {Math.ceil(pickedDog.max_height_female * heightMeasure)} {heightString}</span>
                    </div>
                ) : (
                    <div>
                        <span className="detail-label">and Height: </span>
                        <span>up to {Math.ceil(pickedDog.max_height_female * heightMeasure)} {heightString}</span>
                    </div>
                    )}

            {pickedDog.min_weight_male !== pickedDog.max_weight_male && !gender
                ? (
                    <div>
                        <span className="detail-label">Male Weight: </span>
                        <span>{Math.floor(pickedDog.min_weight_male * weightMeasure)} to {Math.ceil(pickedDog.max_weight_male * weightMeasure)} {weightString}</span>
                    </div>
                ) : (
                    <div>
                        <span className="detail-label">Male Weight: </span>
                        <span>up to {Math.ceil(pickedDog.max_weight_male * weightMeasure)} {weightString}</span>
                    </div>
                    )}

            {pickedDog.min_height_male !== pickedDog.max_height_male && !gender
                ? (
                    <div>
                        <span className="detail-label">and Height: </span>
                        <span>{Math.floor(pickedDog.min_height_male * heightMeasure)} to {Math.ceil(pickedDog.max_height_male * heightMeasure)} {heightString}</span>
                    </div>
                ) : (
                    <div>
                        <span className="detail-label">and Height: </span>
                        <span>up to {Math.ceil(pickedDog.max_height_male * heightMeasure)} {heightString}</span>
                    </div>
                    )}
                    
            <div><span className="detail-label">Expected life expectancy: </span><span>{pickedDog.min_life_expectancy} years</span></div>
            <button onClick={switchHandler}>Switch measure system</button>
            <button onClick={switchGender}>{whichGender}</button>
        </div>
        ) : (
            <div className='detail-label'>Please register / login for further access.</div>
        )}
    </div>
  );
}
