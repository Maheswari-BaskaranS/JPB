import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const EmployerInterview = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = useState([]);
  const [employerName, setEmployerName] = useState('');
  const [interviewDetails, setInterviewDetails] = useState([])
   const [isloggedin, setisloggedin] = React.useState(false);
   console.log("interviewDetails----",interviewDetails)
  // const navigate = useNavigate();
  const fetchdata = async () => {
    try {
      const employerCode = localStorage.getItem("EmployerCode");
  
      if (!employerCode) {
        toast.error("EmployerCode not found.");
        return;
      }
  
      const response = await fetch(
        `https://jpbapi.appxes-erp.in/Interview/GetallByEmployer?OrganizationId=1&EmployerCode=${employerCode}`,
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
  
      // ✅ Safely handle null or undefined data
      const interviewData = result.Data || [];
  
      setInterviewDetails(interviewData);
  
      if (interviewData.length > 0) {
        setEmployerName(interviewData[0].EmployerName || '');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error loading interview data.");
    }
  };

  useEffect(() => {
    setSelectedLink(window.location.pathname);
    let token = localStorage.getItem("token");
    if (token) {
      setisloggedin(true);
      setstoreddata(JSON.parse(token));
    }
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

  const EmployerName = localStorage.getItem("EmployerName");

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
     
      <section className="fullcontainer dashboard eiad-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {EmployerName},</h5></div>
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
              <div className="dashboard-right-wrap eiad-wrap">
               
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
                        <table className="table responsive-table">
                          <thead>
                            <tr>
                              <th>Interview Code</th>
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
        <td>{interview.InterviewCode || "N/A"}</td>
        <td>{interview.MeetingLink ? <a href={interview.MeetingLink} target="_blank" rel="noopener noreferrer">Join</a> : "N/A"}</td>
        <td>{interview.HelperName || "N/A"}</td>
        <td>{interview.InterviewDateString || 'N/A'} <br/> {interview.InterviewTimeString || 'N/A'}</td>
        <td>
        <td>
  <div className={`m-status ${interview.Status ? interview.Status.toLowerCase() : ''}`}>
    {interview.Status || "N/A"}
  </div>
</td>


        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="5">No Past Interviews</td></tr>
  )}
</tbody>

                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="menu1">
                                            <div className="table-holder Scrollcontent" data-mcs-theme="dark">
                        <table className="table responsive-table">
                          <thead>
                          <tr>
                              <th>Interview Code</th>
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
        <td>{interview.InterviewCode || "N/A"}</td>
        <td>{interview.MeetingLink ? <a href={interview.MeetingLink} target="_blank" rel="noopener noreferrer">Join</a> : "N/A"}</td>
        <td>{interview.HelperName || "N/A"}</td>
        <td>{interview.InterviewDateString} <br/> {interview.InterviewTimeString}</td>
        <td>
          <div className={`m-status ${interview.Status.toLowerCase()}`}>{interview.Status}</div>
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="5">No Upcoming Interviews</td></tr>
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

export default EmployerInterview;