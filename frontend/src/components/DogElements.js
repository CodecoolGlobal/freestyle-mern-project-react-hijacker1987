import { React, useState } from 'react';
import DogDetails from './DogDetails';

export default function DogElements({ result }) {
  const [ pickedDog, setPickedDog ] = useState(null);

  const detailHandler = (element) => {
    setPickedDog(element);
  };

  return (
    <div>
      {result ? (
        result.length > 0 ? (
          result.map((element) => (
            <div key={element.name}>
              <h2>{element.name}</h2>
              <img src={element.image_link} alt="No img" />
              <button onClick={() => detailHandler(element)}>
                More About {element.name}
              </button>
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
};
