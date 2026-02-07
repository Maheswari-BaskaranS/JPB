import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getCountryData } from '../../apiCalls';
import mapToPayload from './commonpayload';


const HelperExperience = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [list, setList] = useState([]);
  const [countryValue, setCountryValue] = useState("");
  const [startdateValue, setStartdateValue] = useState("");  
  const [enddateValue, setEnddateValue] = useState("");
  const [dutyValue, setDutyValue] = useState("");
  const [reasonValue, setReasonValue] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [feedback,setFeedback] = useState("");
  const [race,setRace] = useState("");
  const [raceDesc,setRaceDesc] = useState("");
  const [helperName, setHelperName] = useState('');
  const [testimonialValue, setTestimonialValue] = useState("");
  const HelperName = localStorage.getItem("HelperName");
  const [experiencesdata, setexperiencesdata] = useState({})
  const [experiencedata, setexperiencedata] = useState({
    "OrgId": 1,
    "CvCode": "",
    "Country": "",
    "StartDate": "",
    "StartDateString":"",
    "EndDateString":"",
    "EndDate": "",
    "Duty": "",
    "ReasonofLeaving": "",
    "Testimonial": "",
    "CreatedBy": "",
    "CreatedOn": "",
    "FeedBack":"",
    "Name":"",
    "Race":"",
    "RaceDesc":"",
  });
  const [countryOptions, setCountryOptions] = useState();

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
      setexperiencedata({
        ...experiencedata,
        "OrgId": 1,
    "CVCode": HelperCode,
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

  if (countryValue !== "") {
    const lastSLNo = list.length > 0 ? Math.max(...list.map(item => item.SLNo)) : 0;
    const newSLNo = lastSLNo + 1; // Ensuring proper incremental numbering

    const newExperience = {
      OrgId: 1,
      CVCode: Code,
      Country: countryValue,
      StartDate: startdateValue,         
      EndDate: enddateValue,           
      EndDateString: enddateValue,       
      StartDateString: startdateValue, 
      Duty: dutyValue,
      ReasonofLeaving: reasonValue,
      TestimonialURL: "string",
      Testimonial: testimonialValue,
      TestimonialFileName: "string",
      TestimonialFileValue: "string",
      TypeOfResidence: "string",
      FeedBack: feedback,
      Name: employerName,
      Race: race,
      RaceDesc: raceDesc,
      CreatedBy: HelperName,
      SLNo: newSLNo, // Correct numbering logic applied
      CreatedOn: new Date(),
      ChangedBy: HelperName,
      ChangedOn: new Date().toISOString(),
    };

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('helperExperience')) || [];

    // Merge new experience with existing data
    const updatedList = [...existingData, newExperience];
    setList(updatedList);

    // Save updated list back to localStorage
    localStorage.setItem('helperExperience', JSON.stringify(updatedList));

    // Clear input fields
    setCountryValue("");
    setStartdateValue("");
    setEnddateValue("");
    setDutyValue("");
    setReasonValue("");
    setTestimonialValue("");
    setRaceDesc("");
    setRace("");
    setFeedback("");
    setEmployerName("");
  }
};

  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };
  
  const handleStartdateChange = (event) => {
    console.log(event.target.value,event);
    setStartdateValue(event.target.value);
  };

  const handleEnddateChange = (event) => {
    setEnddateValue(event.target.value);
  };
  
  const handleDutyChange = (event) => {
    setDutyValue(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReasonValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setEmployerName(event.target.value);
  };

  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  };

  const handleRace = (event) => {
    setRace(event.target.value);
  };

  const handleRaceDesc = (event) => {
    setRaceDesc(event.target.value);
  };
  
  const handleTestimonialChange = (event) => {
    setTestimonialValue(event.target.value);
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
       const apiData = data.Data[0].HelperExperience || [];
  const localData = JSON.parse(localStorage.getItem('helperExperience')) || [];
  const combined = [...apiData, ...localData];
  setList(combined); 
      setexperiencedata(data.Data[0].HelperExperience);
      setexperiencesdata(data.Data[0])
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const saveexperiencedataHandler = async (event) => {
    event.preventDefault();
  
    // Get existing experiences from localStorage
    const existingData = JSON.parse(localStorage.getItem('helperExperience')) || [];
  
    const transformedData = existingData.map((item,index) => ({
      OrgId: 1,
      CVCode: Code,
      SLNo: index + 1,
      Country: item.Country,
      StartDate: (item.StartDate),
      EndDate: (item.EndDate),
      EndDateString:item.EndDate,
      StartDateString:item.StartDate,
      Duty: item.Duty,
      FeedBack:item.FeedBack,
      Name:item.Name,
      Race:item.Race,
      RaceDesc:item.RaceDesc,
      ReasonofLeaving: item.ReasonofLeaving,
        TestimonialURL: "string",
        TestimonialFileName:"string",
        // TestimonialFileValue: "string",
        TypeOfResidence: "string",  
      Testimonial: item.Testimonial,
      CreatedBy: item.CreatedBy || "Unknown", // Default value if missing
      CreatedOn: item.CreatedOn || new Date().toISOString(), // Ensure CreatedOn is set
      ChangedBy:HelperName,
      ChangedOn:new Date().toISOString(),
    }));
  
    console.log("Final data to be stored:", transformedData);

    const payload = mapToPayload({
      ...experiencesdata,
      HelperExperience:transformedData,
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
        toast.success('Helper Experience Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  localStorage.removeItem('helperExperience'); 
        // Navigate to the '/helperaccount' page
        handleLinkClick('/helperlanguage');  // Make sure handleLinkClick is defined and working
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
   
      <section className="fullcontainer dashboard helper-experience-details hexd-page" data-aos="fade-up">
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
              <form onSubmit={saveexperiencedataHandler}>
              <div className="dashboard-right-wrap hexd-wrap">
                <div className="main-inner-box">
                  <div className="pageTitle title-fix sm"><h2>Experience Details</h2>
                  <p>Save all the pages and submit it under helper skills to save the data</p></div>
                   <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Country</label>
                              </div>
                              <div className="col-lg-7">
                                 <select className='form-control' value={countryValue} onChange={handleCountryChange}>
                                  <option value="">Please Select</option>
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
                                <label>Start Date</label>
                              </div>
                              <div className="col-lg-7">
                                <div className="inrow date-wrap datepicker-wrap">
                                <input 
  type="date" 
  className="form-control" 
  name="StartDate" 
  id="StartDate" 
  placeholder="DD/MM/YYYY"
  value={startdateValue}
  onChange={handleStartdateChange} 
/> 

                          </div>
                              </div>
                            </div>

                             <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>End Date</label>
                              </div>
                              <div className="col-lg-7">
                                <div className="inrow date-wrap datepicker-wrap">
                                <input 
  type="date" 
  className="form-control" 
  name="EndDate" 
  id="EndDate" 
  placeholder="DD/MM/YYYY"
  value={enddateValue}
  onChange={handleEnddateChange} 
/>

                          </div>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Name of the Employer  </label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Name of the Employer" value={employerName} onChange={handleNameChange}></textarea>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Feedback </label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Feedback" value={feedback} onChange={handleFeedback}></textarea>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Race  </label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Race" value={race} onChange={handleRace}></textarea>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Race Desc  </label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Race Desc" value={raceDesc} onChange={handleRaceDesc}></textarea>
                              </div>
                            </div>
                            <div className="row form-group ">
                              <div className="col-lg-5">
                                <label>Duty</label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Duty" value={dutyValue} onChange={handleDutyChange}></textarea>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Reason of Leaving  </label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Reason of Leaving" value={reasonValue} onChange={handleReasonChange}></textarea>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-5">
                                <label>Testimonial</label>
                              </div>
                              <div className="col-lg-7">
                              <textarea 
  className="form-control" 
  placeholder="Testimonial" 
  value={testimonialValue}
  onChange={handleTestimonialChange}>
</textarea>

                              </div>
                            </div>
                            <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                        <button name="add-more" onClick={handleAdd} className="add-more"> Click here to save Experience <i className="fas fa-plus"></i></button>
                        </div>
                      </div>

                      {list.length > 0 && (
                       <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                        <table className="table" style={{ width: "80%" }}>
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Country</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Duty</th>
                              <th>Reason of Leaving</th>
                             {/*  <th>Testimonial</th> */}
                            </tr>
                          </thead>
                          <tbody>
                          {list.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Country}</td>
                                <td>{item.StartDate}</td>
                                <td>{item.EndDate}</td>
                                <td>{item.Duty}</td>
                                <td>{item.ReasonofLeaving}</td>
                                {/* <td>{item.Testimonial}</td> */}
                              </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                      )}
                       {experiencedata.length > 0 && (
                       <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                        <h4>Saved Experience Details</h4>
                        <table className="table" style={{ width: "80%" }}>
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Country</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Duty</th>
                              <th>Reason of Leaving</th>
                              {/* <th>Testimonial</th> */}
                            </tr>
                          </thead>
                          <tbody>
                          {experiencedata.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Country}</td>
                                <td>{item.StartDate}</td>
                                <td>{item.EndDate}</td>
                                <td>{item.Duty}</td>
                                <td>{item.ReasonofLeaving}</td>
                                {/* <td>{item.Testimonial}</td> */}
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

export default HelperExperience;