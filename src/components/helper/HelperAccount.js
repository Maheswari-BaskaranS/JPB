import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';

import {Eye, EyeSlash} from 'react-bootstrap-icons'
import mapToPayload from './commonpayload';


const HelperAccount = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [passwordError, setPasswordError] = useState("");

  const [helperName, setHelperName] = useState('');
  const [accountdata, setaccountdata] = useState({
    Email: '',
    Password: '',
    ConfirmPassword: '',
    SMSContactNumber: '',
    CVCode: '',
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
    let token = localStorage.getItem("helpertoken");
    console.log(token);
    if (token) {
      console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
    }
    console.log(ishelperloggedin);
    console.log(storedData);
  }, []);
  
  useEffect(() => {
    if (storedData.length > 0) {
      setaccountdata({
        ...accountdata,
        EmailId: storedData[0].EmailId,
        Password: storedData[0].Password,
        Contact_MobileNo: storedData[0].MobileNo,
        CVCode: storedData[0].CVCode
      });
      setHelperName(storedData[0].HelperName);
    }
  }, [storedData]);


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

  const HelperCode = localStorage.getItem("HelperCode"); // Retrieve EmployerCode from localStorage
  const Code = HelperCode;

const fetchdata = async () => {
  try {
    // Make sure EmployerCode exists before making the API call
    if (!Code) {
      console.log('Code is missing!');
      return;
    }

    const response = await fetch(`https://jpbapi.appxes-erp.in/Helper/GetByCode?OrganizationId=${jpb.OrgId}&CVCode=${Code}`, {
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
    console.log("data",data)
    setaccountdata(data.Data[0]);
  } catch (error) {
    console.log('Error:', error);
  }
}
const HelperName = localStorage.getItem("HelperName");
  useEffect(() => {
    fetchdata();
  }, []);

  const saveAccountDataHandler = async (event) => {
    event.preventDefault();
    if (accountdata.Password !== accountdata.ConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if(accountdata.Password === accountdata.ConfirmPassword){
      // localStorage.setItem('helperAccount', JSON.stringify(UpdatedHelperAccountdata));
      const payload = mapToPayload(accountdata);

      const url = `${jpb.baseUrl}/HelperRegistration/Registration`;
        
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          };
        
          try {
            // Make the API call to submit the data
            const response = await fetch(url, options);
        
            // Check if the response was successful
            const responseData = await response.json(); // Parse the JSON response
            console.log("response", responseData);
        
            if (responseData.Code === 200 && responseData.Status === true) {
              // If the response is successful, show the toast message
              toast.success('Helper Account Details Updated Successfully', {
                position: "top-right",
                autoClose: 1000,
              });
        
              // Navigate to the '/helperaccount' page
              handleLinkClick('/helperprofiledetail');  // Make sure handleLinkClick is defined and working
            } else {
              console.error('Form submission failed:', responseData);
              // setError('Submission failed. Please try again.');
            }
          } catch (err) {
            console.error('Helper Details Update failed:', err);
            // setError('Helper Details Update failed. Please try again.');
          } finally {
            // setLoading(false);  // This will stop the loading indicator (if any)
          }
    }
  };

  const handleLinkClick = (link) => {
    //navigate(link);
    window.location.href = link
    setSelectedLink(link);
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
            <figure><img src="images/banner-helper-dashboard.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
      
      <section className="fullcontainer dashboard helper-dashboard had-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Helper Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {HelperName},</h5></div>
              <a className="btn-control-notext show-lg" href="#nav">Select</a>
              <ul id="nav" className="nav-1 hide-lg">
              <li className={selectedLink === '/helperaccount' ? 'active' : ''}><Link to="/helperaccount" onClick={() => { handleLinkClick('/helperaccount');}}>Account</Link></li>
              <li className={selectedLink === '/helperprofiledetail' ? 'active' : ''}><Link to="/helperprofiledetail" onClick={() => { handleLinkClick('/helperprofiledetail');}}>Bio Profile Details</Link></li>
                <li className={selectedLink === '/helpercontact' ? 'active' : ''}><Link to="/helpercontact" onClick={() => { handleLinkClick('/helpercontact');}}> Contact Details</Link></li>
                <li className={selectedLink === '/helperfamily' ? 'active' : ''}><Link to="/helperfamily" onClick={() => { handleLinkClick('/helperfamily');}}>Family Background</Link></li>
                <li className={selectedLink === '/helperbooking' ? 'active' : ''}><Link to="/helperbooking" onClick={() => { handleLinkClick('/helperbooking');}}> Booking Related Info</Link></li>
                <li className={selectedLink === '/helpereducation' ? 'active' : ''}><Link to="/helpereducation" onClick={() => { handleLinkClick('/helpereducation');}}>Education Details</Link></li>
                <li className={selectedLink === '/helperexperience' ? 'active' : ''}><Link to="/helperexperience" onClick={() => { handleLinkClick('/helperexperience');}}>Experience Details</Link></li>
                <li className={selectedLink === '/helperlanguage' ? 'active' : ''}><Link to="/helperlanguage" onClick={() => { handleLinkClick('/helperlanguage');}}>Language Details</Link></li>
                <li className={selectedLink === '/helpermedical' ? 'active' : ''}><Link to="/helpermedical" onClick={() => { handleLinkClick('/helpermedical');}}>Medical Details</Link></li>
                <li className={selectedLink === '/helperskill' ? 'active' : ''}><Link to="/helperskill" onClick={() => { handleLinkClick('/helperskill');}}>Skills Details</Link></li>
                <li className={selectedLink === '/helperinterview' ? 'active' : ''}><Link to="/helperinterview" onClick={() => { handleLinkClick('/helperinterview');}}> Interview Appointment Details</Link></li>
                <li className={selectedLink === '/helperinterview' ? 'active' : ''}><Link to="/helperinterview" onClick={() => { handleLinkClick('/helpersalary');}}> Salary Details</Link></li>
              </ul>
            </div>
            </div>
            <div className="col-lg-8">
              <div className="dashboard-right-wrap had-wrap">
                    <div className="main-inner-box">
                   
                      <div className="pageTitle title-fix sm">
                        <h2>Account Details</h2></div>
                        <p>After editing and saving the details please submit the form in Skill Details to Successfully save the Data</p>
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
                              value={accountdata.Email}
                              onChange={(e) => {
                                setaccountdata({ ...accountdata, Email: e.target.value });
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
    <div style={{ position: "relative" }}>
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
        style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
      >
        {showLoginPassword ? <Eye color="black" /> : <EyeSlash color="black" />}
      </span>
    </div>
    {passwordError && (
      <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
        {passwordError}
      </div>
    )}
  </div>
</div>

                        <div className="row form-group align-items-center">
                          <div className="col-lg-5">
                            <label>Confirm Password</label>
                          </div>
                          <div className="col-lg-7">
                            <input
                              type={confirmPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Confirm Password"
                              value={accountdata.ConfirmPassword}
                              onChange={(e) => {
                                const value = e.target.value;
                                setaccountdata({ ...accountdata, ConfirmPassword: value });
                                if (accountdata.Password !== value) {
                                  setPasswordError("Passwords do not match");
                                } else {
                                  setPasswordError("");
                                }
                              }}
                              required
                            />
                             <span
                                                                      onClick={toggleLoginPasswordVisibile}
                                                                      className="eye-icon"
                                                                    >
                                                                     {confirmPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
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
                              placeholder="+65 9123 456789"
                              value={accountdata.SMSContactNumber}
                              onChange={(e) => {
                                setaccountdata({ ...accountdata, SMSContactNumber: e.target.value });
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
                            <button type="submit" className="custom-button">
                              Save
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

export default HelperAccount;