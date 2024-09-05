import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display " id="food-display">
      <h2>Top Dishes near your</h2>
      <div className="food-display-list">
        {food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                />
              );
            }
          })
        ) : (
          <p>No Foods at this momoment!!! </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
