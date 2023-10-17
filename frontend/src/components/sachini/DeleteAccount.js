import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import "./styles/DeleteAccount.css";
import HeaderMain from "./HeaderAllCus";

function DeleteAccount() {
  const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
  const navigate = useNavigate();

  
  const handleRemoveAccount = () => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to remove your account?');
    
    if (confirmDelete) {
      // Make an API call to delete the account
      axios
        .delete(`http://localhost:8070/customer/deleteCus/${loggedInUserNIC}`)
        .then((response) => {
          // Handle success (account deleted)
          alert('Account removed successfully');
          // Navigate to the registration page
          navigate('/register'); // Use navigate to change the route
        })
        .catch((error) => {
          // Handle error
          console.error('Error removing account', error);
          alert('Error removing account');
        });
    } else {
      // User clicked "Cancel" in the confirmation dialog, do nothing
    }
  };

  

  const handleCancel = () => {
    // Navigate back to the profile page
    navigate(`/getUser/${loggedInUserNIC}`);
  };

  const handleLogout = () => {
    // Clear user authentication state (log out)
    localStorage.removeItem('loggedInUserNIC');
    // Navigate to the login page
    navigate('/loginCus');
  };

  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div className="delete-account-container-sachini"> {/* Add a class for styling */}
      <h2>Delete Account</h2>
      <p>Are you sure you want to remove your account?</p>
      <button onClick={handleRemoveAccount}>Remove Account</button>
      <button onClick={handleCancel} className="cancel-button-sachini">Cancel</button>
      <button onClick={handleLogout} className="logout-button-sachini">
        Logout
      </button>

    </div></div>
  );
}

export default DeleteAccount;
