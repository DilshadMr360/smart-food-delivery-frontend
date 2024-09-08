import React, { useContext, useEffect, useState } from 'react';
import './BillingAddress.css';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BillingAddress = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    _id: '' // Include _id for update operations
  });
  const { url, token } = useContext(StoreContext);

  // Fetch the address details from the server
  const fetchOrders = async () => {
    try {
      console.log("Token used for request:", token); // Log the token for debugging

      const response = await axios.get(url + "/api/address/get-address", {
        headers: { token }
      });
      
      console.log("Response data:", response.data);
      const addresses = response.data.data;

      if (addresses && addresses.length > 0) {
        // Assuming the first address is the latest due to sorting in backend
        const latestAddress = addresses[0];
        const { _id, firstName, lastName, email, street, city, state, zipcode, country, phone } = latestAddress;
        setData({
          _id,
          firstName,
          lastName,
          email,
          street,
          city,
          state,
          zipcode,
          country,
          phone,
        });
      }
    } catch (error) {
      console.error("Error fetching billing address", error);
    }
  };

  // Update the address on the server
  const updateAddress = async (event) => {
    event.preventDefault();
    try {
      const addressId = data._id; // Address ID from state
      const response = await axios.put(`${url}/api/address/update-address/${addressId}`, data, {
        headers: { token }
      });
      console.log("Update response:", response.data);
      if (response.data.success) {
        // alert('Address updated successfully!');
        toast.success("Address updated successfully!");

      } else {
        alert('Error updating address');
      }
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="billing-container">
      <h2>Address Information</h2>
      <form className="billing-form" onSubmit={updateAddress}>
        <div className="form-row">
          <input
            type="text"
            placeholder="First name"
            className="input-field"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last name"
            className="input-field"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Street"
            className="input-field"
            value={data.street}
            onChange={(e) => setData({ ...data, street: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="City"
            className="input-field"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            className="input-field"
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Zip Code"
            className="input-field"
            value={data.zipcode}
            onChange={(e) => setData({ ...data, zipcode: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            className="input-field"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Phone"
            className="input-field"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>

        <div className="password-actions">
          <button type="button" className="cancel-btn" onClick={() => window.location.reload()}>Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default BillingAddress;
