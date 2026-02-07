import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';


const NewsDetail = () => {
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
   
                <section className="fullcontainer blog--detail-page-section" data-aos="fade-up">
                  <div className="float-icon s5 left-img-1 tp15 left5" data-aos="fade-right"><img src="images/left-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s7 right-img-2 tp10 right5" data-aos="fade-left"><img src="images/right-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s7 we-img-3 tp20 right30" data-aos="fade-left"><img src="images/we-img-3.png" alt="" className="responsive"/></div>
      <div className="float-icon we-img-1 tp25 left25" data-aos="fade-right"><img src="images/we-img-1.png" alt="" className="responsive"/></div>
      <div className="float-icon s6 we-img-4 tp45 right5" data-aos="fade-left"><img src="images/we-img-4.png" alt="" className="responsive"/></div>
                  <div className="container">
                    <div className="inner-container">
                        <div className="news-details-holder">
                                <div className="news-details">
                                    
                                    <div className="news-details-img">
                                        <figure><img src="images/news-details-img.jpg" className="responsive rounded-corner" alt=""/></figure>
                                    </div>
                                    <div className="news-details-title">
                                        <h2>Sharing of Stay-Home Notice and Related Covid-19 Tests Costs between Employers of Transferred Migrant Domestic Workers</h2>
                                    </div>
                                    <div className="item-share-holder">
                                        <div className="row align-items-center gutters-10 grid-10">
                                            <div className="col-auto">
                                                <p>Share this Article</p>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="item-share"> <a href="javascript:void(0);"><i className="fab fa-facebook-f"></i></a> <a href="javascript:void(0);"><i className="fab fa-twitter"></i></a>     <a href="javascript:void(0);"><i className="fab fa-pinterest-p"></i></a> <a href="javascript:void(0);"><i className="fas fa-envelope"></i></a><a href="javascript:void(0);"><i className="fab fa-linkedin-in"></i></a><a href="javascript:void(0);"><i className="fab fa-youtube"></i></a> <a href="javascript:void(0);"><i className="fab fa-whatsapp"></i></a> <a href="javascript:void(0);"><i className="fab fa-telegram-plane"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="news-details-info">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Tempor id eu nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium. Massa ultricies mi quis hendrerit dolor magna eget.</p>
                                        <p>Faucibus ornare suspendisse sed nisi. Sagittis eu volutpat odio facilisis mauris sit amet massa. Erat velit scelerisque in dictum non consectetur a erat. Amet nulla facilisi morbi tempus iaculis urna. Egestas purus viverra accumsan in nisl. Feugiat in ante metus dictum at tempor commodo. Convallis tellus id interdum velit laoreet</p>
                                    
                                     
                                        <p>Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Viverra aliquet eget sit amet tellus cras adipiscing enim eu. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Dui faucibus in ornare quam. In iaculis nunc sed augue lacus viverra vitae congue. Vitae tempus quam pellentesque nec nam aliquam sem et. Ut morbi tincidunt augue interdum. Sem fringilla ut morbi tincidunt augue. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. In est ante in nibh mauris. Nam aliquam sem et tortor consequat id porta nibh. Diam quis enim lobortis scelerisque fermentum dui faucibus. Non curabitur gravida arcu ac. Magna fringilla urna porttitor rhoncus dolor. Aenean et tortor at risus viverra Adipiscing.</p>
                                     
                                    </div>
                                    
                                </div>
                                <div className="news-details-footer mt40">
                                    <div className="row justify-content-between align-items-center gutters-8 grid-8">
                                        <div className="col-md-auto"><a href="#" className="custom-button prvs">PREVIOUS ARTICLE</a></div>
                                        <div className="col-md-auto"><a href="#" className="custom-button">NEXT ARTICLE</a></div>
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
<Footer/>
<QuickSearch/>
</div>
  );
}
export default NewsDetail;