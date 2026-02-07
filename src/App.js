import React, {useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/HomeFirst';
import About from './components/About';
import Contact from './components/Contact';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import WebAgency from './components/WebAgency';
import Login from './components/employer/Login';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MaidRegistration from './components/employer/MaidRegistration';
import MakeAppointment from './components/employer/MakeAppointment';
import ForgetPassword from './components/employer/ForgetPassword';
import EmployerAccount from './components/employer/EmployerAccount';
import EmployerAddress from './components/employer/EmployerAddress';
import EmployerBooking from './components/employer/EmployerBooking';
import EmployerSalary from './components/employer/EmployerSalary';
import EmployerContact from './components/employer/EmployerContact';
import EmployerFamily from './components/employer/EmployerFamily';
import EmployerHiringProcess from './components/employer/EmployerHiringProcess';
import EmployerInterview from './components/employer/EmployerInterview';
import EmployerProfile from './components/employer/EmployerProfile';
import EmployerRegistration from './components/employer/EmployerRegistration';
import EmployerSearchResult from './components/employer/EmployerSearchResult';
import HelperDetails from './components/employer/HelperDetails';
import HelperLogin from './components/helper/HelperLogin';
import HelperAccount from './components/helper/HelperAccount';
import HelperBooking from './components/helper/HelperBooking';
import HelperContact from './components/helper/HelperContact';
import HelperEducation from './components/helper/HelperEducation';
import HelperExperience from './components/helper/HelperExperience';
import HelperFamily from './components/helper/HelperFamily';
import HelperInterview1 from './components/helper/HelperInterview1';
import HelperInterview2 from './components/helper/HelperInterview2';
import HelperLanguage from './components/helper/HelperLanguage';
import HelperMedical from './components/helper/HelperMedical';
import HelperProfileDetail from './components/helper/HelperProfileDetail';
import HelperProfileFill from './components/helper/HelperProfileFill';
import HelperSkill from './components/helper/HelperSkill';
import FilterList from './components/path/helperList';
import HelperBio from './components/path/helperDetails';
import ForgetPasswords from './components/helper/ForgetPasswords';
import TermsandConditions from './components/Terms&Conditions';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import RelatedLinks from './components/RelatedLinks';
import HelperSalary from './components/helper/HelperSalary'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad]);

  // Redirect to a temporary loading component on first load
  if (firstLoad) {
    return <div>Loading...</div>;
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <BrowserRouter >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/about" element={<About/>} />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/terms&conditions" element={<TermsandConditions/>} />
        <Route path='/news' element={<News/>} />
        <Route path='/related_links' element={<RelatedLinks/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/helperlogin' element={<HelperLogin/>} />
        <Route path='/forgetpassword' element={<ForgetPassword/>} />
        <Route path='/forgetpasswords' element={<ForgetPasswords/>} />
        <Route path='/maidregistration' element={<MaidRegistration/>} />
        <Route path='/makeappointment' element={<MakeAppointment/>} />
        <Route path='/newsdetail' element={<NewsDetail/>} />
        <Route path='/webagency' element={<WebAgency/>} />
        <Route path="/employeraccount" element={<EmployerAccount/> } />
        <Route path='/employeraddress' element={<EmployerAddress/> } />
        <Route path='/employerbooking' element={<EmployerBooking/> } />
        <Route path ='/employersalary' element={<EmployerSalary/>}/>
        <Route path='/employercontact' element={<EmployerContact/> } />
        <Route path='/employerfamily' element={<EmployerFamily/> } />
        <Route path='/employerhiringprocess' element={<EmployerHiringProcess/> } />
        <Route path='/employerinterview' element={<EmployerInterview/> } />
        <Route path='/employerprofile' element={<EmployerProfile/> } />
        <Route path='/employerregistration' element={<EmployerRegistration/> } />
        <Route path='/employersearchresult' element={<EmployerSearchResult/> } />
        <Route path='/helperdetails' element={<HelperDetails/> } />
        <Route path='/helperaccount' element={<HelperAccount/> } />
        <Route path='/helperbooking' element={<HelperBooking/> } />
        <Route path="/helpercontact" element={<HelperContact/> } />
        <Route path='/helpereducation' element={<HelperEducation/> } />
        <Route path='/helperexperience' element={<HelperExperience/> } />
        <Route path='/helperfamily' element={<HelperFamily/> } />
        <Route path='/helperinterview' element={<HelperInterview1/> } />
        <Route path='/helperinterview2' element={<HelperInterview2/> } />
        <Route path='/helperlanguage' element={<HelperLanguage/> } />
        <Route path='/helpermedical' element={<HelperMedical/> } />
        <Route path='/helperprofiledetail' element={<HelperProfileDetail/> } />
        <Route path='/helperprofilefill' element={<HelperProfileFill/> } />
        <Route path='/helperskill' element={<HelperSkill/> } />
        <Route path='/helperlist' element={<FilterList/> } />
        <Route path='/helper_details' element={<HelperBio/> } />
        <Route path='/helpersalary' element={<HelperSalary/> } />
      </Routes> 
    </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
