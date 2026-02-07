import React, {  useEffect } from 'react';
import $ from "jquery";
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { toast } from 'react-toastify';



const EmployerHiringProcess = () => {
    useEffect(() => {
   
        const verificationForm = () => {
            (function($) {
                "use strict";
                //* Form js
                function verificationForm() {
                  //jQuery time
                  var current_fs, next_fs, previous_fs; //fieldsets
                  var left, opacity, scale; //fieldset properties which we will animate
                  var animating; //flag to prevent quick multi-click glitches
                  $(".next").click(function() {
                    if(animating) return false;
                    animating = true;
                    current_fs = $(this).parent();
                    next_fs = $(this).parent().next();
                    //activate next step on progressbar using the index of next_fs
                    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                    //show the next fieldset
                    next_fs.show();
                    //hide the current fieldset with style
                    current_fs.animate({
                      opacity: 0
                    }, {
                      step: function(now, mx) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale current_fs down to 80%
                        //scale = 1 - (1 - now) * 0.2;
                        //2. bring next_fs from the right(50%)
                        //left = now * 50 + "%";
                        //3. increase opacity of next_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({
                          //transform: "scale(" + scale + ")",
                          //position: "absolute"
                        });
                        next_fs.css({
                          //left: left,
                          opacity: opacity
                        });
                      },
                      duration: 400,
                      complete: function() {
                        current_fs.hide();
                        animating = false;
                      },
                      //this comes from the custom easing plugin
                      //easing: "easeInOutBack"
                    });
                  });
                  $(".previous").click(function() {
                    if(animating) return false;
                    animating = true;
                    current_fs = $(this).parent();
                    previous_fs = $(this).parent().prev();
                    //de-activate current step on progressbar
                    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
                    //show the previous fieldset
                    previous_fs.show();
                    //hide the current fieldset with style
                    current_fs.animate({
                      opacity: 0
                    }, {
                      step: function(now, mx) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //2. take current_fs to the right(50%) - from 0%
                        left = (1 - now) * 50 + "%";
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({
                          //left: left
                        });
                        previous_fs.css({
                          //transform: "scale(" + scale + ")",
                          opacity: opacity
                        });
                      },
                      duration: 800,
                      complete: function() {
                        current_fs.hide();
                        animating = false;
                      },
                      //this comes from the custom easing plugin
                      //easing: "easeInOutBack"
                    });
                  });
                }
                verificationForm();
              })($);
        };
        verificationForm();
    
        
        return () => {
          
        };
      }, []);
  return(
 <div>
  <div id="wrapper">
  <Header/>
    <div className="clear"></div>
 
    <div className="clear"></div>
 
    <div className="main-content-wrapper main-container-bg bg-img-tc" style={{background: 'url(images/banner-futd.jpg)'}}>
      <div className="ehp-fill-details-section">
        <div className="inner-container">
          <div className="container">
            <div className="main-box-wrapper">
              <div className="main-inner-box">
               <div className="pageTitle title-fix text-center md">
                        <h2>Hiring Process</h2></div>
             
              <section className="multi_step_form form-holder">
                <form id="msform">
                 
                  <ul id="progressbar">
                    <li className="active">Fill Up The Details</li>
                    <li>Cost Details </li>
                    <li>Make The Payment</li>
                  </ul>
                 
                  <fieldset>
                    <div className="ehph-top-section">
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
                        </div>
                      </div>
                    </div>

                    <div className="enter-dtls main-inner-box mt50 pt40">
                      <div className="pageTitle xsm title-fix"><h2>Please Enter The Details As Per Below:</h2></div>
                      <div className="row align-items-center justify-content-center form-group">
                        <div className="col-lg-4">
                          <label className="info-label">  1. Are you applying for an additional helper or a replacement? <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <div className="radio-inline">
                            <div className="radio">
                              <label>
                              	
                                <input type="radio" name="t1"/> <span><a href="https://www.mom.gov.sg/faq/work-permit-for-fdw/how-do-i-apply-for-a-second-fdw" target="_blank"><i className="fa fa-info-circle"></i></a> Additional helper</span></label>
                            </div>
                            <div className="radio">
                              <label>
                              
                                <input type="radio" name="t1"/> <span> <i className="fa fa-info-circle"></i> Replacement helper </span></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center justify-content-center form-group">
                        <div className="col-lg-4">
                          <label className="info-label"> <a href="https://www.mom.gov.sg/faq/work-permit-for-fdw/how-do-i-apply-for-a-second-fdw" target="_blank"><i className="fa fa-info-circle"></i></a> 2. Income and household details <span className="red">*</span></label>
                          <label>WHOSE INCOME ARE YOU USING</label>
                        </div>
                        <div className="col-lg-8">
                          <div className="radio-inline">
                            <div className="radio">
                              <label>
                                <input type="radio" name="l1"/> <span>Your Income</span></label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="l1"/> <span>Your spouse's Income</span></label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="l1"/> <span>Combine the employer's income with their spouse's income</span></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center justify-content-center form-group">
                        <div className="col-lg-4">
                          <label>How would you like to proceed? <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <div className="radio-inline">
                            <div className="radio">
                              <label>
                                <input type="radio" name="r1"/> <span>Self Processing</span></label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="r1"/> <span>Using Salespersons/Agency Services</span></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Sales  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>YAP JENELYN PADILLA - R1105778</option>
                                  <option>AH NYI JAW ZAR MEE - R1443125</option>
                                  <option>GALAS CONNIE DELA CRUZ - R22105556</option>
                                  <option>LOO YOUNIS (LU YOUNIS) - R22109591</option>
                                  <option>RENIE CHUA KAI LI - R1983800</option>
                                  <option>ROHHANA BINTE RAMLI - R1105752</option>
                                  <option>ROSE VILLAREAL ESMERO - R1325651</option>
                                  <option>SHI XIAOQING - R1107443</option>
                                </select>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Employer Name:</label>
                        </div>
                        <div className="col-lg-8">
                          <label>Timonthy Lim</label>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Package <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>INDO ATM FDW PACKAGE - 3 REPLACEMENT WITHIN 3 MO...</option>
                                  <option>Indian</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Agreement Date  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <div className="inrow date-wrap datepicker-wrap">
                                  <input type="text" className="form-control datepicker" placeholder="DD/MM/YYYY" /> <i className="fas fa-calendar-alt"></i> 
                          </div> 
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Outstanding Charges($) <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Outstanding Charges($)"/> </div>
                      </div>
                       <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Outstanding Placement Fee ($) <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Outstanding Placement Fee ($)"/> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Outstanding Refund($) <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Outstanding Refund($)"/> </div>
                      </div>
                       <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Application Type <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>NEW APPLICATION</option>
                                  <option>Indian</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Salary ($)  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Salary ($)"/> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Off Day Daily Rate ($)  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Off Day Daily Rate ($)"/> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Pocket Money ($)  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Pocket Money ($)"/> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Helper Salary Payment  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>CASH</option>
                                  <option>select</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Helper Accomodation  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>SHARE ROOM</option>
                                  <option>select</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Sharing With  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Sharing With"/> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Select Off Days  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>MONTHLY</option>
                                  <option>select</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Enter Off Days <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" placeholder="Enter Off Days"/> </div>
                      </div>


                  
                  
                    
                    </div>
                    <button type="button" className="next action-button custom-button">CONTINUE</button>
                  </fieldset>
                  <fieldset>
                    <div className="ehph-top-section">
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
                        </div>
                      </div>
                    </div>
                    <div className="table-holder mt40  cast-table-holder">
                      <table className="table">
                          <thead>
                            <tr>
                              
                              <th>Items</th>
                              <th className="right-td">Price ($)</th>
                              <th className="right-td">GST ($)</th>
                              <th className="right-td">Total ($)</th>
                              <th>Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              
                              <td> ADMINISTRATION FEE - gst </td>
                              <td className="right-td"> 45.00 </td>
                              <td className="right-td"> 3.15</td>
                              <td className="right-td">48.15</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> AGENCY FEW NEW FDW INDO - gst </td>
                              <td className="right-td"> 888.00 </td>
                              <td className="right-td"> 62.16</td>
                              <td className="right-td">950.16</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> EMBASSY CONTRACT INDO - gst </td>
                              <td className="right-td"> 100.00 </td>
                              <td className="right-td">7.00</td>
                              <td className="right-td">107.00</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> EXPERIENCE FDW FEE (SIngapore/hongkong/Taiwan) - non gst </td>
                              <td className="right-td"> 200.00 </td>
                              <td className="right-td">14.00</td>
                              <td className="right-td">214.00</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> INSURANCE FDW PLAN C - non gst </td>
                              <td className="right-td"> 327.10 </td>
                              <td className="right-td"> 0.00</td>
                              <td className="right-td"> 327.10</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                             
                              <td> MEDICAL FEE - non gst </td>
                              <td className="right-td"> 65.00 </td>
                              <td className="right-td"> 0.00</td>
                              <td className="right-td"> 65.00</td>
                               <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> OVERSEA COVID-19 PCR TEST - gst </td>
                              <td className="right-td"> 200.00 </td>
                              <td className="right-td"> 14.00</td>
                              <td className="right-td"> 214.00</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> TRANSPORTATION - gst </td>
                              <td className="right-td"> 210.00 </td>
                              <td className="right-td"> 14.70</td>
                              <td className="right-td"> 224.70</td>
                              <td> ABC1234 </td>
                            </tr>
                             <tr>
                              
                              <td> WAIVER OF COUNTER INDEMNITY - non gst </td>
                              <td className="right-td"> 53.50 </td>
                              <td className="right-td"> 0.00</td>
                              <td className="right-td"> 53.50</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr>
                              
                              <td> WORKPERMIT APPLICATION - non gst </td>
                              <td className="right-td"> 35.00 </td>
                              <td className="right-td"> 0.00</td>
                              <td className="right-td"> 35.00</td>
                              <td> ABC1234 </td>
                            </tr>
                             <tr>
                              
                              <td> WORKPERMIT ISSUE - non gst </td>
                              <td className="right-td"> 35.00 </td>
                              <td className="right-td"> 0.00</td>
                              <td className="right-td"> 35.00</td>
                              <td> ABC1234 </td>
                            </tr>
                            <tr className="total-row">
                              
                              <td className="right-td">Total  </td>
                              <td className="right-td"> 2158.60</td>
                              <td className="right-td">115.01</td>
                              <td className="right-td"> 2273.61</td>
                              <td>  </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <button type="button" className="action-button previous previous_button custom-button prvs">Back</button>
                    <button type="button" className="next action-button custom-button ">CONTINUE</button>
                  </fieldset>
                  <fieldset>
                    <div className="ehph-top-section">
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
                        </div>
                      </div>
                    </div>

                    <div className="enter-dtls main-inner-box mt50 pt40">
                      <div className="pageTitle xsm title-fix"><h2>Please Enter The Details As Per Below:</h2></div>
                     
                     
                      
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Payment Date  <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <div className="inrow date-wrap datepicker-wrap">
                                  <input type="text" className="form-control datepicker" placeholder="DD/MM/YYYY" /> <i className="fas fa-calendar-alt"></i> 
                          </div> 
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-4">
                          <label>Payment Mode <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-8">
                           <select>
                                  <option>VISA</option>
                                  <option>VISA</option>
                                  <option>Select</option>
                                </select>
                        </div>
                      </div>
      
                    </div>
                    <button type="button" className="action-button previous previous_button custom-button prvs">Back</button> <a href="#" className="action-button custom-button finish">CONFIRM TO PAY</a> 
                  </fieldset>
                </form>
              </section>
             
              </div>
            </div>
          </div>
        </div>
        <div className="google-recaptch"><img src="images/google-captcha.png" alt=""/></div>
      </div>
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

export default EmployerHiringProcess;