import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';


function Home() {



    return (
      <div>
      <div id="wrapper">
     <Header/>
        <div className="clear" />
        <div className="clear" />
        <div className="main-content-wrapper">
          <div className="bannerWrapper" data-aos="fade-in">
            <div className="banner">
              <div className="homeBannerSlider">
                <div className="banner-slide">
                  <div className="home-banner-img-holder">
                    <div className="home-banner-img img-holder img-cover">
                      <figure><img src="images/banner-home.jpg" alt="JPB" /></figure>
                    </div>
                  </div>
                  <div className="banner_caption">
                    <div className="captionWrapper container">
                      <div className="captionContainer">
                        <div className="captionContainerInner">
                          <h2 data-animation-in="fadeInUp" >Bringing You A Touch of Cleanliness</h2>
                          <p data-animation-in="fadeInUp" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore</p> <a data-animation-in="fadeInUp" data-delay-in="0.9" href="tops.html" className="custom-button">LEARN MORE</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
               {/*  <div className="banner-slide">
                  <div className="home-banner-img-holder">
                    <div className="home-banner-img img-holder img-cover">
                      <figure><img src="images/banner-home.jpg" alt="JPB" /></figure>
                    </div>
                  </div>
                  <div className="banner_caption">
                    <div className="captionWrapper container">
                      <div className="captionContainer">
                        <div className="captionContainerInner">
                          <h2 data-animation-in="fadeInUp" data-delay-in="0.2">Bringing You A Touch of Cleanliness</h2>
                          <p data-animation-in="fadeInUp" data-delay-in="0.7">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore</p> <a data-animation-in="fadeInUp" data-delay-in="0.9" href="tops.html" className="custom-button">LEARN MORE</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="banner-slide">
                  <div className="home-banner-img-holder">
                    <div className="home-banner-img img-holder img-cover">
                      <figure><img src="images/banner-home.jpg" alt="JPB" /></figure>
                    </div>
                  </div>
                  <div className="banner_caption">
                    <div className="captionWrapper container">
                      <div className="captionContainer">
                        <div className="captionContainerInner">
                          <h2 data-animation-in="fadeInUp" data-delay-in="0.2">Bringing You A Touch of Cleanliness</h2>
                          <p data-animation-in="fadeInUp" data-delay-in="0.7">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore</p> <a data-animation-in="fadeInUp" data-delay-in="0.9" href="tops.html" className="custom-button">LEARN MORE</a> </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="home-banner-bottom-bg"> <img src="images/inner-banner-shape.png" alt="" /> </div>
          </div>
          <div className="clear" />
          <section className="fullcontainer home-section1" data-aos="fade-up">
            <div className="float-icon img-animation-holder s5 left-img-1 tp35 left5" data-aos="fade-right"><img src="images/left-img-1.png" alt="" className="responsive" /></div>
            <div className="float-icon img-animation-holder s7 right-img-2 tp20 right10" data-aos="fade-left"><img src="images/right-img-1.png" alt="" className="responsive" /></div>
            <div className="inner-container-sm">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6" data-aos="zoom-in">
                    <div className="abt-photo text-center leftpad pl50 lg rightpad pr50" data-tilt data-tilt-max={10} data-tilt-speed={600} data-tilt-perspective={800}> <img src="images/home1.png" alt="" /> </div>
                  </div>
                  <div className="col-lg-6 align-self-center" data-aos="fade-up">
                    <div className="about-content rightpad xl">
                      <div className="pageTitle  title-border">
                        <h2>About Us</h2> </div>
                      <p className="color1">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat sed diam voluptua. At vero eos et Accusam.</p> <a href="/"  className="custom-button">READ MORE</a> </div>
                  </div>
                </div>
              </div>
              <div className="about-shape text-center hide-lg" data-aos="fade-up"><img src="images/about-shape.png" alt="" /></div>
            </div>
          </section>
          <div className="section-wrap">
            <section className="fullcontainer home-section2" data-aos="fade-up">
              <div className="float-icon img-animation-holder we-img-1 tp15 left0" data-aos="fade-right"><img src="images/we-img-1.png" alt="" className="responsive" /></div>
              <div className="float-icon img-animation-holder s6 we-img-2 tp0 left20" data-aos="fade-left"><img src="images/we-img-2.png" alt="" className="responsive" /></div>
              <div className="float-icon img-animation-holder s7 we-img-3 tp0 right20" data-aos="fade-left"><img src="images/we-img-3.png" alt="" className="responsive" /></div>
              <div className="float-icon img-animation-holder s6 we-img-4 tp15 right5" data-aos="fade-left"><img src="images/we-img-4.png" alt="" className="responsive" /></div>
              <div className="inner-container-sm bg-img" style={{background: 'url(images/why-bg.jpg)'}}>
                <div className="pageTitle title-border text-center">
                  <h2>Why JPB (USPs)?</h2></div>
                <div className="why-job-holder">
                  <div className="container">
                    <div className="row grid-15">
                      <div className="col-lg-4" data-aos="zoom-in">
                        <div className="whyj-box text-center">
                          <div className="whyj-icon"><img src="images/whyj-icon-1.png" alt="" /></div>
                          <div className="whyj-info">
                            <h5>3000 Matches between Employer &amp; Employee</h5> </div>
                        </div>
                      </div>
                      <div className="col-lg-4" data-aos="zoom-in">
                        <div className="whyj-box text-center">
                          <div className="whyj-icon"><img src="images/whyj-icon-2.png" alt="" /></div>
                          <div className="whyj-info">
                            <h5>Online Presence</h5> </div>
                        </div>
                      </div>
                      <div className="col-lg-4" data-aos="zoom-in">
                        <div className="whyj-box text-center">
                          <div className="whyj-icon"><img src="images/whyj-icon-3.png" alt="" /></div>
                          <div className="whyj-info">
                            <h5>Quick &amp; Convinient</h5> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="why-shape-bg"><img src="images/why-shape.png" alt="" /></div>
              <div className="float-icon btf-right img-animation-holder"><img src="images/btf-right.png" alt="" /></div>
              <div className="why-shadow hide-lg"><img src="images/why-shadow.png" alt="" /></div>
            </section>
           <section
  className="fullcontainer home-section3 bg-img"
  style={{
    background: 'url(images/tst-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '60px 0'
  }}
>
  <div className="inner-container-lg">
    <div className="container">
      <div className="client-holder" data-aos="fade-up">
        <div className="pageTitle title-border text-center mb-5">
          <h2>Awards</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="acs-box text-center p-4 bg-white rounded shadow-sm">
              <img
                src="/images/award-1.png"
                alt="Top 100 Singapore Excellence Award"
                className="img-fluid"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <h6 className="mt-3">Top 100 Singapore Excellence Award 2012/2013</h6>
            </div>
          </div>
          <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="acs-box text-center p-4 bg-white rounded shadow-sm">
              <img
                 src="/images/award-2.png"
                alt="Singapore’s Outstanding Enterprise"
                className="img-fluid"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <h6 className="mt-3">Singapore’s Outstanding Enterprise 2012</h6>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

          </div>
          <div className="fullcontainer white home-section-4 bg-img" style={{background: '#0d3455'}}>
            <div className="float-icon btf-left img-animation-holder"><img src="images/btf-left.png" alt="" /></div>
            <div className="process-shape"><img src="images/process-shape.png" alt="" /></div>
            <div className="inner-container">
              <div className="container container-lg" data-aos="fade-up">
                <div className="container text-center container-800">
                  <div className="pageTitle title-border text-center alt">
                    <h2>Process Flow</h2> </div>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                </div>
                <div className="pf-img text-center mt30"><img src="images/pf.png" alt="" /></div>
              </div>
            </div>
            <div className="footer-space" />
          </div>
          <div className="clear" />
        </div>
        <div className="clear" />
        <div className="pushContainer" />
        <div className="clear" />
      
      </div>
     <Footer/>
     <QuickSearch/>
    </div>
    );
  }
  
  export default Home;