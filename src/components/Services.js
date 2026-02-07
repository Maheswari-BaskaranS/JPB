import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';




const Services = () => {

  const services = [
    {
      "category": "SPECIALIZE IN MAID RECRUITMENT",
      "services": [
        "Indonesian / Filipino (skilled & reliable)",
        "Full Documentation processing",
        "Quality Bio-data for selection",
        "Replacement guaranteed",
        "Professional counseling & consultation",
        "Extension/ Renewal of Passport & Work Permit",
        "Express arrival",
        "Direct Hire",
        "Air Tickets for Maids"
      ]
    },
    {
      "category": "OTHER FOREIGN WORKER SERVICES",
      "services": [
        "Thailand / India / Bangladeshi / Malaysian/ China",
        "Renewal of Work Permit",
        "New Application"
      ]
    },
    {
      "category": "HOME CLEANING SERVICES",
      "services": [
        "Spring Cleaning",
        "One time Cleaning",
        "Office Cleaning",
        "Home Cleaning",
        "Professional and Reliable Local Cleaner",
        "Professional Inspector",
        "Laundry Services",
        "Professional Confinement Nanny"
      ]
    },
    {
      "category": "PAINTING",
      "services": [
        "Whole House",
        "Painting Door/ Gate"
      ]
    },
    {
      "category": "MOVING HOUSE SERVICES",
      "services": []
    }
  ]
  


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
            <figure><img src="images/banner-about.jpg" alt="JPB"/></figure>
          </div>
        </div>
        <div className="home-banner-bottom-bg inner-banner-shape"> <img src="images/inner-banner-shape.png" alt=""/> </div>
      </div>
      <div className="clear"></div>
    
      <section className="fullcontainer about-section1" data-aos="fade-up">
        <div className="float-icon s5 left-img-1 tp35 left5" data-aos="fade-right"><img src="images/left-img-1.png" alt="" className="responsive"/></div>
        <div className="float-icon s7 right-img-2 tp20 right5" data-aos="fade-left"><img src="images/right-img-1.png" alt="" className="responsive"/></div>
        <div className="inner-container-sm">
          <div className="container container-950 text-center">
            <div className="pageTitle  title-border">
              <h2>Services</h2> </div>
          </div>
        </div>
      </section>

      <div className="fullcontainer about-section3 bg-img" style={{background: '#FFFBE7' , marginTop:130}}>
        <div className="mst-shape"><img src="images/mst-bg-shape.png" alt="" /></div>
        <div className="inner-container pt0">
          <div className="container" data-aos="fade-up">
            <div className="row mst-holder mt50 gutters-10 grid-10  ">
              {services.map((item , index) => (
                <div className="col-lg-4" key={index}>
                <div className="icon-pod-box">
                    {/* <div className="icon-pod-img"> <img src="images/mst-1.png" alt=""/> </div> */}
                    <h4>{item.category}</h4>
                    {item.services.map((row , index) => (
                      <p key={index}>{row}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-space"></div>
      </div>
     
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

export default Services;