import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';


const WebAgency = () => {
  return(
    <div>
    <div id="wrapper">
<Header/>
<div className="clear"></div>

<div className="clear"></div>


<div className="main-container pt170"> 
    
    
   
    <div className="container">
      <h2 className="title1">CORPORATE WEBSITE BY <b>VERZ DESIGN</b></h2>
      <div className="clear"></div>
      <div className="document clearfix">
        <p>If you stumble upon any issues or would like to provide any suggestion for this website, kindly fill up the simple form below. We appreciate your privacy and your particulars will not be shared or sold to any 3<sup>rd</sup> party.</p>
        <p>Verz Design is Singapore’s leading <a href="https://www.verzdesign.com/" target="_blank"><u> web design company </u></a>. Our web and <a href="https://www.verzdesign.com/our-services/web-development/ecommerce" target="_blank"><u>eCommerce development </u></a> services include creative branding, eCommerce solutions, copywriting / content development, custom programming and mobile apps development. On top of these services, Verz Design is also well known for driving Qualified Traffic for clients through SEO and SEM.</p>
        <p>Choose Verz Design as your <a href="https://www.verzdesign.com/our-services/web-development/corporate-web-design" target="_blank"><u>web design</u></a> and development partner, whom you can trust to provide you with Compelling Content, Awesome Design and Qualified Traffic. </p>
        <p>
          <iframe src="https://www.verzdesign.com/feedback-for-the-website" width="400" height="640" frameborder="0" allowFullScreen="allowfullscreen"></iframe>
        </p>
      </div>
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
}
export default WebAgency;