import React from 'react';
import ReactDOM from 'react-dom';
import './DownloadButton.css'

class DownloadButton extends React.Component {
  constructor(props) {
    super(props)
    
    const defaultFileType = "json"; 
    this.fileNames = {
    	json: "formfunction-diagram.json",
      csv: "states.csv",
      text: "states.txt"
    }    
    this.state = {
      fileType: "json",
      fileDownloadUrl: null,
      status: "",
    	// data: [
      // 	{ state: "Arizona",        electors: 11 },
      // 	{ state: "Florida",        electors: 29 },
      // 	{ state: "Iowa",           electors:  6 },
      // 	{ state: "Michigan",       electors: 16 },
      // 	{ state: "North Carolina", electors: 15 },
      // 	{ state: "Ohio",           electors: 18 },
      // 	{ state: "Pennsylvania",   electors: 20 },
      // 	{ state: "Wisconsin",      electors: 10 },
      // ]
    }
  	this.changeFileType = this.changeFileType.bind(this);
  	this.download = this.download.bind(this);
  	this.upload = this.upload.bind(this);
  	this.openFile = this.openFile.bind(this);
  }
  
  changeFileType (event) {
    const value = event.target.value;
  	this.setState({fileType: value});
  }
  
  download (event) {
    event.preventDefault();
  	// Prepare the file
    let outputObject=this.props.outputObject;
    let output=JSON.stringify(outputObject);
    // Download it
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.setState ({fileDownloadUrl: fileDownloadUrl}, 
      () => {
        this.dofileDownload.click(); 
        URL.revokeObjectURL(fileDownloadUrl);  // free up storage--no longer needed.
        this.setState({fileDownloadUrl: ""})
    })    
  }

  /**
   * Function returns the content as a CSV string
   * See https://stackoverflow.com/a/20623188/64904
   * Parameter content:
   *   [
   *.     [header1, header2],
   *.     [data1, data2]
   *.     ...
   *.  ]
   * NB Does not support Date items
   */
  // makeCSV (content) {
  // 	let csv = '';
  //   content.forEach(value => {
  //   	value.forEach((item, i) => {
  //       let innerValue = item === null ? '' : item.toString();
  //       let result = innerValue.replace(/"/g, '""');
  //       if (result.search(/("|,|\n)/g) >= 0) {
  //         result = '"' + result + '"'
  //       }
  //       if (i > 0) {csv += ','}
  //       csv += result;
  //     })
  //   	csv += '\n';
	//   })
  //   return csv
  // }
  
  upload() {
  	//event.preventDefault();
    this.dofileUpload.click()
  }
  
  /**
   * Process the file within the React app. We're NOT uploading it to the server!
   */
  openFile(evt) {
      let status = []; // Status output
      const fileObj = evt.target.files[0];
      const reader = new FileReader();
          
      let fileloaded = e => {
        // e.target.result is the file's content as text
        const fileContents = e.target.result;
        status.push(`File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`);
        // Show first 80 characters of the file
        const first80char = fileContents.substring(0,80);
        status.push (`First 80 characters of the file:\n${first80char}`)
        this.setState ({status: status.join("\n")})
      }
      
      // Mainline of the method
      fileloaded = fileloaded.bind(this);
      reader.onload = fileloaded;
      reader.readAsText(fileObj);  
  }
  
  render() {
    return (
      
        
          <div style={{display: 'inline'}}>
          <button className="savebutton" style={{fontSize: '12px', margin: '5px', borderStyle:'none', borderRadius: '4px', width: '40px', height: '22px' }} onClick={this.download}>
          <img style={{width: '16px', height: 'auto'}} src='images/save-icon.png'></img>
          
          </button>
          <a className="hidden"
          download={this.fileNames[this.state.fileType]}
          href={this.state.fileDownloadUrl}
          ref={e=>this.dofileDownload = e}
       ></a>
       </div>
          
           
         
      
	  )
  }
}
//ReactDOM.render(<App />, document.querySelector("#app"));
export default DownloadButton