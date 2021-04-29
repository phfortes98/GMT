import React from 'react';
import UncontrolledDiagram from'./Diagram'

class Form extends React.Component{
    state={
        value: ''
    };
    saveSentence=(event)=>{
        let sentence=event.target.value;
       // console.log('Event: ', event.target.value);

        this.setState({ value: event.target.value});
    }
    handleSubmit=(event)=>{

        event.preventDefault();
        const sentencestring=this.state.value;
        console.log('sentence has been saved: ' , sentencestring);
        this.props.submitHandler(sentencestring);

    }

    render(){
        return(
        <form>
            <p>Enter your Input Sentence: </p>
            <input type="text" onChange={this.saveSentence}/>
            <button type='submit' data-dismiss="modal" onClick={this.handleSubmit}>Submit</button>
        </form>
        );
    }
}

export default Form;