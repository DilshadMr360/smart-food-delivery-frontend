import React, { useEffect, useState } from 'react';
import './Profile.css';
import { assets } from '../../assets/frontend_assets/assets';
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import axios from 'axios';

const Profile = () => {
  const { userProfileDetails, setUserProfileDetails, token, url } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(userProfileDetails.name || '');
  const [email, setEmail] = useState(userProfileDetails.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfileDetails");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfileDetails(profile);
      setUsername(profile.name);
      setEmail(profile.email);
      console.log("Loaded user profile:", profile); // <-- Check if `id` is present
    }
  }, [setUserProfileDetails]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log("Image selected:", file);
      console.log("Image URL:", URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Log the current state before submitting
  console.log("User ID before submit:", userProfileDetails.id);
  console.log("Token before submit:", token);

  const formData = new FormData();
  formData.append('userId', userProfileDetails.id);
  formData.append('name', username);
  if (currentPassword && newPassword && confirmNewPassword) {
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);
    formData.append('confirmNewPassword', confirmNewPassword);
  }
  if (image) formData.append('profileImage', image);

  try {
    const response = await axios.patch(`${url}/api/user/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': token,
      },
    });

    console.log("Server response:", response.data);

    if (response.data.success) {
      // Update the state and local storage
      console.log(response.data.user);
      setUserProfileDetails(response.data.user);
      localStorage.setItem("userProfileDetails", JSON.stringify(response.data.user));

      // Log the updated state
      console.log("Updated User Profile:", response.data.user);
      console.log("Local Storage after update:", JSON.parse(localStorage.getItem("userProfileDetails")));

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      alert("Profile updated successfully!");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error updating profile:", error.response || error.message);
    alert("Failed to update profile.");
  }
};

  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="profile-header">
          <p className="profile-title">My Profile</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-content">
          <div className="profile-left">
            <div className="profile-image-section">
              <label htmlFor="image" className="image-label">
                
                <img
                // src={image ? URL.createObjectURL(image) : assets.user_default}
                  src={image ? URL.createObjectURL(image) : (userProfileDetails.profileImage ? `http://localhost:4000/profiles/${userProfileDetails.profileImage}` : assets.user_default)}
                  alt="Profile"
                  className="profile-image"
                />
                <span className="upload-text">Upload</span>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="profile-input-section">
              <label className="profile-label">Username</label>
              <input
                type="text"
                className="profile-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="profile-label">Email</label>
              <input
                type="email"
                className="profile-input"
                placeholder="Enter Email"
                value={email}
                disabled
              />
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-password-section">
              <p className="password-title">Password Section</p>
              <label className="profile-label">Current Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <label className="profile-label">New Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="profile-label">Confirm New Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="password-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
