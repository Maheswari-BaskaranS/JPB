import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';

import {Eye, EyeSlash} from 'react-bootstrap-icons'




const EmployerAccount = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [isloggedin, setisloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const EmployerCodes = localStorage.getItem("EmployerCode");
  const [employerName, setEmployerName] = useState('');
  const [employerdata, setEmployerdata] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountdata, setaccountdata] = useState({
    EmailId: '',
    Password: '',
    ConfirmPassword: '',
    SmsNo: '',
    EmployerCode: ''
  });
    const [showLoginPassword, setShowLoginPassword] = useState(false);
     const [confirmPassword, setShowPassword] = useState(false);
    const toggleLoginPasswordVisibility = () => {
      setShowLoginPassword(!showLoginPassword);
    };
    const toggleLoginPasswordVisibile = () => {
      setShowPassword(!confirmPassword);
    };
  
  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log(token);
      setisloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
    }
    console.log(isloggedin);
    console.log(storedData);
  }, []);
  
  useEffect(() => {
    if (storedData.length > 0) {
      setaccountdata({
        ...accountdata,
        EmailId: storedData[0].EmailId,
        Password: storedData[0].Password,
        SmsNo: storedData[0].SmsNo,
        EmployerCode: storedData[0].EmployerCode
      });
      setEmployerName(storedData[0].EmployerName);
    }
  }, [storedData]);

  const EmployerCode = localStorage.getItem("EmployerCode"); // Retrieve EmployerCode from localStorage

