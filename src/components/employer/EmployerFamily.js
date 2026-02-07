import React,{useEffect,useState} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { jpb } from '../../config';
import Select from 'react-select';
import { getGenderData,getRelationshipData,getOccupation,getMonthlyIncome, getHousingTypeData, getJobScopeData, getResidentialStatusData, getYearOfAssesmentYearData } from '../../apiCalls';
import { DatePicker } from '@mui/x-date-pickers';

import { format, parse } from "date-fns";

  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return ""; // Return empty string if date is empty
  
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Return empty if date is invalid
  
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };
  
const EmployerFamily = () => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [employerName, setEmployerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [familydata, setfamilydata] = useState({
    "employerMasterFamilyDetailv2": [
      {
        "OrgId": 1,
        "EmployerCode": "",
        "PassportExpiryDateString": "",
      "DateOfBirthString": "",
        "Name": "",
        "SlNo": 0,
        "Relationship": "",
        "NRIC_FIN": "",
        "DateofBirth": "",
        "Title": "",
        "Passport": "",
        "PassportExpiry": "",
        "Gender": "",
        "ResidentialStatus": "",
        "Occupation": "",
        "Employed": true,
        "CompanyName": "",
        "MonthlyIncome": "",
        "AnnualIncome": true,
        "YearofAssessment": 0,
        "MobileNo": "",
        "Email": "",
        "OtherNo": ""
      }
    ],
    "employerMasterJobScopv2": [
    {
      "OrgId": 1,
      "EmployerCode": "",
      "JobScopId": "",
      "JobScopDescriptin": "",
      "ExpectedJobScope": "",
      "HousingType": "",
      "NoOfBedroom": 0,
      "HelperSleepingArea": "",
      "OtherFamilyMemberStayinghouse": "",
      "Remarks": ""
    }
  ],
  });

  console.log("Familyand jobscope",familydata)
  const [isloggedin, setisloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [residentialStatus, setResidentialStatus] = useState();
  const [gender, setGender] = useState();
  const [relationship, setRelationship]=useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [occupation, setOccupation] = useState();
  const [yearOfAssesment, setYearOfAssesment] = useState();
  const [housingType, setHousingType] = useState();
  const [jobScope, setJobScope] = useState();

 
  console.log("jobb",jobScope)
  const handleChange = (selectedOptions) => {
    const selectedData = selectedOptions.map(option => ({
      JobScopeId: option.JobScopeId,
      ExpectedJobScope: option.value
    }));
    console.log("selectedData",selectedData)

    setfamilydata((prevData) => ({
      ...prevData,
      employerMasterJobScopv2: [
        {
          ...prevData.employerMasterJobScopv2[0],
          ExpectedJobScope: selectedData
        }
      ]
    }));
  };
  
  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log(token);
      setisloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
    }
    console.log(isloggedin);
    console.log(storedData);
  }, []);

  const convertToDate = (dateString) => {
    const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Months are zero-based
  const year = dateObject.getFullYear();

  const formattedDateString = `${day}/${month}/${year}`;
  
    return formattedDateString;
  };

  useEffect(() => {
     if (storedData.length > 0) {
      setfamilydata({
        ...familydata,
        "employerMasterFamilyDetailv2": [
          {
            "OrgId": 1,
            "EmployerCode": storedData[0].EmployerCode,
            "Name": storedData[0].Name,
            "SlNo": 0,
            "Relationship": storedData[0].Relationship,
            "NRIC_FIN": storedData[0].NRIC_FIN ,
            "DateofBirth": convertToDate(storedData[0].DateOfBirth),
            "Title": storedData[0].Title,
            "Passport": storedData[0].Passport,
            "PassportExpiry": convertToDate(storedData[0].PassportExpiry),
            "Gender": storedData[0].Gender,
            "ResidentialStatus": storedData[0].ResidentialStatus,
            "Occupation": storedData[0].Occupation,
            "Employed": storedData[0].Employed?"Yes":"No",
            "CompanyName": storedData[0].Appxperts,
            "MonthlyIncome": storedData[0].MonthlyIncome,
            "AnnualIncome": storedData[0].AnnualIncome,
            "YearofAssessment": storedData[0].YearofAssessment,
            "MobileNo": storedData[0].MobileNo,
            "Email": storedData[0].Email,
            "OtherNo": storedData[0].OtherNo
          }
        ],
        "employerMasterJobScopv2": [
          {
            "OrgId": 1,
            "EmployerCode": storedData[0].EmployerCode,
            "JobScopId": 0,
            "JobScopDescriptin":storedData[0].JobScopDescriptin,
            "ExpectedJobScope": storedData[0].ExpectedJobScope,
            "HousingType": storedData[0].HousingType,
            "NoOfBedroom": storedData[0].NoOfBedroom,
            "HelperSleepingArea": storedData[0].HelperSleepingArea,
            "OtherFamilyMemberStayinghouse": storedData[0].OtherFamilyMemberStayinghouse,
            "Remarks": storedData[0].Remarks,
            "ExpectedJobscopes": []
        }
        ]
      });
     }
  }, [storedData]);


  useEffect(() => {
    getResidentialStatusData()
      .then(data => {
        if (data.Message === "Sucess") {
          setResidentialStatus(data.Data);
        } else {
          toast.error("error getting ResidentialStatus")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching ResidentialStatus:', error);
      });
  }, []);
    
    useEffect(() => {
      getGenderData()
        .then(data => {
          if (data.Message === "Sucess") {
            setGender(data.Data);
          } else {
            toast.error("error getting gender")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching gender:', error);
        });
  }, []);

  useEffect(() => {
    getRelationshipData()
      .then(data => {
        if (data.Message === "Sucess") {
          setRelationship(data.Data);
        } else {
          toast.error("error getting gender")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching gender:', error);
      });
}, []);

useEffect(() => {
  getMonthlyIncome()
    .then(data => {
      if (data.Message === "Sucess") {
        setMonthlyIncome(data.Data);
      } else {
        toast.error("error getting gender")
      }
    })
    .catch(error => {
      toast.error(error);
      console.error('Error fetching gender:', error);
    });
}, []);

useEffect(() => {
  getOccupation()
    .then(data => {
      if (data.Message === "Sucess") {
        setOccupation(data.Data);
      } else {
        toast.error("error getting gender")
      }
    })
    .catch(error => {
      toast.error(error);
      console.error('Error fetching gender:', error);
    });
}, []);
    
    useEffect(() => {
      getYearOfAssesmentYearData()
        .then(data => {
          if (data.Message === "Sucess") {
            setYearOfAssesment(data.Data);
          } else {
            toast.error("error getting Year of Assesment")
          }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching Year of Assesment:', error);
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


  const EmployerCode = localStorage.getItem("EmployerCode"); // Retrieve EmployerCode from localStorage
    
    const fetchdata = async () => {
      try {
        // Make sure EmployerCode exists before making the API call
        if (!EmployerCode) {
          console.log('EmployerCode is missing!');
          return;
        }
    
        const response = await fetch(`https://jpbapi.appxes-erp.in/Employer/GetByCode?OrganizationId=1&EmployerCode=${EmployerCode}`, {
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
        console.log("data", data)
        console.log("familydatares", data.Data[0])
        const responsedata = data.Data[0];
        setfamilydata(responsedata);
      } catch (error) {
        console.log('Error:', error);
      }
    }
    
    useEffect(() => {
      fetchdata();
    }, []);

  

  const handleInputChange = (event) => {
    console.log(event.target);
    // this.setState({ value: event.target.value });
     const { name, value } = event.target;
 
     console.log(value,name);
     setfamilydata((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };
 
   const handleRadioChange = (e) => {
     const { name, value } = e.target;
 

     setfamilydata((prevData) => ({
      ...prevData,
      employerMasterFamilyDetailv2: [
        {
          ...prevData.employerMasterFamilyDetailv2[0],
          [name]: value === "true" ? true : false
        }
      ]
    }));
  
   };

   const EmployerName = localStorage.getItem("EmployerName");

  const savefamilydataHandler = async (event) => {
    event.preventDefault();
    const employerAccount = JSON.parse(localStorage.getItem("employerAccount"));
    const employerProfile = JSON.parse(localStorage.getItem("employerProfile"));
    const employerContact = JSON.parse(localStorage.getItem("employerContact"));
    const employerAddress = JSON.parse(localStorage.getItem("employerAddress"));
  console.log("employerAddress", employerAddress);
    console.log("familydata",familydata);
    const payload = {
      "EmployerMasterV2": {
        "ICIssueDateString": employerProfile.EmployerMasterV2.ICIssueDate || "",
        "DateOfBirthString": employerProfile.EmployerMasterV2.DateOfBirth || "",
        "PassportExpiryDateString": employerProfile.EmployerMasterV2.PassportExpiry || "",
        "OrgId": employerAddress.EmployerMasterV2.OrgId || 0,
        "EmployerAutoId": familydata?.EmployerMasterV2?.EmployerAutoId || 0,
        "BranchCode": "00011",
        "SmsNo": employerAccount.EmployerMasterV2.SmsNo,
        "EmployerCode": employerAddress.EmployerMasterV2.EmployerCode || "",
        "EmployerName":employerAccount.EmployerMasterV2.EmployerName || "",
        "EmailId": employerAccount.EmployerMasterV2.EmailId || "",
        "Password": employerAccount.EmployerMasterV2.Password || "",
        "Nationality": employerProfile.EmployerMasterV2.Nationality || "",
        "NRIC_FIN": employerProfile.EmployerMasterV2.NRIC_FIN || "",
        "PassportNo": employerProfile.EmployerMasterV2.PassportNo || "",
        "PassportExpiryDate": employerProfile.EmployerMasterV2.PassportExpiry || "",
        "DateOfBirth": employerProfile.EmployerMasterV2.DateOfBirth || "",
        "ICIssueDate": employerProfile.EmployerMasterV2.ICIssueDate || "",
        "Gender": employerProfile.EmployerMasterV2.Gender || "",
        "RaceCode": employerProfile.EmployerMasterV2.RaceCode || 0,
        "ResidentialStatusCode": employerProfile.EmployerMasterV2.ResidentialStatusCode || "",
        "BlockList": employerProfile.EmployerMasterV2.BlockList || false,
        "MartilaStatus": employerProfile.EmployerMasterV2.MartilaStatus || "",
        "ReligionCode": employerProfile.EmployerMasterV2.ReligionCode || 0,
        "Occupation": employerProfile.EmployerMasterV2.Occupation || "",
        "PlacementFee": 0,
        "BasicSalary": 0,
        "OffDayRate": 0,
        "PocketMoney": 0,
        "MonthlyOffDay": 0,
        "Employed": employerProfile.EmployerMasterV2.Employed || false,
        "ReferralMethod": employerProfile.EmployerMasterV2.ReferralMethod || "",
        "CombinedIncome": employerProfile.EmployerMasterV2.CombinedIncome || false,
        "MonthlyIncome": employerProfile.EmployerMasterV2.MonthlyIncome || 0,
        "YearofAssesment": employerProfile.EmployerMasterV2.YearofAssesment || 0,
        "NoofBedroom": employerProfile.EmployerMasterV2.NoofBedroom || 0,
        "NoofToilet": employerProfile.EmployerMasterV2.NoofToilet || 0,
        "ClearWindowExterior": employerProfile.EmployerMasterV2.ClearWindowExterior || false,
        "CompanyName": employerProfile.EmployerMasterV2.CompanyName || "",
        "MarriageRegisteredinSG": employerProfile.EmployerMasterV2.MarriageRegisteredinSG || false,
        "AnnualIncome": employerProfile.EmployerMasterV2.AnnualIncome || 0,
        "TypeOfResidence": employerProfile.EmployerMasterV2.TypeOfResidence || "",
        "ContactPerson": employerContact.employerMasterContactDetailv2.ContactPerson || "",
        "Contact_MobileNo": employerContact.employerMasterContactDetailv2.Contact_MobileNo || "",
        "Contact_OfficeNo": employerContact.employerMasterContactDetailv2.Contact_OfficeNo || "",
        "Contact_HomeNo": employerContact.employerMasterContactDetailv2.Contact_HomeNo || "",
        "Contact_Email": employerContact.employerMasterContactDetailv2.Contact_Email || "",
        "Contact_PostalCode": employerContact.employerMasterContactDetailv2.Contact_PostalCode || "",
        "Contact_UnitNo": employerContact.employerMasterContactDetailv2.Contact_UnitNo || "",
        "Contact_StreetName": employerContact.employerMasterContactDetailv2.Contact_StreetName || "",
        "Contact_BuildingName": employerContact.employerMasterContactDetailv2.Contact_BuildingName || "",
        "Contact_Country": employerContact.employerMasterContactDetailv2.Contact_Country || "",
        "PostalCode": employerAddress.EmployerMasterV2.PostalCode,
        "UnitNo": employerAddress.EmployerMasterV2.UnitNo,
        "StreetName": employerAddress.EmployerMasterV2.StreetName,
        "BuildingName": employerAddress.EmployerMasterV2.BuildingName,
        "Country": employerAddress.EmployerMasterV2.Country,
        "HousingType": familydata.employerMasterJobScopv2[0]?.HousingType || "",
        "HelperSleepingArea": familydata.employerMasterJobScopv2[0]?.HelperSleepingArea || "",
        "OFMS": familydata.employerMasterJobScopv2[0]?.OtherFamilyMemberStayinghouse || "",
        "Remarks": familydata.employerMasterJobScopv2[0]?.Remarks || "",
        "IsActive": true
      },
      "employerMasterFamilyDetailv2": familydata.employerMasterFamilyDetailv2.map(family => ({
        "OrgId": family.OrgId || 0,
        "EmployerCode": employerAddress.EmployerMasterV2.EmployerCode || "",
        "Name": family.Name || "",
        "SlNo": family.SlNo || 0,
        "Nationality": family.Nationality || "",
        "Relationship": family.Relationship || "",
        "NRIC_FIN": family.NRIC_FIN || "",
        "DateofBirth": family.DateofBirth || "",
        "DateOfBirthString": family.DateofBirth || "",
        "PassportExpiryDateString": family.PassportExpiry || "",
        "Title": family.Title || "",
        "Passport": family.Passport || "",
        "PassportExpiry": family.PassportExpiry || "",
        "Gender": family.Gender || "",
        "ResidentialStatus": family.ResidentialStatus || "",
        "Occupation": family.Occupation || "",
        "Employed": family.Employed || false,
        "CompanyName": family.CompanyName || "",
        "MonthlyIncome": family.MonthlyIncome || "",
        "AnnualIncome": family.AnnualIncome || 0,
        "YearofAssessment": family.YearofAssessment || 0,
        "MobileNo": family.MobileNo || "",
        "Email": family.Email || "",
        "OtherNo": family.OtherNo || ""
      })),
      "employerMasterContactDetailv2": [{
        "OrgId": 1,
        "EmployerCode": employerAddress.EmployerMasterV2.EmployerCode || "",
        "SlNo": employerContact.employerMasterContactDetailv2.SLNo || "",
        "ContactPerson": employerContact.employerMasterContactDetailv2.ContactPerson || "",
        "ContactNo": employerContact.employerMasterContactDetailv2.ContactNo || "",
        "Contact_HomeNo": employerContact.employerMasterContactDetailv2.Contact_HomeNo || "",
        "Contact_FaxNo": employerContact.employerMasterContactDetailv2.Contact_FaxNo || "",
        "Contact_Email": employerContact.employerMasterContactDetailv2.Contact_Email || "",
        "Contact_PostalCode": employerContact.employerMasterContactDetailv2.Contact_PostalCode || "",
        "Contact_UnitNo": employerContact.employerMasterContactDetailv2.Contact_UnitNo || "",
        "Contact_StreetName": employerContact.employerMasterContactDetailv2.Contact_StreetName || "",
        "Contact_BuildingName": employerContact.employerMasterContactDetailv2.Contact_BuildingName || "",
        "Contact_Country": employerContact.employerMasterContactDetailv2.Contact_Country|| ""

      }],
      "employerMasterJobScopv2": [{
        "OrgId": employerAddress.EmployerMasterV2.OrgId || 0,
        "EmployerCode": employerAddress.EmployerMasterV2.EmployerCode || "",
        "JobScopId":  0,
        "JobScopDescriptin": "Work",
        "ExpectedJobScope": familydata.employerMasterJobScopv2[0]?.ExpectedJobScope || "",
        "HousingType": familydata.employerMasterJobScopv2[0]?.HousingType || "",
        "NoOfBedroom": familydata.employerMasterJobScopv2[0]?.NoOfBedroom || 0,
        "HelperSleepingArea": familydata.employerMasterJobScopv2[0]?.HelperSleepingArea || "",
        "OtherFamilyMemberStayinghouse": familydata.employerMasterJobScopv2[0]?.OtherFamilyMemberStayinghouse || "",
        "Remarks": familydata.employerMasterJobScopv2[0]?.Remarks || ""
      }]
    };
    
    
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
    console.log("responseupdate",response)
      if (response.status === 200 && response.ok === true) {
        toast.success('Personal Details Updated Successfull',
          {
            position: "top-right",
            autoClose: 1000,
          }
        )
        handleLinkClick('/employeraccount');
        localStorage.removeItem('employerAccount');
        localStorage.removeItem('employerProfile');
        localStorage.removeItem('employerContact');
        localStorage.removeItem('employerAddress');
      } else {
        console.error('Form submission failed:', response);
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Personal Details Update failed:', err);
      setError('Personal Details Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  
  };


  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
 
  const handleLinkClick = (link) => {
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
            <figure><img src="images/banner-employer-dashboard.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
      
      <section className="fullcontainer dashboard efml-page" data-aos="fade-up">
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
              <form onSubmit={savefamilydataHandler}>
              <div className="dashboard-right-wrap efml-wrap">
                    <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Family Details</h2></div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Name</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Name"
                           value={familydata.employerMasterFamilyDetailv2[0]?.Name || ""}
                           onChange={(e) => {
                            setfamilydata((prevData) => ({
                              ...prevData,
                              employerMasterFamilyDetailv2: [
                                {
                                  ...prevData.employerMasterFamilyDetailv2[0],
                                  Name: e.target.value
                                }
                              ]
                            }));
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Relationship</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control' 
                               value={familydata.employerMasterFamilyDetailv2[0].Relationship}
                               //onChange={(e) => {setfamilydata({...familydata,Relationship:e.target.value});}}
                               onChange={(e) => {
                                setfamilydata((prevData) => ({
                                  ...prevData,
                                  employerMasterFamilyDetailv2: [
                                    {
                                      ...prevData.employerMasterFamilyDetailv2[0],
                                      Relationship: e.target.value
                                    }
                                  ]
                                }));
                              }}
                               >
                                  <option value="">Select</option>
                                  {relationship?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>NRIC / FIN</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="NRIC / FIN"
                            value={familydata.employerMasterFamilyDetailv2[0].NRIC_FIN}
                            onChange={(e) => {
                              setfamilydata((prevData) => ({
                                ...prevData,
                                employerMasterFamilyDetailv2: [
                                  {
                                    ...prevData.employerMasterFamilyDetailv2[0],
                                    NRIC_FIN: e.target.value
                                  }
                                ]
                              }));
                            }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Date of Birth</label>
                        </div>
                        <div className="col-lg-7">
                          <div className="inrow date-wrap datepicker-wrap">
                          <input
  type="date"
  className="form-control"
  id="DateOfBirth"
  value={convertToDateInputFormat(familydata.employerMasterFamilyDetailv2[0]?.DateofBirth)}
  onChange={(e) => {
    setfamilydata((prevData) => ({
      ...prevData,
      employerMasterFamilyDetailv2: [
        {
          ...prevData.employerMasterFamilyDetailv2[0],
          DateofBirth: e.target.value, // Store in YYYY-MM-DD format
        },
      ],
    }));
  }}
  required
/>

                          </div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Title</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Title"
                            value={familydata.employerMasterFamilyDetailv2[0].Title}
                            onChange={(e) => {
                              setfamilydata((prevData) => ({
                                ...prevData,
                                employerMasterFamilyDetailv2: [
                                  {
                                    ...prevData.employerMasterFamilyDetailv2[0],
                                    Title: e.target.value
                                  }
                                ]
                              }));
                            }}
                          /> </div>
                      </div>
                      
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Passport</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" name="Passport" className="form-control" placeholder="Passport"
                           value={familydata.employerMasterFamilyDetailv2[0].Passport}
                           onChange={(e) => {
                             setfamilydata((prevData) => ({
                               ...prevData,
                               employerMasterFamilyDetailv2: [
                                 {
                                   ...prevData.employerMasterFamilyDetailv2[0],
                                   Passport: e.target.value
                                 }
                               ]
                             }));
                           }}
                          /> </div>
                      </div>
                      
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Passport Expiry</label>
                        </div>
                        <div className="col-lg-7">
                          <div className="inrow date-wrap datepicker-wrap">
                          
                      <input
  type="date"
  className="form-control"
  id="PassportExpiry"
  value={convertToDateInputFormat(familydata.employerMasterFamilyDetailv2[0]?.PassportExpiry)}
  onChange={(e) => {
    setfamilydata((prevData) => ({
      ...prevData,
      employerMasterFamilyDetailv2: [
        {
          ...prevData.employerMasterFamilyDetailv2[0],
          PassportExpiry: e.target.value, // Store in YYYY-MM-DD format
        },
      ],
    }));
  }}
/>
</div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Gender</label>
                              </div>
                              <div className="col-lg-7">
                                <select className='form-control'
                                value={familydata.employerMasterFamilyDetailv2[0].Gender}
                                onChange={(e) => {
                                  setfamilydata((prevData) => ({
                                    ...prevData,
                                    employerMasterFamilyDetailv2: [
                                      {
                                        ...prevData.employerMasterFamilyDetailv2[0],
                                        Gender: e.target.value
                                      }
                                    ]
                                  }));
                                }}
                                >
                                  <option value="">Select</option>
                                  {gender?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                  
                                </select>
                              </div>
                          </div>
                          
                          <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Residential Status</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="ResidentialStatusCode"
                                name="ResidentialStatusCode"
                                value={familydata.employerMasterFamilyDetailv2[0].ResidentialStatus}
                                onChange={(e) => {
                                   setfamilydata((prevData) => ({
                                     ...prevData,
                                     employerMasterFamilyDetailv2: [
                                       {
                                         ...prevData.employerMasterFamilyDetailv2[0],
                                         ResidentialStatus: e.target.value
                                       }
                                     ]
                                   }));
                                 }}
                                >
                                    <option value="">Select</option>
                                  {residentialStatus?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                  ))}
                              
                                </select>
                              </div>
                            </div>
                           
                              <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Occupation</label>
                              </div>
                              <div className="col-lg-7">
                                <select className='form-control'
                                value={familydata.employerMasterFamilyDetailv2[0].Occupation}
                                onChange={(e) => {
                                  setfamilydata((prevData) => ({
                                    ...prevData,
                                    employerMasterFamilyDetailv2: [
                                      {
                                        ...prevData.employerMasterFamilyDetailv2[0],
                                        Occupation: e.target.value
                                      }
                                    ]
                                  }));
                                }}
                                >
                                  <option value="">Select</option>
                                  {occupation?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                           
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Employed</label>
                              </div>
                              <div className="col-lg-7">
                              <div className="radio-inline">
                                  <div className="radio">
                                    <label>
                                      <input
                                      type="radio"
                                      name="Employed"
                                      value="true"
                                      checked={familydata.employerMasterFamilyDetailv2[0].Employed === true}
                                      onChange={handleRadioChange}
                                      /> <span>Yes</span></label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                    <input
                                      type="radio"
                                      name="Employed"
                                      value="false"
                                      checked={familydata.employerMasterFamilyDetailv2[0].Employed === false}
                                      onChange={handleRadioChange}
                                      /> <span>No</span></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                           

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Company Name</label>
                              </div>
                              <div className="col-lg-7">
                                <input type="text" className="form-control" placeholder="Company Name"
                                  value={familydata.employerMasterFamilyDetailv2[0].CompanyName}
                                  onChange={(e) => {
                                    setfamilydata((prevData) => ({
                                      ...prevData,
                                      employerMasterFamilyDetailv2: [
                                        {
                                          ...prevData.employerMasterFamilyDetailv2[0],
                                          CompanyName: e.target.value
                                        }
                                      ]
                                    }));
                                  }}
                                /> </div>
                              </div>


                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Monthly Income ($)</label>
                              </div>
                              <div className="col-lg-7">
                             <select className='form-control'
                                id="MonthlyIncome"
                                name="MonthlyIncome"
                                value={familydata.employerMasterFamilyDetailv2[0].MonthlyIncome}
                                onChange={(e) => {
                                  setfamilydata((prevData) => ({
                                    ...prevData,
                                    employerMasterFamilyDetailv2: [
                                      {
                                        ...prevData.employerMasterFamilyDetailv2[0],
                                        MonthlyIncome: e.target.value
                                      }
                                    ]
                                  }));
                                }}
                                >
                                  <option value="">Select</option>
                                  {monthlyIncome?.map((item, index) => (
                                        <option key={index} value={item?.Code}>
                                          {item?.Name}
                                        </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Annual Income ($)</label>
                              </div>
                              <div className="col-lg-7">
                              <input 
  type="number"  // Ensures only numeric input
  className="form-control" 
  placeholder="Annual Income ($)"
  value={familydata.employerMasterFamilyDetailv2[0].AnnualIncome || ""}  // Default to empty string if undefined
  onChange={(e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value) || "";  // Convert to number, or keep empty string
    setfamilydata((prevData) => ({
      ...prevData,
      employerMasterFamilyDetailv2: [
        {
          ...prevData.employerMasterFamilyDetailv2[0],
          AnnualIncome: value,
        }
      ]
    }));
  }}
/>

                              </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Year of Assessment</label>
                              </div>
                              <div className="col-lg-7">
                             <select className='form-control'
                                id="YearofAssesment"
                                name="YearofAssesment"
                                value={familydata.employerMasterFamilyDetailv2[0].YearofAssessment || ''}
                                onChange={(e) => {
                                  setfamilydata((prevData) => ({
                                    ...prevData,
                                    employerMasterFamilyDetailv2: [
                                      {
                                        ...prevData.employerMasterFamilyDetailv2[0],
                                        YearofAssessment: e.target.value
                                      }
                                    ]
                                  }));
                                }}
                                >
                                   <option value="">Select</option>
                                  {yearOfAssesment?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Year}
                                    </option>
                                  ))}
                                 
                                </select>
                              </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Mobile No.</label>
                              </div>
                              <div className="col-lg-7">
  <input
    type="text"
    className="form-control"
    placeholder="Mobile No."
    value={familydata.employerMasterFamilyDetailv2[0].MobileNo}
    onChange={(e) => {
      // Ensure the input doesn't exceed 10 digits
      const newValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
      if (newValue.length <= 10) {
        setfamilydata((prevData) => ({
          ...prevData,
          employerMasterFamilyDetailv2: [
            {
              ...prevData.employerMasterFamilyDetailv2[0],
              MobileNo: newValue
            }
          ]
        }));
      }
    }}
    maxLength="10" // Enforces a maximum of 10 characters in the input field
  />
</div>

                              </div>

                              <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Email</label>
                              </div>
                              <div className="col-lg-7">
                                <input type="email" className="form-control" placeholder="Email"
                                 value={familydata.employerMasterFamilyDetailv2[0].Email}
                                 onChange={(e) => {
                                   setfamilydata((prevData) => ({
                                     ...prevData,
                                     employerMasterFamilyDetailv2: [
                                       {
                                         ...prevData.employerMasterFamilyDetailv2[0],
                                         Email: e.target.value
                                       }
                                     ]
                                   }));
                                 }}
                                /> </div>
                              </div>

                              <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Other No.</label>
                              </div>
                              <div className="col-lg-7">
                                <input type="text" className="form-control" placeholder="Other No."
                                  value={familydata.employerMasterFamilyDetailv2[0].OtherNo}
                                  onChange={(e) => {
                                    setfamilydata((prevData) => ({
                                      ...prevData,
                                      employerMasterFamilyDetailv2: [
                                        {
                                          ...prevData.employerMasterFamilyDetailv2[0],
                                          OtherNo: e.target.value
                                        }
                                      ]
                                    }));
                                  }}
                                /> </div>
                              </div>
              </div>
              <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Job Scopes</h2></div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Housing Type</label>
                        </div>
                        <div className="col-lg-7">
                       <select className='form-control' id="HousingType" 
                        name='HousingType'
                        value={familydata.employerMasterJobScopv2?.[0]?.HousingType}
                        onChange={(e) => {
                          setfamilydata((prevData) => ({
                            ...prevData,
                            employerMasterJobScopv2: [
                              {
                                ...prevData.employerMasterJobScopv2?.[0],
                                HousingType: e.target.value
                              }
                            ]
                          }));
                        }}
                               >
                                 <option value="">Select</option>
                                  {housingType?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                 
                                </select>
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
  <div className="col-lg-5">
    <label>Expected Job Scope</label>
  </div>
  <div className="col-lg-7">
    <select
      className="form-control"
      id="ExpectedJobScope"
      name="ExpectedJobScope"
      value={familydata.employerMasterJobScopv2?.[0]?.ExpectedJobScope || ""}
      onChange={(e) => {
        setfamilydata((prevData) => ({
          ...prevData,
          employerMasterJobScopv2: [
            {
              ...prevData.employerMasterJobScopv2?.[0],
              ExpectedJobScope: e.target.value,
            },
          ],
        }));
      }}
    >
      <option value="">Select</option>
      {jobScope && jobScope.length > 0 ? (
        jobScope.map((item, index) => (
          <option key={index} value={item.Code}>
            {item.Name}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  </div>
</div>



                     
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Number of Bedrooms</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="text" className="form-control" placeholder="Number of Bedroom in the house" 
                           value={familydata.employerMasterJobScopv2?.[0]?.NoOfBedroom}
                           onChange={(e) => {
                             setfamilydata((prevData) => ({
                               ...prevData,
                               employerMasterJobScopv2: [
                              {
                                ...prevData.employerMasterJobScopv2?.[0],
                                NoOfBedroom: e.target.value
                                 }
                                ]
                             }));
                           }}
                           /> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Helper Sleeping Area</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="text" className="form-control" placeholder="Helper Sleeping Area" 
                            value={familydata.employerMasterJobScopv2?.[0]?.HelperSleepingArea}
                            onChange={(e) => {
                              setfamilydata((prevData) => ({
                                ...prevData,
                                employerMasterJobScopv2: [
                              {
                                ...prevData.employerMasterJobScopv2?.[0],
                                HelperSleepingArea: e.target.value
                              }]
                              }));
                            }}
                           /> 
                        </div>
                      </div>
                   
                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Other Family Member staying in the house</label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Other Family Member staying in the house"
                                value={familydata.employerMasterJobScopv2?.[0]?.OtherFamilyMemberStayinghouse}
                                onChange={(e) => {
                                  setfamilydata((prevData) => ({
                                    ...prevData,
                                    employerMasterJobScopv2: [
                              {
                                ...prevData.employerMasterJobScopv2?.[0],
                                OtherFamilyMemberStayinghouse: e.target.value
                              }]
                                  }));
                                }}
                                ></textarea>
                              </div>
                            </div>     
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Remarks</label>
                              </div>
                              <div className="col-lg-7">
                                <textarea className="form-control" placeholder="Remarks"
                                 value={familydata.employerMasterJobScopv2?.[0]?.Remarks}
                                 onChange={(e) => {
                                   setfamilydata((prevData) => ({
                                     ...prevData,
                                     employerMasterJobScopv2: [
                              {
                                ...prevData.employerMasterJobScopv2?.[0],
                                Remarks: e.target.value
                              }]
                                   }));
                                 }}
                                ></textarea>
                              </div>
                            </div>  
                        
              </div>
              
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button">SUBMIT</button></div>
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

export default EmployerFamily;