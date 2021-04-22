import React from 'react';
import './App.css';
import UncontrolledDiagram from './components/Diagram';
import 'beautiful-react-diagrams/styles.css';
import ReactDOM from 'react-dom';
import Form from './components/Form'
import { ModalComponent } from './components/ModalComponent';
import  { useSchema,createSchema } from 'beautiful-react-diagrams';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Main} from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialSchema = createSchema({
  nodes: [

  ]
});
function App() {
   const [schema, { onChange, addNode, connect, removeNode }] = useSchema(initialSchema);
    const [sentence,setSentence]=React.useState("");
    const  submitHandler=(value)=>{
     setSentence(value);
    }
  
     return (
       <>
       <Header />
       <Main sentence={sentence} schema={schema} addNode={addNode} connect={connect} removeNode={removeNode}/>
       <Footer onChange={onChange}/>
       <ModalComponent submitHandler={submitHandler} />
      </>
     );
  
}

export default App;