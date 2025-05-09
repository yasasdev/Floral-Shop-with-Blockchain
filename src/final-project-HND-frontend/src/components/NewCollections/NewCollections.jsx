import React, { useState } from 'react';
import './NewCollections.css';
import new_collections from '../Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {
  return (
    <div className='new-collections'>
      <div className='collections-header'>
        <h1>NEW COLLECTIONS</h1>
        <div className='divider'></div>
        <p className='collections-subtitle'>Discover our latest arrivals, curated for the modern wardrobe</p>
      </div>
      
      <div className="collections">
        {new_collections.map((item, i) => {
          return (
            <CollectionItem 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

const CollectionItem = ({ id, name, image, new_price, old_price }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="collection-item" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="item-image-container">
        <img src={image} alt={name} className="item-image" />
        {isHovered && (
          <div className="item-overlay">
            {/* <button className="add-to-cart-btn">Add to Cart</button> */}
          </div>
        )}
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <div className="item-price">
          <span className="new-price">${new_price}</span>
          <span className="old-price">${old_price}</span>
        </div>
      </div>
    </div>
  );
};

export default NewCollections;