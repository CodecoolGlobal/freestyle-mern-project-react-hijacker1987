import React, { useState } from 'react';
import DogDetails from './DogDetails';

import './design/DogElements.css';

export default function DogElements({ result }) {
  const [ pickedDog, setPickedDog ] = useState(null);
  const [ detailButton, setDetailButton ] = useState("More About");
  const [ detailed, setDetailed ] = useState(false);

  const detailHandler = (element) => {
    if (!detailed){
      setPickedDog(element);
      setDetailButton("Less about");
      setDetailed(true);
    } else {
      setDetailButton("More about");
      setDetailed(false);
    }
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
                  {detailButton} {element.name}
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
      {detailed ? (
                  pickedDog && <DogDetails pickedDog={pickedDog} />
              ) : (
                  void 0
                  )}
    </div>
  );
}
