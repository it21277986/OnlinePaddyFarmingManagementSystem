import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/UserProfile.css'; // Import the CSS file for EditUserProfile
import HeaderMain from "./HeaderAllCus";

function EditUserProfile() {
  const navigate = useNavigate();
  const { nic } = useParams();
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});


  useEffect(() => {
    axios
      .get(`http://localhost:8070/customer/getUser/${nic}`)
      .then((response) => {
        setEditedUserDetails(response.data.customer);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile', error);
      });
  }, [nic]);


  const validateField = (fieldName, value) => {
    const errors = { ...validationErrors };
  
    switch (fieldName) {
      case 'fname':
      case 'lname':
        if (!/^[A-Za-z]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'username':
        if (!/^[A-Za-z0-9]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters and numbers';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'phone':
        if (!/^[0-9]*$/.test(value) || value.length !== 10) {
          errors[fieldName] = 'Enter a valid 10-digit phone number';
        } else {
          delete errors[fieldName];
        }
        break;
  
        case 'no':
          if (!/^\d{1,8}(\/\d{1,8})?$/.test(value)) {
            errors[fieldName] = 'Enter numbers only, optionally followed by a single "/" character';
          } else {
            delete errors[fieldName];
          }
          break;
          
        
  
      case 'street':
        if (!/^[A-Za-z0-9\s]*$/.test(value) || value.length > 50) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces, up to 50 characters';
        } else {
          delete errors[fieldName];
        }
        break;
          
  
      case 'city':
        if (!/^[A-Za-z0-9\s]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces';
        } else {
          delete errors[fieldName];
        }
        break;
  
      // Add validation cases for other fields as needed
  
      default:
        break;
    }
  
    setValidationErrors(errors);
  };
  

  const allFieldsValid = () => {
    for (const fieldName in validationErrors) {
      if (validationErrors.hasOwnProperty(fieldName)) {
        if (validationErrors[fieldName]) {
          return false;
        }
      }
    }
    return true;
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails({ ...editedUserDetails, [name]: value });
    validateField(name, value);
  };

  /*const handleSave = () => {
    axios
      .put(`http://localhost:8070/customer/updateCus/${nic}`, editedUserDetails)
      .then((response) => {
        console.log('User details updated successfully');
        navigate(`/getUser/${nic}`); 
      })
      .catch((error) => {
        console.error('Error updating user profile', error);
      });
  };

  */

  const handleSave = () => {
    if (allFieldsValid() && editedUserDetails.phone.length === 10) {
      axios
        .put(`http://localhost:8070/customer/updateCus/${nic}`, editedUserDetails)
        .then((response) => {
          console.log('User details updated successfully');
          navigate(`/getUser/${nic}`);
        })
        .catch((error) => {
          console.error('Error updating user profile', error);
        });
    } else {
      
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div className="profile-container-sachini">
      <h2>Edit Profile</h2>
      <div className="profile-info-sachini">
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              <input
                type="text"
                name="fname"
                value={editedUserDetails.fname}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[A-Za-z]*$/.test(input)) {
                    setEditedUserDetails({ ...editedUserDetails, fname: input });
                  }
                }}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  if (
                    (charCode < 65 || charCode > 90) &&
                    (charCode < 97 || charCode > 122)
                  ) {
                    e.preventDefault();
                  }
                }}
                />
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <input
                type="text"
                name="lname"
                value={editedUserDetails.lname}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[A-Za-z]*$/.test(input)) {
                    setEditedUserDetails({ ...editedUserDetails, lname: input });
                  }
                }}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  if (
                    (charCode < 65 || charCode > 90) &&
                    (charCode < 97 || charCode > 122)
                  ) {
                    e.preventDefault();
                  }
                }}
                />
            </td>
            </tr>
            <tr>
              <td>NIC</td>
              <td>
                <input
                  type="text"
                  name="nic"
                  disabled
                  value={editedUserDetails.nic}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
        
            <tr>
            <td>Username</td>
            <td>
              <input
                type="text"
                name="username"
                value={editedUserDetails.username}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  // Allow alphanumeric characters only
                  if (
                    !(
                      (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
                      (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
                      (charCode >= 48 && charCode <= 57) // Numbers (0-9)
                    )
                  ) {
                    e.preventDefault(); // Prevent entering special characters
                  }
                }}
                onChange={handleInputChange}
                />
            </td>
            </tr>

            <tr>
            <td>Phone</td>
            <td>
              <input
                type="text"
                name="phone"
                value={editedUserDetails.phone}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  const currentValue = e.target.value;
          
                  if (currentValue.length === 0 && charCode !== 48) {
                    e.preventDefault(); // Prevent entering anything other than '0' as the first character
                  } else if (currentValue.length > 0 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault(); // Prevent entering non-numeric characters
                  }
                }}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[0-9]*$/.test(input) && input.length <= 10) {
                    setEditedUserDetails({ ...editedUserDetails, phone: input });
                  }
                }}
              />
              {validationErrors.phone && (
                <div className="error-message-sachini">{validationErrors.phone}</div>
              )}
            </td>
            </tr>
           <tr>
            <td>No</td>
            <td>
              <input
                type="text"
                name="no"
                value={editedUserDetails.no}
                onChange={(e) => {
                  let input = e.target.value;
                 
                  input = input.replace(/\/+/g, '/');
                  
                  if (input.length > 8) {
                      
                      input = input.slice(0, 8);
                  }
                  setEditedUserDetails({ ...editedUserDetails, no: input });
              }}
              onKeyPress={(e) => {
                  const charCode = e.charCode;
                  const input = e.target.value;
                  
                  if (charCode >= 48 && charCode <= 57) {
                      
                      if (input.indexOf('/') === -1) {
                          
                          if (input.length >= 4) {
                              e.preventDefault();
                          }
                      } else {
                          
                          const parts = input.split('/');
                          if (parts.length === 2) {
                              if (parts[0].length >= 4 || parts[1].length >= 4) {
                                  e.preventDefault();
                              }
                          } else {
                              e.preventDefault();
                          }
                      }
                  } else if (charCode === 47) {
                      
                      if (input.indexOf('/') !== -1) {
                          
                          e.preventDefault();
                      }
                  } else {
                      e.preventDefault(); 
                  }
              }}
          />
            </td>
          </tr>
          <tr>
            <td>Street</td>
            <td>
              <input
                type="text"
                name="street"
                value={editedUserDetails.street}
                onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/[^A-Za-z\s]/g, '');
                  if (input.length > 50) {
                      input = input.slice(0, 50);
                  }
                  setEditedUserDetails({ ...editedUserDetails, street: input });
                  //setStreet(input);
              }}
              onKeyPress={(e) => {
                  const charCode = e.charCode;
                  if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                      e.preventDefault();
                  }
              }}
          />
            </td>
          </tr>
          <tr>
            <td>City/Locality</td>
            <td>
              <input
                type="text"
                name="city"
                value={editedUserDetails.city}
                onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/[^A-Za-z\s]/g, '');
                  if (input.length > 50) {
                      input = input.slice(0, 50);
                  }
                  setEditedUserDetails({ ...editedUserDetails, city: input });
                  //setStreet(input);
              }}
              onKeyPress={(e) => {
                const charCode = e.charCode;
                if (
                  !(
                    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
                    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
                    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
                    charCode === 32 // Space
                  )
                ) {
                  e.preventDefault();
                }
              }}
            />
            </td>
          </tr>
          {/* Add more rows for other fields */}
        </tbody>
      </table>
        
      <button
        type="button"
        onClick={handleSave}
        className="centered-button-sachini"
        //disabled={!allFieldsValid()} // Disable the button if not all fields are valid
      >
        Save Changes
      </button>

      </div>
    </div></div>
  );
}

export default EditUserProfile;
