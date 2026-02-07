import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';
import { Link } from 'react-router-dom';


const News = () => {
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
          <figure><img src="images/banner-news.jpg" alt="JPB"/></figure>
        </div>
      </div>
       <div className="home-banner-bottom-bg inner-banner-shape">
                  <img src="images/inner-banner-shape.png" alt=""/>
                </div> 
    </div>
    <div className="clear"></div>
   
    <section className="fullcontainer news-section1" data-aos="fade-up">
      <div className="float-icon s5 left-img-1 tp15 left5" data-aos="fade-right"><img src="images/left-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s7 right-img-2 tp10 right5" data-aos="fade-left"><img src="images/right-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s7 we-img-3 tp20 right30" data-aos="fade-left"><img src="images/we-img-3.png" alt="" className="responsive"/></div>
      <div className="float-icon we-img-1 tp25 left25" data-aos="fade-right"><img src="images/we-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s6 we-img-4 tp45 right5" data-aos="fade-left"><img src="images/we-img-4.png" alt="" className="responsive"/></div>
      <div className="inner-container">
          <div className="container">
            <div className="pageTitle text-center title-border">
              <h2>News & Events</h2>
            </div>
            <div className="news-holder">
              <div className="news-item">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="msv-photo row-inner-lg"><Link to="/newsdetail"><img src="images/news-1.jpg" className="responsive rounded-corner" alt=""/></Link></div>
                </div>
                <div className="col-lg-7">
                  <div className="msv-info size-14 leftpad pl40 lg">
                    <div className="news-title"><Link to="/newsdetail">Sharing of Stay-Home Notice and Related Covid-19 Tests Costs between Employers of Transferred Migrant Domestic Workers</Link>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod nunc a lorem scelerisque tincidunt. Quisque id accumsan enim. Phasellus placerat nibh arcu, at vehicula lorem pretium maximus. Sed quam arcu, cursus vel aliquam ac, condimentum sed metus. Maecenas nec libero pharetra quam auctor sollicitudin.</p> 
                      <p>Etiam pellentesque tincidunt eros sit amet ullamcorper. In in luctus quam. Maecenas ac ante tincidunt risus fermentum pretium sit amet eget ex. Maecenas sit amet dignissim ante. Maecenas porta suscipit nunc, in bibendum odio molestie sed.</p>
                      <Link to="/newsdetail" className="btn-rmore">LEARN MORE<i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
              </div>
              </div>
              <div className="news-item">
              <div className="row  align-items-center">
                <div className="col-lg-6   order-lg-2">
                  <div className="msv-photo pl50 leftpad lg row-inner-lg"><a href="news-details.html"><img src="images/news-2.jpg" className="responsive rounded-corner" alt=""/></a></div>
                </div>
                <div className="col-lg-6 order-sm-1">
                  <div className="msv-info rightpad lg size-14">
                    <div className="news-title"><a href="news-details.html">Enhancements to Six-Monthly Medical Examination for Migrant Domestic Workers to help detect abuse</a>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod nunc a lorem scelerisque tincidunt. Quisque id accumsan enim. Phasellus placerat nibh arcu, at vehicula lorem pretium maximus. Sed quam arcu, cursus vel aliquam ac, condimentum sed metus. Maecenas nec libero pharetra quam auctor sollicitudin.</p> 
                      <p>Etiam pellentesque tincidunt eros sit amet ullamcorper. In in luctus quam. Maecenas ac ante tincidunt risus fermentum pretium sit amet eget ex. Maecenas sit amet dignissim ante. Maecenas porta suscipit nunc, in bibendum odio molestie sed.</p>
                      <Link to="/newsdetail" className="btn-rmore">LEARN MORE <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="news-item">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="msv-photo row-inner-lg"><Link to="/newsdetail"><img src="images/news-3.jpg" className="responsive rounded-corner" alt=""/></Link></div>
                </div>
                <div className="col-lg-7">
                  <div className="msv-info size-14 leftpad pl40 lg">
                    <div className="news-title"><Link to="/newsdetail">Migrant Domestic Workers Strongly Encourage to Stay at Home on Rest Days</Link>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod nunc a lorem scelerisque tincidunt. Quisque id accumsan enim. Phasellus placerat nibh arcu, at vehicula lorem pretium maximus. Sed quam arcu, cursus vel aliquam ac, condimentum sed metus. Maecenas nec libero pharetra quam auctor sollicitudin.</p> 
                      <p>Etiam pellentesque tincidunt eros sit amet ullamcorper. In in luctus quam. Maecenas ac ante tincidunt risus fermentum pretium sit amet eget ex. Maecenas sit amet dignissim ante. Maecenas porta suscipit nunc, in bibendum odio molestie sed.</p>
                      <Link to="/newsdetail" className="btn-rmore">LEARN MORE <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
              </div>
              </div>
            </div>   
            {/* <div className="row grid-5 mt50 align-items-center justify-content-center">
                        <div className="col-auto pagination-container">
                          <ul className="pagination">
                            <li className="page-item"><a className="page-link prev" href="/"><i className="fas fa-arrow-circle-left"></i></a></li>
                            <li className="page-item active"><a className="page-link" href="/">1</a></li>
                            <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li>
                            <li className="page-item"><a className="page-link" href="/">4</a></li>
                            <li className="page-item"><span>...</span></li>
                            <li className="page-item"><a className="page-link" href="/">5</a></li>
                            <li className="page-item"><a className="page-link next" href="/"><i className="fas fa-arrow-circle-right"></i></a></li>
                          </ul>
                        </div>
                      </div>       */}
          </div>
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
export default News;

