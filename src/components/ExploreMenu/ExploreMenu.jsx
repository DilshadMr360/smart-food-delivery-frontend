import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/storeContext'

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy the clients as much as we can.</p>
      <div className='explore-menu-list'>
{menu_list.length > 0 ? (
        menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.menu_name ? "active" : ""} src={`${item.menu_image}`} alt="" />
              <p>{item.menu_name}</p>
            </div>
          )
        })
        ) :(
          <p>No Foods at this momoment!!! </p>
      )}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
