import React, { useState, useEffect } from 'react';
import './filterpanel.css';

const FilterPanel = ({ 
  categories, 
  cities, 
  features, 
  filters, 
  onFilterChange,
  onReset 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFeatureChange = (featureId) => {
    const updatedFeatures = localFilters.features.includes(featureId)
      ? localFilters.features.filter(f => f !== featureId)
      : [...localFilters.features, featureId];

    const newFilters = { ...localFilters, features: updatedFeatures };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (e) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    const newFilters = { ...localFilters, rating: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <label>
          City:
          <select
            name="city"
            value={localFilters.city}
            onChange={handleSelectChange}
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label>
          Category:
          <select
            name="category"
            value={localFilters.category}
            onChange={handleSelectChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label>
          Minimum Rating:
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={localFilters.rating || ''}
            onChange={handleRatingChange}
            placeholder="Any Rating"
          />
        </label>
      </div>

      <div className="filter-section">
        <h4>Features:</h4>
        <div className="features-grid">
          {features.map(feature => (
            <label key={feature.id} className="feature-checkbox">
              <input
                type="checkbox"
                checked={localFilters.features.includes(feature.id)}
                onChange={() => handleFeatureChange(feature.id)}
              />
              {feature.name}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={onReset} className="reset-button">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;