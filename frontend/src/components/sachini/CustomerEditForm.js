// CustomerEditForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderMain from "./HeaderAllCus";

function CustomerEditForm() {
  const { nic } = useParams();
  const [customer, setCustomer] = useState({});
  const [editedCustomer, seteditedCustomer] = useState({});
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUserDetails, setEditedUserDetails] = useState({});
  
  useEffect(() => {
    // Fetch customer details based on the NIC
    axios.get(`http://localhost:8070/customer/getUser/${nic}`)
      .then((response) => {
        setCustomer(response.data.customer);
        seteditedCustomer({ ...response.data.customer });
      })
      .catch((error) => {
        console.error('Error fetching customer details', error);
      });
  }, [nic]);

  /*
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomer((prevCustomer) => ({
      ...editedCustomer,
      [name]: value,
    }));
    validateField(name, value);
  };
*/

const handleInputChange = (e) => {
  const { name, value } = e.target;
  seteditedCustomer({ ...editedCustomer, [name]: value });
  validateField(name, value);
};


  const handleUpdateCustomer = () => {
    // Check if all fields are valid
    if (allFieldsValid()) {
      // Make an API request to update the customer
      axios
        .put(`http://localhost:8070/customer/updateCus/${nic}`, editedCustomer)
        .then((response) => {
          if (response.status === 200) {
            // Customer updated successfully
            alert('Customer updated successfully');
            
            navigate('/customer-list');
          }
        })
        .catch((error) => {
          console.error('Error updating customer', error);
          
          alert('Error updating customer');
        });
    } else {
      alert('Please fix validation errors before updating.');
    }
  };




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





  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div></div>
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
                value={editedCustomer.fname}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[A-Za-z]*$/.test(input)) {
                    seteditedCustomer({ ...editedCustomer, fname: input });
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
                value={editedCustomer.lname}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[A-Za-z]*$/.test(input)) {
                    seteditedCustomer({ ...editedCustomer, lname: input });
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
                  value={editedCustomer.nic}
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
                value={editedCustomer.username}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  // Allow alphanumeric characters only
                  if (
                    !(
                      (charCode >= 65 && charCode <= 90) || 
                      (charCode >= 97 && charCode <= 122) || 
                      (charCode >= 48 && charCode <= 57) 
                    )
                  ) {
                    e.preventDefault(); 
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
                value={editedCustomer.phone}
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  const currentValue = e.target.value;
          
                  if (currentValue.length === 0 && charCode !== 48) {
                    e.preventDefault(); 
                  } else if (currentValue.length > 0 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault(); 
                  }
                }}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^[0-9]*$/.test(input) && input.length <= 10) {
                    seteditedCustomer({ ...editedCustomer, phone: input });
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
                value={editedCustomer.no}
                onChange={(e) => {
                  let input = e.target.value;
                 
                  input = input.replace(/\/+/g, '/');
                  
                  if (input.length > 8) {
                      
                      input = input.slice(0, 8);
                  }
                  seteditedCustomer({ ...editedCustomer, no: input });
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
                value={editedCustomer.street}
                onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/[^A-Za-z\s]/g, '');
                  if (input.length > 50) {
                      input = input.slice(0, 50);
                  }
                  seteditedCustomer({ ...editedCustomer, street: input });
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
                value={editedCustomer.city}
                onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/[^A-Za-z\s]/g, '');
                  if (input.length > 50) {
                      input = input.slice(0, 50);
                  }
                  seteditedCustomer({ ...editedCustomer, city: input });
                  //setStreet(input);
              }}
              onKeyPress={(e) => {
                const charCode = e.charCode;
                if (
                  !(
                    (charCode >= 65 && charCode <= 90) || 
                    (charCode >= 97 && charCode <= 122) || 
                    (charCode >= 48 && charCode <= 57) || 
                    charCode === 32 
                  )
                ) {
                  e.preventDefault();
                }
              }}
            />
            </td>
          </tr>
        </tbody>
      </table>
      
    <button type="button" onClick={handleUpdateCustomer}>Update</button>

    </div>
  </div></div>
  );
}
  {/*return (
    <div>
      <h1>Edit Customer</h1>
      <form>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={editedCustomer.fname || ''}
          onChange={handleInputChange}
        />
        {/* Add similar input fields for other customer details */}
        {/*<button type="button" onClick={handleUpdateCustomer}>Update</button>
      </form>
    </div>
  );
}*/}

export default CustomerEditForm;
