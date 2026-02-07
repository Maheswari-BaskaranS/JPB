import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { handleEmployerlogin, handleHelperlogin } from '../../apiCalls';
import {Eye, EyeSlash} from 'react-bootstrap-icons'
 
const HelperLogin= () => {
  const [ishelperloggedin, setishelperloggedin] = useState(false);
  const [logindata, setlogindata] = useState({});
  const [jwtToken, setjwtToken] = useState('');
  const [selectedLink, setSelectedLink] = useState('/');
  const navigate = useNavigate();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
      
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let helpertoken = localStorage.getItem('helpertoken');
    if (helpertoken) {
      setishelperloggedin(true);
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
      OrgId: jpb.OrgId,
      Email: logindata.Username,
      Password: logindata.Password,
    };
  
    try {
      let response;
      if (selectedLink === "/helperlogin") {
        response = await handleHelperlogin(regDetail);
      } else {
        response = await handleEmployerlogin(regDetail);
      }
  
      if (response.Code === 200 && response.Message === "Sucess" && response.Data.length > 0) {
        const userEmail = response.Data[0].Email;
        if (userEmail === logindata.Username) {
          if (selectedLink === "/helperlogin") {
            localStorage.setItem("HelperLogin", userEmail);
            //localStorage.setItem("helpertoken", JSON.stringify(response.Data));
            toast.success("Login Success");
  
            // Fetch and store helper details
            await fetchHelperDetails(userEmail);
            window.location.href = "/";
          } 
        } else {
          toast.error("Login Failed, Please Register");
        }
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Failure!");
      console.log("An error occurred:", error);
    }
  };
  

  const fetchHelperDetails = async (email) => {
    try {
      const response = await fetch(`https://jpbapi.appxes-erp.in/Helper/GetAll?OrganizationId=1`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        console.log("Data not found!");
        throw new Error("Something went wrong!");
      }
  
      const data = await response.json();
      console.log("Helper Data:", data);
  
      if (data.Data && data.Data.length > 0) {
        const helper = data.Data.find((help) => help.Email === email);
        
        if (helper) {
          localStorage.setItem("HelperLogin", helper.Email);
          localStorage.setItem("HelperName", helper.FullName);
          localStorage.setItem("HelperCode", helper.CVCode);
          localStorage.setItem("helpertoken", JSON.stringify(helper));
  
          console.log("Helper details stored:", helper);
        } else {
          console.log("No matching helper found for email:", email);
        }
      }
    } catch (error) {
      console.error("Error fetching helper details:", error);
    }
  };
  
  

  useEffect(() => {
  const fetchHelperdata = async () => {
    try {
      const response = await fetch('https://jpbapi.appxes-erp.in/Helper/GetAll?OrganizationId=1', {
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
      console.log("helperData",data.Data);

    } catch (error) {}
    
  }
  
  fetchHelperdata();
  },[])

   
    
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
                   
                    <div className="fogot-pass text-center w-100"><Link to="/forgetpasswords?module=Helper">Forgot Password?</Link></div>
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
export default HelperLogin;