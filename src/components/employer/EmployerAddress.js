import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getCountryData } from '../../apiCalls';


const EmployerAddress = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [employerName, setEmployerName] = useState('');
  const [addressdata, setaddressdata] = useState({
    "OrgId": 1,
    "EmployerCode": "",
    "PostalCode": "",
    "UnitNo": "",
    "StreetName": "",
    "BuildingName": "",
    "Country": "",
    "EmailId": "",
  });
  const [isloggedin, setisloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [countryOptions, setCountryOptions] = useState();
  
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
      setaddressdata({
        ...addressdata,
        "OrgId": storedData[0].OrgId,
        "BranchCode":storedData[0].BranchCode,
        "EmployerCode": storedData[0].EmployerCode,
        "PostalCode": storedData[0].PostalCode,
        "UnitNo": storedData[0].UnitNo,
        "StreetName": storedData[0].StreetName,
        "BuildingName":storedData[0].BuildingName,
        "Country":storedData[0].Country,
        "EmailId": storedData[0].EmailId,
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



  const saveAddressDataHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const UpdatedAddressdata = {
      EmployerMasterV2: {
        OrgId: addressdata.OrgId,
        EmployerCode: addressdata.EmployerCode,
        PostalCode: addressdata.PostalCode,
        UnitNo: addressdata.UnitNo,
        StreetName: addressdata.StreetName,
        BuildingName: addressdata.BuildingName,
        Country: addressdata.Country,
        EmailId: addressdata.EmailId,
      }
    };
  
    try {
      localStorage.setItem('employerAddress', JSON.stringify(UpdatedAddressdata));
      toast.success("Address saved successfully!");
      
      // Navigate only after saving
      setTimeout(() => {
        window.location.href = '/employerfamily';
      }, 500); // Delay to ensure data is stored
    } catch (error) {
      toast.error("Failed to save address!");
      console.error('Error saving address:', error);
    }
  };
  

  const handleLinkClick = (link) => {
    window.location.href = link
    setSelectedLink(link);
  };

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
      setaddressdata(data.Data[0].EmployerMasterV2);
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
      
      <section className="fullcontainer dashboard eadd-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {addressdata.EmployerName},</h5></div>
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
              <form onSubmit={saveAddressDataHandler}>
              <div className="dashboard-right-wrap eadd-wrap">
                    <div className="main-inner-box">
                   
                      <div className="pageTitle title-fix sm">
                        <h2>Address</h2>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Postal Code</label>
                        </div>
                        <div className="col-lg-7">
                        <input
  type="text"
  className="form-control"
  placeholder="Postal Code"
  value={addressdata.PostalCode || ''}
  onChange={(e) => {
    setaddressdata({ ...addressdata, PostalCode: e.target.value });
  }}
/></div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Unit No</label>
                        </div>
                        <div className="col-lg-7">
                        <input
  type="text"
  className="form-control"
  placeholder="Unit No"
  value={addressdata.UnitNo || ''}
  onChange={(e) => {
    setaddressdata({ ...addressdata, UnitNo: e.target.value });
  }}
/>
 </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Street</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Street"
                          value={addressdata.StreetName}
                          onChange={(e)=>{setaddressdata({...addressdata,StreetName:e.target.value});}}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Building</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Building"
                          value={addressdata.BuildingName}
                          onChange={(e)=>{setaddressdata({...addressdata,BuildingName:e.target.value});}}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                      <div className="col-lg-5">
                        <label>Country</label>
                      </div>
                      <div className="col-lg-7">
                        <select 
                          className="form-control" 
                          value={addressdata.Country} 
                          onChange={(e) => setaddressdata({ ...addressdata, Country: e.target.value })}
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
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Email</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Email" readOnly
                          defaultValue={addressdata.EmailId}
                          /> </div>
                      </div>
                     
              </div>
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button" onClick={() => { handleLinkClick('/employerfamily');}}>SAVE & CONTINUE</button></div>
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

export default EmployerAddress;