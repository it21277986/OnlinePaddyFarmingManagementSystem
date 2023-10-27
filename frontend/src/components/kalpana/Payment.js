import React, { Component } from "react";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: "",
      paymentSlip: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    this.setState({ paymentSlip: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("farmerId", this.state.farmerId);
    formData.append("paymentSlip", this.state.paymentSlip);

    // You can now send this formData to your API using a POST request, for example, using Axios or Fetch.

    // Example using Fetch:
    fetch("/api/addDepositSlip", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success or error here
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here
      });
  };

  render() {
    return (
      <div>
        <h2>Add Payment</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="farmerId">Farmer ID:</label>
            <input
              type="text"
              id="farmerId"
              name="farmerId"
              value={this.state.farmerId}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="paymentSlip">Payment Slip:</label>
            <input
              type="file"
              id="paymentSlip"
              name="paymentSlip"
              onChange={this.handleFileChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Payment;
