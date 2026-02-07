import React from 'react';
function Quicksearch() {
return (
    <div>
<div className="modal fade quickSearch" id="quickSearch">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="far fa-times-circle" /></button>
            <form action="/" method="post" encType="multipart/form-data">
              <div className="search-box">
                <input type="text" className="form-control top-input" placeholder="Search keyword" />
                <button className="top-button"><img src="images/search.svg" alt="JPB" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div> 
      );
}

export default Quicksearch;
