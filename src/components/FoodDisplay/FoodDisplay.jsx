import React, { useContext, useMemo } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

   // Memoize the filtered list of foods
   const filteredFoodList = useMemo(() => {
    return food_list.filter((item) => category === "All" || category === item.category);
  }, [food_list, category]);
  
  return (
    <div className="food-display " id="food-display">
      <h2>Top Dishes near your</h2>
      <div className="food-display-list">
            {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))
        ) : (
          <p>No Foods at this moment!!!</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
