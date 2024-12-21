import React, { useContext, useCallback } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/storeContext'

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  // Use useCallback to memoize the setCategory function
  const handleCategoryChange = useCallback(
    (itemName) => {
      setCategory((prev) => (prev === itemName ? "All" : itemName));
    },
    [setCategory]
  );

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>
      <div className='explore-menu-list'>
        {menu_list.length > 0 ? (
          menu_list.map((item, index) => (
            <div onClick={() => handleCategoryChange(item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.menu_name ? "active" : ""} src={`${item.menu_image}`} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))
        ) : (
          <p>No Foods at this moment!!!</p>
        )}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
