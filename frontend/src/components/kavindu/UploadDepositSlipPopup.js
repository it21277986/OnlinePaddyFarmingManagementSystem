import React, { useState } from 'react';
import './CSS/Payment.css';
import axios from 'axios';


function UploadDepositSlipPopup({ onClose }) {

  const [formData, setFormData] = useState({
    requestId: '',
    bank: '',
    branch: '',
    amount: '',
    slip: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      slip: e.target.files[0],
    });
  };

  //
  const checkRequestId = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/FertilizerMgt/getRequest/${formData.requestId}`);
      return response.data.status === 'User Fetched';
    } catch (error) {
      console.error('Error checking requestId:', error);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check the requestId before submitting the form
    const isRequestIdValid = await checkRequestId();

    if (!isRequestIdValid) {
      alert('Invalid Request Id. Please check and try again.');
      return;
    }


    const formDataToSend = new FormData();
    formDataToSend.append('requestId', formData.requestId);
    formDataToSend.append('bank', formData.bank);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('amount', formData.amount);
    formDataToSend.append('slip', formData.slip);

    try {
      await axios.post('http://localhost:8070/UploadSlip/addDepositSlip', formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert('Payment Added');
      onClose();
      setFormData({
        requestId: '',
        bank: '',
        branch: '',
        amount: '',
        slip: null,
      });
    } catch (error) {
      console.error('Error adding deposit slip:', error);
      alert('Error adding deposit slip. Please try again.');
    }
  };



  return (
    <div className="popupk">
      <div className="popupInnerk">
        <button className="closeBtnk" type="button" class="close" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h1 style={{ color: '#005b42', fontSize: '24px', marginBottom: '20px' }}>Upload Deposit</h1>
        <hr className="border border-success border-2 opacity-50" />

        <form className='popk' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-group">
            <label htmlFor="requestId">Request Id</label>
            <input
              type="text"
              id="requestId"
              name="requestId"
              value={formData.requestId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bank">Bank</label>
            <select
              className='bankLabel'
              type="text"
              id="bank"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="BOC">BOC</option>
              <option value="HNB">HNB</option>
              <option value="Sampath Bank">Sampath Bank</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (Rs)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="slip">Deposit Slip</label>
            <input
              type="file"
              id="slip"
              name="slip"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UploadDepositSlipPopup;
