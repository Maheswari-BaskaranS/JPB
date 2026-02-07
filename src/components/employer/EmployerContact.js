import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getCountryData } from '../../apiCalls';


const EmployerContact = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [employerName, setEmployerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const EmployerCode = localStorage.getItem("EmployerCode");
  const [contactdata, setcontactdata] = useState({
    "OrgId": 1,
    "EmployerCode": "",
    "SlNo": 0,
    "ContactPerson": "",
    "ContactNo": "",
    "Contact_HomeNo": "",
    "Contact_FaxNo": "",
    "Contact_Email": "",
    "Contact_PostalCode": "",
    "Contact_UnitNo": "",
    "Contact_StreetName": "",
    "Contact_BuildingName": "",
    "Contact_Country": ""
  });
  const [isloggedin, setisloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [countryOptions, setCountryOptions] = useState();
  
  // const navigate = useNavigate();

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
console.log("Contact dateaaaaa",contactdata)

  
  useEffect(() => {
    if (storedData.length > 0) {
      setcontactdata({
        ...contactdata,
        "OrgId": storedData[0].OrgId,
        "EmployerCode": EmployerCode,
        "SlNo": storedData[0].SlNo,
        "ContactPerson": storedData[0].ContactPerson,
        "ContactNo": storedData[0].ContactNo,
        "Contact_HomeNo": storedData[0].Contact_HomeNo,
        "Contact_FaxNo":storedData[0].Contact_FaxNo,
        "Contact_Email":storedData[0].Contact_Email,
        "Contact_PostalCode": storedData[0].Contact_PostalCode,
        "Contact_UnitNo": storedData[0].Contact_UnitNo,
        "Contact_StreetName": storedData[0].Contact_StreetName,
        "Contact_BuildingName": storedData[0].Contact_BuildingName,
        "Contact_Country": storedData[0].Contact_Country
      });
      setEmployerName(storedData[0].EmployerName);
    }
  }, [storedData]);

   useEffect(() => {
      getCountryData()
        .then(data => {
          if (data.Message === "Sucess") {
            setCountryOptions(data.Data);
          } else {
            toast.error("error getting Year of country")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Year of country:', error);
        });
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

  const saveContactDataHandler = async (event) => {
    event.preventDefault();
  
    const UpdatedContactdata = {
      employerMasterContactDetailv2: {
        ...contactdata,
        EmployerCode: EmployerCode, // Make sure EmployerCode is from localstorage
      }
    };
  
    // Save in local storage
    localStorage.setItem('employerContact', JSON.stringify(UpdatedContactdata));
    
    toast.success('Contact details saved successfully!');
    
    // After saving, navigate (optional, based on your usecase)
    handleLinkClick('/employeraddress');
  }
  

  const handleLinkClick = (link) => {
    window.location.href = link
    setSelectedLink(link);
  };

   
  const fetchdata = async () => {
    try {
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
  
      // ✅ Check if the data exists before setting
      if (data.Data && data.Data.length > 0 && data.Data[0].employerMasterContactDetailv2 && data.Data[0].employerMasterContactDetailv2.length > 0) {
        setcontactdata(data.Data[0].employerMasterContactDetailv2[0]);
      } else {
        console.log('No contact data found, using default empty contact data.');
        // No update needed, keep the default empty contactdata
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  
  useEffect(() => {
    fetchdata();
  }, []);
  


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
     
      <section className="fullcontainer dashboard ecd-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {contactdata.EmployerName},</h5></div>
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
            <form onSubmit={saveContactDataHandler}>
              <div className="dashboard-right-wrap ecd-wrap">
                    <div className="main-inner-box">
                   
                      <div className="pageTitle title-fix sm">
                        <h2>Contact Details</h2></div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Contact Person</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Person Name"
                          value={contactdata.ContactPerson}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,ContactPerson:e.target.value});
                          }}
                         
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Mobile No. </label>
                        </div>
                        <div className="col-lg-7">
                          <input type="tel" className="form-control" placeholder="Mobile No."
                          value={contactdata.ContactNo}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,ContactNo:e.target.value});
                          }}
                          required
      maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Home No. </label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Home No."
                          value={contactdata.Contact_HomeNo}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_HomeNo:e.target.value});
                          }}
                         
                          /> </div>
                      </div>
                      
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Fax No.</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="tel" className="form-control" placeholder="Fax No."
                          value={contactdata.Contact_FaxNo}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_FaxNo:e.target.value});
                          }}
                          required
                          maxLength="10" // Limit input to 10 digits
                          pattern="^\d{10}$" // Ensure only 10 digits
                          title="Please enter a 10-digit fax number"
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Email</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="email" className="form-control" placeholder="Email"
                          value={contactdata.Contact_Email}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_Email:e.target.value});
                          }}
                          required // Ensure the field is required
                          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Custom email regex
                          title="Please enter a valid email address" // Custom title for invalid email message
                       
                          /> </div>
                      </div>
                    
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Postal Code</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Postal Code"
                          value={contactdata.Contact_PostalCode}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_PostalCode:e.target.value});
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Unit No</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Unit No"
                          value={contactdata.Contact_UnitNo}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_UnitNo:e.target.value});
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Street</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Street"
                          value={contactdata.Contact_StreetName}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_StreetName:e.target.value});
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Building</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Building"
                          value={contactdata.Contact_BuildingName}
                          onChange={(e)=>{
                            setcontactdata({...contactdata,Contact_BuildingName:e.target.value});
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                        <label>Country</label>
                      </div>
                      <div className="col-lg-7">
                        <select 
                          className="form-control" 
                          value={contactdata.Contact_Country} 
                          onChange={(e) => setcontactdata({ ...contactdata, Contact_Country: e.target.value })}
                        >
                          <option value="">Select Country</option>
                          {countryOptions?.map((item, index) => (
                            <option key={index} value={item?.Code}>
                              {item?.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                      </div>
                    
                    
                  
              </div>
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button" onClick={() => { handleLinkClick('/employeraddress');}}>SAVE & CONTINUE</button></div>
                    </div>
              </div>
              </form>
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

export default EmployerContact;