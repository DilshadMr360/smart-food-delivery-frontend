import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

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


    const onLogin =async (event)=>{
        event.preventDefault();
        let newUrl = url;
        if (currentstate==='Login') {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);
         if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)
         }
         else{
            alert(response.data.message)
         }
    }

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