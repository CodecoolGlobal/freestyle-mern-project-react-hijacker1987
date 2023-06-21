import React, { useState } from 'react';
import DogDetails from './DogDetails';
import './DogElements.css';

export default function DogElements({ result }) {
  const [pickedDog, setPickedDog] = useState(null);

  const detailHandler = (element) => {
    setPickedDog(element);
  };

  return (
    <div className="dog-elements">
      {result ? (
        result.length > 0 ? (
          result.map((element) => (
            <div key={element.name}>
              <h2>{element.name}</h2>
              <div className="dog-image-container">
                <img src={element.image_link} alt="No img" className="dog-image" />
                <button className="more-details-button" onClick={() => detailHandler(element)}>
                  More About {element.name}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Invalid name!</div>
        )
      ) : (
        void 0
      )}
      {pickedDog && <DogDetails pickedDog={pickedDog} />}
    </div>
  );
}
