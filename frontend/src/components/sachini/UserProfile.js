import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/UserProfile.css';
import AllCustomers from './AllCustomers';
import pencilIconUrl from "./images/edit.png";
import settingsIconUrl from "./images/settings.png";
import AllRequests from './AllRequests';
import viewRequest from "./images/viewRequest.png";
import HeaderMain from "./HeaderAllCus";

function UserProfile() {
  const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
  const [userDetails, setUserDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUserNIC) {
      navigate('/loginCus');
    } else {
      axios
        .get(`http://localhost:8070/customer/getUser/${loggedInUserNIC}`)
        .then((response) => {
          setUserDetails(response.data.customer);
        })
        .catch((error) => {
          console.error('Error fetching user profile', error);
        });
    }

    const savedImage = localStorage.getItem(`userProfileImage_${loggedInUserNIC}`);
    console.log('Saved Image:', savedImage);
    if (savedImage) {
      console.log('Setting selected image from localStorage');
      setSelectedImage(savedImage);
    } else {
      console.log('No saved image found in localStorage'); // Add this line for debugging
    }
  }, [loggedInUserNIC, navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem(`userProfileImage_${loggedInUserNIC}`, reader.result);
      setSelectedImageFile(file);
      setShowSaveButton(true);
      setShowRemoveButton(true);
    };
  };

  const removeProfileImage = () => {
    localStorage.removeItem(`userProfileImage_${loggedInUserNIC}`);
    setSelectedImage(null);
    setSelectedImageFile(null);
    setShowSaveButton(false);
    setShowRemoveButton(false);
  };

  const openImageSelector = () => {
    fileInputRef.current.click();
  };

  const updateProfileImage = async () => {
    if (!selectedImageFile) {
      console.error('No image selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedImageFile);

    try {
      const response = await axios.put(
        `http://localhost:8070/customer/updateProfileImage/${loggedInUserNIC}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setSelectedImage(response.data.imageUrl);
        setShowSaveButton(false);
      }
    } catch (error) {
      console.error('Error updating profile image', error);
    }
  };

  if (!loggedInUserNIC) {
    return (
      <div>
        <h2>My Profile</h2>
        <AllCustomers userProfileImage={selectedImage} />
        <p>Please <Link to="/loginCus">log in</Link> to view your profile.</p>
      </div>
    );
  }
 

  return (
    <div>
     <HeaderMain/>
     <br></br><br></br><br/><br/><br/>
    <div className="background-container2-sachini">
    <div className="profile-container-sachini">
      <h2>My Profile</h2>
      <div className="image-upload-container-sachini">
        <label className="image-upload-label-sachini">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Profile"
              className="profile-picture-sachini"
              onClick={openImageSelector}
            />
          ) : (
            <img
              src="/default-profile.png"
              alt="Profile"
              className="profile-picture-sachini"
              onClick={openImageSelector}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(event) => {
              setShowSaveButton(true);
              handleImageUpload(event);
            }}
            className="image-upload-sachini"
          />

          

          {selectedImage && (
            <button onClick={removeProfileImage} className="cancel-button-sachini">Remove photo</button>
          )}
        </label>
        {showSaveButton && (
          <button onClick={updateProfileImage}>Save Profile Image</button>
        )}
      </div>

      <div className="button-container-sachini">
        
        <img
            src={pencilIconUrl}
            alt="Edit"
            className="edit-button-sachini"
            style={{ width: '30px', height: '30px', marginRight: '10px !important' }}
            onClick={() => {
              navigate(`/updateCus/${userDetails.nic}`);
            }}
          />

        <img
            src={settingsIconUrl}
            alt="Settings"
            className="setting-button-sachini"
            style={{ width: '30px', height: '30px' }}
            onClick={() => {
              navigate(`/deleteCus/${userDetails.nic}`);
            }}
          />  
        
        
      </div>

      <div className="profile-details-sachini">
        <div className="profile-info-sachini">
          <table>
            <tbody>
              <tr>
                <td className="title-sachini">First Name</td>
                <td>{userDetails.fname}</td>
              </tr>
              <tr>
                <td className="title-sachini">Last Name</td>
                <td>{userDetails.lname}</td>
              </tr>
              <tr>
                <td className="title-sachini">NIC</td>
                <td>{userDetails.nic}</td>
              </tr>
              <tr>
                <td className="title-sachini">Username</td>
                <td>{userDetails.username}</td>
              </tr>
              <tr>
                <td className="title-sachini">Phone</td>
                <td>{userDetails.phone}</td>
              </tr>
              <tr>
                <td className="title-sachini">Address</td>
                <td>
                  {userDetails.no}, {userDetails.street}, {userDetails.city}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>

      <div className="button-container-req-sachini">
      {loggedInUserNIC && (
        <div>
          <img
            src={viewRequest} // Replace with the path to your image
            alt="Image"
            className="custom-image-sachini"
          />
          <br></br>
          <Link to={`/checkNIC/${loggedInUserNIC}`}>
            <button className="all-requests-button-sachini">My Requests</button>
          </Link>
        </div>
      )}  
    </div>
    </div>

    <div className="bottom-container-sachini">
    <div className="who-we-are-container-sachini">
          <h1>WHO WE ARE</h1>
    </div>
    <div className="paragraph-container-sachini">
      <p className="left-aligned-paragraph-sachini">
      <b>
      An industry pioneer in innovation and sustainability, Hayleys Agriculture is one of the leading agriculture companies in Sri Lanka 
      and a dominant player in Sri Lanka’s agricultural sector, offering many products and services to the local and export markets. Sri 
      Lankan farmers benefit from a diverse portfolio of agri-solutions, including seed and planting materials, fertilizer, crop protection 
      products, land preparation and harvesting machines, household and industrial pest control services, landscaping solutions, veterinary 
      and animal health products for pet care and livestock markets.  
      </b></p>
      <p className="right-aligned-paragraph-sachini">
      <b>
      As the largest exporter of processed fruits and vegetables in Sri Lanka, we work with an extensive farmer outgrower network across the
      island. We’ve been in F1 flower seed production for export since the 1980s. Our tissue culture laboratory utilises state-of-the-art 
      technology to provide horticultural, edible, and flowering young plants through in-vitro tissue culture technology. 
      The Hayleys Agriculture Training School (HATS) is a registered training institution under the Tertiary and Vocational Education Commission 
      offering agricultural input and technology related training. 
      </b>
      </p>
    </div>
    </div>
  </div></div>

  );
}

export default UserProfile;