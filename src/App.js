import React from 'react';
import './App.css';
import UncontrolledDiagram from './components/Diagram';
import 'beautiful-react-diagrams/styles.css';
import ReactDOM from 'react-dom';
import Form from './components/Form'

function App() {
 

  
    const [sentence,setSentence]=React.useState("");

    const  submitHandler=(value)=>{
     setSentence(value);
    }
    ReactDOM.render(
      <React.StrictMode>
        <Form submitHandler={submitHandler} />
      </React.StrictMode>,
      document.getElementById('form-container')
    );
    
     return (
       <div className="App">
         
         {sentence && <UncontrolledDiagram sentence={sentence}/>}
       </div>
     );
  
}

export default App;