import React, { useState } from 'react';

const Favourite = ({ handleFavorite }) => {
    const [favorite, setFavorite] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFavorite(favorite);
        setFavorite('');
    };

    return (
        <div className="favorite">
            <h2>Add to Favorites</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={favorite}
                    onChange={(e) => setFavorite(e.target.value)}
                    placeholder="Enter a favorite"
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Favourite;
