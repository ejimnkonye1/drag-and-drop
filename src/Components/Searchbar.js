import React, { useState } from 'react';
import '../Stylesheet/searchbar.css';
import { useNavigate } from 'react-router-dom';
import Head from './head';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };
  const handleLogout = () => {
    // Perform any logout logic here if needed
    // Navigate to the login page
    navigate('/'); // Use navigate to go to the login page (assuming '/' is the login route)
  };

  return (
    <div >


<header>
        <div class="brand-name">Drag and Drop</div>
        <div className='log'>
        <button class="logout-btn  btn btn-sm btn-danger" onClick={handleLogout} >Logout</button>
        </div>
    </header>
    <div className="search-bar">
      
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
   {/* <button  className='btn btn-danger'>Logout</button> */}
   
    </div>
    </div>
  );
};

export default SearchBar;
