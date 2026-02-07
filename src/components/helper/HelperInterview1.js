import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';


const HelperInterview1 = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [helperName, setHelperName] = useState('');
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [interviewDetails, setInterviewDetails] = useState([])
  // const navigate = useNavigate();
  const HelperName = localStorage.getItem("HelperName");
  const HelperCode =localStorage.getItem("HelperCode");

   const fetchdata = async () => {
    try {
      const response = await fetch(
        `https://jpbapi.appxes-erp.in/Interview/GetallByHelper?OrganizationId=1&HelperCode=${HelperCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch Interview Details data");
      }
  
      const result = await response.json();
      if (result.Data) {
        setInterviewDetails(result.Data);
      }
      
      
      if (result.Data.length > 0) {
        setHelperName(result.Data[0].EmployerName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSelectedLink(window.location.pathname);
    let token = localStorage.getItem("helpertoken");
    console.log(token);
    if (token) {
      console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
     // setHelperName(storedData[0].HelperName);
    }
    console.log(ishelperloggedin);
    console.log(storedData);
    fetchdata();
  }, []);

  const currentDate = new Date();
  const pastInterviews = interviewDetails.filter((item) => new Date(item.InterviewDate) < currentDate);
  const currentInterviews = interviewDetails.filter((item) => new Date(item.InterviewDate) >= currentDate);

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
      
      <section className="fullcontainer dashboard helper-booking-details hbd-page" data-aos="fade-up">
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
              <div className="dashboard-right-wrap hiad-wrap">
                <div className="main-inner-box">
                  <div className="pageTitle title-fix sm"><h2>Interview Appointment Details</h2></div>
               
                  <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#home">Past Interview</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu1">Current Interview</a>
                    </li>
                  </ul>

                  
                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      <div className="table-holder Scrollcontent" data-mcs-theme="dark">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Meeting ID</th>
                              <th>Meeting Link</th>
                              <th>Helper Name</th>
                              <th>Meeting Date/Time</th>
                              <th>Meeting Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pastInterviews.length > 0 ? (
                              pastInterviews.map((interview, index) => (
                                <tr key={index}>
                                  <td>{interview.InterviewCode || "-"}</td>
                                  <td>{interview.MeetingLink ? <a href={interview.MeetingLink} target="_blank" rel="noopener noreferrer">Join</a> : "-"}</td>
                                  <td>{interview.HelperName || "-"}</td>
                                  <td>{interview.InterviewDateString} <br/> {interview.InterviewTimeString}</td>
                                  <td>
                                  <div className={`m-status ${interview.Status ? interview.Status.toLowerCase() : ''}`}>
                            {interview.Status || "-"}
                          </div>

                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan="5" style={{textAlign:"center"}}>No Past Interviews</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="menu1">
                      <div className="table-holder Scrollcontent" data-mcs-theme="dark">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Meeting ID</th>
                              <th>Meeting Link</th>
                              <th>Helper Name</th>
                              <th>Meeting Date/Time</th>
                              <th>Meeting Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentInterviews.length > 0 ? (
                              currentInterviews.map((interview, index) => (
                                <tr key={index}>
                                  <td>{interview.InterviewCode || "-"}</td>
                                  <td>{interview.MeetingLink ? <a href={interview.MeetingLink} target="_blank" rel="noopener noreferrer">Join</a> : "-"}</td>
                                  <td>{interview.HelperName || "-"}</td>
                                  <td>{interview.InterviewDateString} <br/> {interview.InterviewTimeString}</td>
                                  <td>
                                    <div className={`m-status ${interview.Status.toLowerCase()}`}>{interview.Status}</div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan="5" style={{textAlign:"center"}}>No Upcoming Interviews</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                   
                  </div>
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

export default HelperInterview1;