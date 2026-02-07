import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jpb } from '../../config';

const EmployerBooking = () => {
  const [selectedLink, setSelectedLink] = useState('/');
  const [orders, setOrders] = useState([]); // State to hold orders data
  const [isloggedin, setIsLoggedIn] = useState(false);
  
  const EmployerCode = localStorage.getItem("EmployerCode");
  const EmployerName = localStorage.getItem("EmployerName");

console.log(orders);


  useEffect(() => {
    setSelectedLink(window.location.pathname);
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${jpb.baseUrl}/Booking/GetAllPayment?OrganizationId=${jpb.OrgId}`
        );
        const data = await response.json();
        if (data.Status) {
          // Filter the data based on EmployerCode
          const filteredOrders = data.Data.filter(
            (order) => order.EmployerCode === EmployerCode
          );
          setOrders(filteredOrders);
        } else {
          console.error("Failed to fetch orders:", data.Message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [EmployerCode]); // Fetch orders when EmployerCode changes

  const handleLinkClick = (link) => {
    window.location.href = link;
    setSelectedLink(link);
  };

  return (
    <div>
      <div id="wrapper">
        <Header />
        <div className="clear"></div>
        <div className="clear"></div>
        <div className="main-content-wrapper">
          <div className="bannerWrapper">
            <div className="banner inner-banner">
              <div className="inner-banner-img img-holder img-cover">
                <figure><img src="images/banner-employer-dashboard.jpg" alt="JPB" /></figure>
              </div>
            </div>
            <div className="home-banner-bottom-bg inner-banner-shape">
              <img src="images/inner-banner-shape.png" alt="" />
            </div>
          </div>
          <div className="clear"></div>

          <section className="fullcontainer dashboard ebpd-page" data-aos="fade-up">
            <div className="inner-container-md">
              <div className="container">
                <div className="pageTitle md"><h2>Employer Dashboard</h2></div>
                <div className="row">
                  <div className="col-lg-auto mb-991-30">
                    <div className="sidebar">
                      <div className="sidebar-title"><h5>Hi {EmployerName},</h5></div>
                      <a className="btn-control-notext show-lg" href="#nav">Select</a>
                      <ul id="nav" className="nav-1 hide-lg">
                        <li className={selectedLink === '/employeraccount' ? 'active' : ''}>
                          <Link to="/employeraccount" onClick={() => { handleLinkClick('/employeraccount'); }}>Account Details</Link>
                        </li>
                        <li className={selectedLink === '/employerprofile' ? 'active' : ''}><Link to="/employerprofile" onClick={() => { handleLinkClick('/employerprofile');}}>Personal Profile Details</Link></li>
                <li className={selectedLink === '/employercontact' ? 'active' : ''}><Link to="/employercontact" onClick={() => { handleLinkClick('/employercontact');}}> Contact Details</Link></li>
                <li className={selectedLink === '/employeraddress' ? 'active' : ''}><Link to="/employeraddress" onClick={() => { handleLinkClick('/employeraddress');}}>Address</Link></li>
                <li className={selectedLink === '/employerfamily' ? 'active' : ''}><Link to="/employerfamily" onClick={() => { handleLinkClick('/employerfamily');}}>Family Details & Job Scope</Link></li>
                <li className={selectedLink === '/employerInterview' ? 'active' : ''}><Link to="/employerInterview" onClick={() => { handleLinkClick('/employerInterview');}}> Interview Appointment Details</Link></li>
                <li className={selectedLink === '/employerbooking' ? 'active' : ''}><Link to="/employerbooking" onClick={() => { handleLinkClick('/employerbooking');}}> Booking & Payment Details</Link></li>
                <li className={selectedLink === '/employersalary' ? 'active' : ''}><Link to="/employersalary" onClick={() => { handleLinkClick('/employersalary');}}> Salary Schedule</Link></li>
              
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="dashboard-right-wrap ebpd-wrap">
                      <div className="table-holder Scrollcontent" data-mcs-theme="dark">
                        <table className="table responsive-table big-table">
                          <thead>
                            <tr>
                              <th>Transaction ID</th>
                              <th>Account Number</th>
                              <th>Booking No.</th>
                              <th>Helper Code</th>
                              <th>Helper Name</th>
                              <th>Payment Status</th>
                              <th>Processing Status</th>
                              <th>Helper Employment Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length > 0 ? (
                              orders.map((order, index) => (
                                <tr key={index}>
                                  <td>{order.PaymentNo || 'N/A'}</td>
                                  <td>{order.AccountNo||'N/A'}</td>
                                  <td>{order.AgreementNo}</td>
                                  <td>{order.Helper || 'N/A'}</td>
                                  <td>{order.HelperName || 'N/A'}</td>
                                  <td>{order.Status || 'Pending'}</td>
                                  <td>
                                    <a href="javascript:void(0);" className={`m-status ${order.ProcessingStatus || 'pending'}`}>
                                      {order.ProcessingStatus || 'Pending'}
                                    </a>
                                  </td>
                                  <td>{order.Status || 'Active'}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7">No payment records found.</td>
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

          <div className="footer-space"></div>
          <div className="clear"></div>
        </div>

        <div className="clear"></div>
        <div className="pushContainer"></div>
        <div className="clear"></div>
      </div>
      <Footer />
      <QuickSearch />
    </div>
  );
};

export default EmployerBooking;
