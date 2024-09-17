import React, { useEffect, useState } from 'react';

const FetchApi = () => {

  const [user, setUser] = useState([]);

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json()) 
      .then((data) => {
        // console.log(data);
        setUser(data);  
      })
      .catch((error) => console.error('Error fetching data:', error));  
  };

  useEffect(() => {
    fetchData();  
  }, []);  

  return (
    <div className='container mx-1 md:mx-auto md:my-10 '>
      <h1 className='text-2xl font-bold mb-4'>Fetch API:</h1>
      <div className='grid grid-rows md:grid-cols-4 gap-10'>
        {user
        .slice(0, 20)
        .map((item) => ( 
          <div key={item.id} className='bg-gray-200 p-4 rounded  
          flex flex-col items-center justify-center-center shadow-xl'>

            {/* Display thumbnail image */}
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className='md:w-48 md:h-48 object-cover rounded-full mb-4 '
            />

            {/* Display other properties */}
            <p className='text-lg font-semibold text-center'>Title: {item.title}</p>
            <p className='text-sm'>Album ID: {item.albumId}</p>
            <p className='text-sm'>ID: {item.id}</p>

            {/* Display full image with a link */}
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline mt-2 block'
            >
              {/* View Full Image */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchApi;
