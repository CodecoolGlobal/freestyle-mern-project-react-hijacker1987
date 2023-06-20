import React from 'react';

export default function DogDetails({ pickedDog }) {
  return (
    <div>
        Energy level: {pickedDog.energy} <br/>
        Barking level: {pickedDog.barking} <br/>
        Good with children: {pickedDog.good_with_children} <br/>
        Good with other dogs: {pickedDog.good_with_other_dogs} <br/>
        Good with strangers: {pickedDog.good_with_strangers} <br/>
        Playfulness level: {pickedDog.playfulness} <br/>
        Female Weight: {pickedDog.min_weight_female} to {pickedDog.max_weight_female} <br/>
               Height: {pickedDog.min_height_female} to {pickedDog.max_height_female} <br/>
        Male Weight: {pickedDog.min_weight_male} to {pickedDog.max_weight_male} <br/>
             Weight: {pickedDog.min_height_male} to {pickedDog.max_height_male} <br/>
        Expected to live at least {pickedDog.min_life_expectancy} years
    </div>
  )
}
