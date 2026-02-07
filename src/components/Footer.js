import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jpb } from '../config';
import { toast } from 'react-toastify';
function Footer() {
  const [selectedLink, setSelectedLink] = useState('/');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();
  useEffect(() => {
    setSelectedLink(window.location.pathname);
  }, []);

  const handleLinkClick = (link) => {
    window.location.href = link
    setSelectedLink(link);
  };

  const handleSendNewsLetter = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const url = `${jpb.baseUrl}/SendOTP/SendNewsLetter?Email=${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        method: 'POST',
      });

      const data = await response.json();

     if (data?.Status === true) {
        toast.success('Newsletter sent to email');
        setEmail('');
        setError('');
      } else {
        setError('Failed to send. Try again.');
      }
    } catch (err) {
      setError('Error sending email.');
    }
  };



return (
    <div>
<footer className="footer-wrapper">
        <div className="footer-bottom  bg-img-tc" style={{background: 'url(images/footer-bg.png)'}}>
          <div className="footer-container">
            <div className="inner-container" data-aos="fade-up">
              <div className="row justify-content-between">
                <div className="col-sm-6 col-lg-auto">
                  <div className="ftbox ftbox1">
                    <div className="footer-logo">
                      <Link to="/" onClick={() => { handleLinkClick('/');}}><img src="images/logo-footer.png" alt="JPB" /></Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-auto">
                  <div className="ftbox ftbox2">
                    <h6>Contact Us</h6>
                    <ul className="contact-list">
                      <li><i className="fas fa-map-marker-alt" />865 Mountbatten Road 
                        <br /> #1-16, Singapore 437844</li>
                      <li><i className="fas fa-phone-alt" />+65 6844 0589</li>
                      {/*   <li><i className="fas fa-fax"></i><a href="/">6844 4695</a></li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-auto">
                  <div className="ftbox ftbox3">
                    <h6>Sitemap</h6>
                    <ul className="footer-nav">
                      <li className={selectedLink === '/' ? 'selected' : ''}>
                            <Link to="/" onClick={() => { handleLinkClick('/');}}>
                              Home
                            </Link>
                          </li>
                      {/* <li className={selectedLink === '/services' ? 'selected' : ''}>
                            <Link to="/services" onClick={() => handleLinkClick('/services')}>
                              Services
                            </Link>
                          </li> */}
                      <li className={selectedLink === '/about' ? 'selected has-sub' : 'has-sub'}>
                            <Link to="/about" onClick={() => handleLinkClick('/about')}>
                              About Us
                            </Link>
                           
                          </li>
                          <li className={selectedLink === '/news' ? 'selected' : ''}>
                            <Link to="/news" onClick={() => handleLinkClick('/news')}>
                              News and Events
                            </Link>
                          </li>
                          <li className={selectedLink === '/contact' ? 'selected' : ''}>
                            <Link to="/contact" onClick={() => handleLinkClick('/contact')}>
                              Contact Us
                            </Link>
                          </li>
                          <li className={selectedLink === '/services' ? 'selected' : ''}>
                            <Link to="/services" onClick={() => handleLinkClick('/services')}>
                              Services
                            </Link>
                          </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-auto">
                  <div className="ftbox ftbox4">
                    <h6>Helpful Links</h6>
                    <ul className="footer-nav">
                      <li><Link to="/helperaccount" onClick={() => handleLinkClick('/helperaccount')}>My Account</Link></li>
                      <li className={selectedLink === '/related_links' ? 'selected' : ''}>
                        <Link to="/related_links" onClick={() => handleLinkClick('/related_links')}>
                          Related Links
                        </Link>
                      </li>
                    {/*   <li><Link to="/" >Privacy Policy</Link></li>
                      <li className={selectedLink === '/testimonials' ? 'selected' : ''}>
                        <Link to="/testimonials" onClick={() => handleLinkClick('/testimonials')}>
                          Testimonials
                        </Link>
                      </li>
                      <li className={selectedLink === '/related_links' ? 'selected' : ''}>
                        <Link to="/related_links" onClick={() => handleLinkClick('/related_links')}>
                          Related links
                        </Link>
                      </li>    */}                 
                    </ul>
                  </div>
                </div>
                <div className="col-lg-auto">
                <div className="col-lg-auto">
 <div className="ftbox ftbox5">
      <h6>Newsletter Subscription</h6>
      <div className="newsletter-holder" style={{ position: 'relative', width: '450px' }}>
        <input
          type="email"
          className="form-control newsletter-input"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            paddingRight: '140px',
            height: '50px',
            borderRadius: '8px',
          }}
        />
        <button
          className="custom-button no-arrow newsletter-button btn-arrow"
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            height: '100%',
            width: '140px',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            fontSize: '14px',
          }}
          onClick={handleSendNewsLetter} // ✅ don't call it immediately
        >
          SUBSCRIBE <i className="show-lg fas fa-paper-plane" />
        </button>
        {error && (
          <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>
        )}
      </div>
    </div>
</div>

</div>


              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="home-container">
            <div className="row align-items-center grid-10 gutters-10 justify-content-between">
              <div className="col-md-auto">
                <div className="copyright white">Copyright ©
                  JPB Group. <span className="text-pre"> All rights reserved.</span> <Link to="/" target="_blank"> Web Excellence by <strong>Appxperts</strong></Link></div>
              </div>
              <div className="col-lg-auto">
                <div className="footer-social"> <span>Follow Us:</span>
                  <ul className="social-icons">
                    <li><Link to="/" ><i className="fab fa-facebook-f" /></Link></li>
                    <li><Link to="/" ><i className="fab fa-instagram" /></Link></li>
                    <li><Link to="/" ><i className="fab fa-twitter" /></Link></li>
                    <li><Link to="/" ><i className="fab fa-tiktok" /></Link></li>
                    <li><Link to="/" ><i className="fab fa-youtube" /></Link></li>
                    <li><Link to="/" ><i className="fab fa-google" /></Link></li>
                    {/* <li><Link to="/" ><i className="fab fa-whatsapp" /></Link></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
);
}
export default Footer;