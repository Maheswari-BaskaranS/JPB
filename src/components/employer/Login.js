import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleEmployerlogin, handleHelperlogin } from '../../apiCalls';
import { jpb } from '../../config';

import {Eye, EyeSlash} from 'react-bootstrap-icons'
import { data } from 'jquery';

const Login = () => {
  const [isloggedin, setisloggedin] = useState(false);
  const [logindata, setlogindata] = useState({});
  const [jwtToken, setjwtToken] = useState('');
  const [selectedLink, setSelectedLink] = useState('/');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const navigate = useNavigate();
    const toggleLoginPasswordVisibility = () => {
      setShowLoginPassword(!showLoginPassword);
    };


  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let token = localStorage.getItem('token');
    if (token) {
      setisloggedin(true);
    }
  }, []);
  const handleLinkClick = (link) => {
    //navigate(link);
    window.location.href = link
    setSelectedLink(link);
  };

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

  const handleLogin = async (event) => {
    event.preventDefault();

    const regDetail = {
      OrgId:jpb.OrgId,
      Email: logindata.Username,
      Password: logindata.Password,
    };

    
    if(selectedLink === "/login"){

      try {
        const response = await handleEmployerlogin(regDetail);  
  
        if (response.Code === 200 && response.Message === 'Sucess') {
          if(response.Data[0].Email === logindata.Username ){
            localStorage.setItem('EmployerLogin', response.Data[0].Email);
            toast.success('Login Sucess');
            fetchEmployerDetails(response.Data[0].Email);
            window.location.href = "/helperlist"
          }else{
            toast.error("Login Failer , Please Register")
          }
        }else{
          toast.error("Login Failed")
        }
      } catch (error) {
        toast.error('Failure!');
        console.log('An error occurred:', error);
      }

    }else{

      try {
        const response = await handleHelperlogin(regDetail);
        console.log("responsehelp",response)
        if (response.Code === 200 && response.Message === 'Sucess') {
          if(response.Data[0].Email === logindata.Username ){
            localStorage.setItem('HelperLogin', response.Data[0].Email);
            localStorage.setItem('helpertoken', response.Data[0]);
            localStorage.setItem('HelperName',response.Data[0].FullName);
            toast.success('Login Sucess');
            window.location.href = "/"
          }else{
            toast.error("Login Failer , Please Register")
          }
        }else{
          // toast.error("Login Failed")
        }
      } catch (error) {
        toast.error('Failure!');
        console.log('An error occurred:', error);
      }
    }


  };

  const fetchEmployerDetails = async (email) => {
    try {
      const response = await fetch(
        `https://jpbapi.appxes-erp.in/Employer/GetAll?OrganizationId=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        console.log("Data not found!");
        throw new Error("Something went wrong!");
      }
  
      const data = await response.json();
      console.log("Employer Data:", data);
      console.log("emailllllll",email);
      
  
      if (data.Data && data.Data.length > 0) {
        // ✅ Fix email key mismatch (use EmailId from API response)
        const employer = data.Data.find(emp => emp.EmailId === email);
        
        if (employer) {
          localStorage.setItem("EmployerCode", employer.EmployerCode);
          localStorage.setItem("EmployerName", employer.FullName);
          
          console.log("Employer details stored:", employer);
        } else {
          console.log("No matching employer found for email:", email);
        }
      }
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };
  

  useEffect(() => {
    const fetchEmployerData = async () => {
      if (!logindata.Username) return; // Ensure email exists before making the request
      
      try {
        const response = await fetch(
          'https://jpbapi.appxes-erp.in/Employer/GetAll?OrganizationId=1',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
  
        if (!response.ok) {
          console.log('Data not found!');
          throw new Error('Something went wrong!');
        }
  
        const data = await response.json();
        console.log('employerdata:', data.Data);
  
        if (data.Data && data.Data.length > 0) {
          const employer = data.Data.find(emp => emp.EmailId === logindata.Username);
  
          if (employer) {
            localStorage.setItem('EmployerCode', employer.EmployerCode);
            localStorage.setItem('EmployerName', employer.FullName);
            console.log('Employer details stored:', employer);
          } else {
            console.log('No matching employer found for email:', logindata.Username);
          }
        }
      } catch (error) {
        console.error('Error fetching employer details:', error);
      }
    };
  
    fetchEmployerData();
  }, [logindata.Username]); // Depend on logindata.Username
  


   
    
  return(
    <div>
        <div id="wrapper">
<Header/>
    <div className="clear"></div>
 
    <div className="clear"></div>
        <div className="main-content-wrapper main-container-bg bg-img-tc" style={{background: 'url(images/banner-bg.jpg)'}}>
      <div className="login-page">
        <div className="inner-container">
          <div className="container">
            <div className="main-box-wrapper">
              <div className="reg-links">
                <ul>
                <li className={selectedLink === '/login' ? 'selected' : ''}><Link to="/login" onClick={() => handleLinkClick('/login')}>Employer Login</Link></li>
                  <li className={selectedLink === '/helperlogin' ? 'selected' : ''}><Link to="/helperlogin" onClick={() => handleLinkClick('/helperlogin')}>Helper Login</Link></li>
                </ul>
              </div>
             
             <div className="login-holder">
                <form onSubmit={handleLogin}>
                   <div className="main-inner-box">
                    <div className="mx-575">
                    <div className="pageTitle title-fix text-center md"><h2>Enter The Credentials</h2></div>
                    <div className="row form-group align-items-center">
                      <div className="col-lg-4">
                        <label>Email Address <span className="red">*</span></label>
                      </div>
                      <div className="col-lg-8">
                        <input type="text" className="form-control" placeholder="Email Address" 
                        onChange={(e) => {
                                    setlogindata({ ...logindata, Username: e.target.value })
                                }}/> </div>
                    </div>
                    <div className="row form-group align-items-center">
                      <div className="col-lg-4">
                        <label>Password <span className="red">*</span></label>
                      </div>
                      <div className="col-lg-8">
                        <input 
                        type={showLoginPassword ? "text" : "password"} 
                        className="form-control" 
                        placeholder="Password"
                         onChange={(e) => {
                          setlogindata({ ...logindata, Password: e.target.value })
                      }}/>
                                     <span
                          onClick={toggleLoginPasswordVisibility}
                          className="eye-icon"
                        >
                         {showLoginPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
                        </span>
                       </div>
                    </div>
                   
                    <div className="fogot-pass text-center w-100"><Link to="/forgetpassword?module=Employer">Forgot Password?</Link></div>
                    <div className="row align-items-center">
                      <div className="col-lg-12 m-auto align-self-center">
                      <div className="form-action mt30 text-center">
                        <button type='submit' className="custom-button">LOGIN</button>
                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </form>
             </div>
             
            </div>
          </div>
        </div>
        <div className="google-recaptch"><img src="images/google-captcha.png" alt=""/></div>
      </div>
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
}
export default Login;