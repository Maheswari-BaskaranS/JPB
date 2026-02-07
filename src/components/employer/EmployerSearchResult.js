import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerSearchResult = () => {
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
      
      <section className="fullcontainer helper-search-result hsr-page" data-aos="fade-up">
        <div className="inner-container">
        <div className="container container-lg">
          <div className="pageTitle text-center md"><h2>Related Helpers Searched Result</h2></div>
          <div className="row">
            <div className="col-xl-auto row-inner-lg"> 
              <div className="sidebar search-result-sidebar">
              <h6>Filter By</h6>
              <div className="sidebar-widget">
                <h6>Age Range</h6>
                <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                          <label>From</label>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" className="form-control" placeholder="From"/> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                          <label>To</label>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" className="form-control" placeholder="To"/> </div>
                      </div>
              </div>
               <div className="categories-list">
                            <div className="sideNav">
                              <ul>
                                <li className="active selected"><a href="#">Religion</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a1"/>
                                          <label for="a1">Buddhist</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a2"/>
                                          <label for="a2">Christian </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a3"/>
                                          <label for="a3">Roman Catholic</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a4"/>
                                          <label for="a4">Muslim</label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a5"/>
                                          <label for="a5">Hindu</label>
                                      </div>
                                    </li>
                                     <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="a6"/>
                                          <label for="a6">Other</label>
                                      </div>
                                    </li>
                                   
                                  </ul>
                                </li>
                                <li><a href="#">Nationality</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b1"/>
                                          <label for="b1">Indonesia</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b2"/>
                                          <label for="b2">Phillipines </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b3"/>
                                          <label for="b3">Myanmar</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b4"/>
                                          <label for="b4">Sri Lanka</label>
                                      </div>
                                    </li>

                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b5"/>
                                          <label for="b5">Thailand</label>
                                      </div>
                                    </li>
                                     <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="b6"/>
                                          <label for="b6">Indian</label>
                                      </div>
                                    </li>
                                   
                                  </ul>
                                </li>
                                <li><a href="#">Marital Status</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="c1"/>
                                          <label for="c1">Single</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="c2"/>
                                          <label for="c2">Married </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="c3"/>
                                          <label for="c3">Divorced</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="c4"/>
                                          <label for="c4">Widowed</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                
                                <li><a href="#">Experinces</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d1"/>
                                          <label for="d1">Singapore</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d2"/>
                                          <label for="d2">Malaysia </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d3"/>
                                          <label for="d3">Hong Kong</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d4"/>
                                          <label for="d4">Saudi</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d5"/>
                                          <label for="d5">Indonesia</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d6"/>
                                          <label for="d6">Phillippines</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d7"/>
                                          <label for="d7">Myanmar</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="d8"/>
                                          <label for="d8">Other</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>

                                <li><a href="#">Child Care</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="e1"/>
                                          <label for="e1">New-born Baby Care (0-2 months)</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="e2"/>
                                          <label for="e2">Infant Care (2-17 months) </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="e3"/>
                                          <label for="e3">Toddlers Care (18-30 months)</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="e4"/>
                                          <label for="e4">Child Care (3-10 years)</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                
                                <li><a href="#">Elderly Care</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f1"/>
                                          <label for="f1">Dementia Care</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f2"/>
                                          <label for="f2">Mental Health Condition Care </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f3"/>
                                          <label for="f3">Stroke Care</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f4"/>
                                          <label for="f4">Postoperative Care</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f5"/>
                                          <label for="f5">Indonesia</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f6"/>
                                          <label for="f6">Physical Disability Care</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="f7"/>
                                          <label for="f7">Bedridden Care</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>

                                <li><a href="#">Cooking Skills</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="g1"/>
                                          <label for="g1">Chinese Cuisine</label>
                                      </div>
                                    </li>
                                    
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="g2"/>
                                          <label for="g2">Indian Cuisine</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="g3"/>
                                          <label for="g3">Western Cuisine</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="g4"/>
                                          <label for="g4">Malay Cuisine</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="g5"/>
                                          <label for="g5">Others</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>

                                <li><a href="#">Languages</a>
                                  <ul>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="h1"/>
                                          <label for="h1">English</label>
                                      </div>
                                    </li>
                                    
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="h2"/>
                                          <label for="h2">Mandarin</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="h3"/>
                                          <label for="h3">Hokkein</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="h4"/>
                                          <label for="h4">Cantonese</label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="checkbox">
                                          <input type="checkbox" id="h5"/>
                                          <label for="h5">Others</label>
                                      </div>
                                    </li>
                                  </ul>
                                </li>


                               
                           </ul>
                         </div>

                       </div>

                  <div className="row mt20 sidebar-action justify-content-center">
                      <div className="col--lg-12"><button type="button" className="custom-button w-100">APPLY </button></div>
                    </div>

            </div>
            </div>
            <div className="col-xl">
              <div className="search-result-right">
            <div className="search-result-holder">
              <div className="row grid-15 align-items-center">
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-15 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-1.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-10 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-15 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-1.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-10 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-15 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-1.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-10 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-15 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-1.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-10 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-15 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-1.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="member-box">
                    <div className="row gutters-10 align-items-center">
                      <div className="col-lg-5">
                        <div className="member-photo">
                          <div className="img-holder img-cover">
                            <figure><img src="images/member-2.jpg" className="responsive" alt=""/></figure>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="member-info">
                          <div className="member-title">Samantha Lim <span>ABCD12345</span></div>
                          <ul className="member-listing size-14">
                            <li><span>Age</span>
                              <p>21</p>
                            </li>
                            <li><span>Marital Status</span>
                              <p>Single</p>
                            </li>
                            <li><span>Nationality</span>
                              <p>Singaporean</p>
                            </li>
                            <li><span>WhatsApp:</span>
                              <p>+65 64670039</p>
                            </li>
                          </ul>
                          <div className="contact-agent text-right size-14"><Link to="/helperdetails">View More Details</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
              <div className="row grid-5 mt50 align-items-center justify-content-center">
              <div className="col-auto pagination-container">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link prev" href="#"><i className="fas fa-arrow-circle-left"></i></a></li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><span>...</span></li>
                  <li className="page-item"><a className="page-link" href="#">5</a></li>
                  <li className="page-item"><a className="page-link next" href="#"><i className="fas fa-arrow-circle-right"></i></a></li>
                </ul>
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

export default EmployerSearchResult;