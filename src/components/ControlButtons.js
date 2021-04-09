function ControlButtons () {
    return(
        <div>
        <label style={{margin: '6px'}}>Create</label>
        <button type="button" className="btn btn-success btn-sm"><img src="images/mknode-icon.png"
            style={{width: '1rem', height:'auto'}} alt=""></img></button>
        <label style={{margin: '6px'}}>Delete </label>
        <button type="button" className="btn btn-danger btn-sm"><img src="./images/delete-icon.png"
            style={{width: '1rem', height:'auto'}} alt=""></img></button>
        <label style={{margin: '6px'}}>Merge </label>
        <button type="button" className="btn btn-warning btn-sm"><img src="./images/merge-node.png"
            style={{width: '1rem', height:'auto'}} alt=""></img></button>
            </div>
    )
}
export default ControlButtons