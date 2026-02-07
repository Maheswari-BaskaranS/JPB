import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { jpb } from '../../config';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


const HelperSalary = () => {
  const [selectedLink, setSelectedLink] = useState('/helpersalary');
  const [storedData, setstoreddata] = React.useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
   const [selectedSalary, setSelectedSalary] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
  const [helperName, setHelperName] = useState('');
  const [orders, setOrders] = useState([]); 
  const [ishelperloggedin, setishelperloggedin] = React.useState(false);
 const [paymentStatuss, setPaymentStatuss] = useState(() => {
     return JSON.parse(localStorage.getItem("ReceivedStatus")) || {};
   });
  const [interviewDetails, setInterviewDetails] = useState([])
  // const navigate = useNavigate();
  const HelperName = localStorage.getItem("HelperName");
  const HelperCode = localStorage.getItem("HelperCode")

   useEffect(() => {
     const fetchOrders = async () => {
       try {
         const response = await fetch(
           `${jpb.baseUrl}/Booking/GetAllBookingByHelpercode?OrganizationId=${jpb.OrgId}&HelperCode=${HelperCode}`
         );
         const data = await response.json();
         if (data.Status) {
           setOrders(data.Data.slice(0, 5)); // Limit to 5 records
         } else {
           console.error("Failed to fetch orders:", data.Message);
         }
       } catch (error) {
         console.error("Error fetching orders:", error);
       }
     };
 
     fetchOrders();
   }, [HelperCode]);

   const handleLinkClick = (link) => setSelectedLink(link);



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

   const handleModalToggle = async (order) => {
      setSelectedOrder(order);
      setShowModal(true);
  
      try {
        const response = await fetch(
          `${jpb.baseUrl}/Booking/SalaryGetByCode?OrganizationId=1&BookingNumber=${order.AgreementNo}`
        );
        const data = await response.json();
        console.log(data.Data[0].SalaryScheduleList,"Salary");
        
        if (data.Status) {
          const salaries = data.Data[0].SalaryScheduleList || [];
          setSalaryDetails(salaries);
          const updatedStatus = { ...paymentStatuss };
          salaries.forEach((item) => {
            if (item.IsHelperReceived) {
              updatedStatus[item.SlNo] = true;
            }
          });
          setPaymentStatuss(updatedStatus);
          localStorage.setItem("ReceivedStatus", JSON.stringify(updatedStatus)); // Save to localStorage
        } else {
          setSalaryDetails([]);
          toast.error("Failed to fetch salary details");
        }
      } catch (error) {
        setSalaryDetails([]);
        toast.error("Error fetching salary details");
        console.error("Error fetching salary details:", error);
      }
    };

    const handleModalClose = () => {
      setShowModal(false);
      setSelectedOrder(null);
      setSalaryDetails([]);
    };

    const handlePayment = async () => {
        if (!selectedSalary || !selectedOrder) return;
        
        try {
          const response = await fetch(
            `${jpb.baseUrl}/Booking/HelperReceived?OrganizationId=${jpb.OrgId}&BookingNumber=${selectedOrder.AgreementNo}&SerialNo=${selectedSalary.SlNo}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" }
            }
          );
          if (response.ok) {
            toast.success("Received successful");
            setPaymentStatuss((prevStatus) => ({
              ...prevStatus,
              [selectedSalary.SlNo]: true,
            }));
            setShowConfirmModal(false);
            handleModalToggle(selectedOrder);
          } else {
            toast.error("Failed");
          }
        } catch (error) {
          toast.error("Failed");
        }
      };

  const currentDate = new Date();
  const pastInterviews = interviewDetails.filter((item) => new Date(item.InterviewDate) < currentDate);
  const currentInterviews = interviewDetails.filter((item) => new Date(item.InterviewDate) >= currentDate);

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
      
      <section className="fullcontainer dashboard helper-booking-details hbd-page" data-aos="fade-up">
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
                    <div className="dashboard-right-wrap ebpd-wrap">
                      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        <table className="table table-bordered">
                          <thead className="bg-light">
                          <tr>
                            <th>Booking No.</th>
                            <th>Branch Code</th>
                            <th>Agreement Date</th>
                            <th>Employer Name</th>
                            <th>Package Code</th>
                            <th>Package Name</th>
                            <th>Salary Details Monthwise</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {orders.length > 0 ? (
                          orders.map((order) => (
                            <tr key={order.AgreementNo}>
                              <td>{order.AgreementNo}</td>
                              <td>{order.BranchCode}</td>
                              <td>{order.AgreementDateString}</td>
                              <td>{order.EmployerName}</td>
                              <td>{order.PackageCode}</td>
                              <td>{order.PackageName}</td>
                              <td>
                              <button
                                      className="btn btn-info"
                                      style={{ backgroundColor: "#497897" }}
                                      onClick={() => handleModalToggle(order)}
                                    >
                                      View
                                    </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="14" className="text-center">
                              No data available.
                            </td>
                          </tr>
                        )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  </div>
          </div>
        </div>
        </div>
      </section>
     
  {/* Salary Details Modal */}
  {showModal && selectedOrder && (
            <Modal className="custom-modal" show={showModal} onHide={handleModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title className="text-start w-100">Salary Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {salaryDetails.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Salary Date</th>
                      <th>Off Days</th>
                      <th>Loan</th>
                      <th>Salary</th>
                      <th>Component days</th>
                      <th>Component</th>
                      <th>Total Salary</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryDetails.map((item) => (
                      <tr key={item.SlNo}>
                        <td>{item.SlNo}</td>
                        <td>{item.SalaryDateString || "-"}</td>
                        <td>{item.OffDays}</td>
                        <td>{item.Loan}</td>
                        <td>{item.Salary}</td>
                        <td>{item.ComponentDays}</td>
                        <td>{item.Component}</td>
                        <td>{item.HelperReceived}</td>
                        <td>
                        <Button
                      variant={paymentStatuss[item.SlNo] ? "secondary" : "success"}
                      disabled={paymentStatuss[item.SlNo]}
                      onClick={() => {
                        setSelectedSalary(item);
                        setShowConfirmModal(true);
                      }}
                    >
                      {paymentStatuss[item.SlNo] ? "Received" : "Receive"}
                    </Button>
                    </td>
                                              </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No salary details available.</p>
              )}
              </Modal.Body>
            </Modal>
          )}

                  {/* Payment Confirmation Modal */}
                {showConfirmModal && selectedSalary && (
                  <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Click to Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Total Salary Amount: {selectedSalary.HelperReceived}</p>
                      <p>Are you sure you want to Receive?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        No
                      </Button>
                      <Button variant="primary" onClick={handlePayment}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}

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

export default HelperSalary;