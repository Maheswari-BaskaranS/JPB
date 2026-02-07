import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Testimonials = () => {


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
    
      const carouselSettings = {
        responsive: responsive,
        autoPlay: true, 
        autoPlaySpeed: 5000, 
        infinite: true,
      };


      const testimonials = [
        {
          "testimonial": "JPB provided me an excellent maid that solved all my household trouble.",
          "name": "Mrs Sarah"
        },
        {
          "testimonial": "Professional Recruitment. As a supplier, they ensure the quality of the domestic worker; the maid’s standard is higher than other.",
          "name": "Agents"
        },
        {
          "testimonial": "Thanks to JPB, I am able to have a super maid that takes care of my family and my daughter’s needs so well that I can concentrate on my career.",
          "name": "A single mother"
        },
        {
          "testimonial": "She is capable, good at cooking and sincerely makes us feel like she is one of our family members.",
          "name": "Mr. K.K Ong"
        },
        {
          "testimonial": "JPB is the best selection for whoever needs a domestic worker.",
          "name": "Mrs. Mohammed"
        },
        {
          "testimonial": "Honest, capable, hardworking and a good cook. I’m glad that I found her, thank you JPB.",
          "name": "Lynn Khoo"
        },
        {
          "testimonial": "I have been using JPB for years and benefit from their reliable and professional services in providing the best helper for my family.",
          "name": "Mrs. Lee"
        },
        {
          "testimonial": "I used to worry about the complicated procedure of hiring a domestic maid but JPB make the procedure simple, fast and dependable.",
          "name": "Mr. Khoo"
        },
        {
          "testimonial": "My husband and I were overwhelmed by JPB friendly attitude and good services and we never regret our choice.",
          "name": "Mrs. Lai"
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
              <h2>Testimonials</h2> </div>
           </div>
        </div>
      </section>
     
      <section className="fullcontainer about-section2" data-aos="fade-up">
        <div className="float-icon s7 we-img-3 tp0 right25" data-aos="fade-left"><img src="images/we-img-3.png" alt="" className="responsive"/></div>
        <div className="inner-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-6" data-aos="zoom-in">
                <div className="abt-photo text-center row-inner-lg leftpad pl50 lg rightpad pr20" data-tilt data-tilt-max="10" data-tilt-speed="600" data-tilt-perspective="800"> <img src="images/our-philosophy.png" alt=""/> </div>
              </div>
              <div className="col-lg-6 align-self-center" data-aos="fade-up">
                <div className="about-content rightpad xl">
                <Carousel {...carouselSettings}>
                    {testimonials.map((item , index)=>(
                            <div key={index}>
                            <div className="pageTitle  title-border">
                                <h2>{item.name}</h2> 
                            </div>
                            <p className="size-26">{item.testimonial}</p>
                            </div>
                    ))}
                </Carousel>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float-icon ms-right img-animation-holder"><img src="images/ms-right.png" alt="" /></div>
        <div className="float-icon ms-left"><img src="images/op-home.png" alt="" /></div>
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
};

export default Testimonials;