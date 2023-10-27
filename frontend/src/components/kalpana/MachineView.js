import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MachineView() {
  const { id } = useParams();
  const [machine, setMachine] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMachineData, setUpdatedMachineData] = useState({
    machineOwnerName: '', // Initialize with empty values
    machineType: '',
    engineNumber: '',
    dateOfRegistration: '',
    contactNumber: '',
  });

  useEffect(() => {
    // Fetch a single machine's data by ID from the backend API
    axios.get(`http://localhost:8070/machineReg/getMachine/${id}`)
      .then((response) => {
        setMachine(response.data.machine);
        setUpdatedMachineData(response.data.machine); // Set initial values for editing
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSave = async () => {
    try {
      setIsEditing(false); // Disable edit mode

      // Send a PUT request to update the machine data
      await axios.put(`http://localhost:8070/machineReg/updateMachine/${id}`, updatedMachineData);

      // Fetch the updated machine data after the update
      const updatedResponse = await axios.get(`http://localhost:8070/machineReg/getMachine/${id}`);
      setMachine(updatedResponse.data.machine);
    } catch (error) {
      console.error('Error updating machine data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the 'updatedMachineData' state when the user edits input fields
    setUpdatedMachineData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  return (
    <div>
      <h1>Machine Details</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>
            Machine Owner Name:{' '}
            {isEditing ? (
              <input
                type="text"
                name="machineOwnerName"
                value={updatedMachineData.machineOwnerName}
                onChange={handleInputChange}
              />
            ) : (
              machine.machineOwnerName
            )}
          </p>
          <p>
            Machine Type:{' '}
            {isEditing ? (
               <select
               id="machineType"
               name="machineType"
               value={updatedMachineData.machineType}
               onChange={handleInputChange}
             >
               <option value="">Select Machine Type</option>
               <option value="tractor">Tractor</option>
               <option value="combine">Combine</option>
               <option value="harvester">Harvester</option>
               <option value="seeder">Seeder</option>
             </select>
            ) : (
              machine.machineType
            )}
          </p>
          <p>
            Engine Number:{' '}
            {isEditing ? (
              <input
                type="text"
                name="engineNumber"
                value={updatedMachineData.engineNumber}
                onChange={handleInputChange}
              />
            ) : (
              machine.engineNumber
            )}
          </p>
          <p>
            Date of Registration:{' '}
            {isEditing ? (
              <input
                type="date"                
                name="dateOfRegistration"
                value={updatedMachineData.dateOfRegistration}
                onChange={handleInputChange}
              />
            ) : (
              machine.dateOfRegistration
            )}
          </p>
          <p>
            Contact Number:{' '}
            {isEditing ? (
              <input
                type="text"
                name="contactNumber"
                value={updatedMachineData.contactNumber}
                onChange={handleInputChange}
              />
            ) : (
              machine.contactNumber
            )}
          </p>

          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
}

export default MachineView;
