import React, { useCallback, useRef, useEffect, useState } from 'react';
import $ from "jquery";
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createHelperUser, getComplexionData, getGenderData, getHelperStatusData, getMaritalStatusData, getNationalityData, getRegionData, getSpecializationData, sendRegOTP, verifyRegOTP } from '../../apiCalls';
import { jpb } from '../../config';

import {Eye, EyeSlash} from 'react-bootstrap-icons'

const MaidRegistration = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [jwtToken, setjwtToken] = useState('');
  const [helperCode, setHelperCode] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [list, setList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [typeValue, setTypeValue] = useState("");
  const [infoValue, setInfoValue] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [stepOneComplete, setStepOneComplete] = useState(true);
  const [stepTwoComplete, setStepTwoComplete] = useState(true);
  const [intTime, setIntTime] = useState([]);
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [confirmPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleLoginPasswordVisibile = () => {
    setShowPassword(!confirmPassword);
  };


  const [helperFormData, setHelperFormData] = React.useState({
      OrgId: 1,
      CVCode:"",
      BranchCode:"00011",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      SMSContactNumber: "",
      FullName: "",
      ResidentAddress: "",
      Homeaddress:"",
      NricFin: "",
      Nationality: "",
      PassportNo: "",
      PassportIssuePlace: "",
      PassportExpiryDate: "",
      PassportExpiryDateString: "",
      PassportIssueDate: "",
      PassportIssueDateString: "",
      WPNo: "",
      WPExpiry: "",
      WPExpiryString: "",
      Religion: "",
      DateOfBirth: "",
      DateOfBirthString: "",
      MaritalStatus: "",
      BirthPlace: "",
      BirthPlaceString: "",
      Specialisation: "",
      RepatraiteAirport: "",
      Status: "",
      OtherInfo: "",
      DirectHire: true,
      TrainingCenter: "",
      Complexion: "",
      Height:"" ,
      Feet: "",
      Weight: "",
      Pound: "",
      PlacementFee: "",
      BasicSalary: "",
      EnterOffDays:"",
      offDayDailyRate: "",
      HelperFee: "",
      Pocketmoney: "",
      SelectOffDays: "",
      EnterOffDays: "",
      FatherOccupation: "",
      MotherOccupation: "",
      FatherAge: "",
      MotherAge: "",
      SiblingsPosition: "",
      NoOfBrother: "",
      NoOfSister: "",
      BrotherAge: "",
      SisterAge: "",
      HusbandName: "",
      HusbandOccupation: "",
      HusbandAge: "",
      NoofChildren: "",
      ChildAge: "",
      Isactive: true,
      IsDraft:true,
      Experience: "",
      Interviewer: "",
      PersonImageString: "",
      PersonImg_Base64String: "",
      PersonImageFileName: "",
      PersonImagePath: "",
      FullImageString: "",
      FullImg_Base64String: "",
      FullImageFileName: "",
      VideoFileName: "",
      VedioImagePath: "",
      VedioFileName: "",
      Video: "",
      FullImagePath: "",
      CreatedBy: "",
      CreatedOn: "2025-02-07T06:35:39.822Z",
      ChangedBy: "",
      ChangedOn: "2025-02-07T06:35:39.822Z",
      CVNumber: "",
      InterviewDate:"",
      InterviewTime:"",
      Remarks:"",
  });

  const [helperBioDetails, setHelperBioDetails] = useState({
    OrgId: 1,
    CVCode: "",
    HelperName: "",
    EmailId: "",
    Password: "",
    MobileNo: "",
    NRIC_FIN: "",
    Nationality: "",
    PassportNo: "",
    PassportIssuePlace: "",
    PassportIssueDate: "",
    PassportExpiryDate: "",
    WorkPermitNo: "",
    WorkPermitExpiry: "",
    Religion: "",
    DateOfBirth: "",
    MaritalStatus: "",
    BirthPlace: "",
    Specialization_Preference: "",
    RepatraiteAirport: "",
    Status: "",
    OtherInfo: "",
    DirectHire: true,
    TrainingCenter: "",
    FileName: "",
    Helper_Img_Base64String: "",
    IsActive: true,
    IsDraft: true,
    CreatedBy: "HLP20261B91"
  });
const [familyBackground, setFamilyBackground] = useState({
  OrgId: 1,
  CVCode: "",
  FamilyAge: 0,
  DateOfBirthString: "",
  SlNo: 0,
  Name: "",
  Relationship: "",
  NRIC_FIN: "",
  DateofBirth: "",
  Title: "",
  Nationality: "",
  Gender: "",
  ResidentialStatus: "",
  Occupation: "",
  Employed: true,
  CompanyName: "",
  MobileNo: "",
  Email: "",
  OtherNo: "",
})
const [physicalAttribute, setPhysicalAttribute] = useState({
  Complexion: "",
  Height_CM: "",
  Height_Feet: "",
  Weight_KG: "",
  Weight_Pound: ""
})
  const [bookingRealtedInformation, setBookingRealtedInformation] = useState({
    BasicSalary: "",
    EnterOffDays:"",
    OffDayDailyRate: "",
    HelperFee: "",
    PocketMoney: "",
    SelectOffDays: "",
    NoOffDays: ""
  })
  const [interview, setInterview] = useState({
    OrgId: 1,
    CVCode: "",
    InterviewDate: "",
    InterviewTime: "",
    Remarks: ""
  });
  const [accountDetails, setAccountDetails] = useState(
    {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      SMSContactNumber: ""
    }
  );
const [helperContacts, setHelperContacts] = useState({
  HomeAddress: "",
  HomeTelephone: "",
  Whatsapp: "",
  Viber: "",
  Facebook: "",
  Type:"",
  OtherType:"",
  // OtherContact: [
  //   {
  //     OrgId: 1,
  //     HelperCode: "",
  //     Type: "",
  //     Information: ""
  //   }
  // ]
})
  
  const [nationality, setNationality] = useState();
  const [region, setRegion] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [specialization, setSpecialization] = useState();
  const [complexion, setComplexion] = useState();
  const [HelperStatus, setHelperStatus] = useState();

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
      getRegionData()
        .then(data => {
          if (data.Message === "Sucess") {
            setRegion(data.Data);
          } else {
            toast.error("error getting Region")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Region:', error);
        });
  }, []);

  useEffect(() => {
      getMaritalStatusData()
        .then(data => {
          if (data.Message === "Sucess") {
            setMaritalStatus(data.Data);
          } else {
            toast.error("error getting Race")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Race:', error);
        });
  }, []);

  useEffect(() => {
    getSpecializationData()
      .then(data => {
        if (data.Message === "Sucess") {
          setSpecialization(data.Data);
        } else {
          toast.error("error getting Race")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching Race:', error);
      });
  }, []);

  useEffect(() => {
      getComplexionData()
        .then(data => {
          if (data.Message === "Sucess") {
            setComplexion(data.Data);
          } else {
            toast.error("error getting Race")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Race:', error);
        });
  }, []);

  useEffect(() => {
      getHelperStatusData()
        .then(data => {
          if (data.Message === "Sucess") {
            setHelperStatus(data.Data);
          } else {
            toast.error("error getting Race")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Race:', error);
        });
  }, []);


const handleHelperBioDetails = (e) => {
  const { name, value } = e.target;
  setHelperBioDetails(prevDetails => ({
    ...prevDetails,
    [name]: value
  }));
}
const handleHelperContacts= (e) => {
  const { name, value } = e.target;
  setHelperContacts(prevDetails => ({
    ...prevDetails,
    [name]: value
  }));
  }
  
  console.log("helperFormData",helperFormData)

  const handleFamilyBackground = (e) => {
    const { name, value } = e.target;
    setFamilyBackground(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }
  const hsndlePhysicalAttribute = (e) => {
    const { name, value } = e.target;
    setPhysicalAttribute(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }
  const hsndleBookingRealtedInformation = (e) => {
    const { name, value } = e.target;
    setBookingRealtedInformation(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }
  const handleInterview = (e) => {
    const { name, value } = e.target;
    setInterview(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }
  const handleAccountDetails = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };


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


  const handleAdd = (e) => {
    e.preventDefault();
    if (typeValue !== "" && infoValue !== "") {
      setList((prevList) => [...prevList, { Type: typeValue, Information: infoValue, OrgId: jpb.OrgId, CVCode: helperCode }]);
      console.log(list);
      setTypeValue("");
      setInfoValue("");
    }
  };

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    let tempCopy = {...helperContacts}
    tempCopy.OtherContact.Type = event.target.value
    setHelperContacts(tempCopy)
  };

  const handleInfoChange = (event) => {
    setInfoValue(event.target.value);
    let tempCopy = {...helperContacts}
    tempCopy.OtherContact.Information = event.target.value
    setHelperContacts(tempCopy)
  };




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




async function stepFirstHandler(event) {
  console.log("in");
  // event.preventDefault(); // Uncomment if part of a form

  const regDetail = {
    OrgId: 1,
    Name: name,
    Email: email,
    Phone: phone,
    Method: 'Helper',
  };

  const urlEmail = `${jpb.baseUrl}/Helper/HelperEmailExists?Email=${email}&OrganizationId=1`;
  const optionsEmail = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const emailRes = await fetch(urlEmail, optionsEmail);
    const emailData = await emailRes.json();

    if (emailRes.ok && emailData.Code === 200) {
      const emailInfo = emailData.Data?.[0];

      if (emailInfo?.Remarks !== "Already Exist") {
        toast.success('Email is new. Proceeding...', {
          position: "top-right",
          autoClose: 1000,
        });

        if (regDetail.Email && regDetail.Phone) {
          try {
            const response = await sendRegOTP(regDetail);
            if (response.Code === 200 && response.Message === 'Sucess') {
              setOtp(response.Data);
            } else {
              toast.error('Failed to send OTP.');
              console.error('OTP response:', response);
            }
          } catch (otpError) {
            toast.error('An error occurred while sending OTP.');
            console.error('OTP error:', otpError);
          }
        } else {
          console.log("Email and phone are required");
        }
      } else {
        setError('Email already exists. Please use a different email.');
        toast.error('Email already exists', {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } else {
      setError('Failed to check email. Please try again.');
      console.error('Email check failed:', emailRes);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setError('An error occurred. Please try again.');
    toast.error('Something went wrong.', {
      position: "top-right",
      autoClose: 1000,
    });
  } finally {
    setLoading(false);
  }
}



  async function stepTwoHandler(event) {
    // event.preventDefault();
    // fetchTokenHandler();
    const regDetail = {
      OrgId: 1,
      Email: email,
      OTP: inputOtp,
      Module: "Helper"
    };
    
            if (regDetail.OTP != "") {
            try {
              const response = await verifyRegOTP(regDetail);

              if (response.Code === 200 && response.Message === 'Sucess') {
                alert("Otp Verified")
              }
            } catch (error) {
              toast.error('Failure!');
              console.log('An error occurred:', error);
            }
            } else {
              console.log("empty");
            }
  }

  const convertToISODate = (dateString) => {

    console.log(dateString);
    if (!dateString) {
      return null; // or a default value if needed
    }
    const [day, month, year] = dateString.split('/');

    // Create a new Date object using the day, month, and year values
    const dateObject = new Date(`${month}/${day}/${year}`);

    // Use the toISOString() method to get the date in ISO 8601 format
    const isoDateString = dateObject.toISOString();

    return isoDateString;
  };

  const stepThreeHandler = async (e) => {
    // e.preventDefault();
    setError('');
    setLoading(true);

    let payload = {
      ...helperFormData,
      Contacts: [{
        CVCode: helperFormData.CVCode,  // Assuming this value comes from helperFormData
        Type: "",  // Add appropriate value if needed
        Homeaddress: helperFormData.Homeaddress,  // Fixed to match correct field in helperFormData
        Type:helperFormData.Type,
        OtherType:helperFormData.OtherType,
        OrgId: helperFormData.OrgId,  // Assuming OrgId is from the helperFormData or default value of 1
        SLNo: "",  // Adjust if this should be dynamically calculated or set
        MobileNo: helperFormData.SMSContactNumber,  // Assuming this is the contact number
        Viber: helperFormData.Viber || "",  // Make sure to handle undefined or empty values if necessary
        ContactNo: "",  // If this field needs to be populated, do so accordingly
        Facebook: helperFormData.Facebook || "",  // Same as Viber and other optional fields
        Whatsapp: helperFormData.Whatsapp ,  // Adjust as needed
        OtherType: "",  // Adjust if necessary
        IsActive: true,
        Instagram: "",
        Tiktok: "",
        Email: helperFormData.Email,  // Assuming this value is pulled from helperFormData
        FamilyMember: "",
        Relationship: "",
        Age: "",
        CreatedBy: helperFormData.CreatedBy || "",  // Replace with dynamic value if needed
        CreatedOn: new Date().toISOString(),  // Use the current timestamp
        ChangedBy: helperFormData.ChangedBy || "",  // Same as CreatedBy
        ChangedOn: new Date().toISOString(),  // Use the current timestamp
      }],
      HelperFamilyBackGround: [{
        OrgId: helperFormData.OrgId,  // Assuming OrgId is from helperFormData
        HelperCode: helperFormData.CVCode,  // HelperCode pulled from helperFormData
        FamilyAge: "",  // Adjust as needed based on your data model
        DateOfBirthString: "",  // Adjust if needed
        SlNo: "",  // Adjust if needed
        Name: "",  // Add actual data from helperFormData if necessary
        Relationship: "",  // Same
        NRIC_FIN: helperFormData.NricFin,  // Assuming this comes from helperFormData
        DateofBirth: helperFormData.DateOfBirth || new Date().toISOString(),  // Adjust if needed
        Title: "",
        Nationality: helperFormData.Nationality,  // Assuming nationality comes from helperFormData
        Gender: "",  // Adjust if gender is in helperFormData
        ResidentialStatus: "",  // Adjust based on data if available
        Occupation: "",  // Adjust as needed
        Employed: true,  // This could be dynamic depending on data
        CompanyName: "",  // Adjust as needed
        MobileNo: helperFormData.SMSContactNumber,  // Assuming this is the contact number
        Email: helperFormData.Email,  // Assuming this is pulled from helperFormData
        OtherNo: "",  // Adjust if needed
      }]
    };
            console.log("test data >>> ", payload)
    const url = `${jpb.baseUrl}/HelperRegistration/Registration`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    console.log("Payload being sent:", payload);

    //   useEffect(() => {
    //     console.log("Updated form data:", helperFormData);
    // }, [helperFormData]);


    try {
      const response = await fetch(url, options);

      if (response.ok) {
        toast.success('Registration Successfull',
          {
            position: "top-right",
            autoClose: 1000,
          }
        )
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleLinkClick = (link) => {
    // navigate(link);
    window.location.href = link
    setSelectedLink(link);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64String = reader.result;
        setSelectedImage(imageBase64String); // Set the preview image
        setHelperFormData((prevData) => ({
          ...prevData,
          PersonImageFileName: file.name, // Store the file name
          PersonImg_Base64String: imageBase64String, // Store the Base64 string
          PersonImagePath: URL.createObjectURL(file), // Use URL.createObjectURL for the file path
        }));
      };
      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  };

  return (
    <div>
      <div id="wrapper">
        <Header />
        <div className="clear"></div>

        <div className="clear"></div>


        <div className="main-content-wrapper main-container-bg bg-img-tc" style={{ background: 'url(images/banner-bg.jpg)' }}>
          <div className="maid-registration">
            <div className="inner-container">
              <div className="container">
                <div className="main-box-wrapper">
                  <div className="reg-links">
                    {/* <ul>
                  <li><Link to="/employerregistration">Employer Registration</Link></li>
                  <li className="selected"><Link to="/maidregistration">Maid Registration</Link></li> */}
                    <ul>
                      <li className={selectedLink === '/employerregistration' ? 'selected' : ''}><Link to="/employerregistration" onClick={() => handleLinkClick('/employerregistration')}>Employer Registration</Link></li>
                      <li className={selectedLink === '/maidregistration' ? 'selected' : ''}><Link to="/maidregistration" onClick={() => handleLinkClick('/maidregistration')}>Helper Registration</Link></li>
                    </ul>
                    {/* </ul> */}
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
                              <input type="text" value={name} onChange={handleNameChange} className="form-control" placeholder="Your Name" /> </div>
                          </div>
                          <div className="row form-group align-items-center">
                            <div className="col-lg-4">
                              <label>Email Address <span className="red">*</span></label>
                            </div>
                            <div className="col-lg-8">
                              <input type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Your Email Address"
                                  required
                                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Basic email pattern
                                  title="Please enter a valid email address"/> </div>
                          </div>
                          <div className="row form-group align-items-center">
                            <div className="col-lg-4">
                              <label>Phone Number <span className="red">*</span></label>
                            </div>
                            <div className="col-lg-8">
                              <input 
                              type="tel" 
                              value={phone} 
                              onChange={handlePhoneChange} 
                              className="form-control" 
                              placeholder="Your Phone Number" 
                              required
                              maxLength="10" // Limit input to 10 digits
                              pattern="^\d{10}$" // Ensure only 10 digits
                              title="Please enter a 10-digit phone number"
                              /> </div>
                          </div>
                          {/* <div className="row align-items-center justify-content-center form-group">
                        <div className="col-lg-auto">
                          <label>Select Option to Receive OTP * : <span className="red">*</span></label>
                        </div>
                        <div className="col-lg-auto">
                          <div className="radio-inline">
                            
                            <div className="radio">
                              <label>
                                <input type="radio" name="r1"/> <span>via Email</span></label>
                            </div>
                          </div>
                        </div> 
                      </div> */}
                        </div>
                        <button type="button" onClick={stepFirstHandler} className="next action-button custom-button center-btn">Next</button>
                      </fieldset>
                      <fieldset>
                        <div className="pageTitle title-fix text-center md">
                          <h2>Enter The Details</h2></div>
                        <div className="text-center otp-wrap">
                          <h6>A combination of digits has been sent to your chosen OTP.</h6>
                          <label>Enter the OTP <span className="red">*</span></label>
                          <div className="row gutters-10 otp-row align-items-center justify-content-center">
                            <div className="col-auto">
                              <input value={inputOtp} onChange={handleOtpChange} type="text" className="form-control" /> </div>
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
                        <button type="button" onClick={stepTwoHandler} className="next action-button custom-button ">Next</button>
                      </fieldset>
                      <fieldset>
                        <div className="pageTitle title-fix text-center md">
                          <h2> Bio Data Of Foreign Domestic Worker (FDW)</h2></div>
                        <p className="pb20">*Please ensure that you run through the information within the biodata as it is an important document to help you select a suitable FDW</p>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-1" role="button" aria-expanded="false" aria-controls="edf-1">1. Helper Bio Details</a> </div>
                          <div className="collapse show" id="edf-1">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                              <div className="form-container">
      <div className="row form-group align-items-center">
        <div className="col-lg-3">
          <label>Profile Photo/Video</label>
        </div>
        <div className="col-lg-6">
          <div className="upload-area">
            <div className="file-upload">
              <label htmlFor="uploadInput">
                <div id="start">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      style={{ width: '100px', height: '100px' }}
                      alt="Selected"
                    />
                  ) : (
                    <img src="images/upload-icon-highlight.png" alt="" />
                  )}
                  <div className="upload-inner-info">
                    Click here to upload Photo/Video
                  </div>
                </div>
              </label>
              <input
                type="file"
                id="uploadInput"
                style={{ display: 'none' }}
                accept="image/*, video/*"
                onChange={handleImageUpload} // Upload handler
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optionally display uploaded image preview */}
      {helperFormData.PersonImagePath && (
        <div className="image-preview">
          <img
            src={helperFormData.PersonImagePath}
            alt="Uploaded Preview"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
    </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Name</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Name" value={helperFormData.FullName}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          FullName: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>FIN No.</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Your NRIC / FIN" value={helperFormData.NricFin}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          NricFin: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Nationality</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.Nationality}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setHelperFormData({
                                          ...helperFormData,
                                          Nationality: e.target.value
                                        })
                                      }}>
                                      <option>Select Nationality</option>
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
                                    <label>Passport No.</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Passport No." value={helperFormData.PassportNo}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          PassportNo: e.target.value
                                        })
                                      }} /> </div>
                                </div>


                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Passport Issue Place</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Passport Issue Place" value={helperFormData.PassportIssuePlace}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          PassportIssuePlace: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
  <div className="col-lg-3">
    <label>Passport Issue Date</label>
  </div>
  <div className="col-lg-6">
    <div className="inrow date-wrap datepicker-wrap">
      <input
        type="date"
        className="form-control"
        id="PassportIssueDate"
        value={helperFormData.PassportIssueDate}
        onChange={(e) => {
          setHelperFormData({
            ...helperFormData,
            PassportIssueDate: e.target.value,
          });
        }}
      />
      {/* <i className="fas fa-calendar-alt"></i> */}
    </div>
  </div>
</div>

<div className="row form-group align-items-center">
  <div className="col-lg-3">
    <label>Passport Expiry Date</label>
  </div>
  <div className="col-lg-6">
    <div className="inrow date-wrap datepicker-wrap">
      <input
        type="date"
        className="form-control"
        id="PassportExpiryDate"
        value={helperFormData.PassportExpiryDate}
        onChange={(e) => {
          setHelperFormData({
            ...helperFormData,
            PassportExpiryDate: e.target.value,
          });
        }}
      />
      {/* <i className="fas fa-calendar-alt"></i> */}
    </div>
  </div>
</div>




                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Work Permit No.</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Work Permit No" value={helperFormData.WPNo}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          WPNo: e.target.value
                                        })
                                      }} />
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Work Permit Expiry</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div>
                                      <input type="date" className="form-control" id="WPExpiry"  value={helperFormData.WPExpiry}
                                        onChange={(e) => {
                                          setHelperFormData({
                                            ...helperFormData,
                                            WPExpiry: e.target.value
                                          })
                                        }} /> {/* <i className="fas fa-calendar-alt"></i> */}
                                    </div>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Religion</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.Religion}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Religion: e.target.value
                                        })
                                      }} >
                                      <option>Select Religion</option>
                                      {region?.map((item, index) => (
                                        <option key={index} value={item?.ReligionCode}>
                                          {item?.ReligionDesc}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Date of Birth</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="inrow date-wrap datepicker-wrap">
                                      <input type="date" className="form-control" id="DateOfBirth"  value={helperFormData.DateOfBirth}
                                        onChange={(e) => {
                                          setHelperFormData({
                                            ...helperFormData,
                                            DateOfBirth: e.target.value
                                          })
                                        }} /> {/* <i className="fas fa-calendar-alt"></i> */} </div>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Martial Status</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.MaritalStatus}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          MaritalStatus: e.target.value
                                        })
                                      }}>
                                      <option>Select Marital Status</option>
                                      {maritalStatus?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>


                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Birth Place</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Birth Place" value={helperFormData.BirthPlace}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          BirthPlace: e.target.value
                                        })
                                      }} /> </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Specialization/Preference</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.Specialisation}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Specialisation: e.target.value
                                        })
                                      }}>
                                      <option>Select Specialization</option>
                                      {specialization?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>


                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Repatraite Airport</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="" value={helperFormData.RepatraiteAirport}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          RepatraiteAirport: e.target.value
                                        })
                                      }} /> </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Status</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.Status}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Status: e.target.value
                                        })
                                      }}>
                                      <option>Select Status</option>
                                      <option value="Pending">Pending</option>
                                      {HelperStatus?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Other Info</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="" value={helperFormData.OtherInfo}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          OtherInfo: e.target.value
                                        })
                                      }} />
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Direct Hire</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="radio-inline">
                                      <div className="radio">
                                        <label>
                                          <input type="radio" defaultChecked name="r1" value="Yes"
                                            onChange={(e) => {
                                              setHelperFormData({
                                                ...helperFormData,
                                                DirectHire: true
                                              })
                                            }} /> <span>Yes</span></label>
                                      </div>
                                      <div className="radio">
                                        <label>
                                          <input type="radio" name="r1" value="No"
                                            onChange={(e) => {
                                              setHelperFormData({
                                                ...helperFormData,
                                                DirectHire: false
                                              })
                                            }} /> <span>No</span></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Training Center</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="" value={helperFormData.TrainingCenter}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          TrainingCenter: e.target.value
                                        })
                                      }} /> </div>
                                </div>



                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-2" role="button" aria-expanded="false" aria-controls="edf-2">2. Helper Contact</a> </div>
                          <div className="collapse show" id="edf-2">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group">
                                  <div className="col-lg-3">
                                    <label>Home Address</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <textarea className="form-control" placeholder="Home Address" value={helperFormData.Homeaddress}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Homeaddress: e.target.value
                                        })
                                      }}></textarea>
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Home Telephone</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="tel" className="form-control" placeholder="Telephone No." value={helperFormData.HomeTelephone}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          HomeTelephone: e.target.value
                                        })
                                      }}
                                      required
      maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
       /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Whatsapp</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="tel" className="form-control" placeholder="Whatsapp" value={helperFormData.Whatsapp}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Whatsapp: e.target.value
                                        })
                                      }}
                                      required
      maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number" /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Viber</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Viber" value={helperFormData.Viber}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Viber: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Facebook</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Facebook" value={helperFormData.Facebook}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Facebook: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                {/* <div className="row mb15 sub-title-row form-group align-items-center">
                                  <div className="col-lg-12">
                                    <h6>Other Contact</h6>
                                  </div>
                                </div> */}
                                 <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Type</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder="WeChat" value={helperFormData.Type}
                                    onChange={(e) => {
                                      setHelperFormData({
                                          ...helperFormData,
                                          Type:  e.target.value
                                      })
                                  }}/> </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Information</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder="WeChat Account ID/Name" value={helperFormData.OtherType}
                                    onChange={(e) => {
                                      setHelperFormData({
                                          ...helperFormData,
                                          OtherType:  e.target.value
                                      })
                                  }}/> </div>
                            </div> 

                                {/* <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Type</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Type"
                                      value={typeValue}
                                      onChange={handleTypeChange}
                                    /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Information</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Info"
                                      value={infoValue}
                                      onChange={handleInfoChange}
                                    /> </div>

                                  <div className="col-lg-3">
                                    <button name="add-more" onClick={handleAdd} className="add-more"> Add </button>
                                  </div>
                                </div> */}

                                {/* <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                          <button name="add-more" onClick={handleAdd} className="add-more"> Add <i className="fas fa-plus"></i></button>
                        </div>
                      </div>  */}
                                {/* <ul>
                        {list.map((item, index) => (
                          <li key={index}>
                            Type: {item.type}, Info: {item.info}
                          </li>
                        ))}
                      </ul> */}
                                {/* {list.length > 0 && (
                                  <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                                    <table className="table" style={{ width: "80%" }}>
                                      <thead>
                                        <tr>
                                          <th>S/No</th>
                                          <th>Type</th>
                                          <th>Information</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {list.map((item, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Type}</td>
                                            <td>{item.Information}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )} */}
                                {/* <div className="row form-group align-items-center">
                              <div className="col-lg-12">
                                <button name="add-more" className="add-more"><i className="fas fa-plus"></i> Add More</button>
                              </div>
                            </div>
                             */}


                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-3" role="button" aria-expanded="false" aria-controls="edf-3">3. Family Background</a> </div>
                          <div className="collapse show" id="edf-3">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Father Occupation</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Occupation" value={helperFormData.FatherOccupation}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          FatherOccupation: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Mother Occupation</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Occupation" value={helperFormData.MotherOccupation}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          MotherOccupation: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Father Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Age" value={helperFormData.FatherAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          FatherAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Mother Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Age" value={helperFormData.MotherAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          MotherAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Siblings Position</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Position" value={helperFormData.SiblingsPosition}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          SiblingsPosition: e.target.value
                                        })
                                      }} /> </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>No. of Brother</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.NoOfBrother}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          NoOfBrother: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>No. of Sister</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.NoOfSister}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          NoOfSister: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Brother Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.BrotherAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          BrotherAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Sister Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.SisterAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          SisterAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Spouse Name</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Spouse Name" value={helperFormData.HusbandName}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          HusbandName: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Spouse Occupation</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Spouse Occupation" value={helperFormData.HusbandOccupation}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          HusbandOccupation: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Spouse Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Spouse Age" value={helperFormData.HusbandAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          HusbandAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>No. Of Children</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.NoofChildren}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          NoofChildren: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Child Age</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Age" value={helperFormData.ChildAge}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          ChildAge: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-4" role="button" aria-expanded="false" aria-controls="edf-4">4. Physical Attrribute</a> </div>
                          <div className="collapse show" id="edf-4">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Complexion</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.Complexion}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Complexion: e.target.value
                                        })
                                      }}>
                                      <option>Select Complexion</option>
                                     {complexion?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Height</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="row inner-form-group">
                                      <div className="col-lg-6">
                                        <div className="row gutters-5 align-items-center">
                                          <div className="col-lg-8">
                                            <input type="text" className="form-control" placeholder="CM" value={helperFormData.Height}
                                              onChange={(e) => {
                                                setHelperFormData({
                                                  ...helperFormData,
                                                  Height: e.target.value
                                                })
                                              }} />
                                          </div>
                                          <div className="col-lg-4">
                                            <label>CM</label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="row gutters-5 align-items-center">
                                          <div className="col-lg-8">
                                            <input type="text" className="form-control" placeholder="Feet" value={helperFormData.Feet}
                                              onChange={(e) => {
                                                setHelperFormData({
                                                  ...helperFormData,
                                                  Feet: e.target.value
                                                })
                                              }} />
                                          </div>
                                          <div className="col-lg-4">
                                            <label>Feet</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Weight</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="row inner-form-group">
                                      <div className="col-lg-6">
                                        <div className="row gutters-5 align-items-center">
                                          <div className="col-lg-8">
                                            <input type="text" className="form-control" placeholder="KG" value={helperFormData.Weight}
                                              onChange={(e) => {
                                                setHelperFormData({
                                                  ...helperFormData,
                                                  Weight: e.target.value
                                                })
                                              }} />
                                          </div>
                                          <div className="col-lg-4">
                                            <label>KG</label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="row gutters-5 align-items-center">
                                          <div className="col-lg-8">
                                            <input type="text" className="form-control" placeholder="Pound" value={helperFormData.Pound}
                                              onChange={(e) => {
                                                setHelperFormData({
                                                  ...helperFormData,
                                                  Pound: e.target.value
                                                })
                                              }} />
                                          </div>
                                          <div className="col-lg-4">
                                            <label>Pounds</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-5" role="button" aria-expanded="false" aria-controls="edf-5">5. Booking Related Information</a> </div>
                          <div className="collapse show" id="edf-5">
                            <div className="card card-body">
                              <div className="form-data-wrap">

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Basic Salary ($)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Basic Salary" value={helperFormData.BasicSalary}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          BasicSalary: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Off Day Daily Rate ($)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Off Day Daily Rate" value={helperFormData.offDayDailyRate}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          offDayDailyRate: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Helper Fee ($)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Helper Fee" value={helperFormData.HelperFee}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          HelperFee: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Pocket Money ($)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="Pocket Money" value={helperFormData.Pocketmoney}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Pocketmoney: e.target.value
                                        })
                                      }} /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Select Off Days</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" value={helperFormData.SelectOffDays}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          SelectOffDays: e.target.value
                                        })
                                      }}>
                                      <option>Select Off Days</option>
                                      <option value="Monthly">Monthly</option>
  <option value="Year">Year</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>No.</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" className="form-control" placeholder="No." value={helperFormData.EnterOffDays}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          EnterOffDays: e.target.value
                                        })
                                      }} /> </div>
                                </div>

                                <div className="row mb15 sub-title-row form-group align-items-center">
                                  <div className="col-lg-12">
                                    <h6>Availability of FDW to be Interview by Prospective Employer</h6>
                                  </div>
                                </div>

                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Available Date (SGT)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="inrow date-wrap datepicker-wrap">
                                      <input type="date" className="form-control" id="InterviewDate"  value={helperFormData.InterviewDate}
                                        onChange={(e) => {
                                          setHelperFormData({
                                            ...helperFormData,
                                            InterviewDate: e.target.value
                                          })
                                        }} /> {/* <i className="fas fa-calendar-alt"></i> */} </div>
                                  </div>
                                </div>

                                <div className="row select-group select-slot-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Avaialable Time (SGT)</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <select className="form-control select" id="InterviewTime"  placeholder='Select Slot' value={helperFormData.InterviewTime}
         onChange={(e) => {
          setHelperFormData({
            ...helperFormData,
            InterviewTime: e.target.value
          })
        }} >
                                      <option >Select Slot</option>
                                      <option value="10:00">Morning Slot 1 : 10: AM to 10:30 AM</option>
                                      <option value="10:30">Morning Slot 2 : 10:30 AM to 11 AM</option>
                                      <option value="11:00">Morning Slot 3 : 11 AM to 11:30 AM</option>
                                      <option value="11:30">Morning Slot 4 : 11:30 AM to 12 PM</option>
                                      <option value="12:00">Afternoon Slot 1 : 12 PM to 12:30 PM</option>
                                      <option value="12:30">Afternoon Slot 2 : 12:30 PM to 1 PM</option>
                                      <option value="01:00">Afternoon Slot 3 : 1 PM to 1:30 PM</option>
                                      <option value="01:30">Afternoon Slot 4 : 1:30 PM to 2 PM</option>
                                      <option value="02:00">Afternoon Slot 5 : 2 PM to 2:30 PM</option>
                                      <option value="02:30">Afternoon Slot 6 : 2:30 PM to 3 PM</option>
                                      <option value="03:00">Afternoon Slot 7 : 3 PM to 3:30 PM</option>
                                      <option value="03:30">Afternoon Slot 8 : 3 :30 PM to 4 PM</option>
                                      <option value="04:00">Afternoon Slot 9 : 4 PM to 4:30 PM</option>
                                      <option value="04:30">Afternoon Slot 10 : 4:30 PM to 5 PM</option>
                                      <option value="05:00">Afternoon Slot 11 : 5 PM to 5:30 PM</option>
                                      <option value="05:30">Afternoon Slot 12 : 5:30 PM to 6 PM</option>
                                    </select>
                                  </div>
                                </div>
                                {/* {intTime.length!=0? 
                                <>{intTime.map((time)=><div key={time} className="row select-group select-slot-group align-items-center">
                                  <div className="col-lg-3"></div>
                                  <div className="col-lg-6">Selected Slot @ {time}</div>
                                </div>)}</>:<></>}
                      <div className="row form-group align-items-center">
                        <div className="col-lg-12">
                          <button name="add-more" className="add-more"><i className="fas fa-plus"></i> Add More</button>
                        </div>
                      </div> */}

                                <div className="row form-group">
                                  <div className="col-lg-3">
                                    <label>Other Remarks</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <textarea className="form-control" placeholder="Other Remarks" value={helperFormData.Remarks}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Remarks: e.target.value
                                        })
                                      }}></textarea>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="data-collapse-box">
                          <div className="card-header"> <a className="" data-toggle="collapse" href="#edf-6" role="button" aria-expanded="false" aria-controls="edf-6">4. Account Details</a> </div>
                          <div className="collapse show" id="edf-6">
                            <div className="card card-body">
                              <div className="form-data-wrap">
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Email Address</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="email" className="form-control" placeholder="XXXXXXXXXXXXXXX@gmail.com" value={helperFormData.Email}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          Email: e.target.value
                                        })
                                      }}
                                      required
                                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Basic email pattern
                                      title="Please enter a valid email address" /> </div>
                                </div>
                                <div className="row form-group align-items-center">
                                  <div className="col-lg-3">
                                    <label>Password</label>
                                  </div>
                                  <div className="col-lg-6">
                                    <input 
                                    type={showLoginPassword ? "text" : "password"}  
                                    className="form-control" 
                                    value={helperFormData.Password}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
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
                                    value={helperFormData.ConfirmPassword}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
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
                                    <input type="tel" className="form-control" value={helperFormData.SMSContactNumber}
                                      onChange={(e) => {
                                        setHelperFormData({
                                          ...helperFormData,
                                          SMSContactNumber: e.target.value
                                        })
                                      }}
                                      placeholder="Your Phone Number"
      required
      maxLength="10" // Limit input to 10 digits
      pattern="^\d{10}$" // Ensure only 10 digits
      title="Please enter a 10-digit phone number"
   /> </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="ctpod col-lg-12 pt20 pb20">
                          <div className="checkbox size-16">
                          <input
          type="checkbox"
          id="c1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
                            <label htmlFor="c1">
                    
I hereby declared that all the above information given are true and correct.</label>
                          </div>
                        </div>

                       <div
        onClick={() => isChecked && stepThreeHandler()} // Only call function if checked
        className={`action-button custom-button finish ${
          isChecked ? "enabled" : "disabled"
        }`}
      >
        SUBMIT
      </div>

      <style>
        {`
          .action-button.custom-button.finish {
            float: right;
            padding: 15px 18px;
            font-size: 14px;
            line-height: 17px;
            text-transform: capitalize;
            border-radius: 60px;
            min-width: 120px;
            text-align: center;
            transition: all 0.2s linear;
          }
          .enabled {
            background: #1AA99C;
            color: white;
            cursor: pointer;
          }
          .disabled {
            background: #ccc;
            color: #888;
            pointer-events: none;
            cursor: not-allowed; /* Disables cursor */
            opacity: 0.6; /* Makes it look visually disabled */
          }
        `}
      </style>
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
}
export default MaidRegistration;