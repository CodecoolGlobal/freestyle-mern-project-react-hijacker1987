import { React, useState } from 'react';

export default function Favourite() {
    const [ favourite, setFavourite ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/v1/api/animals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favourite)
            });

            if (!response.ok) {
            throw new Error('Request failed');
            }
            const result = await response.json();
            console.log('Post created:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div>Favourite</div>
  )
}
