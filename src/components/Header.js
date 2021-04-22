import React from 'react';

function printDiagram() {
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById('mainContent').innerHTML;
    document.body.innerHTML = "<div style='text-align: center'><h1 style='justify-self: center; font-size: 16px'>Grammar Mapping Tool Diagram<h1/></div>" + printcontent;
    window.print();
    document.body.innerHTML = restorepage;
  }

export const Header=()=>{
    return <>
  <nav className="top-navigation navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#2e206d'}}>
    <div>
      <a className="navbar-brand" href="#"><img className="workspace-logo" src="images/Logo_White.png" alt="GMT Logo Black" /></a>
    </div>

    <div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" style={{color: "white", marginTop:"5px"}}>
              View
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Toggle Dock Pallete</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <a className="nav-link" href="#">
            <label>Print </label>
            <button type="button" className="btn btn-primary btn-sm" onClick="printDiagram()">
              <img src="images/print_icon.png" style={{width: "16px", height: "auto"}} alt="GMT print icon" />
            </button>
          </a>
          <a className="nav-link" href="#">
            <label>Save</label>
            <button type="button" className="btn btn-success btn-sm"><img src="images/save-icon.png"
                style={{width: "16px", height: "auto"}} alt="GMT print icon"/></button>
          </a>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" style={{color: "white", marginTop:"5px"}}>
              Help
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">View Documentation</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Report Bug</a>
            </div>
          </li>
        </div>
      </div>
    </div>
  </nav></>;
}