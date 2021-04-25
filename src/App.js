import React from 'react';
import './App.css';
import UncontrolledDiagram from './components/Diagram';
import 'beautiful-react-diagrams/styles.css';
import ReactDOM from 'react-dom';
import Form from './components/Form'
import Upload from './components/Upload'
import UploadedDiagram from './components/UploadedDiagram'

function App() {
 

  
    const [sentence,setSentence]=React.useState("");
    const [initialschema,setinitialschema]=React.useState(null);

    const  submitHandler=(value)=>{
     setSentence(value);
    }
    const  submitUpload=(value)=>{
      setinitialschema(value);
     }
    ReactDOM.render(
      <React.StrictMode>
        <Form submitHandler={submitHandler} />
      </React.StrictMode>,
      document.getElementById('form-container')
    );
    ReactDOM.render(
      <React.StrictMode>
        <Upload submitUpload={submitUpload} />
      </React.StrictMode>,
      document.getElementById('upload-container')
    );
    
     return (
       <div className="App">
         
         {sentence && <UncontrolledDiagram sentence={sentence}/>}
         {initialschema && <UploadedDiagram initialschema={initialschema}/>}
       </div>
     );
  
}

export default App;