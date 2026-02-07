import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';



const HelperInterview2 = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [helperName, setHelperName] = useState('');
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const HelperName = localStorage.getItem("HelperName");
  // const navigate = useNavigate();
  useEffect(() => {
    setSelectedLink(window.location.pathname);
    let token = localStorage.getItem("helpertoken");
    console.log(token);
    if (token) {
      console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
      setHelperName(storedData[0].HelperName);
    }
    console.log(ishelperloggedin);
    console.log(storedData);
  }, []);

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
     
      <section className="fullcontainer dashboard helper-interview-appointment-details2 hbd-page pb30" data-aos="fade-up">
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
              <div className="dashboard-right-wrap hiad2-wrap hiad-wrap">
                <div className="main-inner-box">
                  <div className="pageTitle title-fix sm"><h2>Interview Appointment Details</h2></div>
               
                  <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#home">Past Interview</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#menu1">Current Interview</a>
                    </li>
                  </ul>

                 
                  <div className="tab-content">
                    <div className="tab-pane fade" id="home">
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
                            <tr>
                              <td> ABC1234 </td>
                              <td> ABCD12345 </td>
                              <td> Samantha </td>
                              <td> 25 Feb 2022
                                <br/> 2:00 PM </td>
                              <td>
                                <div className="m-status completed">Completed</div>
                              </td>
                            </tr>
                            <tr>
                              <td> ABC1234 </td>
                              <td> ABCD12345 </td>
                              <td> Samantha </td>
                              <td> 25 Feb 2022
                                <br/> 2:00 PM </td>
                              <td>
                                <div className="m-status cancelled">Cancelled</div>
                              </td>
                            </tr>
                            <tr>
                              <td> ABC1234 </td>
                              <td> ABCD12345 </td>
                              <td> Samantha </td>
                              <td> 25 Feb 2022
                                <br/> 2:00 PM </td>
                              <td>
                                <div className="m-status rescheduled">Re-scheduled</div>
                              </td>
                            </tr>
                            <tr>
                              <td> ABC1234 </td>
                              <td> ABCD12345 </td>
                              <td> Samantha </td>
                              <td> 25 Feb 2022
                                <br/> 2:00 PM </td>
                              <td>
                                <div className="m-status cancelled">Cancelled</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane active" id="menu1">
                      <div className="row gutters-10 align-items-center">
                      <div className="col-lg-12">
                        <div className="">
                          <ul className="member-listing alt size-14">
                            <li>
                              <p>Meeting ID:</p>
                              <span>ABCD12345</span>
                            </li>
                            <li>
                              <p>Meeting Link:</p>
                              <a href="#">www.google.com</a>
                            </li>
                            <li>
                              <p>Employer Name</p>
                              <span>Timothy Lim</span>
                            </li>
                            <li>
                              <p>Meeting Datetime</p>
                              <span>Afternoon Slot 12 : 5:30 PM to 6 PM, City Square Mall</span>
                            </li>
                          
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="select-action">
                    <h6>Please select one of the actions below</h6>
                    <div className="row gutters-5 grid-10">
                      <div className="col-lg-4"><a href="#" className="select-action-button no-arrow confirm">CONFIRM THE MEETING</a></div>
                      <div className="col-lg-4"><a href="#" className="select-action-button cancel">CANCEL THE MEETING</a></div>
                      <div className="col-lg-4"><a href="#" className="select-action-button reschedule">RESCHEDULE THE MEETING</a></div>
                    </div>
                    <div className="row mt30 form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Avaialable Date (SGT)</label>
                        </div>
                        <div className="col-lg-7">
                          <div className="inrow date-wrap datepicker-wrap">
                                  <input type="text" className="form-control datepicker" placeholder="DD/MM/YYYY" readonly/> <i className="fas fa-calendar-alt"></i> 
                          </div> 
                        </div>
                      </div>
                      <div className="row mt30 form-group select-group select-slot-group align-items-center">
                        <div className="col-lg-5">
                          <label>Avaialable Time (SGT)</label>
                        </div>
                        <div className="col-lg-7">
                          <select multiple className="selectpicker form-control" id="number-multiple" data-virtual-scroll="true">
                                  <option>Morning Slot 1 : 10: AM to 10:30 AM</option>
                                  <option>Morning Slot 2 : 10:30 AM to 11 AM</option>
                                  <option>Morning Slot 3 : 11 AM to 11:30 AM</option>
                                  <option>Morning Slot 4 : 11:30 AM to 12 PM</option>
                                  <option>Afternoon Slot 1 : 12 PM to 12:30 PM</option>
                                  <option>Afternoon Slot 2 : 12:30 PM to 1 PM</option>
                                  <option>Afternoon Slot 3 : 1 PM to 1:30 PM</option>
                                  <option>Afternoon Slot 4 : 1:30 PM to 2 PM</option>
                                  <option>Afternoon Slot 5 : 2 PM to 2:30 PM</option>
                                  <option>Afternoon Slot 6 : 2:30 PM to 3 PM</option>
                                  <option>Afternoon Slot 7 : 3 PM to 3:30 PM</option>
                                  <option>Afternoon Slot 8 : 3 :30 PM to 4 PM</option>
                                  <option>Afternoon Slot 9 : 4 PM to 4:30 PM</option>
                                  <option>Afternoon Slot 10 : 4:30 PM to 5 PM</option>
                                  <option>Afternoon Slot 11 : 5 PM to 5:30 PM</option>
                                  <option>Afternoon Slot 12 : 5:30 PM to 6 PM</option>
                                </select>
                        </div>
                      </div>
                    </div>

                    </div>
                   
                  </div>

              </div>
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="button" className="custom-button">SAVE</button></div>
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

export default HelperInterview2;