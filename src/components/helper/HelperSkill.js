import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { jpb } from '../../config';
import { toast } from 'react-toastify';
import { getSkillData } from '../../apiCalls';
import mapToPayload from './commonpayload';




const HelperSkill = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [storedData, setstoreddata] = React.useState([]);
  const [helperName, setHelperName] = useState('');
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillData, setSkillData] = useState();
  const [skillsData, setSkillsData] = useState();
  const HelperName = localStorage.getItem("HelperName");

  const transformFormDataToPayload = (formData) => {
  const skillMapping = {
    "fbfb": [],
    "My skill": [],
    "Marketing Analyst":[],
    "Care of infants/children": [
      "Infant Care (2-17 months)",
      "Toddlers Care (18-30 months)",
      "Child Care (3-10 years)",
      "New-born Baby Care (0-2 months)"
    ],
    "Care of elderly": ["Mental Health Condition Care", "Dementia Care"],
    "Care of disabled": [
      "Stroke Care",
      "Postoperative Care",
      "Physical Disability Care",
      "Bedridden Care"
    ],
    "General housework ": ["General housework"],
    "Cooking": ["Please specify cuisine(textbox)"],
    "Language abilites (spoken)": [],
    "Other Skills": []
  };

  let skillCodeCounter = 14;

const getNextSkillCode = () => {
  while ([11, 10].includes(skillCodeCounter)) {
    skillCodeCounter--;
  }
  return '000' + String(skillCodeCounter--);
};

const transformedData = Object.entries(skillMapping).map(([category, subSkills]) => {
  const skillCode = getNextSkillCode();

  return {
    OrgId: jpb.OrgId,
    CVCode: HelperCode,
    SkillCode: skillCode,
    HelperSkillCaption: category,
    EmployerSkillName: category,
    SkillName: "string",
    Assessment: "string",
    SkillsOther: "string",
    RemarkCaption: "string",
    IsActive: true,
    CreatedBy: HelperName,
    CreatedOn: new Date().toISOString(),
    Willingness: formData[`${category}Willingness`] === "Yes",
    Experience: formData[`${category}Experience`] === "Yes",
    skillSubheaderCVDetails: subSkills.map((subSkill, index) => ({
      OrgId: jpb.OrgId,
      SkillCode: skillCode,
      SubSkillName: subSkill,
      CreatedDate: new Date().toISOString(),
      CreatedBy: HelperName,
      ModifiedDate: new Date().toISOString(),
      ModifiedBy: HelperName,
      id: index + 1,
      Willingness: formData[`${subSkill}Willingness`] === "Yes",
      Experience: formData[`${subSkill}Experience`] === "Yes",
    }))
  };
});

  return transformedData;
};


  useEffect(() => {
    if (skillData?.length > 0) {
        const initialData = {};
        skillData.forEach(skill => {
            initialData[`${skill.HelperSkillCaption}Willingness`] =  skill.Willingness ? "Yes" : "No";
            initialData[`${skill.HelperSkillCaption}Experience`] =  skill.Experience  ? "Yes" : "No";

            skill.SkillSubHeaders?.forEach(subSkill => {
                initialData[`${subSkill.SubSkillName}Willingness`] = subSkill.Willingness ? "Yes" : "No";
                initialData[`${subSkill.SubSkillName}Experience`] = subSkill.Experience  ? "Yes" : "No";
            });
            skill.skillSubheaderCVDetails?.forEach(subSkill => {
              initialData[`${subSkill.SubSkillName}Willingness`] = subSkill.Willingness ? "Yes" : "No";
              initialData[`${subSkill.SubSkillName}Experience`] = subSkill.Experience  ? "Yes" : "No";
          });
          
        });
        setFormData(initialData);
    }
}, [skillData]);


  // Handle changes for radio buttons and text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
    }
    console.log(ishelperloggedin);
    console.log(storedData);
   // setHelperName(storedData[0].HelperName);
  }, []);
  const handleLinkClick = (link) => {
    //navigate(link);
    window.location.href = link
    setSelectedLink(link);
  };

  useEffect(() => {
    getSkillData()
      .then(data => {
        if (data.Message === "Sucess") {
          setSkillData(data.Data);
        } else {
          toast.error("error getting HousingType")
        }
      })
      .catch(error => {
        toast.error(error);
        console.error('Error fetching HousingType:', error);
      });
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
      setSkillsData(data.Data[0]);
      console.log("data saved",data.Data[0].SkillMaster)
  
      if (data.Data?.length > 0 && data.Data[0]?.SkillMaster?.length > 0) {
        const updatedFormData = {};
        data.Data[0].SkillMaster.forEach((skill) => {
          // Removing skillSubheaderCVDetails before setting state
          const { skillSubheaderCVDetails, ...filteredSkill } = skill;
  
          updatedFormData[`${filteredSkill.HelperSkillCaption}Willingness`] = filteredSkill.Willingness ? 'Yes' : 'No';
          updatedFormData[`${filteredSkill.HelperSkillCaption}Experience`] = filteredSkill.Experience  ? 'Yes' : 'No';
  
          filteredSkill.SkillSubHeaders?.forEach((subSkill) => {
            updatedFormData[`${subSkill.SubSkillName}Willingness`] = subSkill.Willingness  ? 'Yes' : 'No';
            updatedFormData[`${subSkill.SubSkillName}Experience`] = subSkill.Experience  ? 'Yes' : 'No';
          });
        });
  
        setFormData(updatedFormData);
      } else {
        console.log('No skill data found, leaving form as is.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  useEffect(() => {
    console.log("Updated formData:", formData);
}, [formData]);


  useEffect(() => {
    fetchdata();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve data from localStorage
    // const helperAccount = JSON.parse(localStorage.getItem("helperAccount"));
    // const helperProfile = JSON.parse(localStorage.getItem("helperProfile"));
    // const helperContact = JSON.parse(localStorage.getItem("helperContact"));
    // const helperFamily = JSON.parse(localStorage.getItem("helperFamily"));
    // const helperBooking = JSON.parse(localStorage.getItem("helperBooking"));
    // const helperEducation = JSON.parse(localStorage.getItem("helperEducation"));
    // const helperExperience = JSON.parse(localStorage.getItem("helperExperience"));
    // const helperLanguage = JSON.parse(localStorage.getItem("helperLanguage"));
    // const helperMedical = JSON.parse(localStorage.getItem("helperMedical"));
  
    // // Logging values for debugging
    // console.log("helperAccount", helperAccount);
    // console.log("helperProfile", helperProfile);
    // console.log("helperContact", helperContact);
    // console.log("helperFamily", helperFamily);
    // console.log("helperBooking", helperBooking);
    // console.log("helperEducation", helperEducation);
    // console.log("helperExperience", helperExperience);
    // console.log("helperLanguage", helperLanguage);
    // console.log("helperMedical", helperMedical);
    // console.log("skill", formData);
  
    // Payload object with necessary data
    // const payload = {
    //   ...helperAccount,
    //   ...helperProfile,
    //   ...helperContact,
    //   ...helperFamily,
    //   ...helperBooking,
    //   Contacts: [helperContact],  // Already a single object, no need to spread
    //   Language: Object.values(helperLanguage), // Convert object to array
    //   Educations: Object.values(helperEducation), // Convert object to array
    //   HelperExperience: Object.values(helperExperience), // Convert object to array
    //   SkillMaster: transformFormDataToPayload(formData),
    //   HelperFamilyBackGround: [{ ...helperFamily, Name: HelperName }],
    //   MedicalCV: Object.values(helperMedical), // No need to spread, just wrap in array
    // };
  
    // Logging the payload before submission
    // console.log("payload", payload);
    const payload = mapToPayload({
      ...skillsData,
      SkillMaster:transformFormDataToPayload(formData),
    })
      console.log("payload",payload)
  
    // Define the URL for the API call
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
        toast.success('Helper Skill Details Updated Successfully', {
          position: "top-right",
          autoClose: 1000,
        });
  
        // Clear localStorage
        // localStorage.removeItem('helperAccount');
        // localStorage.removeItem('helperProfile');
        // localStorage.removeItem('helperContact');
        // localStorage.removeItem('helperFamily');
        // localStorage.removeItem('helperBooking');
        // localStorage.removeItem('helperEducation');
        // localStorage.removeItem('helperExperience');
        // localStorage.removeItem('helperLanguage');
        // localStorage.removeItem('helperMedical');
  
        // Navigate to the '/helperaccount' page
         handleLinkClick('/helperaccount');  // Make sure handleLinkClick is defined and working
      } else {
        console.error('Form submission failed:', responseData);
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Helper Details Update failed:', err);
      setError('Helper Details Update failed. Please try again.');
    } finally {
      setLoading(false);  // This will stop the loading indicator (if any)
    }
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
     
      <section className="fullcontainer dashboard helper-skills-details hskd-page" data-aos="fade-up">
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
            {/* Wrap the entire content in a form */}
            <form onSubmit={handleSubmit}>
              <div className="dashboard-right-wrap hiad-wrap">
                <div className="main-inner-box">
                  <div className="pageTitle title-fix sm">
                    <h2>Skills Details</h2>
                  </div>
                  <div className="table-holder skd-table Scrollcontent" data-mcs-theme="dark">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S/No</th>
                          <th>Areas Of Work</th>
                          <th>Willingness</th>
                          <th>Experience</th>
                        </tr>
                      </thead>
                      <tbody>
                        {skillData?.map((skill, index) => (
                          <React.Fragment key={skill?.SkillCode}>
                            <tr className="tr-white">
                              <td className="valign-top number-td">{index + 1}</td>
                              <td><strong>{skill?.HelperSkillCaption}</strong></td>
                              
                              {/* Render radios if there are NO sub-skills */}
                              {!skill?.SkillSubHeaders?.length && (
                                <>
                                  <td className="radio-td">
                                    <div className="radio-inline">
                                      <div className="radio">
                                        <label>
                                          <input
                                            type="radio"
                                            name={`${skill?.HelperSkillCaption}Willingness`}
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={formData[`${skill?.HelperSkillCaption}Willingness`] === "Yes"}
                                          />
                                          <span>Yes</span>
                                        </label>
                                      </div>
                                      <div className="radio">
                                        <label>
                                          <input
                                            type="radio"
                                            name={`${skill?.HelperSkillCaption}Willingness`}
                                            value="No"
                                            onChange={handleChange}
                                            checked={formData[`${skill?.HelperSkillCaption}Willingness`] === "No"}
                                          />
                                          <span>No</span>
                                        </label>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="radio-td">
                                    <div className="radio-inline">
                                      <div className="radio">
                                        <label>
                                          <input
                                            type="radio"
                                            name={`${skill?.HelperSkillCaption}Experience`}
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={formData[`${skill?.HelperSkillCaption}Experience`] === "Yes"}
                                          />
                                          <span>Yes</span>
                                        </label>
                                      </div>
                                      <div className="radio">
                                        <label>
                                          <input
                                            type="radio"
                                            name={`${skill?.HelperSkillCaption}Experience`}
                                            value="No"
                                            onChange={handleChange}
                                            checked={formData[`${skill?.HelperSkillCaption}Experience`] === "No"}
                                          />
                                          <span>No</span>
                                        </label>
                                      </div>
                                    </div>
                                  </td>
                                </>
                              )}

                              {/* If sub-skills exist, leave these columns empty */}
                              {skill?.SkillSubHeaders?.length > 0 && <td></td>}
                            </tr>

                            {/* Render sub-skills if available */}
                            {skill?.SkillSubHeaders?.map((subSkill, subIndex) => (
                              <tr className="tr-white" key={subIndex}>
                                <td></td>
                                <td className="areaw-td">{subSkill?.SubSkillName}</td>
                                <td className="radio-td">
                                  <div className="radio-inline">
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          name={`${subSkill?.SubSkillName}Willingness`}
                                          value="Yes"
                                          onChange={handleChange}
                                          checked={formData[`${subSkill?.SubSkillName}Willingness`] === "Yes"}
                                        />
                                        <span>Yes</span>
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          name={`${subSkill?.SubSkillName}Willingness`}
                                          value="No"
                                          onChange={handleChange}
                                          checked={formData[`${subSkill?.SubSkillName}Willingness`] === "No"}
                                        />
                                        <span>No</span>
                                      </label>
                                    </div>
                                  </div>
                                </td>
                                <td className="radio-td">
                                  <div className="radio-inline">
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          name={`${subSkill?.SubSkillName}Experience`}
                                          value="Yes"
                                          onChange={handleChange}
                                          checked={formData[`${subSkill?.SubSkillName}Experience`] === "Yes"}
                                        />
                                        <span>Yes</span>
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          name={`${subSkill?.SubSkillName}Experience`}
                                          value="No"
                                          onChange={handleChange}
                                          checked={formData[`${subSkill?.SubSkillName}Experience`] === "No"}
                                        />
                                        <span>No</span>
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row mt20 justify-content-end">
                  <div className="col-auto">
                    <button type="submit" className="custom-button">
                      SUBMIT
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

export default HelperSkill;