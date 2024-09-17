import React, { useState } from 'react';
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const ApiPractice = () => {
  const [user, setUser] = useState(null);  
  const [id, setId] = useState(1);  

  
  const fetchData = (fetchId) => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${fetchId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  
  const handleFetchClick = () => {
    fetchData(id);  
  };

 
  const handleLeftArrowClick = () => {
    const newId = id > 1 ? id - 1 : 1;  
    setId(newId);
    fetchData(newId);  
  };

  
  const handleRightArrowClick = () => {
    const newId = id + 1; 
    setId(newId);
    fetchData(newId); 
  };

  
  const handleSearchClick = () => {
    const searchId = parseInt(document.getElementById('searchId').value); 
    if (!isNaN(searchId)) {
      setId(searchId);
      fetchData(searchId);  
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className='w-full h-20 bg-slate-300 flex pl-5 items-center justify-between'> 
        <button
          className='h-10 w-20 rounded-xl shadow-sky-950 bg-blue-500 shadow-md active:scale-90 active:bg-blue-400 transition-transform duration-200'
          onClick={handleFetchClick}
        >
          Fetch Api
        </button>
        <div className='text-5xl ml-32 text-blue-500 flex flex-row'>
          <BiSolidLeftArrowSquare onClick={handleLeftArrowClick} className='cursor-pointer' />
          <BiSolidRightArrowSquare onClick={handleRightArrowClick} className='cursor-pointer' />
        </div>
        <div className='mr-10 flex flex-row'>
          <textarea id="searchId" className='flex justify-center items-center placeholder:Search...' />
          <IoSearchOutline onClick={handleSearchClick} 
          className='cursor-pointer ml-2 text-4xl bg-blue-500 rounded-lg mt-1' />
        </div>
      </div>

      {/* Display Section */}
      <div className='flex justify-center items-center bg-center h-[550px]'>
        {user ? (
          <div className='w-1/5 h-4/6 bg-slate-200 p-4 rounded shadow-xl flex flex-col items-center'>
            {/* Display thumbnail image */}
            <img
              src={user.thumbnailUrl}
              alt={user.title}
              className='w-48 h-48 object-cover rounded-full mb-4'
            />
            {/* Display other properties */}
            <p className='text-lg font-semibold text-center'>Title: {user.title}</p>
            <p className='text-sm'>Album ID: {user.albumId}</p>
            <p className='text-sm'>ID: {user.id}</p>
            <a href={user.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline mt-2'>
              {/* View Full Image */}
            </a>
          </div>
        ) : (
          <div className='text-black text-3xl'>No data fetched yet. Click "Fetch Api" to start.</div>
        )}
      </div>
    </div>
  );
};

export default ApiPractice;
