import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import mapToPayload from './commonpayload';


const HelperLanguage = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [list, setList] = useState([]);
  const [langValue, setLangValue] = useState("");
  const [helperName, setHelperName] = useState('');
  const [understandingValue, setUnderstandingValue] = useState("");  
  const [speakingValue, setSpeakingValue] = useState("");
  const [remarksValue, setRemarksValue] = useState("");
  const HelperName = localStorage.getItem("HelperName");
  const [languagedata, setlanguagedata] = useState({})
  const [langdata, setlangdata] = useState({
    "OrgId": 1,
    "CvCode": "",
    "Language": "",
    "Understandinglevel": "",
    "Speakinglevel": "",
    "Remarks": "",
    "CreatedBy": "",
    "CreatedOn": ""
              
  });
 
  
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
      setlangdata({
        ...langdata,
        "OrgId": jpb.OrgId,
    "CvCode": HelperCode,
    
        
      });
      setHelperName(HelperName);
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
    if (langValue !== "" && understandingValue !== "" && speakingValue !== "") {
      const newLang = { 
        OrgId: jpb.OrgId,
        CvCode: HelperCode,
        Language: langValue,
        Understandinglevel: understandingValue,
        Speakinglevel: speakingValue,
        Remarks: remarksValue,
        CreatedBy: HelperName,
        CreatedOn: new Date()
      };
  
      // Ensure langdata is treated as an array
      setlangdata((prevLangData) => [...prevLangData, newLang]);
  
      // Clear input fields
      setLangValue("");
      setUnderstandingValue("");
      setSpeakingValue("");
      setRemarksValue("");
    }
  };
  
  

  const handleLangChange = (event) => {
    setLangValue(event.target.value);
  };
  
  const handleUnderstandingChange = (event) => {
    setUnderstandingValue(event.target.value);
  };

  const handleSpeakingChange = (event) => {
    setSpeakingValue(event.target.value);
  };
  
  const handleRemarksChange = (event) => {
    setRemarksValue(event.target.value);
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
      setlangdata(data.Data[0].Language || []);
      setlanguagedata(data.Data[0])
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const savelangdataHandler = async (event) => {
    event.preventDefault();
    
    if (langdata.length === 0) {
      toast.error("No languages added!");
      return;
    }
  
    const transformedData = langdata.map((item, index) => ({
      OrgId: item.OrgId,
      CvCode: Code,
      SLNo: index + 1,
      Language: item.Language,
      Understandinglevel: item.Understandinglevel,
      Speakinglevel: item.Speakinglevel,
      Remarks: item.Remarks,
      CreatedBy: HelperName,
      CreatedOn: new Date().toISOString(),
      ChangedBy: HelperName,
      ChangedOn: new Date().toISOString(),
    }));
  
    console.log("Saving Data:", transformedData);
    
    const payload = mapToPayload({
      ...languagedata,
      Language:transformedData,
    })
    console.log("payload", payload);
  
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
        toast.success('Helper Language Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  
        // Navigate to the '/helperaccount' page
        handleLinkClick('/helpermedical');  // Make sure handleLinkClick is defined and working
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
     
      <section className="fullcontainer dashboard helper-language-details hlng-page" data-aos="fade-up">
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
              <form onSubmit={savelangdataHandler}>
              <div className="dashboard-right-wrap hlng-wrap">
                <div className="main-inner-box">
                  <div className="pageTitle title-fix sm"><h2>Language Details</h2>
                  <p>Save all the pages and submit it under helper skills to save the data</p></div>
                   <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Choose the Language</label>
                              </div>
                              <div className="col-lg-7">
                                 <select className='form-control' value={langValue} onChange={handleLangChange}>
                                  <option value="">Please Select</option>
                                  <option value="English">English</option>
                                  <option value="Chinese">Chinese</option>
                                  <option value="Malay">Malay</option>
                                  <option value="Tamil">Tamil</option>
                                  <option value="French">French</option>
                                  <option value="Spanish">Spanish</option>
                                  <option value="Hindi">Hindi</option>
                                  <option value="Japanese">Japanese</option>
                                </select>
                              </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Understanding Level</label>
                              </div>
                              <div className="col-lg-7">
                                 <select className='form-control' value={understandingValue} onChange={handleUnderstandingChange}>
                                  <option value="">Please Select</option>
                                  <option value="Basic">Basic</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Speaking Level</label>
                              </div>
                              <div className="col-lg-7">
                                 <select className='form-control' value={speakingValue} onChange={handleSpeakingChange}>
                                 <option value="">Please Select</option>
                                  <option value="Basic">Basic</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>

                          

                            <div className="row form-group ">
                              <div className="col-lg-5">
                                <label>Remarks</label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Remarks" value={remarksValue} onChange={handleRemarksChange}></textarea>
                              </div>
                            </div>

                            
                            
                            <div className="row form-group align-items-center">

                        <div className="col-lg-12">
                        <button name="add-more" onClick={handleAdd} className="add-more"> Click here to save and Add New <i className="fas fa-plus"></i></button>
                        </div>
                      </div>
                      {list.length > 0 && (
                       <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                        <table className="table" style={{ width: "80%" }}>
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Language</th>
                              <th>Understanding Level</th>
                              <th>Speaking Level</th>
                              <th>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                          {list.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Language}</td>
                                <td>{item.Understandinglevel}</td>
                                <td>{item.Speakinglevel}</td>
                                <td>{item.Remarks}</td>
                              </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                      )}
                       {langdata.length > 0 && (
                       <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                        <h4>Saved Language Details</h4>
                        <table className="table" style={{ width: "80%" }}>
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Language</th>
                              <th>Understanding Level</th>
                              <th>Speaking Level</th>
                              <th>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                          {langdata.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Language}</td>
                                <td>{item.Understandinglevel}</td>
                                <td>{item.Speakinglevel}</td>
                                <td>{item.Remarks}</td>
                              </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                      )}

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

export default HelperLanguage;