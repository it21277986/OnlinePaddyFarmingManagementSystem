// import React, { useState } from 'react';
// import axios from 'axios';

// function SeedDepositForm() {
//   const [formData, setFormData] = useState({
//     requestId: '',
//     bank: '',
//     branch: '',
//     amount: '',
//     slip: null,
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData({ ...formData, slip: file });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append('requestId', formData.requestId);
//     formDataToSend.append('bank', formData.bank);
//     formDataToSend.append('branch', formData.branch);
//     formDataToSend.append('amount', formData.amount);
//     formDataToSend.append('slip', formData.slip);

//     try {
//       const response = await axios.post('http://localhost:8070/seedpay/addseedDepositSlip', formDataToSend);
//       alert(response.data);
//       // Clear the form
//       setFormData({
//         requestId: '',
//         bank: '',
//         branch: '',
//         amount: '',
//         slip: null,
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Seed Deposit Slip Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="requestId">Request ID:</label>
//         <input
//           type="text"
//           id="requestId"
//           name="requestId"
//           value={formData.requestId}
//           onChange={handleInputChange}
//           required
//         /><br /><br />

//         <label htmlFor="bank">Bank:</label>
//         <input
//           type="text"
//           id="bank"
//           name="bank"
//           value={formData.bank}
//           onChange={handleInputChange}
//           required
//         /><br /><br />

//         <label htmlFor="branch">Branch:</label>
//         <input
//           type="text"
//           id="branch"
//           name="branch"
//           value={formData.branch}
//           onChange={handleInputChange}
//           required
//         /><br /><br />

//         <label htmlFor="amount">Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           name="amount"
//           value={formData.amount}
//           onChange={handleInputChange}
//           required
//         /><br /><br />

//         <label htmlFor="slip">Upload Slip:</label>
//         <input
//           type="file"
//           id="slip"
//           name="slip"
//           onChange={handleFileChange}
//           required
//         /><br /><br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default SeedDepositForm;
