import React from 'react';


class Upload extends React.Component{
    state={
        initialschemavalue: {}
    };
    handleSubmit=(event)=>{

        event.preventDefault();
        const initialschema=this.state.initialschemavalue;
        this.props.submitUpload(initialschema);

    }
    openFile(evt) {
        let status = []; // Status output
        const fileObj = evt.target.files[0];
        const reader = new FileReader();

        let fileloaded = e => {
            // e.target.result is the file's content as text
            const fileContents = e.target.result;
            console.log(fileContents);
            this.setState({ initialschemavalue: JSON.parse(fileContents)});
            // status.push(`File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`);
            // // Show first 80 characters of the file
            // const first80char = fileContents.substring(0,80);
            // status.push (`First 80 characters of the file:\n${first80char}`)
            // this.setState ({status: status.join("\n")})
          }
          
          // Mainline of the method
         // fileloaded = fileloaded.bind(this);
            
        reader.onload=fileloaded;
        reader.readAsText(fileObj);  
    }

    render(){
        return(
            <div>
            <input type="file" className="hidden"
            multiple={false}
            accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
            onChange={evt => this.openFile(evt)}
            ref={e=>this.dofileUpload = e}
          />
          <button type='submit' onClick={this.handleSubmit}>Submit</button>
          </div>
        );
    }
}

export default Upload;