import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';
import { getMedicalData } from '../../apiCalls';
import mapToPayload from './commonpayload';


const HelperMedical = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [jwtToken, setjwtToken] = useState('');
  const [helperName, setHelperName] = useState('');
  const [MedicalFile, setMedicalFile] = useState('');
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [medicalData, setMedicalData] = useState();
  const [medicalCV, setMedicalCV] = useState();
  const HelperName = localStorage.getItem("HelperName");
  const [formData, setFormData] = useState(
    {
    
    "VaccinationFileName": "",
    "VaccinationFileValue": "",
    "VaccinationCertificateURL": "",
  }
);
 
  
  useEffect(() => {
    setSelectedLink(window.location.pathname);
    fetchTokenHandler();
    let token = localStorage.getItem("helpertoken");
    console.log(token);
    if (token) {
      console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
    }
    console.log(ishelperloggedin);
    console.log(storedData);
  }, []);
  
  useEffect(() => {
    getMedicalData()
      .then(data => {
        if (data.Message === "Sucess") {
          setMedicalCV(data.Data);
        } else {
          toast.error("error getting HousingType")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching HousingType:', error);
      });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageBase64String = event.target.result;
  
      // Compress image before storing
      compressImage(imageBase64String, 0.5, (compressedBase64) => {
        setSelectedImage(compressedBase64); // Set preview image
        setFormData((prevData) => ({
          ...prevData,
          VaccinationFileName: file.name, // Store file name
          VaccinationFileValue: compressedBase64, // Store compressed Base64 string
          VaccinationCertificateURL: URL.createObjectURL(file), // Store preview URL
        }));
      });
    };
  
    reader.readAsDataURL(file); // Convert file to Base64
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

  const handleRadioChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,  // Spread previous state
          [name]: value, // Update the specific field
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
      setMedicalData(data?.Data[0])
      let medicalCVData = data?.Data?.[0]?.MedicalCV ? data?.Data?.[0]?.MedicalCV : [];
      let formDataFromApi = {};

      medicalCV.forEach((item) => {
        const match = medicalCVData.find((dataItem) => dataItem.Code === item.MedicalProblemId);
        if (match) {
          item.YesOrNo = match.YesOrNo;
        }
        if (item.MedicalProblemDesc) {
          formDataFromApi[item.MedicalProblemDesc] = item.YesOrNo === true ? 'Yes' : 'No';
        }
      });
      setFormData(formDataFromApi);
      // setFormData(data.Data);
      const vaccinationUrl = data?.Data?.[0]?.MedicalCV?.[0]?.LstVaccinactionDocument?.[0]?.VaccinationUploadURL;
      console.log("data?.Data?.[0]",data?.Data?.[0])
      console.log("vaccinationUrl", vaccinationUrl)
      
      setMedicalFile(vaccinationUrl);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [medicalCV]);

  console.log(formData);
  

  const savemedicaldataHandler = async (event) => {
    event.preventDefault();

    const medicalPayload = medicalCV?.map((item) => ({
        OrgId: jpb.OrgId,
        code: item?.MedicalProblemId,
        ParentId: item?.MedicalProblemId,
        MedicalCaption: "Vaccination Certificate",
        Answer: formData[item?.MedicalProblemDesc] || null,
        YesOrNo: formData[item?.MedicalProblemDesc] === "Yes" ? true : false,
        HasSub: true,
        CreatedBy: HelperName,
        CreatedOn: new Date().toISOString(),
        ChangedBy: HelperName,
        ChangedOn: new Date().toISOString(),
        CVCode: HelperCode,
        VaccinationFileName: formData.VaccinationFileName || "",
        // VaccinationFileValue: formData.VaccinationFileValue || "",
        VaccinationCertificateURL: "",
        Status: 0,
        MedicalType: "General",
        VaccinationAnswer: formData.VaccinationAnswer || "",
        
        LstVaccinactionDocument: [
            {
                OrgId: jpb.OrgId,
                SlNo: 1, 
                CVCode: HelperCode,
                MedicalCode: item?.MedicalProblemId,
                VaccinationUploadURL: "",
                CreatedBy: HelperName,
                CreatedOn: new Date().toISOString(),
                ChangedBy: HelperName,
                ChangedOn: new Date().toISOString(),
                VaccinationUploadFileName: formData.VaccinationFileName || "",
              //  VaccinationUploadtFileValue: formData.VaccinationFileValue || "",
                VaccinationUploadFileValueBase64: formData.VaccinationFileValue || "",
                VaccinationUpload_URL: ""
            }
        ]
    }));

    console.log("Payload:1", medicalPayload);
    const payload = mapToPayload({
      ...medicalData,
      MedicalCV:medicalPayload,
    })
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
          toast.success('Helper Medical Details Updated Successfully', {
            position: "top-right",
            autoClose: 1000,
          });
    
          // Navigate to the '/helperaccount' page
          handleLinkClick('/helperskill');  // Make sure handleLinkClick is defined and working
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
     
      <section className="fullcontainer dashboard helper-medical-details hmd-page" data-aos="fade-up">
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
              <form onSubmit={savemedicaldataHandler}>
                <div className="dashboard-right-wrap hiad-wrap">
                  <div className="main-inner-box">
                    <div className="pageTitle title-fix sm">
                      <h2>Medical Details</h2>
                      <p>Save all the pages and submit it under helper skills to save the data</p>
                    </div>

                    <div className="table-holder md-table Scrollcontent" data-mcs-theme="dark">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Question</th>
                            <th>Answer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicalCV?.map((item, index) => (
                            <tr key={item?.MedicalProblemId}>
                              <td>{index + 1}</td>
                              <td>{item?.MedicalProblemDesc}</td>
                              <td>
                                <div className="radio-inline">
                                  <div className="radio">
                                    <label>
                                      <input
                                        type="radio"
                                        name={item?.MedicalProblemDesc}
                                        value="Yes"
                                        checked={formData[item?.MedicalProblemDesc] === "Yes"}
                                        onChange={handleRadioChange}
                                      />
                                      <span>Yes</span>
                                    </label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                      <input
                                        type="radio"
                                        name={item?.MedicalProblemDesc}
                                        value="No"
                                        checked={formData[item?.MedicalProblemDesc] === "No"}
                                        onChange={handleRadioChange}
                                      />
                                      <span>No</span>
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-container">
      <div className="row form-group align-items-center">
        <div className="col-lg-3">
          <label>Vaccination Certificate</label>
        </div>
        <div className="col-lg-6">
          <div className="upload-area">
            <div className="file-upload">
              <label htmlFor="uploadInputVacc">
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
                    Click here to upload Photo
                  </div>
                </div>
              </label>
              <input
                type="file"
                id="uploadInputVacc"
                style={{ display: 'none' }}
                accept="image/*, video/*"
                onChange={handleImageUpload} // Upload handler
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optionally display uploaded image preview */}
        {formData.VaccinationFileValue && (
          <div className="image-preview">
            <img
              src={formData.VaccinationCertificateURL}
              alt="Uploaded Preview"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        )}
        {MedicalFile && (
          <div className="image-preview">
            <img
              src={MedicalFile}
              alt="Vaccination Document"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
      </div>
                  </div>

                  <div className="row mt20 justify-content-end">
                    <div className="col-auto">
                      <button type="submit" className="custom-button">
                       Save
                      </button>
                    </div>
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

export default HelperMedical;