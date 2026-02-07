import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getComplexionData, getMaritalStatusData, getNationalityData, getRegionData, getSpecializationData } from '../../apiCalls';
import mapToPayload from './commonpayload';



const HelperProfileDetail = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [helperName, setHelperName] = useState('');
   const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPersonImage, setSelectedPersonImage] = useState(null);
const [selectedFullImage, setSelectedFullImage] = useState(null);
const [selectedVedio, setSelectedVedio] = useState(null);
  const HelperName = localStorage.getItem("HelperName"); 
  const [passportFile, setPassportFile] = useState(null);
  const [otherDetailsFile, setOtherDetailsFile] = useState(null);
  const [profiledata, setprofiledata] = useState({
      "OrgId": 1,
      "CVCode": "",
      "FullName": "",
      "NricFin": "",
      "Nationality": "",
      "PassportNo": "",
      "PassportIssuePlace": "",
      "FullImagePath":"",
      "PersonImagePath":"",
      "FullImg_Base64String":"",
      "FullImageFileName":"",
      "VedioImagePath":"",
      "PassportIssueDate": "",
      "PassportIssueDateString":"",
      "PassportExpiryDate": "",
      "PassportExpiryDateString":"",
      "PassportFileName": "",
  "PassportFileValueBase64": "",
  "PassportURL": "",
  "OtherDetailsFileValueBase64": "",
  "OtherDetailsFileName": "",
      "WPNo": "",
      "WPExpiry": "",
      "WPExpiryString":"",
      "Religion": "",
      "DateOfBirth": "",
      "DateOfBirthString":"",
      "MaritalStatus": "",
      "BirthPlace": "",
      "Specialisation": "",
      "RepatraiteAirport": "",
      "Status": "",
      "OtherInfo": "",
      "DirectHire": true,
      "TrainingCenter": "",
      "FileName": "",
      "IsActive": true,
      "ChangedBy": "",
      "Complexion": "",
      "Height": "",
      "Feet": "",
      "Weight": "",
      "Pound": 0
  });
  const [nationality, setNationality] = useState();
  const [region, setRegion] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [specialization, setSpecialization] = useState();
  const [complexion, setComplexion] = useState();

 
  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return ""; // Return empty string if date is empty
  
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Return empty if date is invalid
  
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  reader.onload = () => {
        const imageBase64String = reader.result;
        setSelectedImage(imageBase64String);
        // Compress the image before storing
       
          setprofiledata((prevData) => ({
            ...prevData,
            FullImageFileName: file.name, // Store the file name
            FullImg_Base64String: imageBase64String, // Store the compressed Base64 string
            FullImagePath: URL.createObjectURL(file), // Use URL.createObjectURL for preview
          }));
        };
        reader.readAsDataURL(file); // Convert file to Base64
      };
      
    };

  
  // Image compression function
  const compressImage = (base64, quality = 0.5, callback) => {
    const img = new Image();
    img.src = base64;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Resize the image
      canvas.width = img.width / 2; 
      canvas.height = img.height / 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      // Convert back to Base64 with compression
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      const pureBase64 = compressedBase64.split(",")[1];
      callback(pureBase64);
    };
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // **Ensure Valid File Type**
    const validTypes = ["image/jpeg", "image/png", "application/pdf", "application/msword"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF, JPEG, or DOC.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      let fileBase64 = reader.result;
  
      if (file.type.startsWith("image/")) {
        // Compress image files before storing
        compressImage(fileBase64, 0.5, (compressedBase64) => {
          storeFile(type, file, compressedBase64);
        });
      } else {
        // Directly store non-image files as Base64
        storeFile(type, file, fileBase64);
      }
    };
  
    reader.readAsDataURL(file); // Convert file to Base64
  };
  
  // Helper function to store the file
  const storeFile = (type, file, fileBase64) => {
    const fileURL = URL.createObjectURL(file); // Generate URL for preview
  
    if (type === "passport") {
      setPassportFile(file);
      setprofiledata((prev) => ({
        ...prev,
        PassportFileName: file.name,
        PassportFileValueBase64: fileBase64, // Store Base64
        PassportFileURL: fileURL, // Store URL for preview
      }));
    } else if (type === "other") {
      setOtherDetailsFile(file);
      setprofiledata((prev) => ({
        ...prev,
        OtherDetailsFileName: file.name,
        OtherDetailsFileValueBase64: fileBase64, // Store Base64
        OtherDetailsFileURL: fileURL, // Store URL for preview
      }));
    }
  
    toast.success("File uploaded successfully!");
  };
  
  
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
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let token = localStorage.getItem("helpertoken");
    // console.log(token);
    if (token) {
      // console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      // console.log(storedData);
    }
    // console.log(ishelperloggedin);
    // console.log(storedData);
  }, []);

  useEffect(() => {
    if (storedData?.PersonImagePath) {
        setSelectedPersonImage(storedData.PersonImagePath);
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

  
  // console.log("StoredDta",storedData)
  useEffect(() => {
    if (storedData.length > 0) {
      setprofiledata({
        ...profiledata,
        "HelperBioDetails": {
          "OrgId": 1,
          "CVCode": storedData.CVCode,
          "FullName": storedData.FullName,
          "NricFin": storedData.NricFin,
          "Nationality": storedData.Nationality,
          "PassportNo": storedData.PassportNo,
          "PassportIssuePlace": storedData.PassportIssuePlace,
          "PassportIssueDate":convertToISODate(storedData.PassportIssueDate),
          "PassportIssueDateString":convertToDate(storedData.PassportIssueDateString),
          "PassportExpiryDate":convertToISODate(storedData.PassportExpiryDate),
          "PassportExpiryDateString":convertToDate(storedData.PassportExpiryDateString),
          "WPNo": storedData.WPNo,
          "WPExpiry": convertToISODate(storedData.WPExpiry),
          "WPExpiryString":convertToDate(storedData.WPExpiryString),
          "Religion": storedData.Religion,
          "DateOfBirth": convertToISODate(storedData.DateOfBirth),
          "DateOfBirthString":convertToDate(storedData.DateOfBirthString),
          "MaritalStatus": storedData.MaritalStatus,
          "BirthPlace": storedData.BirthPlace,
          "Specialisation": storedData.Specialisation,
          "RepatraiteAirport": storedData.RepatraiteAirport,
          "Status": storedData.Status,
          "OtherInfo": storedData.OtherInfo,
          "DirectHire": storedData.DirectHire,
          "TrainingCenter": storedData.TrainingCenter,
          "FileName": storedData.FileName,
          "FullImagePath":storedData.FullImagePath?`data:image/jpeg;base64,${storedData.FullImagePath}`:"",
          "PassportURL":storedData.PassportURL,
          "PassportFileValueBase64":storedData.PassportFileValueBase64,
          "OtherDetailsFileValueBase64":storedData.OtherDetailsFileValueBase64,
          "PersonImagePath":storedData.PersonImagePath,
          "VedioImagePath":storedData.VedioImagePath,
          "IsActive": storedData.IsActive,
          "ChangedBy": storedData.ChangedBy
        },
        "Helper_PhysicalAttribute": {
          "Complexion": storedData.Complexion,
          "Height_CM": storedData.Height_CM,
          "Feet": storedData.Feet,
          "Weight_KG": storedData.Weight_KG,
          "Pound": storedData.Pound
        }
      });
      setHelperName(storedData.FullName);
  
    }

  }, [storedData]);

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
      //console.log(data.Jwt_Token);
      setjwtToken(data.Jwt_Token);
    } catch (error) {}
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;


    setprofiledata((prevData) => ({
     ...prevData,
     HelperBioDetails: 
       {
         ...prevData.HelperBioDetails,
         [name]: value === "true" ? true : false
       }
     
   }));
 
  };

  const HelperCode = localStorage.getItem("HelperCode"); // Retrieve EmployerCode from localStorage
  const Code = HelperCode;
  
  const fetchdata = async () => {
    try {
      // Make sure EmployerCode exists before making the API call
      if (!Code) {
        console.log('Code is missing!');
        return;
      }
  
      const response = await fetch(`https://jpbapi.appxes-erp.in/Helper/GetByCode?OrganizationId=${jpb.OrgId}&CVCode=${Code}`, {
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
      
      setprofiledata(data.Data[0]);
      // console.log("data",data.Data[0])
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  

  const saveprofiledataHandler = async (event) => {
    event.preventDefault();
    // if (!passportFile) {
    //   toast.error("Please upload a Passport file.");
    //   return;
    // }
    // localStorage.setItem('helperProfile', JSON.stringify(UpdatedHelperProfiledata)); 
    const payload = mapToPayload(profiledata);
console.log("payload",payload)
    const url = `${jpb.baseUrl}/HelperRegistration/Registration`;
            
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  
    try {
      // Make the API call to submit the data
      const response = await fetch(url, options);
  
      // Check if the response was successful
      const responseData = await response.json(); // Parse the JSON response
      console.log("response", responseData);
  
      if (responseData.Code === 200 && responseData.Status === true) {
        // If the response is successful, show the toast message
        toast.success('Helper Bio Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  
        // Navigate to the '/helperaccount' page
        handleLinkClick('/helpercontact');  // Make sure handleLinkClick is defined and working
      } else {
        console.error('Form submission failed:', responseData);
        // setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Helper Details Update failed:', err);
      // setError('Helper Details Update failed. Please try again.');
    } finally {
      // setLoading(false);  // This will stop the loading indicator (if any)
    }
  };

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
     
      <section className="fullcontainer dashboard helper-bio-profile hbp-page" data-aos="fade-up">
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
              <form onSubmit={saveprofiledataHandler}>
              <div className="dashboard-right-wrap hbp-wrap">
              <p>After editing and saving the details please submit the form in Skill Details to Successfully save the Data</p>
                <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-1" role="button" aria-expanded="false" aria-controls="edf-1">1. Helper Bio Details</a> </div>
                      <div className="collapse" id="edf-1">
                        <div className="card card-body">
                         <div className="form-data-wrap">
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                              <label>Profile Photo</label>
                              </div>
                              <div className="col-lg-6">
                                <div className="upload-area">
                                  <div className="file-upload">
                                    <label htmlFor="uploadInput">
                                            <div id="start">
                                              {selectedPersonImage ? (
                                                <img src={selectedPersonImage} style={{'width':'100px','height':'100px'}} alt="Selected" />
                                              ) : (
                                                <img src="images/upload-icon-highlight.png" alt="" />
                                              )}
                                              <div className="upload-inner-info">Click here to upload Photo</div>
                                            </div>
                                          </label>
                                          <input
                                            type="file"
                                            id="uploadInput"
                                            style={{ display: 'none' }}
                                            accept="image/*, video/*"
                                            onChange={(e) => {
                                              const file = e.target.files[0];
                                              if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                  setSelectedPersonImage(reader.result);
                                          
                                                  setprofiledata((prevData) => ({
                                                    ...prevData,
                                                    FileName: file.name,
                                                   PersonImagePath:reader.result,
                                                  }));
                                                };
                                                reader.readAsDataURL(file);
                                              }
                                            }}
                                          />



                                  </div>
                                </div>
                              </div>
                      
                            </div>
                            <div className="form-container">
      <div className="row form-group align-items-center">
        <div className="col-lg-3">
          <label>Profile FullPhoto</label>
        </div>
        <div className="col-lg-6">
          <div className="upload-area">
            <div className="file-upload">
              <label htmlFor="uploadInputFull">
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
                id="uploadInputFull"
                style={{ display: 'none' }}
                accept="image/*, video/*"
                onChange={handleImageUpload} // Upload handler
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optionally display uploaded image preview */}
      {profiledata.FullImagePath && (
        <div className="image-preview">
          <img
            src={profiledata.FullImagePath}
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
                                <input type="text" className="form-control" placeholder="Name"
                                value={profiledata.FullName}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,FullName:e.target.value}));}}
                                /> </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>FIN No.</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder="Your NRIC / FIN"
                                value={profiledata.NricFin}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,NricFin:e.target.value}));}}
                                /> </div>
                            </div>
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Nationality</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.Nationality}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Nationality:e.target.value}));}}
                                >
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
                                <input type="text" className="form-control" placeholder="Passport No."
                                value={profiledata.PassportNo}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,PassportNo:e.target.value}));}}
                                /> </div>
                            </div>
                            
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Passport Issue Place</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder="Passport Issue Place"
                                value={profiledata.PassportIssuePlace}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,PassportIssuePlace:e.target.value}));}}
                                /> </div>
                            </div>

                            <div className="row form-group align-items-center">
                        <div className="col-lg-3">
                          <label>Passport Expiry Date</label>
                        </div>
                        <div className="col-lg-6">
                          <div className="inrow date-wrap datepicker-wrap">
                                  <input type="date" className="form-control datepicker" id="PassportExpiryDate" 
                                    value={convertToDateInputFormat(profiledata.PassportExpiryDate)}
                                  onChange={(e)=>{setprofiledata({...profiledata,PassportExpiryDate:e.target.value})}}
                                  />
                                   {/* <i className="fas fa-calendar-alt"></i>   */}
                          </div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-3">
                          <label>Passport Issue Date</label>
                        </div>
                        <div className="col-lg-6">
                          <div className="inrow date-wrap datepicker-wrap">
                                  <input type="text" className="form-control datepicker" placeholder="DD/MM/YYYY" 
                                  value={profiledata.PassportIssueDateString}
                                  onChange={(e)=>{setprofiledata((prevData)=>({...prevData,PassportIssueDateString:e.target.value}));}}
                                  /> <i className="fas fa-calendar-alt"></i> 
                          </div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-3">
                          <label>Work Permit No.</label>
                        </div>
                        <div className="col-lg-6">
                          <input type="text" className="form-control" placeholder="Work Permit No."
                          value={profiledata.WPNo}
                          onChange={(e)=>{setprofiledata((prevData)=>({...prevData,WPNo:e.target.value}));}}
                          /> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <div className="col-lg-3">
                          <label>Work Permit Expiry</label>
                        </div>
                        <div className="col-lg-6">
                          <div className="inrow date-wrap datepicker-wrap">
                                  <input type="text" className="form-control datepicker" placeholder="DD/MM/YYYY" 
                                  value={profiledata.WPExpiryString}
                                  onChange={(e)=>{setprofiledata((prevData)=>({...prevData,WPExpiryString:e.target.value}));}}
                                  /> <i className="fas fa-calendar-alt"></i> 
                          </div> 
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Religion</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.Religion}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Religion:e.target.value}));}}
                                >
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
                                  <input type="date" className="form-control datepicker" placeholder="DD/MM/YYYY" id="DateOfBirth"
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
                              <div className="col-lg-3">
                                <label>Martial Status</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.MaritalStatus || ''}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,MaritalStatus:e.target.value}));}}
                                >
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
                                <input type="text" className="form-control" placeholder="Birth Place"
                                value={profiledata.BirthPlace}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData, BirthPlace:e.target.value}));}}
                                /> </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Specialization/Preference</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.Specialisation || ''}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Specialisation:e.target.value}));}}
                                >
                                  
                                  <option value="">select</option>
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
                                <input type="text" className="form-control" placeholder=""
                                value={profiledata.RepatraiteAirport}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,RepatraiteAirport:e.target.value}));}}
                                /> </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Status</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.Status || ''}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Status:e.target.value}));}}
                                >
                                  <option value="Incoming Only">Incoming Only</option>
                                  <option value="option-2">option-2</option>
                                </select>
                              </div>
                            </div>

                             <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Other Info</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder=""
                                value={profiledata.OtherInfo}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,OtherInfo:e.target.value}));}}
                                /> 
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
                                            <input type="radio"  name="DirectHire"
                                            value="true"
                                            checked={profiledata.DirectHire === true}
                                            onChange={handleRadioChange}
                                            /> <span>Yes</span></label>
                                        </div>
                                        <div className="radio">
                                          <label>
                                            <input type="radio" name="DirectHire" 
                                            value="false"
                                            checked={profiledata.DirectHire === false}
                                            onChange={handleRadioChange}
                                            /> <span>No</span></label>
                                        </div>
                                      </div>
                                    </div>
                            </div>

                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Training Center</label>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" placeholder=""
                                value={profiledata.TrainingCenter}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,TrainingCenter:e.target.value}));}}
                                /> </div>
                            </div>



                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-collapse-box">
                      <div className="card-header"> <a className="collapsed" data-toggle="collapse" href="#edf-2" role="button" aria-expanded="false" aria-controls="edf-2">2. Physical Attributes</a> </div>
                      <div className="collapse" id="edf-2">
                        <div className="card card-body">
                         <div className="form-data-wrap">
                            <div className="row form-group align-items-center">
                              <div className="col-lg-3">
                                <label>Complexion</label>
                              </div>
                              <div className="col-lg-6">
                                <select className='form-control'
                                value={profiledata.Complexion || ''}
                                onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Complexion:e.target.value}));}}
                                >
                                  
                                  <option value="">Select</option>
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
                                         <input type="text" className="form-control" placeholder="CM"
                                         value={profiledata.Height || ''}
                                         onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Height:e.target.value}));}}
                                         /> 
                                      </div>
                                      <div className="col-lg-4">
                                        <label>CM</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                   <div className="row gutters-5 align-items-center">
                                      <div className="col-lg-8">
                                         <input type="text" className="form-control" placeholder="Feet"
                                         value={profiledata.Feet || ''}
                                         onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Feet:e.target.value}));}}
                                         /> 
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
                                         <input type="text" className="form-control" placeholder="KG"
                                         value={profiledata.Weight || ''}
                                         onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Weight:e.target.value}));}}
                                         /> 
                                      </div>
                                      <div className="col-lg-4">
                                        <label>KG</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                   <div className="row gutters-5 align-items-center">
                                      <div className="col-lg-8">
                                         <input type="text" className="form-control" placeholder="Pound"
                                         value={profiledata.Pound || ''}
                                         onChange={(e)=>{setprofiledata((prevData)=>({...prevData,Pound:e.target.value}));}}
                                         /> 
                                      </div>
                                      <div className="col-lg-4">
                                        <label>Pound</label>
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
                    <div className="main-inner-box">
      <div className="pageTitle title-fix sm">
        <h2>Other Details</h2>
      </div>

      {/* Upload Section */}
      <div className="od-upload-section size-14">
  <div className="row">
    {/* Passport Upload */}
    <div className="col-lg-6">
      <div className="upload-area">
        <label>Upload Passport</label>
        <input
          type="file"
          accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
          onChange={(e) => handleFileUpload(e, "passport")}
        />
        <p>File Type: PDF/JPEG/DOC</p>
        <p style={{ color: "red", fontSize: "13px" }}>Upload only below 1MB</p>

        {/* Passport Preview */}
        {profiledata.Passport && (
          <div style={{ marginTop: "10px" }}>
            {profiledata.Passport.match(/\.(jpeg|jpg|png)$/) ? (
              <img
                src={profiledata.Passport}
                alt="Passport"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <a href={profiledata.Passport} target="_blank" rel="noopener noreferrer">
                View Uploaded Passport
              </a>
            )}
          </div>
        )}

        {/* Passport File Status */}
        {passportFile && (
          <div className="file-status-row">
            <a href={profiledata.PassportFileValueBase64} target="_blank" rel="noopener noreferrer">
              <div className="upload-file-name">{passportFile.name}</div>
            </a>
            <div className="upload-file-status">Uploaded</div>
          </div>
        )}
      </div>
    </div>


    {/* <div className="col-lg-6">
      <div className="upload-area">
        <label>Upload Any One Original Document</label>
        <input
          type="file"
          accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
          onChange={(e) => handleFileUpload(e, "other")}
        />
        <p>File Type: PDF/JPEG/DOC</p>
        <p style={{ color: "red", fontSize: "13px" }}>Upload only below 1MB</p>

        
        {profiledata.OtherDetails && (
          <div style={{ marginTop: "10px" }}>
            {profiledata.OtherDetails.match(/\.(jpeg|jpg|png)$/) ? (
              <img
                src={profiledata.OtherDetails}
                alt="Other Document"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <a href={profiledata.OtherDetails} target="_blank" rel="noopener noreferrer">
                View Uploaded Document
              </a>
            )}
          </div>
        )}

   
        {otherDetailsFile && (
          <div className="file-status-row">
            <a href={profiledata.OtherDetailsFileValueBase64} target="_blank" rel="noopener noreferrer">
              <div className="upload-file-name">{otherDetailsFile.name}</div>
            </a>
            <div className="upload-file-status">Uploaded</div>
          </div>
        )}
      </div>
    </div> */}
  </div>
</div>

    </div>
              <div className="row mt20 justify-content-end">
                      <div className="col-auto"><button type="submit" className="custom-button">Save</button></div>
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

export default HelperProfileDetail;