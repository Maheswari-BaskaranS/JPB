import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickSearch from './Quicksearch';

const TermsandConditions = () => {
  return (
    <div>
      <div id="wrapper">
        <Header />
        <div className="clear"></div>

        <div className="main-content-wrapper">
          <div className="bannerWrapper">
            <div className="banner inner-banner">
              <div className="inner-banner-img img-holder img-cover">
                <figure><img src="images/banner-about.jpg" alt="JPB" /></figure>
              </div>
            </div>
            <div className="home-banner-bottom-bg inner-banner-shape">
              <img src="images/inner-banner-shape.png" alt="" />
            </div>
          </div>
          <div className="clear"></div>

        <section className="fullcontainer home-section3 bg-img" style={{ background: 'url(images/tst-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '60px 0' }} data-aos="fade-up">
            <div className="inner-container-sm">
              <div className="container text-center">
                <div className="pageTitle title-border text-center mb-4">
                  <h2>Related Links</h2>
                </div>

                <div className="row" style={{ rowGap: '30px' }}>
                  {[
                    {
                      title: 'MALAYSIA HIGH COMMISSION',
                      address: '30 Hill Street, Singapore 179360',
                      tel: '6235-0111',
                      fax: '6733-6135'
                    },
                    {
                      title: 'INDONESIAN EMBASSY',
                      address: '7 Chatsworth Road, Singapore 249761',
                      tel: '6737-7422',
                      fax: '6737-5037'
                    },
                    {
                      title: 'SRI LANKA HIGH COMMISSION',
                      address: '51 Goldhill Plaza, #13-07/13, Singapore 308900',
                      tel: '6254-4595',
                      fax: '6250-7201'
                    },
                    {
                      title: 'MYANMAR EMBASSY',
                      address: '15 St. Martin Drive, Singapore 257996',
                      tel: '6735-1672',
                      fax: '6735-6236'
                    },
                    {
                      title: 'PHILIPPINE EMBASSY',
                      address: '20 Nassim Road, Singapore 258395',
                      tel: '6737-3977',
                      fax: '6733-9544'
                    },
                    {
                      title: 'THAILAND EMBASSY',
                      address: '370 Orchard Road, Singapore 238870',
                      tel: '6235-7901',
                      fax: '6733-5653'
                    },
                    {
                      title: 'BANGLADESH HIGH COMMISSION',
                      address: '101 Thomson Road, #05-04 United Square, Singapore 307591',
                      tel: '6255-0075',
                      fax: '6255-1824'
                    },
                    {
                      title: 'INDIA HIGH COMMISSION',
                      address: '31 Grange Road, Singapore 239702',
                      tel: '6737-6777',
                      fax: '6732-6909'
                    }
                  ].map((link, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="related-link-box p-4 bg-white rounded shadow-sm h-100 text-left">
                        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{link.title}</h3>
                        <p style={{ marginBottom: '5px' }}>{link.address}</p>
                        <p style={{ marginBottom: '5px' }}><strong>Tel:</strong> {link.tel}</p>
                        <p><strong>Fax:</strong> {link.fax}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row mt-5">
                  <div className="col-12">
                    <div style={{ textAlign: 'center', marginTop: '20px', paddingBottom:"40px" }}>
                      <h3>Other Related Links</h3>
                      <ul style={{ 
                        listStyle: 'disc', 
                        paddingLeft: '20px', 
                        display: 'inline-block', 
                        textAlign: 'left' 
                      }}>
                        <li><a href="https://www.mom.gov.sg" target="_blank" rel="noopener noreferrer">Ministry of Manpower</a></li>
                        <li><a href="https://www.ica.gov.sg" target="_blank" rel="noopener noreferrer">ICA (Immigration & Checkpoints Authority)</a></li>
                        <li><a href="https://www.smallclaims.gov.sg" target="_blank" rel="noopener noreferrer">Small Claims Court</a></li>
                        <li><a href="https://www.case.org.sg" target="_blank" rel="noopener noreferrer">Consumers Association</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <div className="clear"></div>
        </div>

        <div className="clear"></div>
        <div className="pushContainer"></div>
        <div className="clear"></div>
      </div>
      <Footer />
      <QuickSearch />
    </div>
  );
};

export default TermsandConditions;
