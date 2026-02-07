import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getGenderData, getTypeofResidence, getOccupation, getMonthlyIncome, getRefferal,getMaritalStatusData, getNationalityData, getRaceCodeData, getRegionData, getResidentialStatusData, getYearOfAssesmentYearData, getBranches } from '../../apiCalls';
import { DatePicker } from '@mui/x-date-pickers';

import { format, parse } from "date-fns";




const EmployerProfile = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [employerName, setEmployerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [branches, setBranches] = useState([]);
  const [profiledata, setprofiledata] = useState({
    "OrgId": 1,
    "EmployerCode": "",
    "BranchCode": "",
    "EmployerName": "",
    "Nationality": "",
    "NRIC_FIN": "",
    "PassportNo": "",
    "DateOfBirth": "",
    "ICIssueDate": "",
    "DateOfBirthString":"",
    "ICIssueDateString":"",
    "PassportExpiryDateString":"",
    "PassportExpiryDate": "",
    "Gender": "",
    "RaceCode":0,
    "ResidentialStatusCode": "",
    "BlockList": false,
    "MartilaStatus": "",
    "ReligionCode": 0,
    "Occupation": "",
    "Employed": true,
    "ReferralMethod": "",
    "CombinedIncome": true,
    "MonthlyIncome": 0,
    "YearofAssesment": 0,
    "NoofBedroom": 0,
    "NoofToilet": 0,
    "ClearWindowExterior": true,
    "CompanyName": "",
    "MarriageRegisteredinSG": true,
    "AnnualIncome": 0,
    "TypeOfResidence": ""
  });
  const [isloggedin, setisloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [residentialStatus, setResidentialStatus] = useState();
  const [nationality, setNationality] = useState();
  const [gender, setGender] = useState();
  const [occupation, setOccupation] = useState();
  const [residence, setResidence] = useState();
  const [referal, setReferal] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState()
  const [raceCode, setRaceCode] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [region, setRegion] = useState();
  const [yearOfAssesment, setYearOfAssesment] = useState();

  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return ""; // Return empty string if date is empty
  
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Return empty if date is invalid
  
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  
  // const navigate = useNavigate();
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
    if (storedData.length > 0) {
      setprofiledata({
        ...profiledata,
        "OrgId": storedData[0].OrgId,
        "EmployerCode": storedData[0].EmployerCode,
        "EmployerName": storedData[0].EmployerName,
        "Nationality": storedData[0].Nationality ? storedData[0].Nationality : '',
        "NRIC_FIN": storedData[0].NRIC_FIN,
        "PassportNo": storedData[0].PassportNo,
        "DateOfBirth": convertToISODate(storedData[0].DateOfBirth),
        "ICIssueDate": convertToISODate(storedData[0].ICIssueDate),
        "DateOfBirthString":convertToDate(storedData[0].DateOfBirth),
    "ICIssueDateString":convertToDate(storedData[0].ICIssueDate),
    "PassportExpiryDateString":convertToDate(storedData[0].PassportExpiryDate),
        "PassportExpiryDate": convertToISODate(storedData[0].PassportExpiryDate),
        "Gender": storedData[0].Gender ? storedData[0].Gender : '',
        "RaceCode":storedData[0].RaceCode ? storedData[0].RaceCode : '',
        "ResidentialStatusCode": storedData[0].ResidentialStatusCode ? storedData[0].ResidentialStatusCode : '',
        "BlockList": storedData[0].BlockList,
        "BranchCode": storedData[0].BranchCode,
        "MartilaStatus": storedData[0].MartilaStatus ? storedData[0].MartilaStatus : '',
        "ReligionCode":storedData[0].ReligionCode ? storedData[0].ReligionCode : '',
        "Occupation": storedData[0].Occupation ? storedData[0].Occupation : '',
        "Employed":storedData[0].Employed,
        "ReferralMethod": storedData[0].ReferralMethod ? storedData[0].ReferralMethod : '',
        "CombinedIncome": storedData[0].CombinedIncome,
        "MonthlyIncome": storedData[0].MonthlyIncome ? storedData[0].MonthlyIncome : '',
        "YearofAssesment": storedData[0].YearofAssesment ? storedData[0].YearofAssesment : '',
        "NoofBedroom":storedData[0].NoofBedroom,
        "NoofToilet": storedData[0].NoofToilet,
        "ClearWindowExterior": storedData[0].ClearWindowExterior,
        "CompanyName": storedData[0].CompanyName,
        "MarriageRegisteredinSG":storedData[0].MarriageRegisteredinSG,
        "AnnualIncome": storedData[0].AnnualIncome,
        "TypeOfResidence": storedData[0].TypeOfResidence ? storedData[0].TypeOfResidence : ''
      });
      setEmployerName(storedData[0].EmployerName);
    }
  }, [storedData]);

  const convertToDate = (dateString) => {
    const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Months are zero-based
  const year = dateObject.getFullYear();

  const formattedDateString = `${day}/${month}/${year}`;
  
    return formattedDateString;
  };

  const parseDate = (dateStr) => {
    return dateStr ? parse(dateStr, "yyyy-MM-dd", new Date()) : null;
  };

  const convertToISODate = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
        console.error("Invalid date string:", dateString);
        return null; // Return null instead of causing an error
    }

    const parts = dateString.split('/');
    if (parts.length !== 3) {
        console.error("Incorrect date format:", dateString);
        return null;
    }

    const [day, month, year] = parts;
    const dateObject = new Date(`${year}-${month}-${day}T00:00:00Z`);

    return isNaN(dateObject.getTime()) ? null : dateObject.toISOString();
};


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
  getTypeofResidence()
    .then(data => {
      if (data.Message === "Sucess") {
        setResidence(data.Data);
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
  getRefferal()
    .then(data => {
      if (data.Message === "Sucess") {
        setReferal(data.Data);
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
      getRaceCodeData()
        .then(data => {
          if (data.Message === "Sucess") {
            setRaceCode(data.Data);
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

  const handleInputChange = (event) => {
   console.log(event.target);
   // this.setState({ value: event.target.value });
    const { name, value } = event.target;

    console.log(value,name);
    setprofiledata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
  
    setprofiledata((prevData) => ({
      ...prevData,
      [name]: value === "true" ? true : false, // Convert the string value to boolean
    }));
  };


  const handleLinkClick = (link) => {
    window.location.href = link
    setSelectedLink(link);
  };

  const saveProfileDataHandler = async (event) => {
    event.preventDefault();
    const UpdatedProfiledata = {
      EmployerMasterV2:{
      "OrgId": profiledata.OrgId,
      "EmployerCode": profiledata.EmployerCode,
      "EmployerName": profiledata.EmployerName,
      "Nationality": profiledata.Nationality,
      "NRIC_FIN": profiledata.NRIC_FIN,
      "PassportNo": profiledata.PassportNo,
      "DateOfBirth": convertToDate(profiledata.DateOfBirth),
      "ICIssueDate": convertToDate(profiledata.ICIssueDate),
      "PassportExpiryDate": convertToDate(profiledata.PassportExpiryDate),
      "Gender": profiledata.Gender,
      "RaceCode": profiledata.RaceCode,
      "ResidentialStatusCode": profiledata.ResidentialStatusCode,
      "BlockList": profiledata.BlockList === true ? true : false,
      "BranchCode": profiledata.BranchCode,
      "MartilaStatus": profiledata.MartilaStatus,
      "ReligionCode": profiledata.ReligionCode,
      "Occupation": profiledata.Occupation,
      "Employed": profiledata.Employed,
      "ReferralMethod": profiledata.ReferralMethod,
      "CombinedIncome": profiledata.CombinedIncome,
      "MonthlyIncome": profiledata.MonthlyIncome,
      "YearofAssesment": profiledata.YearofAssesment,
      "NoofBedroom": profiledata.NoofBedroom,
      "NoofToilet": profiledata.NoofToilet,
      "ClearWindowExterior": profiledata.ClearWindowExterior,
      "CompanyName": profiledata.CompanyName,
      "MarriageRegisteredinSG": profiledata.MarriageRegisteredinSG,
      "AnnualIncome": profiledata.AnnualIncome,
      "TypeOfResidence": profiledata.TypeOfResidence
      }
    };
    console.log("UpdatedProfiledata",UpdatedProfiledata)

    localStorage.setItem('employerProfile', JSON.stringify(UpdatedProfiledata));
   
  }


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
      setprofiledata(data.Data[0].EmployerMasterV2);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  console.log("profiledata",profiledata)
  
  useEffect(() => {
    fetchdata();
  }, []);
  

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
     
      <section className="fullcontainer dashboard eppd-page" data-aos="fade-up">
        <div className="inner-container-md">
        <div className="container">
          <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
          <div className="row">
            <div className="col-lg-auto mb-991-30"> 
              <div className="sidebar">
              <div className="sidebar-title"><h5>Hi {profiledata.EmployerName},</h5></div>
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
            <form onSubmit={saveProfileDataHandler}>
              <div className="dashboard-right-wrap eppd-wrap">
                    <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Personal Profile Details</h2></div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Employer Name</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Employer Name"
                          value={profiledata.EmployerName || ''}
                          onChange={(e) => {
                            setprofiledata({ ...profiledata, EmployerName: e.target.value });
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Nationality</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="Nationality"
                                name="Nationality"
                                value={profiledata.Nationality || ''}
                                onChange={handleInputChange}
                                >
                                  {nationality?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                <option value="">Select</option>
                                </select>

                               
                              </div>
                            </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>NRIC / FIN</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="NRIC / FIN"
                          value={profiledata.NRIC_FIN || ''}
                          onChange={(e) => {
                            setprofiledata({ ...profiledata, NRIC_FIN: e.target.value });
                          }}
                          /> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Passport</label>
                        </div>
                        <div className="col-lg-7">
                          <input type="text" className="form-control" placeholder="Passport"
                          value={profiledata.PassportNo || ''}
                          onChange={(e) => {
                            setprofiledata({ ...profiledata, PassportNo: e.target.value });
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
  value={convertToDateInputFormat(profiledata.DateOfBirth)}
  onChange={(e) => {
    setprofiledata({
      ...profiledata,
      DateOfBirth: e.target.value,
    });
  }}

/>

                                   
                          </div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>IC Issue Date</label>
                        </div>
                        <div className="col-lg-7">
                          <div className="inrow date-wrap datepicker-wrap">
                          <input
  type="date"
  className="form-control"
  id="ICIssueDate"
  value={convertToDateInputFormat(profiledata.ICIssueDate)} 
  onChange={(e) => {
    setprofiledata({
      ...profiledata,
      ICIssueDate: e.target.value, 
    });
  }}
  placeholder="DD/MM/YYYY" 
/>

                                  
                          </div> 
                        </div>
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
  id="PassportExpiryDate"
  value={convertToDateInputFormat(profiledata.PassportExpiryDate)}
  onChange={(e) => {
    setprofiledata({
      ...profiledata,
      PassportExpiryDate: e.target.value,
    });
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
                                id="Gender"
                                name="Gender"
                                value={profiledata.Gender || ''}
                                onChange={handleInputChange}
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
                                <label>Race</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="RaceCode"
                                name="RaceCode"
                                value={profiledata.RaceCode || ''}
                                onChange={handleInputChange}
                                >
                                  <option value="">Select</option>
                                  {raceCode?.map((item, index) => (
                                    <option key={index} value={item?.RaceCode}>
                                      {item?.RaceCode}
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
                                value={profiledata.ResidentialStatusCode || ''}
                                onChange={handleInputChange}
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
                                <label>Marital Status</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="MartilaStatus"
                                name="MartilaStatus"
                                value={profiledata.MartilaStatus || ''}
                                onChange={handleInputChange}
                                >
                                  <option value="">Select</option>
                                  {maritalStatus?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                
                                </select>
                              </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Religion</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="ReligionCode"
                                name="ReligionCode"
                                value={profiledata.ReligionCode || ''}
                                onChange={handleInputChange}
                                >
                                  <option value="">Select</option>
                                  {region?.map((item, index) => (
                                    <option key={index} value={item?.ReligionCode}>
                                      {item?.ReligionDesc}
                                    </option>
                                  ))}
                                
                                </select>
                              </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Branch Code</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="BranchCode"
                                name="BranchCode"
                                value={profiledata.BranchCode || ''}
                                onChange={handleInputChange}
                                >
                                  <option value="">Select</option>
                                  {branches?.map((item, index) => (
                                    <option key={index} value={item?.BranchCode}>
                                      {item?.BranchName}
                                    </option>
                                  ))}
                                
                                </select>
                              </div>
                            </div>
                            <div className="row form-group align-items-center">
  <div className="col-lg-5">
    <label>Block List</label>
  </div>
  <div className="col-lg-7">
  <label className="switch">
    <input
      type="checkbox"
      id="BlockList"
      name="BlockList"
      checked={!!profiledata.BlockList}
      onChange={(e) => {
        setprofiledata({ ...profiledata, BlockList: e.target.checked });
      }}
    />
    <span className="slider"></span>
  </label>
</div>

</div>

                            
              </div>
              <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Other Details</h2></div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Occupation</label>
                        </div>
                        <div className="col-lg-7">
                         <select className='form-control'
                          id="Occupation"
                          name="Occupation"
                          value={profiledata.Occupation || ''}
                          onChange={handleInputChange}
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
                                      checked={profiledata.Employed === true}
                                      onChange={handleRadioChange}
                                      /> <span>Yes</span></label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                    <input
                                      type="radio"
                                      name="Employed"
                                      value="false"
                                      checked={profiledata.Employed === false}
                                      onChange={handleRadioChange}
                                      /> <span>No</span></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Refferal Method</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="ReferralMethod"
                                name="ReferralMethod"
                                value={profiledata.ReferralMethod || ''}
                                onChange={handleInputChange}
                                >
                                  
                                  <option value="">Select</option>
                                  {referal?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                </select>

                              </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Combined Income ($)</label>
                              </div>
                              <div className="col-lg-7">
                                <div className="radio-inline">
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="CombinedIncome"
                                      value="true"
                                      checked={profiledata.CombinedIncome === true}
                                      onChange={handleRadioChange}
                                      /> <span>Yes</span></label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="CombinedIncome"
                                      value="false"
                                      checked={profiledata.CombinedIncome === false}
                                      onChange={handleRadioChange}
                                      /> <span>No</span></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Monthly Income</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="MonthlyIncome"
                                name="MonthlyIncome"
                                value={profiledata.MonthlyIncome || ''}
                                onChange={handleInputChange}
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
                                <label>Year of Assesment</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="YearofAssesment"
                                name="YearofAssesment"
                                value={profiledata.YearofAssesment || ''}
                                onChange={handleInputChange}
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
                          <label>No of Bedroom</label>
                        </div>
                        <div className="col-lg-4">
                          <input type="text" className="form-control" placeholder="No of Bedroom"
                          value={profiledata.NoofBedroom || ''}
                          onChange={(e) => {
                            setprofiledata({ ...profiledata, NoofBedroom: e.target.value });
                          }}
                          /> </div>
                      </div>
                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>No. of Toilet</label>
                        </div>
                        <div className="col-lg-4">
                          <input type="text" className="form-control" placeholder="No. of Toilet"
                          value={profiledata.NoofToilet || ''}
                          onChange={(e) => {
                            setprofiledata({ ...profiledata, NoofToilet: e.target.value });
                          }}
                          /> </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Clear Window Exterior</label>
                        </div>
                        <div className="col-lg-7">
                                <div className="radio-inline">
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="ClearWindowExterior"
                                      value="true"
                                      checked={profiledata.ClearWindowExterior === true}
                                      onChange={handleRadioChange}
                                      /> <span>Yes</span></label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="ClearWindowExterior"
                                      value="false"
                                      checked={profiledata.ClearWindowExterior === false}
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
                           value={profiledata.CompanyName || ''}
                           onChange={(e) => {
                             setprofiledata({ ...profiledata, CompanyName: e.target.value });
                           }}
                           /> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Marriage Registered in SG</label>
                        </div>
                        <div className="col-lg-7">
                                <div className="radio-inline">
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="MarriageRegisteredinSG"
                                      value="true"
                                      checked={profiledata.MarriageRegisteredinSG === true}
                                      onChange={handleRadioChange}
                                      /> <span>Yes</span></label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                      <input 
                                      type="radio" 
                                      name="MarriageRegisteredinSG"
                                      value="false"
                                      checked={profiledata.MarriageRegisteredinSG === false}
                                      onChange={handleRadioChange}
                                      /> <span>No</span></label>
                                  </div>
                                </div>
                              </div>
                      </div>

                     <div className="row form-group align-items-center">
                        <div className="col-lg-5">
                          <label>Annual Income ($)</label>
                        </div>
                        <div className="col-lg-7">
                           <input type="text" className="form-control" placeholder="Annual Income ($)"
                           value={profiledata.AnnualIncome || ''}
                           onChange={(e) => {
                             setprofiledata({ ...profiledata, AnnualIncome: e.target.value });
                           }}
                            /> 
                        </div>
                      </div>
                      <div className="row form-group align-items-center">
                              <div className="col-lg-5">
                                <label>Type of Residence</label>
                              </div>
                              <div className="col-lg-7">
                               <select className='form-control'
                                id="TypeOfResidence"
                                name="TypeOfResidence"
                                value={profiledata.TypeOfResidence || ''}
                                onChange={handleInputChange}
                                >
                                  <option value="">Select</option>
                                  {residence?.map((item, index) => (
                                    <option key={index} value={item?.Code}>
                                      {item?.Name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>      
                        
              </div>
              {/* <div className="main-inner-box">
                      <div className="pageTitle title-fix sm">
                        <h2>Other Details</h2></div>
                      <div className="od-upload-section size-14">
                        <p>Upload NRIC/Passport/Tentancy Agreement (for foreigner)</p>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="upload-area">
                              <div className="file-upload">
                                <div id="start">
                                  <img src="images/upload-icon.png" alt="" />
                                  <div className="upload-inner-info">Click here to upload Photo/Video</div>
                                </div>
                              </div>
                              <div className="upload-inner-info">File Type: PDF/JPEG/DOC</div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="file-status-row">
                              <a href="#" className="file-close"><i className="far fa-times-circle"></i></a>
                              <div className="upload-file-name">Passport.PDF</div>
                              <div className="progress">
  <div className="progress-bar" role="progressbar" style={{'width': '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
                              <div className="upload-file-status">uploading...</div>
                            </div>
                            <div className="file-status-row">
                              <a href="#" className="file-close"><i className="fas fa-times-circle"></i></a>
                              <div className="upload-file-name">Passport.PDF</div>
                              <div className="progress">
  <div className="progress-bar" role="progressbar" style={{'width': '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
                              <div className="upload-file-status">upload complete</div>
                            </div>
                            <div className="file-status-row">
                              <a href="#" className="file-close"><i className="far fa-times-circle"></i></a>
                              <div className="upload-file-name">ID.docx</div>
                              <div className="progress">
  <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
                              <div className="upload-file-status">uploading</div>
                            </div>
                            <div className="file-status-row">
                              <a href="#" className="file-close"><i className="fas fa-times-circle"></i></a>
                              <div className="upload-file-name">ID.docx</div>
                              <div className="progress">
  <div className="progress-bar" role="progressbar" style={{'width': '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
                              <div className="upload-file-status">uploaded</div>
                            </div>
                          </div>
                        </div>
                      </div>
              </div> */}
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button" onClick={() => { handleLinkClick('/employercontact');}}>SAVE & CONTINUE</button></div>
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

export default EmployerProfile;