const fetchdata = async () => {
  try {
    // Make sure EmployerCode exists before making the API call
    if (!EmployerCode) {
      console.log('EmployerCode is missing!');
      return;
    }

    const response = await fetch(`https://jpbapi.appxes-erp.in/Employer/GetByCode?OrganizationId=1&EmployerCode=${EmployerCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Data not found!');
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    setaccountdata(data.Data[0].EmployerMasterV2);
  } catch (error) {
    console.log('Error:', error);
  }
}

useEffect(() => {
  fetchdata();
}, []);


  const fetchTokenHandler = async () => {
    const tokenDetail = {
      Username: 'admin',
      Password: 'admin54321',
    };
    try {
      const response = await fetch('http://154.26.130.251:283/api/Token/GenerateToken', {
        method: 'POST',
        body: JSON.stringify(tokenDetail),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Something went wrong!');
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data.Jwt_Token);
      setjwtToken(data.Jwt_Token);
    } catch (error) {}
  };

  const handleLinkClick = (link) => {
    //navigate(link);
    window.location.href = link
    setSelectedLink(link);
  };



  const saveAccountDataHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const UpdatedAccountdata = {
      EmployerMasterV2: {
        "OrgId": 1,
        "EmployerAutoId": 0,
        "EmployerCode": EmployerCodes,
        "EmployerName": accountdata.EmployerName,
        "EmailId": accountdata.EmailId,
        "Password": accountdata.Password, // No confirm password
        "SmsNo": accountdata.SmsNo,
        "IsActive": true
      },
    };
  
    try {
      localStorage.setItem('employerAccount', JSON.stringify(UpdatedAccountdata));
      toast.success("Account details saved successfully!");
  
      // Navigate to employer profile *AFTER* saving
      handleLinkClick('/employerprofile')
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save account details. Try again.");
    }
  };
  return(
 <div>
  <div id="wrapper">
  <Header/>
    <div className="clear"></div>
 
    <div className="clear"></div>
 
    <div className="main-content-wrapper">
     
      <div className="bannerWrapper">
        <div className="banner inner-banner">
          <div className="inner-banner-img img-holder img-cover">
            <figure><img src="images/banner-employer-dashboard.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
      
      <section className="fullcontainer dashboard ead-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {accountdata.EmployerName},</h5></div>
              <a className="btn-control-notext show-lg" href="#nav">Select</a>
              <ul id="nav" className="nav-1 hide-lg">
              <li className={selectedLink === '/employeraccount' ? 'active' : ''}><Link to="/employeraccount" onClick={() => { handleLinkClick('/employeraccount');}}>Account Details</Link></li>
                <li className={selectedLink === '/employerprofile' ? 'active' : ''}><Link to="/employerprofile" onClick={() => { handleLinkClick('/employerprofile');}}>Personal Profile Details</Link></li>
                <li className={selectedLink === '/employercontact' ? 'active' : ''}><Link to="/employercontact" onClick={() => { handleLinkClick('/employercontact');}}> Contact Details</Link></li>
                <li className={selectedLink === '/employeraddress' ? 'active' : ''}><Link to="/employeraddress" onClick={() => { handleLinkClick('/employeraddress');}}>Address</Link></li>
                <li className={selectedLink === '/employerfamily' ? 'active' : ''}><Link to="/employerfamily" onClick={() => { handleLinkClick('/employerfamily');}}>Family Details & Job Scope</Link></li>
                <li className={selectedLink === '/employerInterview' ? 'active' : ''}><Link to="/employerInterview" onClick={() => { handleLinkClick('/employerInterview');}}> Interview Appointment Details</Link></li>
                <li className={selectedLink === '/employerbooking' ? 'active' : ''}><Link to="/employerbooking" onClick={() => { handleLinkClick('/employerbooking');}}> Booking & Payment Details</Link></li>
                <li className={selectedLink === '/employersalary' ? 'active' : ''}><Link to="/employersalary" onClick={() => { handleLinkClick('/employersalary');}}> Salary Schedule</Link></li>
              </ul>
            </div>
            </div>
            <div className="col-lg-8">
              <div className="dashboard-right-wrap ead-wrap">
                    <div className="main-inner-box">
                   
                      <div className="pageTitle title-fix sm">
                        <h2>Account Details</h2>
                        <p>Fill in all the required information and submit it under the Family Details & Job Scope section.</p>
                        </div>
                        <form onSubmit={saveAccountDataHandler}>
      <div className="row form-group align-items-center">
        <div className="col-lg-5">
          <label>Email Address</label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            placeholder="timothylim@gmail.com"
            value={accountdata.EmailId}
            onChange={(e) => {
              setaccountdata({ ...accountdata, EmailId: e.target.value });
            }}
            readOnly
          />
        </div>
      </div>
      <div className="row form-group align-items-center">
        <div className="col-lg-5">
          <label>Password</label>
        </div>
        <div className="col-lg-7">
          <input
             type={showLoginPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={accountdata.Password}
            onChange={(e) => {
              setaccountdata({ ...accountdata, Password: e.target.value });
            }}
            required
          />
                      <span
              onClick={toggleLoginPasswordVisibility}
              className="eye-icon"
            >
             {showLoginPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
            </span>
        </div>
      </div>
  
      <div className="row form-group align-items-center">
        <div className="col-lg-5">
          <label>SMS Contact Number</label>
        </div>
        <div className="col-lg-7">
          <input
            type="tel"
            className="form-control"
            placeholder="9123 456789"
            value={accountdata.SmsNo}
            onChange={(e) => {
              setaccountdata({ ...accountdata, SmsNo: e.target.value });
            }}
            required
            maxLength="10" // Limit input to 10 digits
            pattern="^\d{10}$" // Ensure only 10 digits
            title="Please enter a 10-digit phone number"
          />
        </div>
      </div>
      <div className="row mt20 justify-content-end">
        <div className="col-auto">
          <button type="submit" className="custom-button" >
            SAVE & CONTINUE
          </button>
        </div>
      </div>
    </form>
                    
                  
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      
      <div className="footer-space"></div>
      <div className="clear"></div>
    </div>

    <div className="clear"></div>
    <div className="pushContainer"></div>
    <div className="clear"></div>
  </div>
<Footer/>
<QuickSearch/>

  </div>
  );
};

export default EmployerAccount;