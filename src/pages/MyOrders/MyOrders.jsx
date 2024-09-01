import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {

  const  [data, setData] = useState([]);
  const {url,token} = useContext(StoreContext);  

  const fetchOrders = async ()=>{
    const response = await axios.post(url+ "/api/order/userOrders",{},{headers:{token}});
    setData(response.data.data); 
    // console.log(response.data.data);
  }

  useEffect(()=>{
    if (token) {
        fetchOrders();
    }
  },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
      {data.length > 0 ? (
            data.map((order,index)=>{
            return(
                <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                             if(index=== order.items.length-1){
                                return item.name+" X "+item.quantity
                             }
                             else{
                                return item.name+" X "+item.quantity+", "
                                
                             }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>

                </div>
            )
            })
            ) :(
              <p>No Orders found</p>
          )}
        </div>

    </div>
  )
}

export default MyOrders