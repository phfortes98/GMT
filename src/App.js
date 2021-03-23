import React from 'react';
import './App.css';
import UncontrolledDiagram from './components/Diagram';

class App extends React.Component {
 

  render() {
    return (
      <div className="App">
        <UncontrolledDiagram />
      </div>
    );
  }
}

export default App;