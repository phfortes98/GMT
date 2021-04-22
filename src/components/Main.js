import React from 'react';
import UncontrolledDiagram from '../components/Diagram'
export const Main=({ sentence,schema, addNode, connect, removeNode,onChange })=>{
    return <>
    <div className="container-fluid">

<div className="row canvas-container">


  <div className="pallete-container col-md-3 col-lg-2 d-none d-md-block" style={{height: '32rem'}}>
    <header className="row justify-content-center pallete-header">Dock Pallete</header>

    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li className="mypillnav-item" role="presentation">
        <a className="nav-link active" id="pills-forms-tab" data-toggle="pill" href="#pills-home" role="tab"
          aria-controls="pills-home" aria-selected="true">Forms</a>
      </li>
      <li className="mypillnav-item" role="presentation">
        <a className="nav-link" id="pills-functions-tab" data-toggle="pill" href="#pills-profile" role="tab"
          aria-controls="pills-profile" aria-selected="false">Functions</a>
      </li>
      <li className="mypillnav-item" role="presentation">
        <a className="nav-link" id="pills-both-tab" data-toggle="pill" href="#pills-contact" role="tab"
          aria-controls="pills-contact" aria-selected="false">All</a>
      </li>
    </ul>

    <div className="tab-content" id="pills-tabContent">
      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-forms-tab">

        <div className="black-box">
          <ul>
            <li>form 1</li>
            <li>form 2</li>
            <li>form 3</li>
            <li>form 4</li>
            <li>form 5</li>
            <li>form 6</li>
            <li>form 7</li>
            <li>form 8</li>
            <li>form 9</li>
          </ul>
        </div>

      </div>
      <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-functions-tab">
        <div className="black-box">
          <ul>
            <li>function 1</li>
            <li>function 2</li>
            <li>function 3</li>
            <li>function 4</li>
            <li>function 5</li>
            <li>function 6</li>
            <li>function 7</li>
            <li>function 8</li>
            <li>function 9</li>
          </ul>
        </div>
      </div>
      <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-both-tab">
        <div className="black-box">
          <ul>
            <li>form 1</li>
            <li>form 2</li>
            <li>form 3</li>
            <li>form 4</li>
            <li>form 5</li>
            <li>form 6</li>
            <li>form 7</li>
            <li>form 8</li>
            <li>form 9</li>
            <li>function 1</li>
            <li>function 2</li>
            <li>function 3</li>
            <li>function 4</li>
            <li>function 5</li>
            <li>function 6</li>
            <li>function 7</li>
            <li>function 8</li>
            <li>function 9</li>
          </ul>
        </div>
      </div>
    </div>


  </div>


  <div className="workspace col-lg-10 col-md-9">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
          aria-selected="true">Design 1</a>
      </li>
    </ul>

    <div className="canvas">

    <div id="mainContent" className="App">
         
         {sentence && <UncontrolledDiagram sentence={sentence} schema={schema} addNode={addNode} connect={connect} removeNode={removeNode}/>}
       </div>

    </div>
  </div>

</div>


</div></>;
}