import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="search-container">
    <input
      type="text"
      className="search-input"
      placeholder="Search places, cities, or categories..."
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;