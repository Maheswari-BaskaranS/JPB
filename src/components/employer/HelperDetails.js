import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';



const HelperDetails = () => {
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
      
      <section className="fullcontainer helper-details hdt-page" data-aos="fade-up">
        <div className="inner-container">
        <div className="container">
          <div className="main-box-wrapper">
              <div className="main-inner-box pb40">
               <div className="pageTitle title-fix text-center md">
                        <h2>Helper Details</h2>
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
              <div className="helper-details-bottom-section mt30">
                      <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-1" role="button" aria-expanded="false" aria-controls="edf-1">1. Helper Bio Details</a> </div>
                      <div className="collapse" id="edf-1">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-2" role="button" aria-expanded="false" aria-controls="edf-2">2. Family Background</a> </div>
                      <div className="collapse" id="edf-2">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-3" role="button" aria-expanded="false" aria-controls="edf-3">3. Physical Attribute</a> </div>
                      <div className="collapse" id="edf-3">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-4" role="button" aria-expanded="false" aria-controls="edf-4">4. Education Details</a> </div>
                      <div className="collapse" id="edf-4">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-5" role="button" aria-expanded="false" aria-controls="edf-5">5. Experience Details</a> </div>
                      <div className="collapse" id="edf-5">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-6" role="button" aria-expanded="false" aria-controls="edf-6">6. Language Details</a> </div>
                      <div className="collapse" id="edf-6">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-7" role="button" aria-expanded="false" aria-controls="edf-7">7. Medical Details</a> </div>
                      <div className="collapse" id="edf-7">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-8" role="button" aria-expanded="false" aria-controls="edf-8">8 Skills Details</a> </div>
                      <div className="collapse" id="edf-8">
                        <div className="card card-body">
                         
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-9" role="button" aria-expanded="false" aria-controls="edf-9">9. Booking Related Info</a> </div>
                      <div className="collapse" id="edf-9">
                        <div className="card card-body">
                         
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
};

export default HelperDetails;