import { createContext, useCallback, useEffect, useMemo, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems,setCartItems] = useState({});
  const url  = "http://localhost:4000"
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [menu_list, setMenuList] = useState([]);
  const [user, setUser] = useState("");
  const [userProfileDetails, setUserProfileDetails] = useState(() => {
    const savedProfile = localStorage.getItem("userProfileDetails");
    return savedProfile ? JSON.parse(savedProfile) : {};
  });


  //add to cart

  const addToCart =  useCallback (async (itemId) => {
    console.log("Adding item to cart:", itemId); // Add this line
    if (!itemId) return; // Exit if itemId is undefined
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  }, [token]);
  


 //remove to cart
 const removeFromCart = useCallback (async (itemId) => {
  console.log("Removing item from cart:", itemId); // Add this line
  if (!itemId) return; // Exit if itemId is undefined
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  if (token) {
    await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  }
}, [token]);

  
 //get from cart

  const getTotalCartAmount = useCallback (()=> {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
      const itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      } else {
        console.warn(`Item with id ${item} not found in food_list.`);
      }
      }

    }
    return totalAmount;
  }, [cartItems, food_list])

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
      console.log("Food List:", response.data.data); // Add here
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  
  //fetch menu list 
  const fetchMenuList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      const foods = response.data.data;
  
      // Extract unique categories and their corresponding images
      const uniqueCategories = [];
      const categorySet = new Set();
  
      foods.forEach(food => {
        if (!categorySet.has(food.category)) {
          categorySet.add(food.category);
          uniqueCategories.push({
            menu_name: food.category,
            menu_image: `${url}/images/${food.image}`
          });
        }
      });
  
      setMenuList(uniqueCategories);
  
      // Log the menu_list after setting it
      console.log("Menu List:", uniqueCategories);
  
    } catch (error) {
      console.error("Error fetching menu list:", error);
    }
  };
  

  
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
      console.log("Cart Items:", response.data.cartData); // Add here
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCartItems({}); 
    }
  };
  




  useEffect(()=>{
  async function loadData(){
    await fetchMenuList()
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
      localStorage.setItem("userProfileDetails", JSON.stringify(userProfileDetails));
   }
  }
  loadData();
  }, [userProfileDetails])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    menu_list,
    user,
    setUser,
    userProfileDetails,
    setUserProfileDetails
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
