import React from 'react';
import './Profile.css';
import { assets } from '../../assets/frontend_assets/assets';



const Profile = () => {
  return (
    <div className="profile-container">
      <form className="profile-form">
        <div className="profile-header">
          <p className="profile-title">My Profile</p>
        </div>

        {/* Flex container for the rows */}
        <div className="profile-content">
          {/* Left side: Image upload and username */}
          <div className="profile-left">
            <div className="profile-image-section">
              <label htmlFor="image" className="image-label">
                <img src={assets.user_default} alt="Profile" className="profile-image" />
                <span className="upload-text">Upload</span>
                <input type="file" id="image" hidden required />
              </label>
            </div>
            <div className="profile-input-section">
              <label className="profile-label">Username</label>
              <input type="text" className="profile-input" placeholder="Enter username" />
            </div>
          </div>

          {/* Right side: Password section */}
          <div className="profile-right">
            <div className="profile-password-section">
              <p className="password-title">Password Section</p>
              <label className="profile-label">Current Password</label>
              <input type="password" className="profile-input" placeholder="Enter current password" />
              <label className="profile-label">New Password</label>
              <input type="password" className="profile-input" placeholder="Enter new password" />
              <label className="profile-label">Confirm New Password</label>
              <input type="password" className="profile-input" placeholder="Confirm new password" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button type="button" className="cancel-btn">Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
