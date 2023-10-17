
import React, {useState} from "react";
import "./styles/AllCus.css";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

//add


export default function AddCustomer() {

    console.log('AddCustomer component rendered');

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [nic, setNic] = useState("");
    const [no, setNo] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [landOwnerName, setLandOwnerName] = useState("");
    const [province, setProvince] = useState("");
    const [districtCode, setDistrictCode] = useState("");
    const [devisionCode, setDivisionCode] = useState("");
    const [blockNo, setBlockNumber] = useState("");
    const [feildSize, setSize] = useState("");
    const navigate = useNavigate();
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isFormSubmitDisabled, setIsFormSubmitDisabled] = useState(true);


    function sendData(e) {

        e.preventDefault();
        
        const newCustomer = {
            fname,
            lname,
            username,
            nic,
            no,
            street,
            city,
            phone,
            password,
            confirmPassword,
            landOwnerName,
            province,
            districtCode,
            devisionCode,
            blockNo,
            feildSize,
        }

        axios.post("http://localhost:8070/customer/register", newCustomer).then(() => {

            alert("Registered successfully")
            setFname("");
            setLname("");

            console.log('Redirecting to login page...');
            
            navigate("/loginCus");

        }).catch((err) => {

            alert(err)
        })
        
    }

    // Add a function to check if the username already exists
    const checkUsernameExists = async () => {
        try {
        const response = await axios.get(`http://localhost:8070/customer/checkUsername/${username}`);
        setIsUsernameTaken(response.data.usernameExists);
        setIsFormSubmitDisabled(response.data.usernameExists);
        } catch (error) {
        console.error(error);
        
        }
    };


    return (
        <div className="add-customer-container-sachini">
        <div className="flex-container">

        <div>
            <h2 className="registration-topic">
            Unlock the Future of Paddy Farming 
            <br></br><br></br>
            <span className="special-text">
            Register and Grow with Us Today !!
            </span>
            </h2>
        </div>

    <div className="container-sachini">
        <center><h1>Register</h1></center><br/>
        <form method="POST" onSubmit={sendData}>
            <div className="section-sachini">
                <h4 style={{ color: 'black' }}>Personal Details</h4>
                
                <div className="input-group-sachini">
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    title="Enter only letters"
                    required
                    placeholder="Enter First Name"
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[A-Za-z]*$/.test(input)) {
                            setFname(input);
                        }
                    }}
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                            e.preventDefault();
                        }
                    }}
                />
                </div>

                <div className="input-group-sachini">
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    title="Enter only letters"
                    required
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[A-Za-z]*$/.test(input)) {
                            setLname(input);
                        }
                    }}
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                            e.preventDefault();
                        }
                    }}
                />
                </div>


                <div className="input-group-sachini">
                    <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    minLength="5"
                    maxLength="15"
                    placeholder="Enter Username"
                    onChange={(e) => {
                        const enteredValue = e.target.value;
                  
                        
                        if (/^[A-Za-z0-9]*$/.test(enteredValue)) {
                          setUsername(enteredValue);
                        }
                      }}
                      onKeyPress={(e) => {
                        const charCode = e.charCode;
                        const enteredCharacter = String.fromCharCode(charCode);
                  
                        
                        if (/^[A-Za-z0-9]*$/.test(enteredCharacter)) {
                        } else {
                          e.preventDefault(); 
                        }
                      }}
                      onBlur={checkUsernameExists} 
                    />
                    {isUsernameTaken && <p className="username-taken-message">Username is already taken. Please choose another one.</p>}
                </div>

                
                <div className="input-group-sachini">
                <input
                    type="text"
                    id="nic"
                    name="nic"
                    pattern="^(?:\d{12}|\d{12}[Vv])$"
                    title="Enter exactly 12 numbers or 12 numbers followed by 'V'/'v'"
                    required
                    placeholder="Enter NIC No"
                    value={nic}
                    onChange={(e) => {
                         const input = e.target.value;
                         if (/^\d{0,12}[Vv]?$/.test(input)) {
                            setNic(input);
                        }
                    }}
                />
                </div>


                <div className="input-group-sachini address-group">
                    <label htmlFor="address">Address Details</label><br></br>
                    <input
                        type="text"
                        id="no"
                        name="no"
                        placeholder="No"
                        required
                        onChange={(e) => {
                            let input = e.target.value;
                           
                            input = input.replace(/\/+/g, '/');
                            
                            if (input.length > 8) {
                                
                                input = input.slice(0, 8);
                            }
                            setNo(input);
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
                    
                    <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Street/city"
                        required
                        onChange={(e) => {
                            let input = e.target.value;
                            input = input.replace(/[^A-Za-z\s]/g, '');
                            if (input.length > 50) {
                                input = input.slice(0, 50);
                            }
                            setStreet(input);
                        }}
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    
                    <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Enter City"
                    onChange={(e) => {
                    const input = e.target.value.replace(/[^A-Za-z0-9\s]/g, ''); 
                    setCity(input);
                    }}
                    onKeyPress={(e) => {
                    const charCode = e.charCode;
                    
                    if (
                        !(charCode >= 65 && charCode <= 90) && 
                        !(charCode >= 97 && charCode <= 122) && 
                        !(charCode >= 48 && charCode <= 57) && 
                        charCode !== 32 
                    ) {
                        e.preventDefault();
                    }
                    }}
                />

                </div>



                <div className="input-group-sachini">
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength="10"
                    placeholder="Enter phone No"
                    title="Enter a number that starts with 0 and has 9 additional digits"
                    required
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
                            setPhone(input);
                        }
                    }}
                />
                </div>

                <div className="password-fields-sachini">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        minLength="8" 
                        required
                        onChange={(e) => {
                            const password = e.target.value;
                
                            
                            const lettersOnly = /^[a-zA-Z]*$/.test(password);
                
                            
                            const numbersOnly = /^[0-9]*$/.test(password);
                
                            if (password.length < 8 || lettersOnly || numbersOnly) {
                                
                                e.target.setCustomValidity('Weak Password');
                            } else {
                                
                                e.target.setCustomValidity('');
                            }
                
                            setPassword(password);
                        }}
                    />
                        {password && (password.length < 8 || /^[a-zA-Z]*$/.test(password) || /^[0-9]*$/.test(password)) && (
                            <p className="password-strength-sachini">Weak Password</p>
                        )}



                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        minLength="8" 
                        required
                        onBlur={(e) => {
                            const confirmPassword = e.target.value;
                            
                            if (confirmPassword !== password) {
                                e.target.setCustomValidity("Passwords do not match");
                            } else {
                                e.target.setCustomValidity("");
                            }
                        }}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </div>

                </div>
                <div className="section-sachini">
                <h4 style={{ color: 'black' }}>Field Details</h4>
                    
                <div className="input-group-sachini">
                <input
                    type="text"
                    id="landOwnerName"
                    name="landOwnerName"
                    required
                    placeholder="Enter Land Owner Name"
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if (
                            (charCode < 65 || charCode > 90) && // A-Z
                            (charCode < 97 || charCode > 122) && // a-z
                            charCode !== 32 
                        ) {
                        e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(input)) {
                        setLandOwnerName(input);
                        }
                    }}
                />
                </div>


                <div className="input-group-sachini">
                <label htmlFor="deedNo">Deed Number Details</label>
                </div>
                
                <div className="input-group-sachini divisional-code-group">
                <select
                        id="province"
                        name="province"
                        required
                        onChange={(e) => {
                            setProvince(e.target.value);
                        }}
                    >
                        <option value="" disabled selected>Select Province</option>
                        <option value="Central">Central</option>
                        <option value="Eastern">Eastern</option>
                        <option value="North Central">North Central</option>
                        <option value="Northern">Northern</option>
                        <option value="North Western">North Western</option>
                        <option value="Sabaragamuwa">Sabaragamuwa</option>
                        <option value="Southern">Southern</option>
                        <option value="Uva">Uva</option>
                        <option value="Western">Western</option>
                                            
                    </select>

                
                <select
                    id="districtCode"
                    name="districtCode"
                    required
                    onChange={(e) => {
                    setDistrictCode(e.target.value);
                    }}
                >
                    <option value="" disabled selected>Select District Code</option>
                    <option value="AM">Ampara</option>
                    <option value="AD">Anuradhapura</option>
                    <option value="BD">Badulla</option>
                    <option value="BT">Batticaloa</option>
                    <option value="CB">Colombo</option>
                    <option value="GL">Galle</option>
                    <option value="GP">Gampaha</option>
                    <option value="HB">Hambantota</option>
                    <option value="JA">Jaffna</option>
                    <option value="KT">Kalutara</option>
                    <option value="KD">Kandy</option>
                    <option value="KG">Kegalle</option>
                    <option value="KL">Kilinochchi</option>
                    <option value="KR">Kurunegala</option>
                    <option value="MN">Mannar</option>
                    <option value="MT">Matale</option>
                    <option value="MA">Matara</option>
                    <option value="MG">Monaragala</option>
                    <option value="ML">Mullaitivu</option>
                    <option value="NE">Nuwara Eliya</option>
                    <option value="PL">Polonnaruwa</option>
                    <option value="PT">Puttalam</option>
                    <option value="RT">Ratnapura</option>
                    <option value="TC">Trincomalee</option>
                    <option value="VA">Vavuniya</option>
                </select>
                </div>

                <div className="input-group-sachini divisional-code-group">
                <input
                    type="text"
                    id="divisionalCode"
                    name="divisionalCode"
                    required
                    maxLength="5" 
                    placeholder="Divisional Secretary's Division Code"
                    title="Enter exactly 1 to 3 digits"
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if ((charCode < 48 || charCode > 57)) { 
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[0-9]{1,5}$/.test(input) || input === "") {
                            e.target.setCustomValidity('');
                            setDivisionCode(input);
                        } else {
                            e.target.setCustomValidity('Enter exactly 1 to 5 digits');
                        }
                    }}
                />
                

                <input
                    type="text"
                    id="blockNumber"
                    name="blockNumber"
                    required
                    placeholder="Block Number"
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        const inputValue = e.target.value;

                        if (inputValue.length < 2 && charCode >= 48 && charCode <= 57) {
                            
                            return;
                        }

                        e.preventDefault(); 
                    }}
                    onChange={(e) => {
                        const input = e.target.value;

                        if (/^[0-9]{0,2}$/.test(input) || input === "") {
                            e.target.setCustomValidity('');
                            setBlockNumber(input);
                        } else {
                            e.target.setCustomValidity('Enter exactly two integers for Block Number');
                        }
                    }}
                    />
                </div>



                
                <div className="input-group-sachini">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    id="fieldSize"
                    name="fieldSize"
                    required
                    placeholder="Field Size"
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        const input = e.target.value;
                
                        if (charCode === 46) {
                          if (input.includes('.')) {
                            e.preventDefault();
                          }
                        } else if ((charCode < 48 || charCode > 57)) {
                          e.preventDefault(); 
                        }
                      }}
                      onChange={(e) => {
                        let input = e.target.value;
                
                        if (input.includes('.')) {
                          const parts = input.split('.');
                          if (parts[0].length > 6) {
                            parts[0] = parts[0].slice(0, 6);
                          }
                          input = parts.join('.');
                        } else {
                          if (input.length > 6) {
                            input = input.slice(0, 6);
                          }
                        }
                
                        if (input.includes('.')) {
                          const decimalPlaces = input.split('.')[1];
                          if (decimalPlaces.length > 2) {
                            input = `${input.split('.')[0]}.${decimalPlaces.slice(0, 2)}`;
                          }
                        }
                
                        e.target.value = input;
                        setSize(input);
                      }}
                />
                <span style={{ marginLeft: '5px' }}>acres</span>
                </div>
                </div>

            </div>
            <div className="input-group-sachini">
                <button type="submit" disabled={isFormSubmitDisabled}>Submit</button>
            </div>
        </form>
    </div>
    </div>
</div>
    )
}

