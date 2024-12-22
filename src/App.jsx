import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/header/header';
import SearchBar from './components/searchbar/searchbar';
import FilterPanel from './components/filterpanel/filterpanel';
import PlaceCard from './components/placecard/placecard';
import { mockPlaces, mockCategories, mockCities, mockFeatures } from './data/mockdata';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    rating: 0,
    features: []
  });

  
  const filteredPlaces = useMemo(() => {
    return mockPlaces.filter(place => {
   
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchMatch = 
          place.name.toLowerCase().includes(searchLower) ||
          place.description.toLowerCase().includes(searchLower) ||
          place.city.toLowerCase().includes(searchLower);
        
        if (!searchMatch) return false;
      }

   
      if (filters.city && place.city !== filters.city) {
        return false;
      }


      if (filters.category && place.category !== filters.category) {
        return false;
      }

    
      if (filters.rating > 0 && place.rating < Number(filters.rating)) {
        return false;
      }

      
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(feature => 
          place.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (newFilters) => {
    console.log('New filters applied:', newFilters);
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      city: '',
      category: '',
      rating: 0,
      features: []
    });
    setSearchTerm('');
  };


  useEffect(() => {
    console.log('Current filters:', filters);
    console.log('Filtered places:', filteredPlaces);
  }, [filters, filteredPlaces]);

  return (
    <div className="container">
      <Header />
      <SearchBar 
        value={searchTerm} 
        onChange={handleSearch}
      />
      <FilterPanel
        categories={mockCategories}
        cities={mockCities}
        features={mockFeatures}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      <div className="places-grid">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))
        ) : (
          <div className="no-results">
            No places found matching your criteria. Try adjusting your filters.
          </div>
        )}
      </div>

    </div>

  );
};

export default App;
