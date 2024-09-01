import { createContext, useEffect, useState } from "react";
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


  //add to cart

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) =>({...prev,[itemId]:1}));
    } else {
      setCartItems((prev) =>({...prev,[itemId]: prev[itemId]+1}));
    }
    if (token) {
      await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
    }
  };


 //remove to cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) =>({...prev,[itemId]: prev[itemId]- 1}));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId}, {headers:{token}})
      
    }
  };
  
 //get from cart

  const getTotalCartAmount = ()=> {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0){
              let itemInfo = food_list.find((product)=>product._id === item);
      totalAmount += itemInfo.price* cartItems[item];
      }

    }
    return totalAmount;
  }

  const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

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
  

  
  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
    setCartItems(response.data.cartData);
    // console.log("Helloo", response.data.cartData);

  }


  useEffect(()=>{
  async function loadData(){
    await fetchMenuList()
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
   }
  }
  loadData();
  }, [])

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
    setUser
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
