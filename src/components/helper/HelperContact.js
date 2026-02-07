import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import mapToPayload from './commonpayload';


const HelperContact = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [helperName, setHelperName] = useState('');
  const [list, setList] = useState([]);
  const [typeValue, setTypeValue] = useState("");
  const [infoValue, setInfoValue] = useState(""); 
  const [contactsdata, setcontactsdata] = useState({})
  const [contactdata, setcontactdata] = useState({
    "OrgId": 1,
    "CVCode": "",
    "SLNo":1,
    "Homeaddress": "",
    "MobileNo": "",
    "Whatsapp": "",
    "Viber": "",
    "Facebook": "",
    "Type":"",
    "OtherType":"",
    // "OtherContact": [
    //   {
    //     "OrgId": 1,
    //     "HelperCode": "",
    //     "Type": "",
    //     "Information": ""
    //   }
    // ]
  });
 
  const HelperName = localStorage.getItem("HelperName");
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
      setcontactdata({
        ...contactdata,
        "OrgId": 1,
        "CVCode": Code,
        "SLNo":1,
        "HomeAddress": storedData[0]?.HomeAddress,
        "HomeTelephone": storedData[0]?.HomeTelephone,
        "Whatsapp": storedData[0]?.Whatsapp,
        "Viber": storedData[0]?.Viber,
        "Facebook": storedData[0]?.Facebook,
        "Type":storedData[0]?.Type,
    "OtherType":storedData[0]?.OtherType,
        // "OtherContact": [
        //   {
        //     "OrgId": 1,
        //     "HelperCode": storedData[0].HelperCode,
        //     "Type": "",
        //     "Information": ""
        //   }
        // ]
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

  const handleAdd = (e) => {
    e.preventDefault();
    if (typeValue !== "" && infoValue !== "") {
      setList((prevList) => [...prevList, { Type: typeValue, Information: infoValue ,OrgId:jpb.OrgId,CVCode:storedData[0].CVCode }]);
      console.log(list);
      setTypeValue("");
      setInfoValue("");
    }
  };

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
  };
  
  const handleInfoChange = (event) => {
    setInfoValue(event.target.value);
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
        setcontactdata(data.Data[0].Contacts[0]);
        setcontactsdata(data.Data[0])
        // setTypeValue(data.Data[0].Contacts[0].Type)
      } catch (error) {
        console.log('Error:', error);
      }
    }
  
console.log(contactdata)

    useEffect(() => {
      fetchdata();
    }, []);

  const savecontactdataHandler = async (event) => {
    event.preventDefault();
    
    // localStorage.setItem('helperContact', JSON.stringify(UpdatedHelperContactdata)); 
    setcontactsdata((prev) => ({
      ...prev,
      Contacts:[contactdata]
    }));
    const payload = mapToPayload(contactsdata)
    console.log("payload", payload)
    
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
        toast.success('Helper Contact Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  
        // Navigate to the '/helperaccount' page
        handleLinkClick('/helperfamily');  // Make sure handleLinkClick is defined and working
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
      
      <section className="fullcontainer dashboard helper-contact-details hcd-page" data-aos="fade-up">
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
              <form onSubmit={savecontactdataHandler}>
              <div className="dashboard-right-wrap hct-wrap">
                    <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Contact Details</h2>
                        <p>Save all the pages and submit it under helper skills to save the data</p>
                      </div>
                     <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Home Address</label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Home Address"
                                value={contactdata?.Homeaddress}
                                onChange={(e)=>{setcontactdata({...contactdata,Homeaddress:e.target.value});}}
                                ></textarea>
                              </div>
                            </div>  
                             <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Contact</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="tel" className="form-control" placeholder="Contact"
                           value={contactdata?.MobileNo}
                           onChange={(e)=>{setcontactdata({...contactdata,MobileNo:e.target.value});}}
                           maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
                            /> 
                        </div>
                      </div>   
                       <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Viber</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="text" className="form-control" placeholder="Viber"
                           value={contactdata?.Viber}
                           onChange={(e)=>{setcontactdata({...contactdata,Viber:e.target.value});}}
                            /> 
                        </div>
                      </div> 
                       <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Facebook</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="text" className="form-control" placeholder="Facebook"
                           value={contactdata?.Facebook}
                           onChange={(e)=>{setcontactdata({...contactdata,Facebook:e.target.value});}}
                            /> 
                        </div>
                      </div> 

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Whatsapp</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="tel" className="form-control" placeholder="Whatsapp"
                           value={contactdata?.Whatsapp}
                           onChange={(e)=>{setcontactdata({...contactdata,Whatsapp:e.target.value});}}
                           maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
                            /> 
                        </div>
                      </div> 
                          {/*   <div className="row mb15 sub-title-row form-group align-items-center">
                        <div className="col-lg-12">
                          <h6>Other Contact</h6>
                        </div>
                      </div> */}
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Type</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Type"
                          value={contactdata?.Type}
                          onChange={(e)=>{setcontactdata({...contactdata, Type:e.target.value});}}
                          /> </div>
                      </div>
                {/*       <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Information</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Info"
                                                  value={contactdata?.OtherType}
                                                  onChange={(e)=>{setcontactdata({...contactdata, OtherType:e.target.value});}}
                          /> </div>
                      </div> */}

                      {/* <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                          <button name="add-more" onClick={handleAdd} className="add-more"> Add <i className="fas fa-plus"></i></button>
                        </div>
                      </div>  */}
                     
                      {/* {list.length > 0 && (
                       <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                        <table className="table" style={{ width: "80%" }}>
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Type</th>
                              <th>Information</th>
                            </tr>
                          </thead>
                          <tbody>
                          {list.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Type}</td>
                                <td>{item.Information}</td>
                              </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                      )} */}
                     
                   
                        
              </div>
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button">Save</button></div>
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

export default HelperContact;