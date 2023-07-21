import React, { useState, useEffect } from 'react';

export default function FetchFavourites({ favListId, personalFavs }) {
  const [isThereAnyData, setIsThereAnyData] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData(favs) {
      try {
        const response = await fetch(`http://localhost:3000/v1/api/animals/${favs}`);
        const data = await response.json();
        // Handle the response data here
        if (data && data.length > 0) {
          setFetchedData(data);
          setIsThereAnyData(true);
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);
      }
    }
  
    fetchData(favListId);
  }, [favListId]);
  
  console.log(personalFavs)

  return (
    <div>
      {personalFavs ? (
        <div>
          {fetchedData.map((element) => (
            <div key={element.name}>
              <h2>{element.name}</h2>
              <div className="dog-image-container">
                <img src={element.image} alt="No img" className="dog-image" />
              </div>
            </div>
          ))}
        </div>
      ) : void 0}
    </div>
  );
}
