import React from 'react';

export default function FavoritesList({ favorites }) {
  return (
    <div className="favorites-list">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((dog) => (
          <div key={dog.name} className="favorites-list-item">
            <img src={dog.image_link} alt={dog.name} className="favorites-list-item-image" />
            <span className="favorites-list-item-name">{dog.name}</span>
          </div>
        ))
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}
