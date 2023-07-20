import React, { useState, useEffect } from 'react';
import DogDetails from './DogDetails';
import FetchFavourites from './FetchFavourites';

import './design/DogElements.css';

export default function DogElements({ result, loggedIn, id, loginUser }) {
  const [ pickedDog, setPickedDog ] = useState(null);
  const [ detailButton, setDetailButton ] = useState("More About");
  const [ detailed, setDetailed ] = useState(false);
  const [ personalFavs, setPersonalFavs ] = useState(false);
  const [ dogReference, setDogReference] = useState([]);

  const getLoggedInUser = async () => {
      try {
          const query = encodeURIComponent(JSON.stringify(loginUser));
          const response = await fetch(`http://127.0.0.1:3000/v1/api/login?query=${query}`);
          const data = await response.json();
          setDogReference(data.dogReference);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
  };

  useEffect(() => {
    const getAnimals = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/v1/api/animals/${id}`);
    
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log('Error fetching animal data:', error);
      }
    };
    dogReference.forEach(dogref => {
      getAnimals(dogref);
    })
  }, [dogReference])

  // '/v1/api/animals/:id'
  const handlePersonal = () => {
    setPersonalFavs((prevState) => !prevState);
  }

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
      <div>
        {personalFavs ? (
          <div>
            <button onClick={handlePersonal}>Hide Personal Favorites</button>
            <FetchFavourites />
          </div>
        ) : (
          <>
            {loggedIn && (
              <button onClick={() => { handlePersonal(); getLoggedInUser(); }}>Show Personal Favorites</button>
            )}
          </>
        )}
      </div>
      {result ? (
        result.length > 0 ? (
          result.map((element) => (
            <div className='dog-name-container' key={element.name}>
              <h2 className='dog-name' >{element.name}</h2>
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
      {detailed && loggedIn? (
                  pickedDog && <DogDetails
                  loginUser = { loginUser }
                  loggedIn = { loggedIn } 
                  pickedDog = { pickedDog } 
                  id = { id }
                   />
              ) : (
                  void 0
                  )}
    </div>
  );
}
