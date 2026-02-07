// import React from 'react';
// import { Outlet } from 'react-router-dom';

// const RouterPage = () => {
//   return(
   
//       <>
     
//         <Outlet />
        
//       </>
    
//   );
// }
// export default RouterPage;

import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './HomeFirst';
import About from './About';
import Contact from './Contact';
import News from './News';
import NewsDetail from './NewsDetail';
import WebAgency from './WebAgency';
import Login from './employer/Login';
import ForgetPassword from './employer/ForgetPassword';
import MaidRegistration from './employer/MaidRegistration';
import MakeAppointment from './employer/MakeAppointment';
import EmployerAccount from './employer/EmployerAccount';
import EmployerAddress from './employer/EmployerAddress';
import EmployerBooking from './employer/EmployerBooking';
import EmployerContact from './employer/EmployerContact';
import EmployerFamily from './employer/EmployerFamily';
import EmployerHiringProcess from './employer/EmployerHiringProcess';
import EmployerInterview from './employer/EmployerInterview';
import EmployerProfile from './employer/EmployerProfile';
import EmployerRegistration from './employer/EmployerRegistration';
import EmployerSearchResult from './employer/EmployerSearchResult';
import HelperDetails from './employer/HelperDetails';

import HelperAccount from './helper/HelperAccount';
import HelperBooking from './helper/HelperBooking';
import HelperContact from './helper/HelperContact';
import HelperEducation from './helper/HelperEducation';
import HelperExperience from './helper/HelperExperience';
import HelperFamily from './helper/HelperFamily';
import HelperInterview1 from './helper/HelperInterview1';
import HelperInterview2 from './helper/HelperInterview2';
import HelperLanguage from './helper/HelperLanguage';
import HelperMedical from './helper/HelperMedical';
import HelperProfileDetail from './helper/HelperProfileDetail';
import HelperProfileFill from './helper/HelperProfileFill';
import HelperSkill from './helper/HelperSkill';



const RouterPage = () => {
    return(


      <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Home/>} />
              </Routes>
    </BrowserRouter>


      // <div>
      //   <Router>
       
      //       <Route path="/" element={<Home/>} />
      //   <Route path="/about" element={<About/>} />
      //   <Route path='/news' element={<News/>} />
      //   <Route path='/contact' element={<Contact/>} />
      //   <Route path='/login' element={<Login/>} />
      //   <Route path='/forgetpassword' element={<ForgetPassword/>} />
      //   <Route path='/maidregistration' element={<MaidRegistration/>} />
      //   <Route path='/makeappointment' element={<MakeAppointment/>} />
      //   <Route path='/newsdetail' element={<NewsDetail/>} />
      //   <Route path='/webagency' element={<WebAgency/>} />

      //   <Route path="/employeraccount" element={<EmployerAccount/>} />
      //   <Route path='/employeraddress' element={<EmployerAddress/>} />
      //   <Route path='/employerbooking' element={<EmployerBooking/>} />
      //   <Route path='/employercontact' element={<EmployerContact/>} />
      //   <Route path='/employerfamily' element={<EmployerFamily/>} />
      //   <Route path='/employerhiringprocess' element={<EmployerHiringProcess/>} />
      //   <Route path='/employerinterview' element={<EmployerInterview/>} />
      //   <Route path='/employerprofile' element={<EmployerProfile/>} />
      //   <Route path='/employerregistration' element={<EmployerRegistration/>} />
      //   <Route path='/employersearchresult' element={<EmployerSearchResult/>} />
      //   <Route path='/helperdetails' element={<HelperDetails/>} />

      //   <Route path='/helperaccount' element={<HelperAccount/>} />
      //   <Route path='/helperbooking' element={<HelperBooking/>} />
      //   <Route path="/helpercontact" element={<HelperContact/>} />
      //   <Route path='/helpereducation' element={<HelperEducation/>} />
      //   <Route path='/helperexperience' element={<HelperExperience/>} />
      //   <Route path='/helperfamily' element={<HelperFamily/>} />
      //   <Route path='/helperinterview' element={<HelperInterview1/>} />
      //   <Route path='/helperinterview2' element={<HelperInterview2/>} />
      //   <Route path='/helperlanguage' element={<HelperLanguage/>} />
      //   <Route path='/helpermedical' element={<HelperMedical/>} />
      //   <Route path='/helperprofiledetail' element={<HelperProfileDetail/>} />
      //   <Route path='/helperprofilefill' element={<HelperProfileFill/>} />
      //   <Route path='/helperskill' element={<HelperSkill/>} />

      //   <Route path="*" element={<div>
      //     <h1>404 NOT FOUND</h1>
      //   </div>} />
           
      //   </Router>
      // </div>
    );
  }
  export default RouterPage;





