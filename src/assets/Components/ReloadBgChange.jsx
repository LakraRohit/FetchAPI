import React, { useEffect, useState } from 'react';
import LodingPng from '../Images/LoadingGiff.gif';

const ReloadBgChange = () => {
  const [dogImage, setDogImage] = useState('');

  const fetchDogImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        setDogImage(data.message); 
      })
      .catch((error) => console.error('Error fetching the dog image:', error));
  };

  useEffect(() => {
    fetchDogImage(); 
  }, []); 

  return (
    
    <div className="h-screen  flex flex-col justify-center items-center">
      {dogImage ? (
        <img src={dogImage} alt="Random Dog" className="rounded-lg shadow-lg" />
      ) : (
            <div className='flex flex-col justify-center items-center'>
                <h1>Loading...</h1>
                <img className='w-10' src={LodingPng} alt="Loading" />
            </div>

        )}
    </div>
  );
};

export default ReloadBgChange;
