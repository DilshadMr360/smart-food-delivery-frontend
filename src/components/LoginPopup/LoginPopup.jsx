import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken,setUser} = useContext(StoreContext);

    const [currentstate, setCurrentState] = useState('Login');
    const [data, setData] =useState({
        name:"",
        email: "",
        password: ""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onLogin = async (event) => {
        event.preventDefault();
      
        let newUrl = url;
        if (currentstate === 'Login') {
          newUrl += "/api/user/login";
        } else {
          newUrl += "/api/user/register";
        }
      
        try {
          const response = await axios.post(newUrl, data);
      
          if (response.data.success) {
            if (currentstate === 'Login') {
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
                
              const userName = response.data.user?.name || "User"; // Fallback to "User" if name is not available
              setUser(userName);
              localStorage.setItem("userName", userName);
              console.log("Name:", userName);
              console.log("Email:", data.email);
      
              setShowLogin(false); // Close the popup after successful login
              toast.success(response.data.message);

            } else {
              // Registration was successful
              toast.success(response.data.message);
              setCurrentState('Login'); // Switch to the login form
              setData({ name: "", email: "", password: "" }); // Optionally clear the input fields
            }
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error("There was an error!", error);
          alert("Something went wrong. Please try again.");
        }
      };
      

//     useEffect(()=>{
// console.log(data);
//     }, [data])
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentstate}</h2>
                <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentstate==="Login"?<></>: <input type="text" placeholder='Your Name' name='name' onChange={onChangeHandler} value={data.name} id=""  required/>}
                <input type="email" placeholder='Your Email' name="email" onChange={onChangeHandler} value={data.email} id="" required/>
                <input type="password" placeholder='******' name='password' onChange={onChangeHandler} value={data.password} id=""  required/>
            </div>
            <button type='submit' >{currentstate==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" required/>
                <p>By continueing, i agree to the terms of use & privacy policy</p>
            </div>
            {currentstate==="Login"
            ?<p>Create a new Acoount? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            : <p>Alreay have an Account <span onClick={()=>setCurrentState("Login")}>Login Here </span></p>
        }
        </form>
    </div>
  )
}

export default LoginPopup