import React from 'react';
import './placecard.css';

const PlaceCard = ({ place }) => {
 
  const getPriceClass = (level) => {
    switch (level) {
      case '€': return 'price-tag price-low';
      case '€€': return 'price-tag price-medium';
      case '€€€': return 'price-tag price-high';
      case '€€€€': return 'price-tag price-luxury';
      default: return 'price-tag';
    }
  };

  const capitalizeFirstLetter = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };


  const renderOpeningHours = (hours) => {
    return (
      <div className="opening-hours">
        <h4>Opening Hours:</h4>
        <ul>
          {Object.entries(hours).map(([day, time]) => (
            <li key={day}>
              <strong>{capitalizeFirstLetter(day)}:</strong> {time}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="place-card">
      <div className="place-image-container">
      
        <img src={place.images} alt={place.name} className="place-image" />
        <span className={getPriceClass(place.price_level)}>{place.price_level}</span>
        <span className="city-tag">{place.city}</span>
      </div>

      <div className="place-content">
        <div className="place-header">
          <h3 className="place-title">{place.name}</h3>

          <div className="rating-badge">
            <span className="star-icon">★</span>
            <span>{place.rating}</span>
          </div>
        </div>

        <p>{place.address}</p>
        <p className="place-description">{place.description}</p>
        
    
        {renderOpeningHours(place.openingHours)}

        <div className="features-container">
          {place.features.map(feature => (
            <span key={feature} className="feature-tag">
              {feature.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;