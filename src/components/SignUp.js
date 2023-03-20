import React, { useState } from 'react';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cloudUsage, setCloudUsage] = useState(['AWS']);
  const [responseCode, setResponseCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cloudUsage') {
      const isChecked = e.target.checked;
      setCloudUsage(prevCloudUsage => isChecked ? [...prevCloudUsage, value] : prevCloudUsage.filter(item => item !== value));
    } else {
      switch(name) {
        case 'fullName':
          setFullName(value);
          break;
        case 'businessEmail':
          setBusinessEmail(value);
          break;
        case 'phoneNumber':
          setPhoneNumber(value);
          break;
        case 'companyName':
          setCompanyName(value);
          break;
        default:
          break;
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validate user input
    // send request to server to create new user account
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName,
        businessEmail,
        phoneNumber,
        companyName,
        cloudUsage
      }),
    };
    fetch('https://96ww6dj39j.execute-api.us-east-1.amazonaws.com/Prod/companies', requestOptions)
      .then(response => {
        setResponseCode(response.status);
      })
      .catch(error => console.error('Error:', error));
  };


  const handleOptionChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
    setCloudUsage(selectedOptions);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} style={{ paddingLeft: "auto" }}>
        <h1>Sign Up</h1>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={fullName} onChange={handleInputChange} required />
        <label htmlFor="businessEmail">Business Email:</label>
        <input type="email" id="businessEmail" name="businessEmail" value={businessEmail} onChange={handleInputChange} required />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleInputChange}
          aria-label="Phone Number"
        />
        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" value={companyName} onChange={handleInputChange} required />
        <div className="col-md-12 form-group ">
          <label htmlFor="cloudUsage">Cloud Usage:</label>
          <select id="cloudUsage" className="col-md-12 selectpicker" name="cloudUsage" multiple data-live-search="true" value={cloudUsage} onChange={handleOptionChange} aria-label="Cloud Usage" required>
            <option value="AWS">AWS</option>
            <option value="Azure">Azure</option>
            <option value="GCP">GCP</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseCode && <p>HTTP Response Code: {responseCode}</p>}
    </div>
  );
}

export default SignUp;
