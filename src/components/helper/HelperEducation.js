import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from "react-icons/fa"; 
import { jpb } from '../../config';
import { toast } from 'react-toastify';
import mapToPayload from './commonpayload';



const HelperEducation = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [helperName, setHelperName] = useState('');
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [educationsData, setEducationsData] = useState({})
  const [educationData, setEducationData] = useState([
    { education: "", schoolName: "", from: "", to: "",      EducationCertDocument: "",
      EducationCertFileName: "",
      EducationCertFileValue: "",
      EducationCertFileValueBase64: ""
 },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...educationData];
    updatedData[index][field] = value;
    setEducationData(updatedData);
    console.log(educationData); 
  };
  

   const addRow = () => {
    setEducationData([...educationData, { education: "", schoolName: "", from: "", to: "" }]);
  };

  const HelperName = localStorage.getItem("HelperName");

  // Function to delete a row
  const deleteRow = (index) => {
    const updatedData = educationData.filter((_, i) => i !== index);
    setEducationData(updatedData);
  };


  // const handleFileUpload = (index, event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result;
  //       const updatedData = [...educationData];
  //       updatedData[index].EducationCertFileName = file.name;
  //       updatedData[index].EducationCertFileValue = base64String;
  //       updatedData[index].EducationCertFileValueBase64 = URL.createObjectURL(file);
  //       setEducationData(updatedData);
  //       console.log("File uploaded:", updatedData); // Log to check if file is uploaded correctly
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64String = e.target.result;
      
      if (file.type.startsWith("image/")) {
        // Compress image before storing
        compressImage(base64String, 0.5, (compressedBase64) => {
          updateEducationData(index, file, compressedBase64);
        });
      } else {
        // Directly store non-image files as Base64
        updateEducationData(index, file, base64String);
      }
    };
  
    reader.readAsDataURL(file);
  };
  
  // Helper function to update educationData
  const updateEducationData = (index, file, fileBase64) => {
    setEducationData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        EducationCertFileName: file.name, // Store file name
        EducationCertFileValue: fileBase64, // Store Base64 value
        EducationCertFileValueBase64: URL.createObjectURL(file), // Store URL for preview
      };
      console.log("File uploaded:", updatedData);
      return updatedData;
    });
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
  
  

  useEffect(() => {
    setSelectedLink(window.location.pathname);
    let token = localStorage.getItem("helpertoken");
    console.log(token);
    if (token) {
      console.log(token);
      setishelperloggedin(true);
      setstoreddata(JSON.parse(token));
      console.log(storedData);
     // setHelperName(storedData[0].HelperName);
    }
    console.log(ishelperloggedin);
    console.log(storedData);
  }, []);

  const HelperCode = localStorage.getItem("HelperCode"); // Retrieve EmployerCode from localStorage
  const Code = HelperCode;
  
  const fetchdata = async () => {
    try {
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
      setEducationsData(data.Data[0]);
      const educationList = data.Data[0]?.Educations || [];

      const formattedEducationData = educationList.length > 0 ? 
        educationList.map((item) => ({
          education: item.Educations || "",
          schoolName: item.SchoolName || "",
          from: item.From ? item.From.split("T")[0] : "",
          to: item.To ? item.To.split("T")[0] : "",
          EducationCertDocument: item.EducationCertDocument,
          EducationCertFileName:item.EducationCertFileName,
        })) 
        : [{ education: "", schoolName: "", from: "", to: "" }]; // Ensure at least one row
  
      setEducationData(formattedEducationData);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  console.log(educationData)
  useEffect(() => {
    fetchdata();
  }, []);

  const saveBookingDataHandler = async (e) => {
    e.preventDefault();

    const formattedData = educationData.map((row, index) => ({
      OrgId: jpb.OrgId,
      CVCode: HelperCode,
      SLNo: index + 1,
      SchoolName: row.schoolName || "",
      Educations: row.education || "",
      From: row.from ? new Date(row.from).toISOString() : "",
      FromString: row.from || "",
      To: row.to ? new Date(row.to).toISOString() : "",
      ToStrings: row.to || "",
      EducationCertFileName: row.EducationCertFileName || "",
      EducationCertFileValueBase64: row.EducationCertFileValue || "",
      EducationCertDocument: row.EducationCertFileName || "",
      CreatedBy: HelperName,
      CreatedOn: new Date().toISOString(),
      ChangedBy: HelperName,
      ChangedOn: new Date().toISOString(),
    }));

    console.log("Updated Education Data", formattedData);
    const payload = mapToPayload({
      ...educationsData, // if needed, include other pieces like accountData etc.
      Educations: formattedData
    });
    console.log("payload", payload);

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
        toast.success('Helper Education Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  
        // Navigate to the '/helperaccount' page
        handleLinkClick('/helperexperience');  // Make sure handleLinkClick is defined and working
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
     
      <section className="fullcontainer dashboard helper-education-details hbd-page" data-aos="fade-up">
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
      <form onSubmit={saveBookingDataHandler}>
        <div className="dashboard-right-wrap hiad-wrap">
          <div className="main-inner-box">
            <div className="pageTitle title-fix sm">
              <h2>Education Details</h2>
              <p>Save all the pages and submit it under helper skills to save the data</p>
            </div>

            <div className="table-holder Scrollcontent" data-mcs-theme="dark">
              <table className="table">
                <thead>
                  <tr>
                    <th>Education</th>
                    <th>Organisation Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Certificate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {educationData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={row.education}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, "education", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.schoolName}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, "schoolName", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={row.from}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, "from", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={row.to}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, "to", e.target.value)}
                        />
                      </td>
                      <td>
                        <input type="file" accept="image/*,.pdf"  onChange={(e) => handleFileUpload(index, e)} />
                        {row.EducationCertDocument && (
                          <>
                            <p>{row.EducationCertFileName}</p> {/* Display file name */}
                            <a href={row.EducationCertDocument} target="_blank" rel="noopener noreferrer">
                              View Document
                            </a>
                          </>
                        )}
                {row.EducationCertFileValueBase64 && <a href={row.EducationCertFileValueBase64} target="_blank" rel="noopener noreferrer">View</a>}
              </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-danger" onClick={() => deleteRow(index)}>
                            <FaTrash />
                          </button>
                          <button type="button" className="btn btn-success" onClick={addRow}>
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

                  {/* Submit Button */}
            <div className="row mt20 justify-content-end">
              <div className="col-auto">
                <button type="submit" className="custom-button">
                Save
                  </button>
              </div>
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

export default HelperEducation;