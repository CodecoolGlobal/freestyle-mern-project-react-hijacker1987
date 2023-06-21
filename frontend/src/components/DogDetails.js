import React from 'react';
import './DogDetails.css';

export default function DogDetails({ pickedDog }) {
  return (
    <div className="dog-details">
      <div>
        <span className="detail-label">Energy level:</span>
        <span className="detail-value">{pickedDog.energy} / 5</span>
      </div>
      <div>
        <span className="detail-label">Barking level:</span>
        <span className="detail-value">{pickedDog.barking} / 5</span>
      </div>
      <div>
        <span className="detail-label">Good with children:</span>
        <span className="detail-value">{pickedDog.good_with_children} / 5</span>
      </div>
      <div>
        <span className="detail-label">Good with other dogs:</span>
        <span className="detail-value">{pickedDog.good_with_other_dogs} / 5</span>
      </div>
      <div>
        <span className="detail-label">Good with strangers:</span>
        <span className="detail-value">{pickedDog.good_with_strangers} / 5</span>
      </div>
      <div>
        <span className="detail-label">Playfulness level:</span>
        <span className="detail-value">{pickedDog.playfulness} / 5</span>
      </div>
      {pickedDog.min_weight_female !== pickedDog.max_weight_female ? (
        <div>
          <span className="detail-label">Female Weight:</span>
          <span>
            {pickedDog.min_weight_female} to {pickedDog.max_weight_female} pounds
          </span>
        </div>
      ) : (
        <div>
          <span className="detail-label">Female Weight:</span>
          <span>up to {pickedDog.max_weight_female} pounds</span>
        </div>
      )}
      {pickedDog.min_height_female !== pickedDog.max_height_female ? (
        <div>
          <span className="detail-label">Height:</span>
          <span>
            {pickedDog.min_height_female} to {pickedDog.max_height_female} inches
          </span>
        </div>
      ) : (
        <div>
          <span className="detail-label">Height:</span>
          <span>up to {pickedDog.max_height_female} inches</span>
        </div>
      )}
      {pickedDog.min_weight_male !== pickedDog.max_weight_male ? (
        <div>
          <span className="detail-label">Male Weight:</span>
          <span>
            {pickedDog.min_weight_male} to {pickedDog.max_weight_male} pounds
          </span>
        </div>
      ) : (
        <div>
          <span className="detail-label">Male Weight:</span>
          <span>up to {pickedDog.max_weight_male} pounds</span>
        </div>
      )}
      {pickedDog.min_height_male !== pickedDog.max_height_male ? (
        <div>
          <span className="detail-label">Height:</span>
          <span>
            {pickedDog.min_height_male} to {pickedDog.max_height_male} inches
          </span>
        </div>
      ) : (
        <div>
          <span className="detail-label">Height:</span>
          <span>up to {pickedDog.max_height_male} inches</span>
        </div>
      )}
      <div>
        <span className="detail-label">Expected life expectancy:</span>
        <span>{pickedDog.min_life_expectancy} years</span>
      </div>
    </div>
  );
}
