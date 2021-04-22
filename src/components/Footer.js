import React from 'react';
import { Button } from 'beautiful-react-ui';
export const Footer=({onChange})=>{

    const createNode=()=>{};
    const deleteNodeFromSchema=()=>{}
    return <>
    <nav className="footer navbar justify-content-center fixed-bottom navbar-light"
      style={{backgroundColor: '#2e206d', textAlign: 'center'}}>
      <div className="footer-buttons" id='footer-buttons'>
      {/* <Button color="primary"  style={{ fontSize: '12px' }} onMouseHover={onChange} onClick={createNode}>Create</Button>
      <Button color="secondary" className="red" style={{ fontSize: '12px' }} onClick={deleteNodeFromSchema}>Delete</Button>  */}
      </div>

    </nav></>;
}