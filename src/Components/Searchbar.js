import React, { useState } from 'react';
import '../Stylesheet/searchbar.css';
import { useNavigate } from 'react-router-dom';

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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
   <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SearchBar;
