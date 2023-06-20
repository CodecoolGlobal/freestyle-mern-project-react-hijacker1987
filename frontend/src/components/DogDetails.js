import React from 'react';

export default function DogDetails({ pickedDog }) {
  return (
    <div>
        Energy level: {pickedDog.energy} / 5<br/>
        Barking level: {pickedDog.barking} / 5<br/>
        Good with children: {pickedDog.good_with_children} / 5<br/>
        Good with other dogs: {pickedDog.good_with_other_dogs} / 5<br/>
        Good with strangers: {pickedDog.good_with_strangers} / 5<br/>
        Playfulness level: {pickedDog.playfulness} / 5<br/>
        {pickedDog.min_weight_female  !==  pickedDog.max_weight_female ? (
            <div>
                Female Weight: {pickedDog.min_weight_female} to {pickedDog.max_weight_female} pounds <br/>
            </div>
        ) : (
            <div>
                Female Weight: up to {pickedDog.max_weight_female} pounds <br/>
            </div>
        )}
        {pickedDog.min_height_female  !==  pickedDog.max_height_female ? (
            <div>
               Height: {pickedDog.min_height_female} to {pickedDog.max_height_female} inches <br/>
            </div>
        ) : (
            <div>
               Height: up to {pickedDog.max_height_female} inches <br/>
            </div>
        )}
        {pickedDog.min_weight_male  !==  pickedDog.max_weight_male ? (
            <div>
                Male Weight: {pickedDog.min_weight_male} to {pickedDog.max_weight_male} pounds <br/>
            </div>
        ) : (
            <div>
                Male Weight: up to {pickedDog.max_weight_male} pounds <br/>
            </div>
        )}
        {pickedDog.min_height_male  !==  pickedDog.max_height_male ? (
            <div>
               Height: {pickedDog.min_height_male} to {pickedDog.max_height_male} inches <br/>
            </div>
        ) : (
            <div>
               Height: up to {pickedDog.max_height_male} inches <br/>
            </div>
        )}
        Expected to live at least {pickedDog.min_life_expectancy} years
    </div>
  )
}
