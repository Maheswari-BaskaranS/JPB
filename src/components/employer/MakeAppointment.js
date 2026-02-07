import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';



const MakeAppointment = () => {

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
            <figure><img src="images/banner-hp-filup.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
      
      <section className="fullcontainer make-appointment aptmnt-page" data-aos="fade-up">
        <div className="inner-container">
        <div className="container">
          <div className="main-box-wrapper">
              <div className="main-inner-box pb40">
               <div className="pageTitle title-fix text-center md">
                        <h2>Make The Appointment For Interview</h2>
                </div>
                <div className="ehph-top-section ehp-fill-details-section">
                      <div className="row">
                        <div className="col-lg-auto">
                          <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="member-info">
                          <ul className="member-listing size-14">
                            <li><span>Helper Code:</span>
                              <p>ABCD12345</p>
                            </li>
                            <li><span>Helper Name:</span>
                              <p>Samantha Lim</p>
                            </li>
                            <li><span>Age:</span>
                              <p>27 yrs old</p>
                            </li>
                            <li><span>Nationality:</span>
                              <p>Singaporean</p>
                            </li>
                          </ul>
                          
                        </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="ehp-status">
                            <span>Status:</span>
                            <div className="e-stts available">Available</div>
                          </div>
                          <a href="#" className="custom-button mt20">PROCEED TO INTERVIEW</a>
                        </div>
                      </div>
                    </div>
              </div>
              <div className="date-time-wrapper">
                <div className="inner-container-sm">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="choose-date">
                        <div className="main-inner-box">
                          <div className="pageTitle title-fix xsm"><h2>Choose Date</h2></div>
                            <div id="datepicker">
                                <div className="ui-datepicker-today-top">11</div>
                            </div>
                   
                    <div className="row apntmnt-slot-info align-items-center mb15">
                      <div className="col-lg-12">
                        <div className="availableSlotsItem">Available</div>
                      </div>
                      
                      <div className="col-lg-12">
                        <div className="bookedSlotsItem">Booked</div>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="choose-time">
                        <div className="main-inner-box">
                          <div className="pageTitle title-fix xsm"><h2>Choose The Time (SG Time)</h2></div> 
                          <ul className="timeSlotsListing">
                                        <li className="active"><a href="javascript:void(0);">Morning Slot 1 : 10: AM to 10:30 AM</a></li>
                                        <li><a href="#">Morning Slot 2 : 10:30 AM to 11 AM</a></li>
                                        <li><a href="#">Morning Slot 3 : 11 AM to 11:30 AM</a></li>
                                        <li><a href="#">Morning Slot 4 : 11:30 AM to 12 PM</a></li>
                                        <li className="disable"><a href="#">Afternoon Slot 1 : 12:30 PM to 1 PM</a></li>
                                        <li><a href="#">Afternoon Slot 2 : 3 PM to 3:30 PM</a></li>
                                        <li className="disable"><a href="#">Afternoon Slot 3 : 3 :30 PM to 4 PM</a></li>
                                        <li><a href="#">Afternoon Slot 4 : 5 PM to 5:30 PM</a></li>
                                    </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    <div className="row align-items-center justify-content-center"><div className="col-auto"><a href="#" className="custom-button mt20">PROCEED TO INTERVIEW</a></div></div>
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
}
export default MakeAppointment;