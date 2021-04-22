import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import React, { useState, useEffect, useReducer, createContext} from 'react';

import './Diagram.css'

import sentence from './Form';
const initialSchema = createSchema({
  nodes: [

  ]
});


const UncontrolledDiagram = ({ sentence }) => {
  // create diagrams schema

  const [schema, { onChange, addNode, connect, removeNode }] = useSchema(initialSchema);

  const [selected, setSelected] = useState([]);

  let textInput="";

  
  const handleTextChange=(e)=>{
    textInput=e.target.value;
    
  }
  const handleFormSubmit=(id)=>{
    
    const nodeToChange = schema.nodes.find(node => node.id === id);
    nodeToChange.form=textInput;
  }
  const handleFuncSubmit=(id)=>{
    const nodefuncChange = schema.nodes.find(node => node.id === id);
    nodefuncChange.function=textInput;
  }

  

  const toggleSelect = (id) => {
    console.log(`${id} clicked!`);
    const nodeToToggle = schema.nodes.find(node => node.id === id);
    if(selected.includes(id)){
      for(let i=0;i<selected.length;i++){
        if(selected[i]===id){
          selected.splice(i,1);}
         // document.getElementById(id).classList.remove("green");
         if(nodeToToggle.level===2){
           nodeToToggle.className="button blue"
         }
         else{
          nodeToToggle.className="button";}

      }
    }
    
    else{ 
      selected.push(id);
      
      if(nodeToToggle.level===2){
        nodeToToggle.className="button green uppernode"
      }
      else{
       nodeToToggle.className="button green";}
      
      //document.getElementById(id).classList.add("green");
      
    }
    console.log(selected);
    setSelected(selected);
  }
  

  React.useEffect(() => {
    const wordNodes = sentence.split(" ");
    console.log(wordNodes);

    for(let i=0;i<wordNodes.length;i++){
      const node = {
        id: `node-${i}`,
        coordinates: [80 + 80 * i, 340],
        content: wordNodes[i],
        level: 1,
        parent: null,
        className: 'button',
        render: ({id,content}) => (
          <div onClick={()=>toggleSelect(id)} style={{ width: '70px', fontSize: '0.6rem', textAlign: 'center' }}>
              
                {content}
              
          </div>
        ),
      };
      if(schema.nodes.find(element => element.id === node.id)){ }
      else{
      addNode(node);}
     
    }

    console.log(JSON.stringify(schema));


  }, [sentence]);

  const deleteNodeFromSchema = () => {
    if(selected.length===0){
      alert('You must select a node before pressing delete.')
    }
     else if(selected.length>1){
      alert('You can only delete one node at a time!');
    }
    else{

      const nodeToRemove = schema.nodes.find(node => node.id === selected[0]);
      if(nodeToRemove.level===1){
        alert("You cannot delete a base node!");
        return;
      }

      //Remove all links
      while (schema.links.find(link => link.input === selected[0])) {
        const linkToRemove = schema.links.find(link => link.input == selected[0]);
        let linkindex = schema.links.indexOf(linkToRemove);
        schema.links.splice(linkindex, 1);
      }
      while (schema.links.find(link => link.output === selected[0])) {
        const linkToRemovetwo = schema.links.find(link => link.output == selected[0]);
        let linkindextwo = schema.links.indexOf(linkToRemovetwo);
        schema.links.splice(linkindextwo, 1);
      }

      // const linkToRemove = schema.links.find(link => link.input === nodeToRemove.id);
      // while (schema.links.includes(linkToRemove)) {
      //   for (let i = 0; i < schema.links.length; i++) {
      //     if (schema.links[i] === linkToRemove) {
      //       schema.links.splice(i, 1);
      //     }
      //   }
      // }
      // const linkoutToRemove = schema.links.find(link => link.output === nodeToRemove.id);
      // while (schema.links.includes(linkoutToRemove)) {
      //   for (let a = 0; a < schema.links.length; a++) {
      //     if (schema.links[a] === linkoutToRemove) {
      //       schema.links.splice(a, 1);
      //     }
      //   }
      // }

      removeNode(nodeToRemove);
      emptySelected();
    }
    
  };

  const findcoordinates=()=>{
    let maxXCoordinate=0;
    let minXCoordinate=0;
    let minYCoordinate=0;
    let resultY=0;
    let resultX=0;
    let firstnode=true;
    selected.forEach((selectedNodeId)=>{
      
      const fullnodeinfo=schema.nodes.find(node=>node.id===selectedNodeId);
      
      if(firstnode){
        console.log(`The first node has coordinates: (${fullnodeinfo.coordinates[0]},${fullnodeinfo.coordinates[1]})`)
        maxXCoordinate=fullnodeinfo.coordinates[0];
        minXCoordinate=fullnodeinfo.coordinates[0];
        minYCoordinate=fullnodeinfo.coordinates[1];
        console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        firstnode=false;
      }
      else if(fullnodeinfo.coordinates[0]<maxXCoordinate){
        if(fullnodeinfo.coordinates[0]<minXCoordinate){
          minXCoordinate=fullnodeinfo.coordinates[0];
          console.log(`Min X coordinate was updated to: ${minXCoordinate}`);
          console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)

        }

        if(fullnodeinfo.coordinates[1]<minYCoordinate){
          minYCoordinate=fullnodeinfo.coordinates[1];
          console.log(`Min Y coordinate was updated to: ${minYCoordinate}`);
          console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        }
      }
      else{
        maxXCoordinate=fullnodeinfo.coordinates[0];
        console.log(`Max X coordinate was updated to: ${maxXCoordinate}`);
          console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        if(fullnodeinfo.coordinates[1]<minYCoordinate){
          minYCoordinate=fullnodeinfo.coordinates[1];
          console.log(`Min Y coordinate was updated to: ${minYCoordinate}`);
          console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        }
      }
    })
    resultX=(minXCoordinate+maxXCoordinate)/2;
    resultY=minYCoordinate-65;

    return [resultX,resultY];


  }
  const conditionalFormDisplay=(id)=>{
    const nodeToCheck=schema.nodes.find(node=>node.id=== id);
    if(nodeToCheck.form===null){
      return(
        <div>
          <label>Form: </label><input style={{ width: '25px', height: '12px' }} onChange={handleTextChange} type='text'></input>
          <button className='buttonInputSubmit' onClick={()=>handleFormSubmit(id)}>+</button>
        </div>
      )
    }
    else{
      return(
        <div style={{display: 'flex',margin: '0', padding: '0'}}>
          <label>Form: </label><p style={{color: 'yellow', marginLeft:'2px'}}>{nodeToCheck.form}</p>
        </div>
      )
    }
  }
  const conditionalFuncDisplay=(id)=>{
    const nodeToCheck=schema.nodes.find(node=>node.id=== id);
    if(nodeToCheck.function===null){
      return(
        <div style={{marginTop: '-4px'}}>
          <label>Func: </label><input style={{ width: '25px', height: '12px' }} onChange={handleTextChange} type='text'></input>
          <button className='buttonInputSubmit' onClick={()=>handleFuncSubmit(id)}>+</button>
        </div>
      )
    }
    else{
      return(
        <div style={{display: 'flex',marginTop: '-5px'}}>
          <label>Func: </label><p style={{color: 'yellow', marginLeft:'2px'}}>{nodeToCheck.function}</p>
        </div>
      )
    }
  }
  
 
  const createNode = () => {
    if (selected.length === 0) {
      alert('You must select child nodes before creating a new node');
    }
    else {
      let count=1;
      for(let i=0;i<selected.length;i++){
        const nodeSelected=schema.nodes.find(node=>node.id===selected[i]);
        if(nodeSelected.parent!=null){
          const nodeToUpdate=schema.nodes.find(node=>node.id===nodeSelected.parent);
          if(count===1){
            nodeToUpdate.coordinates[1]-=65; 
            count--;
          }
          const linkToDelete=schema.links.find(link=>link.input===nodeToUpdate.id && link.output===selected[i]);
          
        }
        

      }
      
      let desiredcoordinates = findcoordinates();
      console.log(`The desired coordinates for the new node are: (${desiredcoordinates[0]},${desiredcoordinates[1]})`);
      const nextNode = {
        id: `node-${schema.nodes.length + 1}`,
        content: `Node ${schema.nodes.length + 1}`,
        coordinates: [
          desiredcoordinates[0],
          desiredcoordinates[1],
        ],
        parent: null,
        level: 2,
        form: null,
        function: null,
        className:'button blue',
        render: ({id,form}) => (
          <div id={id} style={{ fontSize: '0.5rem', textAlign: 'left', padding: '4px', width: '70px', height: '40px' }} onClick={() => toggleSelect(id)}>
            <a>
              {conditionalFormDisplay(id)}

            
              <div>
              {conditionalFuncDisplay(id)}
              </div>
            </a>
          </div>
        )
        ,
      };
      addNode(nextNode);
      addLinks();
      updateParents(nextNode.id)
      emptySelected();
      console.log(JSON.stringify(schema));

      //empty selected nodes array
      //selected.length = 0;
      //setSelected(selected);
    }
  }
  const updateParents=(nextNodeId)=>{
    for (let a=0;a<selected.length;a++){
      const nodeToUpdate= schema.nodes.find(node => node.id === selected[a]);
      nodeToUpdate.parent=nextNodeId;
      console.log(`${selected[a]}'s parent was updated to ${nextNodeId}`);
    }
  }
  const emptySelected=()=>{
    while(selected.length>0){
    toggleSelect(selected[0]);}
  }
  
  const addLinks=()=>{
   // let newlink={}
    selected.forEach(function(selectedId){
      connect(`node-${schema.nodes.length + 1}`,selectedId)

      //newlink={input: nextNode.id, output: selectedId};
     // console.log(JSON.stringify(newlink));
     // schema.links.push(newlink);
    })

  }

  return (
    <div style={{ height: '27rem' }}>

      
      <Diagram style={{ height: '100%', overflow: 'scroll' }} onMouseMove={onChange} schema={schema} />
      <Button color="primary"  style={{ fontSize: '12px' }} onMouseHover={onChange} onClick={createNode}>Create</Button>
      <Button color="secondary" className="red" style={{ fontSize: '12px' }} onClick={deleteNodeFromSchema}>Delete</Button>

      
    </div>
  );
};

<UncontrolledDiagram />
export default UncontrolledDiagram;
