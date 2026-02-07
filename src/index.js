// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import './components/css/style.css';
// import './components/css/plugins.css';
// import './components/css/responsive.css';
// import './App.css';
// import RouterPage from './components/RouterPage';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Home from './components/HomeFirst';
// import About from './components/About';
// import Contact from './components/Contact';
// import News from './components/News';
// import NewsDetail from './components/NewsDetail';
// import WebAgency from './components/WebAgency';
// import Login from './components/employer/Login';
// import ForgetPassword from './components/employer/ForgetPassword';
// import MaidRegistration from './components/employer/MaidRegistration';
// import MakeAppointment from './components/employer/MakeAppointment';
// import EmployerAccount from './components/employer/EmployerAccount';
// import EmployerAddress from './components/employer/EmployerAddress';
// import EmployerBooking from './components/employer/EmployerBooking';
// import EmployerContact from './components/employer/EmployerContact';
// import EmployerFamily from './components/employer/EmployerFamily';
// import EmployerHiringProcess from './components/employer/EmployerHiringProcess';
// import EmployerInterview from './components/employer/EmployerInterview';
// import EmployerProfile from './components/employer/EmployerProfile';
// import EmployerRegistration from './components/employer/EmployerRegistration';
// import EmployerSearchResult from './components/employer/EmployerSearchResult';
// import HelperDetails from './components/employer/HelperDetails';

// import HelperLogin from './components/helper/HelperLogin';
// import HelperAccount from './components/helper/HelperAccount';
// import HelperBooking from './components/helper/HelperBooking';
// import HelperContact from './components/helper/HelperContact';
// import HelperEducation from './components/helper/HelperEducation';
// import HelperExperience from './components/helper/HelperExperience';
// import HelperFamily from './components/helper/HelperFamily';
// import HelperInterview1 from './components/helper/HelperInterview1';
// import HelperInterview2 from './components/helper/HelperInterview2';
// import HelperLanguage from './components/helper/HelperLanguage';
// import HelperMedical from './components/helper/HelperMedical';
// import HelperProfileDetail from './components/helper/HelperProfileDetail';
// import HelperProfileFill from './components/helper/HelperProfileFill';
// import HelperSkill from './components/helper/HelperSkill';

// import App from './App';
// const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <RouterPage />,
//       children: [
//         { path:"/", element:<Home/> },
//         { path:"/about", element:<About/> },
//         { path:'/news', element:<News/> },
//         { path:'/contact', element:<Contact/> },
//         { path:'/login', element:<Login/> },
//         { path:'/helperlogin', element:<HelperLogin/> },
//         { path:'/forgetpassword', element:<ForgetPassword/> },
//         { path:'/maidregistration', element:<MaidRegistration/> },
//         { path:'/makeappointment', element:<MakeAppointment/> },
//         { path:'/newsdetail', element:<NewsDetail/> },
//         { path:'/webagency', element:<WebAgency/> },

//         { path:"/employeraccount", element:<EmployerAccount/> },
//         { path:'/employeraddress', element:<EmployerAddress/> },
//         { path:'/employerbooking', element:<EmployerBooking/> },
//         { path:'/employercontact', element:<EmployerContact/> },
//         { path:'/employerfamily', element:<EmployerFamily/> },
//         { path:'/employerhiringprocess', element:<EmployerHiringProcess/> },
//         { path:'/employerinterview', element:<EmployerInterview/> },
//         { path:'/employerprofile', element:<EmployerProfile/> },
//         { path:'/employerregistration', element:<EmployerRegistration/> },
//         { path:'/employersearchresult', element:<EmployerSearchResult/> },
//         { path:'/helperdetails', element:<HelperDetails/> },

//         { path:'/helperaccount', element:<HelperAccount/> },
//         { path:'/helperbooking', element:<HelperBooking/> },
//         { path:"/helpercontact", element:<HelperContact/> },
//         { path:'/helpereducation', element:<HelperEducation/> },
//         { path:'/helperexperience', element:<HelperExperience/> },
//         { path:'/helperfamily', element:<HelperFamily/> },
//         { path:'/helperinterview', element:<HelperInterview1/> },
//         { path:'/helperinterview2', element:<HelperInterview2/> },
//         { path:'/helperlanguage', element:<HelperLanguage/> },
//         { path:'/helpermedical', element:<HelperMedical/> },
//         { path:'/helperprofiledetail', element:<HelperProfileDetail/> },
//         { path:'/helperprofilefill', element:<HelperProfileFill/> },
//         { path:'/helperskill', element:<HelperSkill/> },

//         { path:"*", element:<div>
//           <h1>404 NOT FOUND</h1>
//         </div> }
//       ],
//     },
//   ]);



//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//        <ToastContainer />
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   );



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';
import './components/css/style.css';
import './components/css/plugins.css';
import './components/css/responsive.css';
import './App.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
