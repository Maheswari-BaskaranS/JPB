import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { sendRegOTP, verifyRegOTP } from '../../apiCalls';
import { jpb } from '../../config';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import './forgotpassword.css';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPasswords = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
      const [selectedLink, setSelectedLink] = useState('/');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const module = searchParams.get("module") || "Employer"; 

    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };

     useEffect(() => {
        setSelectedLink(window.location.pathname);
        
          
      }, []);

    const handleLinkClick = (link) => {
        //navigate(link);
        window.location.href = link
        setSelectedLink(link);
      };

    const toggleLoginPasswordVisibile = () => {
        setShowPassword(!showPassword);
    };

    const handleSendOTP = async () => {
        try {
            const emailEncoded = encodeURIComponent(email); // Ensure email is encoded
            const url = `${jpb.baseUrl}/api/SendOTP?OrgId=${jpb.OrgId}&Email=${emailEncoded}&Module=${module}`;

            const response = await fetch(url, {
                method: 'POST', // Use POST method to send the parameters via URL
            });

            const data = await response.json();
            if (data && data.length > 0) {
                toast.success("OTP Sent to Mail")
                setStep(2); // OTP sent, move to next step
            } else {
                setError('Failed to send OTP. Try again.');
            }

        } catch (err) {
            setError('Error sending OTP.');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await verifyRegOTP({ OrgId: jpb.OrgId, Email: email, OTP: otp, Module: module });
            if (response?.Status) {
                fetchEmployerDetails(email);
                toast.success("Email Verified")
                setStep(3);
            } else {
                setError('Invalid OTP. Try again.');
            }
        } catch (err) {
            setError('Error verifying OTP.');
        }
    };

    const fetchEmployerDetails = async (email) => {
        try {
            const response = await fetch(`${jpb.baseUrl}/Helper/GetAll?OrganizationId=1`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error("Something went wrong while fetching data.");
            }
    
            const data = await response.json();
            console.log("Helper Data:", data);
    
            if (data.Data && data.Data.length > 0) {
                const employer = data.Data.find(emp => emp.Email === email);
    
                if (employer) {
                    localStorage.setItem("HelperCode", employer.CVCode); // Store correctly
                    localStorage.setItem("HelperName", employer.FullName);
                    console.log("Stored Employer Details:", employer);
                } else {
                    console.log("No matching employer found for email:", email);
                }
            }
        } catch (error) {
            console.error("Error fetching employer details:", error);
        }
    };
    

    const  CVCode = localStorage.getItem("CVCode")

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        const CVCode = localStorage.getItem("HelperCode"); // Retrieve correctly
    
        if (!CVCode) {
            setError("Helper Code not found. Try again.");
            return;
        }
    
        try {
            const response = await fetch(`${jpb.baseUrl}/Helper/HelperPasswordUpdate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    OrgId: jpb.OrgId,
                    Email: email,
                    Password: password,
                    EmployerCode: CVCode, // Use correctly retrieved CVCode
                })
            });
    
            const data = await response.json();
            if (data?.Status === true) {
                toast.success('Password updated successfully');
                handleLinkClick('/login');
            } else {
                setError('Password update failed.');
            }
        } catch (err) {
            setError('Error updating password.');
        }
    };
    

    return (
        <div id="wrapper">
            <Header />
            <div className="main-content-container">
                <div className="password-reset-wrapper">
                    <div className="password-reset-inner-container">
                        <div className="password-reset-content">
                            <div className="password-reset-box">
                                <div className="password-reset-form-container">
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {step === 1 && (
                                        <div>
                                            <h2>Forgot Password?</h2>
                                            <input type="email" className="input-field" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <button className="submit-button" onClick={handleSendOTP}>Send OTP</button>
                                        </div>
                                    )}
                                    {step === 2 && (
                                        <div>
                                            <h2>Verify OTP</h2>
                                            <input type="text" className="input-field" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                            <button className="submit-button" onClick={handleVerifyOTP}>Verify OTP</button>
                                        </div>
                                    )}
                                    {step === 3 && (
                                        <div>
                                            <h2>Reset Password</h2>
                                            <div className="password-field-container">
                                                <input 
                                                    type={showLoginPassword ? "text" : "password"}
                                                    className="input-field"
                                                    placeholder="New Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <span onClick={toggleLoginPasswordVisibility} className="eye-icon">
                                                    {showLoginPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
                                                </span>
                                            </div>
                                            <div className="password-field-container">
                                                <input 
                                                    type={showPassword ? "text" : "password"}
                                                    className="input-field"
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                              <button 
    className="submit-button" 
    onClick={handleResetPassword} 
    disabled={password !== confirmPassword || !password || !confirmPassword}
>
    Update Password
</button>

                                                <span onClick={toggleLoginPasswordVisibile} className="eye-icon" style={{ paddingBottom: "55px" }}>
                                                    {showPassword ? <Eye color='black' /> : <EyeSlash color='black' />}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <Link to="/login" className="back-to-login-button">Back to Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <QuickSearch />
        </div>
    );
};

export default ForgetPasswords;
