import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import QuickSearch from "../Quicksearch";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jpb } from "../../config";
import { toast } from "react-toastify";

const EmployerSalary = () => {
  const [selectedLink, setSelectedLink] = useState("/employersalary");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]); // Store fetched orders
  const [paymentStatus, setPaymentStatus] = useState(() => {
    return JSON.parse(localStorage.getItem("paymentStatus")) || {};
  });
   // Store payment status
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderToPay, setOrderToPay] = useState(null);
  const employerCode = localStorage.getItem("EmployerCode");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${jpb.baseUrl}/Booking/GetByCodebyEmployer?OrganizationId=${jpb.OrgId}&EmployerNo=${employerCode}`
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
  }, [employerCode]);

  const handleLinkClick = (link) => setSelectedLink(link);



  const handleOpenConfirmModal = (order) => {
    setOrderToPay(order);
    setShowConfirmModal(true);
  };

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
        const updatedStatus = { ...paymentStatus };
        salaries.forEach((item) => {
          if (item.IsEmployerReceived) {
            updatedStatus[item.SlNo] = true;
          }
        });
        setPaymentStatus(updatedStatus);
        localStorage.setItem("paymentStatus", JSON.stringify(updatedStatus)); // Save to localStorage
      }else {
        setSalaryDetails([]);
        toast.error("Failed to fetch salary details");
      }
    } catch (error) {
      setSalaryDetails([]);
      toast.error("Error fetching salary details");
      console.error("Error fetching salary details:", error);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setOrderToPay(null);
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
        `${jpb.baseUrl}/Booking/EmployerPaid?OrganizationId=1&BookingNumber=${selectedOrder.AgreementNo}&SerialNo=${selectedSalary.SlNo}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );
      if (response.ok) {
        toast.success("Payment successful");
        setPaymentStatus((prevStatus) => ({
          ...prevStatus,
          [selectedSalary.SlNo]: true,
        }));
        setShowConfirmModal(false);
        handleModalToggle(selectedOrder);
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  const EmployerName = localStorage.getItem("EmployerName");

  return (
    <div>
      <div id="wrapper">
        <Header />
        <div className="clear"></div>

        <div className="main-content-wrapper">
          <section className="fullcontainer dashboard ebpd-page">
            <div className="inner-container-md">
              <div className="container">
                <div className="pageTitle md">
                  <h2>Employer Dashboard</h2>
                </div>
                <div className="row">
                  {/* Sidebar */}
                  <div className="col-lg-auto mb-991-30">
                    <div className="sidebar">
                      <div className="sidebar-title">
                        <h5>Hi {EmployerName},</h5>
                      </div>
                      <ul id="nav" className="nav-1 hide-lg">
                        <li className={selectedLink === "/employeraccount" ? "active" : ""}>
                          <Link to="/employeraccount" onClick={() => handleLinkClick("/employeraccount")}>
                            Account Details
                          </Link>
                        </li>
                        <li className={selectedLink === '/employerprofile' ? 'active' : ''}><Link to="/employerprofile" onClick={() => { handleLinkClick('/employerprofile');}}>Personal Profile Details</Link></li>
                                        <li className={selectedLink === '/employercontact' ? 'active' : ''}><Link to="/employercontact" onClick={() => { handleLinkClick('/employercontact');}}> Contact Details</Link></li>
                                        <li className={selectedLink === '/employeraddress' ? 'active' : ''}><Link to="/employeraddress" onClick={() => { handleLinkClick('/employeraddress');}}>Address</Link></li>
                                        <li className={selectedLink === '/employerfamily' ? 'active' : ''}><Link to="/employerfamily" onClick={() => { handleLinkClick('/employerfamily');}}>Family Details & Job Scope</Link></li>
                                        <li className={selectedLink === '/employerInterview' ? 'active' : ''}><Link to="/employerInterview" onClick={() => { handleLinkClick('/employerInterview');}}> Interview Appointment Details</Link></li>
                                        <li className={selectedLink === '/employerbooking' ? 'active' : ''}><Link to="/employerbooking" onClick={() => { handleLinkClick('/employerbooking');}}> Booking & Payment Details</Link></li>
                        
                        <li className={selectedLink === "/employersalary" ? "active" : ""}>
                          <Link to="/employersalary" onClick={() => handleLinkClick("/employersalary")}>
                            Salary Schedule
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Salary Table */}
                  <div className="col-lg-8">
                    <div className="dashboard-right-wrap ebpd-wrap">
                      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        <table className="table table-bordered">
                          <thead className="bg-light">
                            <tr>
                              <th>Booking No.</th>
                              <th>Package Code</th>
                              <th>Helper Nationality</th>
                              <th>Helper Code</th>
                              <th>Helper Name</th>
                              <th>Placement Fees</th>
                              <th>Basic Salary</th>
                              <th>Pocket Money</th>
                              <th>Off Day Rate</th>
                              <th>Monthly Days Off</th>
                              <th>Balance Amount</th>
                              <th>Schedule Commence Date</th>
                              <th>Commencement Date Included</th>
                              <th>Details Monthwise</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length > 0 ? (
                              orders.map((order) => (
                                <tr key={order.AgreementNo || '-'}>
                                  <td>{order.AgreementNo || '-'}</td>
                                  <td>{order.PackageCode || '-'}</td>
                                  <td>{order.PackageHelperNationality || '-'}</td>
                                  <td>{order.Helper || '-'}</td>
                                  <td>{order.HelperName || '-'}</td>
                                  <td>{order.PlacementFee || '-'}</td>
                                  <td>{order.BasicSalary || '-'}</td>
                                  <td>{order.PocketMoney || '-'}</td>
                                  <td>{order.OffDayRate || '-'}</td>
                                  <td>{order.MonthlyOffDays || '-'}</td>
                                  <td>{order.BalanceAmount || '-'}</td>
                                  <td>{order.AgreementDateString || '-'}</td>
                                  <td>{order.IsInclCommencementDate ? "Yes" : "No"}</td>
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
                                  No salary data available.
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
                      variant={paymentStatus[item.SlNo] ? "secondary" : "success"}
                      disabled={paymentStatus[item.SlNo]}
                      onClick={() => {
                        setSelectedSalary(item);
                        setShowConfirmModal(true);
                      }}
                    >
                      {paymentStatus[item.SlNo] ? "Paid" : "Pay"}
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
            <Modal.Title>Confirm Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Total Salary Amount: {selectedSalary.HelperReceived}</p>
            <p>Are you sure you want to proceed?</p>
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
        <Footer />
        <QuickSearch />
      </div>
    </div>
  );
};

export default EmployerSalary;
