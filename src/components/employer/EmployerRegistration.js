import React, { useEffect, useState, useRef, useCallback } from 'react';
import $ from "jquery";
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { sendRegOTP, verifyRegOTP, createEmployerUser, getBranches, getNationalityData, getHousingTypeData, getJobScopeData } from '../../apiCalls';
import { jpb } from '../../config';
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';
import {Eye, EyeSlash} from 'react-bootstrap-icons'
import { format, parse } from "date-fns";
import { DatePicker } from '@mui/x-date-pickers';



const EmployerRegistration = () => {

  const [otp, setOtp] = useState("")
  const [selectedLink, setSelectedLink] = useState('/');
  const [jwtToken, setjwtToken] = useState('');
  const [employerCode, setemployerCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [stepOneComplete, setStepOneComplete] = useState(true);
  const [stepTwoComplete, setStepTwoComplete] = useState(true);
  const [stepThreeComplete, setStepThreeComplete] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [confirmPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleLoginPasswordVisibile = () => {
    setShowPassword(!confirmPassword);
  };
  const parseDate = (dateStr) => (dateStr ? parse(dateStr, "yyyy-MM-dd", new Date()) : null);

  const [employerFormData, setEmployerFormData] = useState({
    EmployerCode: "",
    EmployerName: '',
    EmailId: '',
    Password: '',
    ConfirmPassword: '',
    Nationality: '',
    NRIC_FIN: '',
    PassportNo: '',
    DateOfBirth: '',
    DateOfBirthString: '', // Use ISO date format when submitting
    NoOfBedroom: '', // Ensure this matches expected type
    HousingType: 'string', // Ensure this matches expected type
    ContactPerson: '',
    Contact_Email:'',
    MobileNo: '',
    HomeNo: '',
    SMSContactNumber: '',
    MethodOfproceed: '',

    // Nested fields for JobScopes, FamilyDetails, etc.
    PersonalDetails: {
      BranchCode: '', // This field should be used as part of EmployerMasterV2
    },
    JobScopes: {
      ExpectedJobScope: [
        // Example job scope data
        {
          JobScopId: 3, // Example JobScopId
          JobScopDescriptin: 'JobDescription' // Optional description
        }
      ]
    },

    FamilyDetails: [
      // Example family data
      {
        SlNo: 1,
        Name: '',
        Relationship: '',
        NRIC_FIN: '',
        DateOfBirth: '',
        DateOfBirthString: '', // Should be in ISO format
        Title: '',
        Nationality: '',
        Passport: '',
        PassportExpiry: '', // Should be in ISO format
        Gender: '',
        ResidentialStatus: '',
        Occupation: '',
        Employed: true,
        CompanyName: '',
        MonthlyIncome: '',
        AnnualIncome: '',
        YearofAssessment: '',
        MobileNo: '',
        Email: '',
        OtherNo: ''
      }
    ],

    ContactDetails: [
      // Example contact data
      {
        SlNo: 1,
        ContactPerson: '',
        ContactNo: ''
      }
    ]
  });
  const [nationality, setNationality] = useState();
  const [housingType, setHousingType] = useState();
  const [jobScope, setJobScope] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleOtpChange = (event) => {
    setInputOtp(event.target.value);
  };

  const jobscopeoptions = jobScope?.map((item, index) => ({
    JobScopeId: index + 1, // Generating a unique ID (or use Code if needed)
    value: item.Name,
    label: item.Name,
  }));
  // const jobscopeoptions = [
  //   { JobScopeId: 1, value: 'Household Chores', label: 'Household Chores' },
  //   { JobScopeId: 2, value: 'Cooking', label: 'Cooking' },
  //   { JobScopeId: 3, value: 'Looking after age person in the household', label: 'Looking after age person in the household' },
  //   { JobScopeId: 4, value: 'Constact attaention is required', label: 'Constact attaention is required' },
  //   { JobScopeId: 5, value: 'Babysitting', label: 'Babysitting' },
  //   { JobScopeId: 6, value: 'Child - minding', label: 'Child - minding' },
  //   { JobScopeId: 7, value: 'Others', label: 'Others' },
  // ];





  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    const verificationForm = () => {
      (function ($) {
        "use strict";
        //* Form js
        function verificationForm() {
          //jQuery time
          var current_fs, next_fs, previous_fs; //fieldsets
          var left, opacity, scale; //fieldset properties which we will animate
          var animating; //flag to prevent quick multi-click glitches
          $(".next").click(function () {
            if (animating) return false;
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
              step: function (now, mx) {
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
              complete: function () {
                current_fs.hide();
                animating = false;
              },
              //this comes from the custom easing plugin
              //easing: "easeInOutBack"
            });
          });
          $(".previous").click(function () {
            if (animating) return false;
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
              step: function (now, mx) {
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
              complete: function () {
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

  const handleChange = (selectedOptions) => {
    setEmployerFormData((prevFormData) => ({
      ...prevFormData,
      JobScopes: {
        ...prevFormData.JobScopes,
        ExpectedJobScope: selectedOptions.map((option) => ({
          JobScopeId: option.JobScopeId,
          ExpectedJobScope: option.value,
        })),
      },
    }));
    console.log(employerFormData.JobScopes.ExpectedJobScope);
  };

  const updateExpectedJobScope = (selectedOptions) => {

    const updatedExpectedJobScope = selectedOptions.map((option, index) => (
      {

        JobScopeId: index,
        ExpectedJobScope: option.value,
      }));
    setEmployerFormData((prevFormData) => ({
      ...prevFormData,
      JobScopes: {
        ...prevFormData.JobScopes,
        ExpectedJobScope: updatedExpectedJobScope,
      },
    }));
    console.log(updatedExpectedJobScope,);
  };

  const fetchTokenHandler = useCallback(async () => {
    const tokenDetail = {
      Username: "admin",
      Password: "admin54321",
    };
    try {
      const response = await fetch('http://154.26.130.251:283/api/Token/GenerateToken', {
        method: 'POST',
        body: JSON.stringify(tokenDetail),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.log('Something went wrong!');
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data.Jwt_Token);
      setjwtToken(data.Jwt_Token);
      // console.log(jwtToken);
      // return data.Jwt_Token;
    } catch (error) {
    }
  }, []);

  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getBranches()
      .then(data => {
        if (data.Message === "Sucess") {
          setBranches(data.Data);
        } else {
          toast.error("error getting branches")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching branches:', error);
      });
  }, []);

  useEffect(() => {
    getNationalityData()
      .then(data => {
        if (data.Message === "Sucess") {
          setNationality(data.Data);
        } else {
          toast.error("error getting nationality")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching nationality:', error);
      });
  }, []);

  useEffect(() => {
    getHousingTypeData()
      .then(data => {
        if (data.Message === "Sucess") {
          setHousingType(data.Data);
        } else {
          toast.error("error getting HousingType")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching HousingType:', error);
      });
  }, []);

  useEffect(() => {
    getJobScopeData()
      .then(data => {
        if (data.Message === "Sucess") {
          setJobScope(data.Data);
        } else {
          toast.error("error getting HousingType")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching HousingType:', error);
      });
  }, []);


  useEffect(() => {
    if (!name || !email || !phone) {
      setStepOneComplete(true);
    } else {
      setStepOneComplete(false);
    }


    console.log(otp, inputOtp, "iii")
    if (otp === inputOtp) {
      setStepTwoComplete(false);
    } else {
      setStepTwoComplete(true);
    }
  }, [name, email, phone, otp, inputOtp]);



  const stepFirstHandler = async (event) => {
  event.preventDefault();

  const regDetail = {
    Name: name,
    Email: email,
    Phone: phone,
    Method: 'Employer',
  };

  const urlEmail = `${jpb.baseUrl}/Employer/EmployerEmailExists?Email=${email}&OrganizationId=1`;
  const optionsEmail = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const emailRes = await fetch(urlEmail, optionsEmail);
    const emailData = await emailRes.json();

    if (emailRes.ok && emailData.Code === 200 && emailData.Data !== 'Already Exist') {
      toast.success('Email does not exist', {
        position: "top-right",
        autoClose: 1000,
      });
      
      try {
        const response = await sendRegOTP(regDetail);

        if (response.Code === 200 && response.Message === 'Sucess') {
          setOtp(response.Data);
        } else {
          toast.error('Failed to send OTP');
        }
      } catch (error) {
        toast.error('Failure!');
        console.log('An error occurred:', error);
      }
    } else {
      setError('Email already exists. Please use a different email.');
      toast.error('Email already exists', {
        position: "top-right",
        autoClose: 1000,
      });
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
    toast.error('An unexpected error occurred', {
      position: "top-right",
      autoClose: 1000,
    });
    console.log('An error occurred:', err);
  } finally {
    setLoading(false);
  }
};


  async function stepTwoHandler(event) {
    // event.preventDefault();
    // fetchTokenHandler();
    const regDetail = {
      OrgId: jpb.OrgId,
      Email: email,
      OTP: inputOtp,
      Module: "Employer"
    }

    try {
      const response = await verifyRegOTP(regDetail);

      if (response.Code === 200 && response.Message === 'Sucess') {
        alert("Otp Verified");
      }
    } catch (error) {
      toast.error('Failure!');
      console.log('An error occurred:', error);
    }
  }

  const convertToDate = (dateString) => {
    const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Months are zero-based
  const year = dateObject.getFullYear();

  const formattedDateString = `${day}/${month}/${year}`;
  
    return formattedDateString;
  };

  console.log("convertToDate",convertToDate);
  
  const convertToISODate = (dateString) => {
    // Ensure the date string is in the expected DD/MM/YYYY format
    const [day, month, year] = dateString.split('/');
  
    // Check if the date string has the correct format
    if (!day || !month || !year) {
      console.error("Invalid date format");
      return null; // Or return an empty string or a default date
    }
  
    // Create a new Date object using year, month-1 (because months are 0-based in JS), and day
    const dateObject = new Date(year, month - 1, day);
  
    // Check if the date is valid (i.e., the resulting dateObject is valid)
    if (isNaN(dateObject)) {
      console.error("Invalid date object");
      return null; // Return null or handle the error accordingly
    }
  
    // Use toISOString() to convert the date to ISO 8601 format
    const isoDateString = dateObject.toISOString().split('T')[0]; // Remove the time part
  
    return isoDateString;
  };
 
  const handleSubmit = async (e) => {
    // e.preventDefault();
    setError('');

    setLoading(true);

    const payload = {
      EmployerMasterV2: {
        OrgId: 1,
        EmployerAutoId: 0,
        BranchCode: employerFormData.PersonalDetails.BranchCode,
        EmployerCode: "",
        EmployerName: employerFormData.EmployerName,
        EmailId: email, // Correct email field
        Password: employerFormData.Password,
        Nationality: employerFormData.Nationality || "", // Ensure this has a default value
        NRIC_FIN: employerFormData.NRIC_FIN,
        PassportNo: employerFormData.PassportNo,
        DateOfBirth: convertToISODate(employerFormData.DateOfBirth),
        DateOfBirthString: convertToDate(employerFormData.DateOfBirth),
        NoofBedroom: employerFormData.NoOfBedroom,
        HousingType: document.getElementById('HousingType').value,
        ContactPerson: employerFormData.ContactPerson,
        SmsNo: employerFormData.MobileNo,
        Contact_HomeNo: employerFormData.HomeNo,
        Contact_Email: employerFormData.Contact_Email,
        CreatedOn: new Date().toISOString(),
        IsActive: true,
        SaveDraft: false
      },
      employerMasterJobScopv2: employerFormData.JobScopes.ExpectedJobScope.map(scope => ({
        OrgId: 1,
        EmployerCode: "",
        JobScopId: scope.JobScopId, // Correct JobScopId reference
        JobScopDescriptin: scope.JobScopDescriptin || "JobDescription" // If required, otherwise remove or default
      })),
      employerMasterFamilyDetailv2: employerFormData.FamilyDetails.map(family => ({
        OrgId: 1,
        EmployerCode: "",
        SlNo: family.SlNo,
        Name: employerFormData.EmployerName,
        Relationship: "xxx",
        NRIC_FIN: employerFormData.NRIC_FIN,
        DateofBirth: convertToISODate(employerFormData.DateOfBirth),
        DateOfBirthString: convertToDate(employerFormData.DateOfBirth),
        Title: "Mr/Ms",
        Nationality: employerFormData.Nationality,
        Passport: employerFormData.PassportNo,
        PassportExpiry: "DD/MM/YY",
        Gender: "m/f",
        ResidentialStatus: "status",
        Occupation: "occupation",
        Employed: "employed",
        CompanyName: "string",
        MonthlyIncome: "string",
        AnnualIncome: "string",
        YearofAssessment: "string",
        MobileNo: employerFormData.MobileNo,
        Email: email,
        OtherNo: employerFormData.MobileNo
      })),
      employerMasterContactDetailv2: employerFormData.ContactDetails.map(contact => ({
        OrgId: 1,
        EmployerCode: "",
        SlNo: contact.SlNo,
        ContactPerson: employerFormData.ContactPerson,
        ContactNo: employerFormData.MobileNo


       
      }))
    };

    console.log("handleSubmit call >>>>>>>>>>", payload)
    const url = `${jpb.baseUrl}/EmployerRegistration/Registration`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };


    try {
      const response = await fetch(url, options);

      if (response.ok) {
        toast.success('Registration Successfull',
          {
            position: "top-right",
            autoClose: 1000,
          }
        )
        navigate('/login'); // Replace with the correct path to your login page
      } else {
        console.error('Form submission failed:', response);
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      zIndex: 1,
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 2,
    }),
  };


  const handleLinkClick = (link) => {
    //navigate(link);
    window.location.href = link
    setSelectedLink(link);
  };

  return (
    <div>
      <div id="wrapper">
        <Header />
        <div className="clear"></div>

        <div className="clear"></div>

        <div className="main-content-wrapper main-container-bg bg-img-tc" style={{ background: 'url(images/banner-bg.jpg)' }}>
          <div className="employer-registration">
            <div className="inner-container">
              <div className="container">
                <div className="main-box-wrapper">
                  <div className="reg-links">
                    <ul>
                      <li className={selectedLink === '/employerregistration' ? 'selected' : ''}><Link to="/employerregistration" onClick={() => handleLinkClick('/employerregistration')}>Employer Registration</Link></li>
                      <li className={selectedLink === '/maidregistration' ? 'selected' : ''}><Link to="/maidregistration" onClick={() => handleLinkClick('/maidregistration')}>Helper Registration</Link></li>
                    </ul>
                  </div>

                  <section className="multi_step_form form-holder">
                    <form id="msform">

                      <ul id="progressbar">
                        <li className="active">Step 1</li>
                        <li>Step 2</li>
                        <li>Step 3</li>
                      </ul>

                      <fieldset>
                        <div className="mx-575">
                          <div className="pageTitle title-fix text-center md">
                            <h2>Enter The Details</h2></div>
                          <div className="row form-group align-items-center">
                            <div className="col-lg-4">
                              <label>Name <span className="red">*</span></label>
                            </div>
                            <div className="col-lg-8">
                              <input type="text" value={name} onChange={handleNameChange} className="form-control" placeholder="Your Name" required /> </div>
                          </div>
                          <div className="row form-group align-items-center">
  <div className="col-lg-4">
    <label>Email Address <span className="red">*</span></label>
  </div>
  <div className="col-lg-8">
    <input
      type="email"
      value={email}
      onChange={handleEmailChange}
      className="form-control"
      placeholder="Your Email Address"
      required
      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Basic email pattern
      title="Please enter a valid email address"
    />
  </div>
</div>

<div className="row form-group align-items-center">
  <div className="col-lg-4">
    <label>Phone Number <span className="red">*</span></label>
  </div>
  <div className="col-lg-8">
    <input
      type="tel" // Use 'tel' for phone numbers (semantic and better for mobile devices)
      value={phone}
      onChange={handlePhoneChange}
      className="form-control"
      placeholder="Your Phone Number"
      required
      maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
    />
  </div>
</div>


                        </div>
                        <button type="button" onClick={stepFirstHandler} disabled={stepOneComplete} className="next action-button custom-button center-btn">Next</button>
                      </fieldset>
                      <fieldset>
                        <div className="pageTitle title-fix text-center md">
                          <h2>Enter The Details</h2></div>
                        <div className="text-center ">
                          <h6>OTP has been sent it to your registered Email Id!</h6>
                          <label>Enter the OTP <span className="red">*</span></label>
                          <div className="row gutters-10 otp-row align-items-center justify-content-center">
                            <div className="col-auto">
                              <input type="text" value={inputOtp} onChange={handleOtpChange} className="form-control" /> </div>
                            {/* <div className="col-auto">
                          <input type="text" className="form-control"/> </div>
                        <div className="col-auto">
                          <input type="text" className="form-control"/> </div>
                        <div className="col-auto">
                          <input type="text" className="form-control"/> </div>
                        <div className="col-auto">
                          <input type="text" className="form-control"/> </div> */}
                          </div>
                          <div className="resend-otp"><a href="#">Resend OTP <i className="fas fa-redo-alt"></i></a></div>
                        </div>
                        <button type="button" className="action-button previous previous_button custom-button prvs">Back</button>
                        <button type="button" onClick={stepTwoHandler} disabled={stepTwoComplete} className="next action-button custom-button ">Next</button>
                      </fieldset>
                      <fieldset>
                        <div className="pageTitle title-fix text-center md">
                          <h2> Employer Data Form</h2></div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-1" role="button" aria-expanded="false" aria-controls="edf-1">1. Personal Details</a> </div>
                          <div className="collapse show" id="edf-1">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Employer Name</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Employer Name" value={employerFormData.EmployerName}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          EmployerName: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Nationality</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className='form-control' id="Nationality"
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setEmployerFormData({
                                          ...employerFormData,
                                          Nationality: e.target.value
                                        })
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {nationality?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                      
                                    </select>
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>NRIC / FIN</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Your NRIC / FIN" value={employerFormData.NRIC_FIN}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          NRIC_FIN: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Passport</label>
                                    <p className="size-12">* only for EP and Spass holder</p>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Your Passport" value={employerFormData.PassportNo}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          PassportNo: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Date of Birth</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="inrow date-wrap datepicker-wrap">
                                    <input
  type="date"
  className="form-control"
  id="DateOfBirth"
  value={employerFormData.DateOfBirth}
  onChange={(e) => {
    setEmployerFormData({
      ...employerFormData,
      DateOfBirth: e.target.value, 
    });
  }}
/>
                                        </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-2" role="button" aria-expanded="false" aria-controls="edf-2">2. Contact Details</a> </div>
                          <div className="collapse show" id="edf-2">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Contact Person</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Contact Person" value={employerFormData.ContactPerson}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          ContactPerson: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Mobile No.</label>
                                  </div>
                                  <div className="col-lg-6">
  <input
    type="text"
    className="form-control"
    placeholder="Mobile No."
    value={employerFormData.MobileNo}
    onChange={(e) => {
      // Get the input value and remove non-digit characters
      const newValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

      // Update the state only if the length is less than or equal to 10
      if (newValue.length <= 10) {
        setEmployerFormData({
          ...employerFormData,
          MobileNo: newValue
        });
      }
    }}
    maxLength="10" // Enforces a max length of 10 characters
  />
</div>

                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Home No</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Home No." value={employerFormData.HomeNo}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          HomeNo: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Email</label>
                                  </div>
                                  <div className="col-lg-6">
  <input
    type="email" // This ensures the input is an email format
    className="form-control"
    placeholder="emailme.@gmail.com"
    value={employerFormData.EmailId}
    onChange={(e) => {
      setEmployerFormData({
        ...employerFormData,
        EmailId: e.target.value
      });
    }}
    required // Ensure the field is required
    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Custom email regex
    title="Please enter a valid email address" // Custom title for invalid email message
  />
</div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-3" role="button" aria-expanded="false" aria-controls="edf-3">3. Job Scopes</a> </div>
                          <div className="collapse show" id="edf-3">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Housing Type</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className='form-control' id="HousingType"
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          HousingType: e.target.value
                                        })
                                      }}>
                                        <option value="">Select</option>
                                      {housingType?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                      
                                    </select>
                                  </div>
                                </div>
                                <div className="row select-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Expected Job Scope</label>
                                  </div>
                                  <div className="col-lg-6" style={{ zIndex: 9999 }}>
                                    <Select
                                      isMulti
                                      options={jobscopeoptions}
                                       value={(jobscopeoptions || []).filter((option) =>
                                        (employerFormData?.JobScopes?.ExpectedJobScope || []).some(
                                          (selectedOption) => selectedOption.JobScopeId === option.JobScopeId
                                        )
                                      )}
                                      onChange={handleChange}
                                      getOptionValue={(option) => option.JobScopeId}
                                      getOptionLabel={(option) => option.value}
                                    />
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Number of Bedroom in the house</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Number of Bedroom in the house" value={employerFormData.NoOfBedroom}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          NoOfBedroom: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-4" role="button" aria-expanded="false" aria-controls="edf-4">4. Account Details</a> </div>
                          <div className="collapse show" id="edf-4">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Branch Code</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className='form-control' id="BranchCode"
                                      value={employerFormData.PersonalDetails.BranchCode}
                                      onChange={(e) => {
                                        const selectedBranchCode = e.target.value;
                                        setEmployerFormData((prevFormData) => ({
                                          ...prevFormData,
                                          PersonalDetails: {
                                            ...prevFormData.PersonalDetails,
                                            BranchCode: selectedBranchCode
                                          }
                                        }));
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {branches && branches.length && branches.map((item, index) => (
                                        <option key={index} value={item.BranchCode}>{item.BranchName}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Email Address</label>
                                  </div>
                                  <div className="col-lg-6">
  <input
    type="email"
    className="form-control"
    placeholder="XXXXXXXXXXXXXXX@gmail.com"
    value={employerFormData.FamilyDetails[0].Email} // Map the first family member's email
    onChange={(e) => {
      const updatedFamilyDetails = [...employerFormData.FamilyDetails];
      updatedFamilyDetails[0].Email = e.target.value; // Update the email for the first family member
      setEmployerFormData({
        ...employerFormData,
        FamilyDetails: updatedFamilyDetails,
      });
    }}
    required
    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    title="Please enter a valid email address"
  />
</div>


                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Password</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input 
                                    type={showLoginPassword ? "text" : "password"} 
                                    className="form-control" 
                                    value={employerFormData.Password}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          Password: e.target.value
                                        })
                                      }} />
                                        <span
    onClick={toggleLoginPasswordVisibility}
    className="eye-icon"
  >
   {showLoginPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
  </span>
                                       </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Confirm Password</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input 
                                    type={confirmPassword ? "text" : "password"} 
                                    className="form-control" 
                                    value={employerFormData.ConfirmPassword}
                                      onChange={(e) => {
                                        setEmployerFormData({
                                          ...employerFormData,
                                          ConfirmPassword: e.target.value
                                        })
                                      }} /> 
                                               <span
    onClick={toggleLoginPasswordVisibile}
    className="eye-icon"
  >
   {confirmPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
  </span>
                                      </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>SMS Contact Number</label>
                                  </div>
                                  <div className="col-lg-6">
  <input
    type="text"
    className="form-control"
    value={employerFormData.SMSContactNumber}
    onChange={(e) => {
      // Get the input value and remove non-digit characters
      const newValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

      // Update the state only if the length is less than or equal to 10
      if (newValue.length <= 10) {
        setEmployerFormData({
          ...employerFormData,
          SMSContactNumber: newValue
        });
      }
    }}
    maxLength="10" // Enforces a max length of 10 characters
  />
</div>

                                </div>
                                <div className="row align-items-center  form-group">
                                  <div className="col-lg-4">
                                    <label>How would you like to proceed?</label>
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="radio-inline">
                                      <div className="radio">
                                        <label>
                                          <input type="radio" name="r1" value="Self Processing"
                                            checked={employerFormData.MethodOfproceed === "Self Processing"}
                                            onChange={(e) => {
                                              setEmployerFormData({
                                                ...employerFormData,
                                                MethodOfproceed: e.target.value
                                              });
                                            }} /> <span>Self Processing</span></label>
                                      </div>
                                      <div className="radio">
                                        <label>
                                          <input type="radio" name="r1" value="Using Salespersons/Agency Services"
                                            checked={employerFormData.MethodOfproceed === "Using Salespersons/Agency Services"}
                                            onChange={(e) => {
                                              setEmployerFormData({
                                                ...employerFormData,
                                                MethodOfproceed: e.target.value
                                              });
                                            }} /> <span>Using Salespersons/Agency Services</span></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ctpod col-lg-12 pt20 pb20">
                          <div className="checkbox size-16">
                            <input type="checkbox" id="c1" />
                            <label htmlFor="c1">I hereby declared that all the above information given are true and correct.</label>
                          </div>
                        </div>
                        {/* <button type="button" disabled={stepThreeComplete} className="action-button previous previous_button custom-button prvs">Back</button> 
                    <a href="#" onClick={} className="action-button custom-button finish">SUBMIT</a>  */}
                    
                    <div onClick={()=> handleSubmit()} className="action-button custom-button finish" > SUBMIT</div>
                      </fieldset>
                    </form>
                  </section>
                  



                </div>
              </div>
            </div>
            <div className="google-recaptch"><img src="images/google-captcha.png" alt="" /></div>
          </div>
          <div className="footer-space"></div>
          <div className="clear"></div>
        </div>

        <div className="clear"></div>
        <div className="pushContainer"></div>
        <div className="clear"></div>
      </div>
      <Footer />
      <QuickSearch />
    </div>
  );
};

export default EmployerRegistration;