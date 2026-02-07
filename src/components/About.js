import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';
import YouTube from 'react-youtube';




const About = () => {

  const opts = {
    height: 500,
    width: 500,
    playerVars: {
      autoplay: 1,
    },
  };


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
              <h2>About us</h2> </div>
            <p>Our company, JPB Group has more than 23 years of rich experience in providing household with well-trained workers for Singapore, Hongkong, Taiwan and Malaysia.</p>
            <p>Our agency also supplies labour for Malaysia in construction industry. To be the biggest worker’s supplier in this region, we have built huge network in Indonesia, Philippines to fulfil our customers’ requirements. Myanmar 10000-meter square training center which is fully equipped with training’s equipment.</p>
            <p>JPB Employment Pte Ltd is synonymous with excellence and efficiency in the maid employment industry. With more than a decade of experience, JPB Employment Pte Ltd has earned the reputation as the leading maid employment agency in providing well-trained and service-oriented maids in Singapore and neighboring regions as well. In essence, the success and recognition that JPB Employment Pte Ltd receives comes from the company’s strength in providing quality maids for their customers based on their requirements.</p>
          </div>
        </div>
      </section>

      <div style={{width:'80%' , margin:'0 auto'}}>
        <YouTube videoId="wzH-Tfuf3ak" opts={opts} />
      </div>
     
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
                  <div className="pageTitle  title-border">
                    <h2>Our Philosophy</h2> </div>
                  <p className="size-26">The JPB Employment Pte Ltd is the industry leader in providing quality helper, Nannies, Construction workers, Professional, Nurse and other employment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float-icon ms-right img-animation-holder"><img src="images/ms-right.png" alt="" /></div>
        <div className="float-icon ms-left"><img src="images/op-home.png" alt="" /></div>
      </section>
      
      <div className="fullcontainer about-section3 bg-img" style={{background: '#FFFBE7'}}>
        <div className="mst-shape"><img src="images/mst-bg-shape.png" alt="" /></div>
        <div className="inner-container pt0">
          <div className="container" data-aos="fade-up">
            <div className="row mst-holder mt50 gutters-10 grid-10  ">
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="pageTitle">
                    <h2>Maids are specially trained in</h2></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="icon-pod-img"> <img src="images/mst-1.png" alt=""/> </div>
                  <h6>Aged Care</h6>
                  <p>Knowing that your loved ones is at the end of his/her life journey is emotionally straining for the family and the required logistic is complicated to set. Our maids will take care of them for you.</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="icon-pod-img"> <img src="images/mst-2.png" alt=""/> </div>
                  <h6>Infant Care</h6>
                  <p>Our maids strive to meet and develop the physical, cognitive and psycho-social needs of the infant in a safe and conducive environment. A specialized training is given to our maids working with babies.</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="icon-pod-img"> <img src="images/mst-3.png" alt=""/> </div>
                  <h6>Cooking</h6>
                  <p>Our maids undergo special cooking training to be confident in the kitchen so that they have the ability to prepare tasty and well-balanced meals for families. </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="icon-pod-img"> <img src="images/mst-4.png" alt=""/> </div>
                  <h6>Worker</h6>
                  <p>BCA Certified and experience in
                    <br/> Construction work and etc</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="icon-pod-box">
                  <div className="icon-pod-img"> <img src="images/mst-2.png" alt=""/> </div>
                  <h6>Nurse</h6>
                  <p>Train in hospital and certified Nurses</p>
                </div>
              </div>
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
<section className="fullcontainer home-section3 bg-img" style={{ background: 'url(images/tst-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '60px 0' }} data-aos="fade-up">
  <div className="inner-container-lg">
    <div className="container text-center">
      <div className="pageTitle title-border text-center">
        <h2>Testimonials</h2>
      </div>

      <h4 className="mb-5 ">What our customers said about our maids</h4>

      <div className="row gutters-15">
        {[
          { text: "JPB provided me an excellent maid that solved all my household trouble.", author: "Mrs Sarah" },
          { text: "Professional Recruitment. As a supplier, they ensure the quality of the domestic worker; the maid’s standard is higher than other.", author: "Agents" },
          { text: "Thanks to JPB, I am able to have a super maid that takes care of my family and my daughter’s needs so well that I can concentrate on my career.", author: "A single mother" },
          { text: "She is capable, good at cooking and sincerely makes us feel like she is one of our family members.", author: "Mr. K.K Ong" },
          { text: "JPB is the best selection for whoever needs a domestic worker.", author: "Mrs. Mohammed" },
          { text: "Honest, capable, hardworking and a good cook. I’m glad that I found her, thank you JPB.", author: "Lynn Khoo" },
        ].map((t, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="acs-box text-center p-4 h-100 bg-white rounded shadow-sm">
              <div className="qta-img text-center mb-3">
                <img src="images/qta.png" alt="quote" style={{ height: '30px' }} />
              </div>
              <div className="clt-info color1">
                <p className="text-dark">"{t.text}"</p>
              </div>
              <div className="hs-bottom mt-3">
                <h6 className="mb-0">{t.author}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mt-5 mb-4 ">What our customers said about our services</h4>

      <div className="row gutters-15">
        {[
          { text: "I have been using JPB for years and benefit from their reliable and professional services in providing the best helper for my family.", author: "Mrs. Lee" },
          { text: "I used to worry about the complicated procedure of hiring a domestic maid but JPB make the procedure simple, fast and dependable.", author: "Mr. Khoo" },
          { text: "My husband and I were overwhelmed by JPB friendly attitude and good services and we never regret our choice.", author: "Mrs. Lai" },
        ].map((t, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="acs-box text-center p-4 h-100 bg-white rounded shadow-sm">
              <div className="qta-img text-center mb-3">
                <img src="images/qta.png" alt="quote" style={{ height: '30px' }} />
              </div>
              <div className="clt-info color1">
                <p className="text-dark">"{t.text}"</p>
              </div>
              <div className="hs-bottom mt-3">
                <h6 className="mb-0">{t.author}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


<Footer/>
<QuickSearch/>
  </div>
  );
};

export default About;