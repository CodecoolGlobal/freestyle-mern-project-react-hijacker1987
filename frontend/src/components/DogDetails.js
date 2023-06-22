import { React, useState } from 'react';

import './design/DogDetails.css';

export default function DogDetails({ pickedDog, loggedIn }) {
    const [ switchMeasure, setSwitchMeasure ] = useState(true);
    const [ weightMeasure, setWeightMeasure ] = useState(1);
    const [ heightMeasure, setHeightMeasure ] = useState(1);
    const [ weightString, setWeightString ] = useState("pounds");
    const [ heightString, setHeightString ] = useState("inches");

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

  return (
    <div className="dog-details">
        {loggedIn ? (
        <div>
            <div><span className="detail-label">Energy level:</span><span className="detail-value">{pickedDog.energy} / 5</span></div>
            <div><span className="detail-label">Barking level:</span><span className="detail-value">{pickedDog.barking} / 5</span></div>
            <div><span className="detail-label">Good with children:</span><span className="detail-value">{pickedDog.good_with_children} / 5</span></div>
            <div><span className="detail-label">Good with other dogs:</span><span className="detail-value">{pickedDog.good_with_other_dogs} / 5</span></div>
            <div><span className="detail-label">Good with strangers:</span><span className="detail-value">{pickedDog.good_with_strangers} / 5</span></div>
            <div><span className="detail-label">Playfulness level:</span><span className="detail-value">{pickedDog.playfulness} / 5</span></div>

            {pickedDog.min_weight_female !== pickedDog.max_weight_female
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

            {pickedDog.min_height_female !== pickedDog.max_height_female
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

            {pickedDog.min_weight_male !== pickedDog.max_weight_male
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

            {pickedDog.min_height_male !== pickedDog.max_height_male
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
        </div>
        ) : (
            <div className='detail-label'>Please register / login for further access.</div>
        )}
    </div>
  );
}