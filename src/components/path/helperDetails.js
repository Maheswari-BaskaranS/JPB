import React, { useEffect, useState } from "react";
 import './helperDetails.css';
import { FaArrowRight } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import QuickSearch from "../Quicksearch";
import FullImage from "../../images/womenfullimg.jpg"
import MenSmall from "../../images/mensmall.jpg"
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getHelperData, scheduleInterview, getBranches,getRegionData } from "../../apiCalls";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SchoolIcon from "@mui/icons-material/School";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import TranslateIcon from "@mui/icons-material/Translate";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; 
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { Checkbox, FormControlLabel } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const HelperBio = () => {
  const stepStyles = (step) => ({
    padding: "10px",
    background: selectedStep === step ? "#e8f6f5" : "unset",
    color: selectedStep === step ? "#1AA99C" : "unset",
    borderLeft: selectedStep === step ? "4px solid #1AA99C" : "none",
    cursor:"pointer"
  });

  const iconStyles = (step) => ({
    padding: "7px",
    background: selectedStep === step ? "#1AA99C" : "unset",
    color: selectedStep === step ? "#e8f6f5" : "unset",
  });

  const [activeTab, setActiveTab] = useState("Personal Details")

  const location = useLocation();
  const [CVCode, setCvCode] = useState("");
  const [helperData, setHelperData] = useState(null);
  const [selectedStep, setSelectedStep] = useState(1);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeData] = useState([]);
  const [step, setStep] = useState(1);
  const [screenshot, setScreenshot] = useState(null);
  const [bankChecked, setBankChecked] = useState(false);
  const [qrChecked, setQrChecked] = useState(false);
  const [error, setError] = useState("");
  const [region, setRegion] = useState();
 
  const handleNext = () => {
    if (step === 1 && screenshot) {
      setStep(2);
    }
  };

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



    const getRegionName = (regionId) => {
      if (!region || region.length === 0) return "N/A";
      const regionObj = region.find(r => String(r.ReligionCode) === String(regionId));
      return regionObj ? regionObj.ReligionDesc : "N/A";
    };
    
  

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const [hours] = selectedTime.split(":").map(Number);

    if (hours < 10 || hours > 19) {
      setError("Please select a time between 10:00 AM and 7:00 PM.");
    } else {
      setError(""); // Clear error when valid time is selected
      setFormData({
        ...formData,
        InterviewTime: selectedTime,
        InterviewTimeString: selectedTime + ":00",
      });
    }
  };

  const [formData, setFormData] = useState({
    OrgId: 1,
    InterviewCode: "",
    ReferenceNo: "",
    MeetingLink: "",
    BranchCode: "00011",
    HelperCode: "",
    UserCode: "",
    EmployerCode: "",
    HelperName: "",
    EmployerName: "",
    BookingNo: "",
    Status: "Active",
    Filepath: "",
    InterviewDate: "",
    InterviewDateString: "",
    InterviewTime: "",
    InterviewTimeString: "",
    Remarks: "",
    IsActive: true,
    CreatedBy: "",
    CreatedOn: "",
    ChangedBy: "",
    ChangedOn: "",
    ModeOfAvailability: "",
  });

  useEffect(() => {
    const queryString = location.search;
    const id = queryString.substring(1);
    if (id) {
      setCvCode(id);
    } else {
      window.location.href = "/helperlist";
    }
  }, [location]);

  useEffect(() => {
    if (CVCode) {
      getHelperData(CVCode)
        .then((data) => {
          if (data.Message === "Sucess") {
            setHelperData(data.Data[0]);
          } else {
            toast.error("Error getting helper data");
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.error("Error fetching helper data:", error);
        });
    }
  }, [CVCode]);

  useEffect(() => {
    getBranches()
      .then((data) => {
        if (data.Message === "Sucess") {
          setBranches(data.Data);
        } else {
          toast.error("error getting branches");
        }
      })
      .catch((error) => {
        toast.error(error);
        console.error("Error fetching branches:", error);
      });
  }, []);

  const EmployerCode = localStorage.getItem("EmployerCode");
  useEffect(() => {
    if (helperData) {
      setFormData((prevData) => ({
        ...prevData,
        HelperCode: helperData?.HelperFamilyBackGround?.[0]?.HelperCode || "",
        HelperName: helperData.FullName || "",
        EmployerCode: EmployerCode || "",
        UserCode: EmployerCode || "",
      }));
    }
  }, [helperData]);

  const fetchdata = async () => {
    try {
      // Ensure EmployerCode is available
      if (!EmployerCode) {
        console.log("EmployerCode is missing!");
        return;
      }

      const response = await fetch(
        `https://jpbapi.appxes-erp.in/Employer/GetByCode?OrganizationId=1&EmployerCode=${EmployerCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Data not found!");
        throw new Error("Failed to fetch employer data");
      }

      const data = await response.json();

      // Ensure data exists before updating state
      if (data.Data?.length > 0) {
        setEmployeData(data.Data[0].EmployerMasterV2);
      } else {
        console.warn("No data returned from the API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data here and update loading state accordingly
    async function fetchData() {
      setLoading(true);
      try {
        // Ensure EmployerCode is available
        if (!EmployerCode) {
          console.log("EmployerCode is missing!");
          return;
        }

        const response = await fetch(
          `https://jpbapi.appxes-erp.in/Employer/GetByCode?OrganizationId=1&EmployerCode=${EmployerCode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Data not found!");
          throw new Error("Failed to fetch employer data");
        }

        const data = await response.json();

        // Ensure data exists before updating state
        if (data.Data?.length > 0) {
          setEmployeData(data.Data[0].EmployerMasterV2);
        } else {
          console.warn("No data returned from the API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (helperData) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [helperData]);

  // Logging data change inside useEffect as well
  useEffect(() => {
    if (employeeData?.EmployerName) {
      setFormData((prevData) => ({
        ...prevData,
        EmployerName: employeeData.EmployerName,
        CreatedBy: employeeData.EmployerName,
      }));
    }
  }, [employeeData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(file);
      setFormData((prevData) => ({
        ...prevData,
        Filepath: URL.createObjectURL(file), // Dummy path for preview; replace with actual upload logic
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,

      InterviewDate: newDate,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
console.log("Submitting data---",formData)
    try {
      const data = await scheduleInterview(formData);
      console.log("data",data)
      if (data.Message === "Sucess" && data.Code === 200) {
        toast.success("Interview Scheduled Successfully");
        setOpen(false); // Close the dialog after successful submission
      } else {
        toast.error("Error scheduling interview");
      }
    } catch (error) {
      toast.error("Error fetching branches");
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedLink, setSelectedLink] = useState("/");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(helperData);

  return (
      <div>
        <div id="wrapper">
        <Header/>
        <div className="clear"></div>
    
        <div className="clear"></div>
    <div className="cards">
    <div className="containerones">
      {/* Sidebar */}
      <aside className="sidebars">
        <div className="profile-image-containers">
          <img
            src={helperData?.PersonImagePath || "/placeholder.svg"}
            alt="Profile"
            className="profile-images"
          />
        </div>
        <ul className="menus">
          {[
            { name: "Personal Details", icon: <AccountCircleIcon /> },
            { name: "Family Details", icon: <Diversity3Icon /> },
            { name: "Education Details", icon: <SchoolIcon /> },
            { name: "Experience Details", icon: <WorkHistoryIcon /> },
            { name: "Language Details", icon: <TranslateIcon /> },
            { name: "Skills Details", icon: <SplitscreenIcon /> },
            { name: "Medical Details", icon: <MonitorHeartIcon /> }
          ].map((item) => (
            <li
              key={item}
              className={`menu-items ${activeTab === item.name ? "active" : ""}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="menu-lefts">
                {item.icon}
                <span className="menu-texts">{item.name}</span>
              </span>
              <KeyboardArrowRightIcon className="arrow-icons" />
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-contents">
        <div className="profile-containers">
            <div className="profile-cards">
              <div className="profile-lefts">
                <img src={helperData?.PersonImagePath || "/placeholder.svg"} alt="Profile" className="profile-imgs" />
                <h2 className="profile-names">{helperData?.FullName || ""}</h2>
                <button onClick={() => setOpenDialog(true)} className="view-image-btns">
                  View Full Image <FaArrowRight style={{ marginLeft: "5px", fontSize: "15px" }} />
                </button>
              </div>
              <div className="profile-rightss">
                <div className="profile-detailss">
                  <p><strong>Birth Place:</strong> {helperData?.BirthPlace || "N/A"}</p>
                  <p><strong>Marital Status:</strong> {helperData?.MaritalStatus || "N/A"}</p>
                  <p><strong>Date of Birth:</strong> {helperData?.DateOfBirthString || "N/A"}</p>
                </div>
              </div>
              <Dialog open={openDialog} onClose={handleDialogClose}>
                <img 
                  src={helperData?.PersonImagePath || "/placeholder.svg"} 
                  alt="Full Profile" 
                  style={{ width: "100%", height: "400px",objectFit: "cover" }} 
                />
              </Dialog>
            </div>
          </div>


          <div style={{ minHeight: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Button
    sx={{
      width: "200px",
      height: "35px",
      borderRadius: "8px",
    }}
    onClick={handleClickOpen}
    variant="contained"
  >
    Schedule Interview
  </Button>
</div>


        {/* <h3>{activeTab}</h3> */}
        <div className="details-sections">
          {activeTab === "Personal Details" && (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "350px auto", 
              gap: "10px 20px", 
              alignItems: "center",
              justifyContent:"center",
              marginTop:"30px"
              
            }}>
              <span>Entry Date</span> <strong>: {helperData?.HelperExperience?.[0]?.CreatedOn || "N/A"}</strong>
              <span>Helper Code</span> <strong>: {helperData?.CVCode || "N/A"}</strong>
              <span>Name</span> <strong>: {helperData?.FullName || "N/A"}</strong>
              <span>FIN No</span> <strong>: {helperData?.NricFin || "N/A"}</strong>
              <span>Nationality</span> <strong>: {helperData?.Nationality || "N/A"}</strong>
              <span>Work Permit No</span> <strong>: {helperData?.WPNo || "N/A"}</strong>
              <span>Work Permit Expiry</span> <strong>: {helperData?.WPExpiryString || "N/A"}</strong>
              <span>Religion</span> <strong>: {getRegionName(helperData?.Religion) || "N/A"}</strong>
              <span>Specialization/Preference</span> <strong>: {helperData?.Specialisation || "N/A"}</strong>
              <span>Repatriate Airport</span> <strong>: {helperData?.RepatraiteAirport || "N/A"}</strong>
              <span>Status</span> <strong>: {helperData?.Status || "N/A"}</strong>
              <span>Training Center</span> <strong>: {helperData?.TrainingCenter || "N/A"}</strong>
              <span>Complexion</span> <strong>: {helperData?.Complexion || "Select an Option"}</strong>
              <span>Height</span> <strong>: {helperData?.Height || "- cm"}</strong>
              <span>Feet</span> <strong>: {helperData?.Feet || "-"}</strong>
              <span>Weight</span> <strong>: {helperData?.Weight || "- kg"}</strong>
              <span>Pound</span> <strong>: {helperData?.Pound || "- lbs"}</strong>
            </div>
          )}

          {activeTab === "Family Details" && (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "350px auto", 
              gap: "10px 20px", 
              alignItems: "center",
              justifyContent:"center",
              marginTop:"30px"
            }}>
              <span>Spouse Name</span> <strong>: {helperData?.HusbandName || "N/A"}</strong>
              <span>Spouse Occupation</span> <strong>: {helperData?.HusbandOccupation || "N/A"}</strong>
              <span>Spouse Age</span> <strong>: {helperData?.HusbandAge || "N/A"}</strong>
              <span>Father Occupation</span> <strong>: {helperData?.FatherOccupation || "N/A"}</strong>
              <span>Mother Occupation</span> <strong>: {helperData?.MotherOccupation || "N/A"}</strong>
              <span>Father Age</span> <strong>: {helperData?.FatherAge|| "N/A"}</strong>
              <span>Mother Age</span> <strong>: {helperData?.MotherAge|| "N/A"}</strong>
              <span>Sibiling Position</span> <strong>: {helperData?.SiblingsPosition || "N/A"}</strong>
              <span>No Of Brother</span> <strong>: {helperData?.NoOfBrother || "N/A"}</strong>
              <span>No Of Sister</span> <strong>: {helperData?.NoOfSister}</strong>
              <span>Brother Age</span> <strong>: {helperData?.BrotherAge|| "N/A"}</strong>
              <span>Sister Age</span> <strong>: {helperData?.SisterAge || "N/A"}</strong>
              <span>No Of Children</span> <strong>: {helperData?.NoofChildren || "N/A"}</strong>
              <span>Child Age</span> <strong>: {helperData?.ChildAge|| "N/A"}</strong>
             </div>
          )}


          {activeTab === "Education Details" && (
            helperData?.Educations?.length > 0 ? (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "350px auto", 
                gap: "10px 20px", 
                alignItems: "center",
                justifyContent:"center", 
                marginBottom:"110px"
              }}>
                {helperData.Educations.map((education, index) => (
                  <React.Fragment key={index}>
                    <span>Education</span> <strong>: {education.Educations || "N/A"}</strong>
                    <span>School Name</span> <strong>: {education.SchoolName || "N/A"}</strong>
                    <span>From</span> <strong>: {education.FromString || "N/A"}</strong>
                    <span>To</span> <strong>: {education.ToStrings || "N/A"}</strong>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
                <p>No education details available.</p>
              </div>
            )
          )}

          
          {activeTab === "Experience Details" && (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "350px auto", 
              gap: "10px 20px", 
              alignItems: "center",
              justifyContent:"center",
              marginTop:"30px" 
            }}>
  
              {helperData?.HelperExperience?.length > 0 ? (
                helperData.HelperExperience.map((experience, index) => (
                  <React.Fragment key={index}>
                    <span>Country</span> <strong>: {experience.Country || "N/A"}</strong>
                    <span>Employee Name</span> <strong>: {experience.Name || "N/A"}</strong>
                    <span>Start Date</span> <strong>: {experience.StartDateString || "N/A"}</strong>
                    <span>End Date</span> <strong>: {experience.EndDateString || "N/A"}</strong>
                    <span>Duty</span> <strong>: {experience.Duty || "N/A"}</strong>
                    <span>Reason Of Leaving</span> <strong>: {experience.ReasonofLeaving || "N/A"}</strong>
                    <span>Testimonial</span> <strong>: {experience.Testimonial || "N/A"}</strong>
                   </React.Fragment>
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
                  <p>No experience details available.</p>
                </div>
              )}
            </div>
          )}


          {activeTab === "Language Details" && (
            helperData?.Language?.length > 0 ? (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "350px auto", 
                gap: "10px 20px", 
                alignItems: "center",
                justifyContent:"center" ,
                marginBottom:"100px" 
              }}>
                {helperData.Language.map((language, index) => (
                  <React.Fragment key={index}>
                    <span>Language {index + 1}</span> <strong>: {language.Language || "N/A"}</strong>
                    <span>Understanding Level</span> <strong>: {language.Understandinglevel || "N/A"}</strong>
                    <span>Speaking Level</span> <strong>: {language.Speakinglevel || "N/A"}</strong>
                    <span>Remarks</span> <strong>: {language.Remarks || "N/A"}</strong>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center",  height: "40vh" }}>
                <p>No language details available.</p>
              </div>
            )
          )}

          
          {activeTab === "Skills Details" && (
            helperData?.SkillMaster?.length > 0 ? (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "350px auto", 
                gap: "10px 20px", 
                alignItems: "center",
                justifyContent:"center",
                marginTop:"30px" 
              }}>
                {helperData.SkillMaster.map((evaluation, index) => (
                  <React.Fragment key={index}>
                    <span>Skill {index + 1}</span> <strong>: {evaluation.Description || "N/A"}</strong>
                    <span>Is Active</span> <strong>: {evaluation.IsActive ? "Yes" : "No"}</strong>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center", height: "40vh" }}>
                <p>No Skill details available.</p>
              </div>
            )
          )}

          
            {activeTab === "Medical Details" && (
              helperData?.MedicalCV?.length > 0 ? (
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "350px auto", 
                  gap: "10px 20px", 
                  alignItems: "center",
                  justifyContent:"center",
                  marginTop:"30px"   
                }}>
                  {helperData.MedicalCV.map((medical, index) => (
                    <React.Fragment key={index}>
                      <span>Medical Caption {index + 1}</span> <strong>: {medical.MedicalCaption || "N/A"}</strong>
                      <span>Medical Type</span> <strong>: {medical.MedicalType || "N/A"}</strong>
                      <span>Vaccination Answer</span> <strong>: {medical.VaccinationAnswer || "N/A"}</strong>
                      <span>Vaccinated</span> <strong>: {medical.YesOrNo ? "Yes" : "No"}</strong>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", height: "40vh" }}>
                  <p>No medical details available.</p>
                </div>
              )
            )}

        </div>
      </div>
    </div>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent >
          {step === 1 && (
            <Grid container spacing={12}>
              {/* Date and Time Selection */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
  label="Interview Date"
  shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
  onChange={(date) => {
    setFormData({
      ...formData,
      InterviewDate: date,
      InterviewDateString: date ? date.format("YYYY-MM-DD") : "",
    });
  }}
  renderInput={(params) => <TextField {...params} fullWidth />}
/>

                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
         {/* <TextField
  label="Interview Time"
  variant="outlined"
  fullWidth
  type="time"
  name="InterviewTime"
  onChange={(e) => {
    const selectedTime = e.target.value;
    const [hours, minutes] = selectedTime.split(":").map(Number);

    // Ensure time is between 10:00 AM and 7:00 PM
    if (hours < 10 || hours > 19) {
      alert("Please select a time between 10 AM and 7 PM.");
      return;
    }

    setFormData({
      ...formData,
      InterviewTime: selectedTime,
      InterviewTimeString: selectedTime + ":00",
    });
  }}
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 60,
  }}
/> */}

 <div>
      <TextField
        label="Interview Time"
        variant="outlined"
        fullWidth
        type="time"
        name="InterviewTime"
        onChange={handleTimeChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 60,
        }}
        error={Boolean(error)} // Shows red border if there's an error
      />
      {error && (
        <FormHelperText style={{ color: "red" }}>{error}</FormHelperText>
      )}
    </div>


              </Grid>
            </Grid>
          )}
          {/* Step 2: Payment Details */}
          {step === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 style={{ textAlign: "center" }}>
                  Deposit 150$ to schedule Interview
                </h2>

                {/* <Grid container justifyContent="center" alignItems="center" direction="row">
                  <FormControlLabel
                    control={<Checkbox checked disabled />}
                    label="Show Bank Account Details"
                  />
                  <FormControlLabel
                    control={<Checkbox checked disabled />}
                    label="Show QR Code"
                  />
                </Grid> */}

                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <p>
                    <strong>UOB BANK</strong>
                  </p>
                  <p>
                    <strong>NAME:</strong> JPB EMPLOYMENT PTE LTD
                  </p>
                  <p>
                    <strong>BANK ACC:</strong> 335-3060-757
                  </p>
                  <p>
                    <strong>BANK CODE:</strong> 7375
                  </p>
                  <p>
                    <strong>SWIFT CODE:</strong> UOVBSGSG
                  </p>
                  <p>
                    <strong>BRANCH CODE:</strong> 014
                  </p>
                  <p>
                    <strong>PAYNOW UEN:</strong> 201625828M
                  </p>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" item xs={12}>
                  <img
                    src="/images/paynowQR.png"
                    alt="QR Code"
                    style={{
                      width: "300px",
                      height: "300px",
                      paddingTop:"15px",
                      objectFit: "contain",
                    }}
                  />
                </Grid>

              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  style={{ width: "250px", height: "55px" }}
                >
                  Upload Paid Screenshot
                  <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {screenshot && <p>{screenshot.name}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reference Number"
                  variant="outlined"
                  fullWidth
                  name="Reference Number"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {step === 1 && (
            <Button
              onClick={() => setStep(2)} // Set step to 2 when "Next" is clicked
              disabled={
                !formData.InterviewDate ||
                !formData.InterviewTime ||
                error // also disable if time error exists
              }
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleSubmit} disabled={loading || !screenshot}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    
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

export default HelperBio;