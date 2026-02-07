import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';
import { Link } from 'react-router-dom';



const Contact = () => {
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
            <figure><img src="images/banner-contact-us.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
           
      <section className="fullcontainer contact-us-section2" data-aos="fade-up">
        <div className="inner-container">
          <div className="container">
            <div className="pageTitle text-center title-border">
         <h2>Contact Us</h2> </div>
     <div className="location-holder pt10">
  <div
    className="location-row"
    style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between' }}
  >
    {/* Katong Shopping Centre */}
    <div className="location-box" style={{ flex: '1 1 48%', maxWidth: '48%' }}>
      <div className="location-map">
        <iframe
          title="First"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7851944245276!2d103.89898451533118!3d1.3039083620831309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da186dc00972b9%3A0x149c32224f0cc948!2sKatong%20Shopping%20Centre!5e0!3m2!1sen!2sin!4v1650780069155!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-info">
        <h6
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '20px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          Katong Shopping Centre
        </h6>
        <ul
          className="contact-list"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '13px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <span className="pt20">
              {' '}
              <a href="/">865 Mountbatten Road #1-16, Singapore 437844</a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
    <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Jenny</span> : <a href="https://wa.me/6568440589" target="_blank" rel="noopener noreferrer">6844 0589</a>
  </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
                  <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Helen</span> : <a href="https://wa.me/6563458654" target="_blank" rel="noopener noreferrer">
                6345 8654
              </a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
              <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Geraldine</span> : <a href="https://wa.me/6585001912" target="_blank" rel="noopener noreferrer">
                8500 1912
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Hougang Green */}
    <div className="location-box" style={{ flex: '1 1 48%', maxWidth: '48%' }}>
      <div className="location-map">
        <iframe
          title="Second"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.661832187837!2d103.88588281533096!3d1.3795649618621266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da164168267bbf%3A0xae5a836f4f82f1b0!2sHougang%20Green%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1650783437214!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-info">
        <h6
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '20px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          Hougang Green Shopping Mall
        </h6>
        <ul
          className="contact-list"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '13px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <span className="pt20">
              <a href="/">Blk 21 Hougang Street 51 #2-23, Singapore 538719</a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
              <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Yana</span> : <a href="https://wa.me/6563875422" target="_blank" rel="noopener noreferrer">
                6387 5422
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Bukit Timah */}
    <div className="location-box" style={{ flex: '1 1 48%', maxWidth: '48%' }}>
      <div className="location-map">
        <iframe
          title="Third"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.723050327461!2d103.77384961533096!3d1.3425535119714052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11d085b7bbbf%3A0xa1c1d2dd91fe299d!2sBukit%20Timah%20Shopping%20Centre!5e0!3m2!1sen!2sin!4v1650783512101!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-info">
        <h6
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '20px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          Bukit Timah Shopping Center
        </h6>
        <ul
          className="contact-list"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '13px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <span className="pt20">
              <a href="/">170 Upper Bukit Timah Road #03-49 Singapore 588179</a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
               <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Ahnyi</span> : <a href="https://wa.me/6564670039" target="_blank" rel="noopener noreferrer">
                6467 0039
              </a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
               <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Rose</span> : <a href="https://wa.me/6563865339" target="_blank" rel="noopener noreferrer">
                6386 5339
              </a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
               <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '13px', color: 'var(--dark)', fontWeight: 'normal' }}>Cindy</span> : <a href="https://wa.me/6564632767" target="_blank" rel="noopener noreferrer">
                6463 2767
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Eunos Crescent */}
    <div className="location-box" style={{ flex: '1 1 48%', maxWidth: '48%' }}>
      <div className="location-map">
        <iframe
          title="Fourth"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7574501520194!2d103.9005493153311!3d1.3213011620331498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da181b54bc3da5%3A0x8fe03839a33a800b!2s1A%20Eunos%20Cres%2C%20%2301%202467%2C%20Singapore%20401001!5e0!3m2!1sen!2sin!4v1650783539996!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-info">
        <h6
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '20px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          Eunos Crescent
        </h6>
        <ul
          className="contact-list"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '13px',
            color: 'var(--dark)',
            fontWeight: 'normal',
          }}
        >
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <span className="pt20">
              <a href="/">1A Eunos Crescent #01-2467, Singapore 401001</a>
            </span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
            <span className="pt20">
              <a href="https://wa.me/6567471882" target="_blank" rel="noopener noreferrer">
                6747 1882
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>


            
          </div>
        </div>
            <div className="text-center mb40">
           {/*    <div className="pageTitle text-center title-border">
                <h2>Contact Us</h2> </div> */}
              <h5 className="pt20">Outlet Sales Operating hour:</h5>
                             <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '15px', color: '#007BFF', fontWeight: 'normal' }}>11:00am till 7:30pm (Monday to Friday)
                <br/> 11:00am till 6:00pm (Saturday & Sunday)</span>
              <p
  className="pt20"
  style={{
    fontFamily: "'Fredoka One', cursive",
    fontSize: '18px',
    color: 'var(--dark)',
    fontWeight: 'normal',
    margin: 0,
    paddingTop: '20px',
    lineHeight: 1.6,
    letterSpacing: '-0.2px'
  }}
>
  We may be closed on public holidays. Please check in advance before visiting.
</p>
</div>
        <div className="footer-space"></div>
      </section>

      
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
}
export default Contact;