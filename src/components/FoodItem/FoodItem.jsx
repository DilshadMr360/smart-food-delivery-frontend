import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({ id, name, price, quantity, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [stockMessage, setStockMessage] = useState("");

  const handleAddToCart = async () => {
    // Check if item can be added
    if (!cartItems[id] || cartItems[id] < quantity) {
      await addToCart(id);
      setStockMessage(""); // Clear the stock message when item is added
    } else {
      setStockMessage("Oops! Stock is finished!");
    }
  };

  const handleRemoveFromCart = async () => {
    await removeFromCart(id);
    // Clear stock message when item quantity is reduced
    setStockMessage("");
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt={name} />
        {quantity > 0 ? (
          !cartItems[id] ? (
            <img className="add" onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to cart" />
          ) : (
            <div className="food-item-counter">
              <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="Remove from cart" />
              <p>{cartItems[id]}</p>
              <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add to cart" />
            </div>
          )
        ) : (
          <p className="available-soon">Available Soon</p>
        )}
      </div>
      {stockMessage && <p className="stock-message" style={{ color: 'red' }}>{stockMessage}</p>}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        <p>Available {quantity}</p>
      </div>
    </div>
  );
};

export default FoodItem;
