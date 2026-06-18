import React from 'react';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <p>
            <strong>Name:</strong>
            {' '}
            John Doe
          </p>
          <p>
            <strong>Email:</strong>
            {' '}
            john@example.com
          </p>
          <p>
            <strong>Bio:</strong>
            {' '}
            Food enthusiast and recipe lover
          </p>
        </div>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
