import React, { useEffect, useState } from 'react';
import { GiCamel, GiElephant, GiIndiaGate, GiIndianPalace, GiTigerHead } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";
import bg1 from '../Images/bg1.jpg';

const SearchBar = () => {
  const [states, setStates] = useState([]); // Store fetched states
  const [search, setSearch] = useState(''); // Store the search input
  const [filteredStates, setFilteredStates] = useState([]); // Store filtered states
  const [currentIcon, setCurrentIcon] = useState(0); // State to track which icon should be shown
  const [showSuggestions, setShowSuggestions] = useState(false); // Control visibility of suggestions

  // Fetch states of India from API on component mount
  useEffect(() => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="); // Replace with your API key

    fetch('https://api.countrystatecity.in/v1/countries/IN/states', { headers })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched states:', data); // Log the data
        setStates(data); // Set the states from API response
      })
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  // Handle search input change and filter states
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    setShowSuggestions(true);

    if (query) {
      const filtered = states.filter(state =>
        state.name.toLowerCase().startsWith(query.toLowerCase()) // Filter states that start with the query
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]); // Hide suggestions when query is empty
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (stateName) => {
    setSearch(stateName); // Set input field to selected state's name
    setShowSuggestions(false); // Hide suggestions
  };

  // Toggle the icon every 10 seconds
  useEffect(() => {
    const icons = [0, 1, 2, 3, 4];

    const interval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 5000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Determine which icon to display based on currentIcon state
  const getIcon = () => {
    switch (currentIcon) {
      case 0:
        return <GiIndianPalace className='text-gray-400 text-2xl animated-icon' />;
      case 1:
        return <GiIndiaGate className='text-gray-400 text-2xl animated-icon' />;
      case 2:
        return <GiElephant className='text-gray-400 text-2xl animated-icon' />;
      case 3:
        return <GiTigerHead className='text-gray-400 text-2xl animated-icon' />;
      case 4:  
        return <GiCamel className='text-gray-400 text-2xl animated-icon' />;
      default:
        return null;
    }
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center' style={{ backgroundImage: `url(${bg1})` }}>
      <div className='space-y-4 w-full h-full flex flex-col items-center'>
        <div className='mt-96 md:mt-72 text-5xl flex font-Yatra '>
          भारत के राज्य <span className='ml-2 animate-floating text-yellow-400'><IoSearchSharp /></span>
        </div>

        {/* Search bar with autocomplete */}
        <div className='w-3/6 items-center shadow-slate-800 shadow-2xl rounded-3xl bg-white flex flex-row space-x-2 justify-center'>
          {getIcon()}
          <input
            className='w-5/6 h-10 focus:outline-none focus:ring-0 focus:border-none'
            placeholder='Search States of India...'
            type="text"
            value={search}
            onChange={handleSearch}
            onClick={() => setShowSuggestions(true)} // Show suggestions when input is clicked
            aria-label='Search States of India'
          />
          <IoSearchSharp className='text-gray-400 text-3xl' />
        </div>

        {/* Autocomplete suggestions */}
        {showSuggestions && filteredStates.length > 0 && (
          <ul className='bg-white shadow-md mt-2 w-3/6 max-h-60 overflow-y-auto rounded-lg'>
            {filteredStates.map((state) => (
              <li
                key={state.id}
                className='p-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSuggestionClick(state.name)}
              >
                {state.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
