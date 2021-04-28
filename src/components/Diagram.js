import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import React, { useState, useEffect, useReducer, createContext} from 'react';
import DownloadButton from './DownloadButton'

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
  const [linksToBeUpdated,setLinksToBeUpdated]=useState([]);
  

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
    //console.log(`${id} toggled!`);
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
   // console.log(selected);
    setSelected(selected);
  }
  

  React.useEffect(() => {
    const wordNodes = sentence.split(" ");
    //console.log(wordNodes);
    const newbasenodes=[];

    for(let i=0;i<wordNodes.length;i++){
      const node = {
        id: `node-${i}`,
        coordinates: [80 + 90 * i, 340],
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
      newbasenodes.push(node);
      // if(schema.nodes.length<=wordNodes.length){
      // addNode(node);}
      
     
    }
    console.log(newbasenodes);
    schema.nodes=newbasenodes;
    

   // console.log(JSON.stringify(schema));


  }, [sentence]);

  const deleteNodeFromSchema = () => {
    if(selected.length===0){
      alert('You must select a node before pressing delete.')
    }
     else if(selected.length>1){
      alert('You can only delete one node at a time!');
      emptySelected();
    }
    else{

      const nodeToRemove = schema.nodes.find(node => node.id === selected[0]);
      if(nodeToRemove.level===1){
        alert("You cannot delete a base node!");
        emptySelected();
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
  const deleteNodeById=(nodeId)=>{
    while (schema.links.find(link => link.input === nodeId)) {
      const linkToRemove = schema.links.find(link => link.input == nodeId);
      let linkindex = schema.links.indexOf(linkToRemove);
      schema.links.splice(linkindex, 1);
    }
    while (schema.links.find(link => link.output === nodeId)) {
      const linkToRemovetwo = schema.links.find(link => link.output == nodeId);
      let linkindextwo = schema.links.indexOf(linkToRemovetwo);
      schema.links.splice(linkindextwo, 1);
    }
    removeNode(nodeId);
    emptySelected();
  }

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
       // console.log(`The first node has coordinates: (${fullnodeinfo.coordinates[0]},${fullnodeinfo.coordinates[1]})`)
        maxXCoordinate=fullnodeinfo.coordinates[0];
        minXCoordinate=fullnodeinfo.coordinates[0];
        minYCoordinate=fullnodeinfo.coordinates[1];
        //console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        firstnode=false;
      }
      else if(fullnodeinfo.coordinates[0]<maxXCoordinate){
        if(fullnodeinfo.coordinates[0]<minXCoordinate){
          minXCoordinate=fullnodeinfo.coordinates[0];
          //console.log(`Min X coordinate was updated to: ${minXCoordinate}`);
         // console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)

        }

        if(fullnodeinfo.coordinates[1]<minYCoordinate){
          minYCoordinate=fullnodeinfo.coordinates[1];
         // console.log(`Min Y coordinate was updated to: ${minYCoordinate}`);
         // console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        }
      }
      else{
        maxXCoordinate=fullnodeinfo.coordinates[0];
      //  console.log(`Max X coordinate was updated to: ${maxXCoordinate}`);
         // console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        if(fullnodeinfo.coordinates[1]<minYCoordinate){
          minYCoordinate=fullnodeinfo.coordinates[1];
        //  console.log(`Min Y coordinate was updated to: ${minYCoordinate}`);
        //  console.log(`minx: ${minXCoordinate}, maxX:${maxXCoordinate},minY: ${minYCoordinate}`)
        }
      }
    })
    resultX=(minXCoordinate+maxXCoordinate)/2;
    resultY=minYCoordinate-65;

   // console.log(`The desired coordinates for the new node are (${resultX},${resultY}`);

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
  const checkForSameParent=()=>{
     //CHECK IF SELECTED NODES HAVE THE SAME PARENT
     let count=1;
     let listOfParents=[];
     let childrenWithSameParent=[];
     for(let i=0;i<selected.length;i++){
       const nodeSelected=schema.nodes.find(node=>node.id===selected[i]);  //retrieve each selected node object

       // find out if all selected nodes have the same parent 

       if(count===1 && nodeSelected.parent!=null){
         listOfParents[0]=nodeSelected.parent;
         childrenWithSameParent.push(selected[i]);
         count--;
       }
       else if(count===0 && nodeSelected.parent!=null){
         if(nodeSelected.parent!=listOfParents[0]){
           return false;
         }
         childrenWithSameParent.push(selected[i]);
       }
       
     }

     if(listOfParents.length===1){
       //console.log("The children with same parent are:");
       console.log(childrenWithSameParent);
     
     return( {parent: listOfParents[0],
              children: childrenWithSameParent,

     });
     }
     else{
       
       return true;
     }

  }
  const removeAllOutputsToNode=(node)=>{
    while (schema.links.find(link => link.output === node)) {
      const linkToRemovetwo = schema.links.find(link => link.output === node);
      let linkindextwo = schema.links.indexOf(linkToRemovetwo);
      schema.links.splice(linkindextwo, 1);
    }
  }
  const removeAllInputsToNode=(node)=>{
    while (schema.links.find(link => link.input === node)) {
      const linkToRemove = schema.links.find(link => link.input === node);
      let linkindex = schema.links.indexOf(linkToRemove);
      schema.links.splice(linkindex, 1);
    }
  }
  const updateParent=(childNodeID,parentNodeID)=>{
    removeAllOutputsToNode(childNodeID);
    const newlink={input: parentNodeID, output: childNodeID}
    schema.links.push(newlink);
  }
  
 
  const createNode = () => {
    if (selected.length === 0) {
      alert('You must select child nodes before creating a new node');
    }
    else if(checkForSameParent()===false){
      alert('Selected Nodes do not have the same parent.');
    }
    else {
      let desiredcoordinates = findcoordinates();
      


      if(checkForSameParent()===true){ console.log("No parents were found");}
     
     
      
      
      
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
      //addNode(nextNode);
      schema.nodes.push(nextNode);
      
      if(checkForSameParent()!=true&&checkForSameParent()!=false)
      {
        //CHECK FOR SAME PARENT RETURNS THE PARENT NODE IN COMMON AND THE CHILDREN NODES CONNECTED TO IT

        const ParentCheckResult = checkForSameParent();

        const childrenToUpdate = ParentCheckResult.children;
        console.log(`The following nodes need their input link deleted: ${childrenToUpdate}`);
        console.log(childrenToUpdate);

        
        const immediateParentId = ParentCheckResult.parent;
        
        console.log(`They all have the same parent: ${immediateParentId}`)
        const immediateParentNode = schema.nodes.find(node => node.id === immediateParentId);

        // *****************Update parent*********************************
        if (immediateParentNode.coordinates[1] === desiredcoordinates[1]) {
          immediateParentNode.coordinates[1] -= 65;
        }
       
     

        //*****************DELETE LINK TO CHILDREN***********************8/
        
        
        for (let p = 0; p < childrenToUpdate.length; p++) {
          const linkToUpdate=schema.links.find(link=>link.input===immediateParentId && link.output===childrenToUpdate[p]);
          
          console.log("The links that need to be updated are: ")
          console.log(linkToUpdate);
          linksToBeUpdated.push(linkToUpdate);
          linkToUpdate.output=nextNode.id;

          // while(schema.links.includes(linkToUpdate)){
          //   const findindex=schema.links.indexOf(linkToUpdate);
          //   schema.links.splice(findindex,1);

          // }
          // for(let m=0;m<linkToUpdate.length;m++){
          //   linkToUpdate[m].output=nextNode.id;
          // }


         //linkToUpdate.output=nextNode.id;
        // const filteredLinks=schema.links.filter(link=>link!=linkToUpdate);
        // removeAllOutputsToNode(childrenToUpdate[p]);
        }
        

        
      }
      addLinks(nextNode);
      updateSelectedNodeParents(nextNode.id)
      emptySelected();
    }
  }
  const updateSelectedNodeParents=(nextNodeId)=>{
    for (let a=0;a<selected.length;a++){
      const nodeToUpdate= schema.nodes.find(node => node.id === selected[a]);
      nodeToUpdate.parent=nextNodeId;
      console.log(`${selected[a]}'s parent was updated to ${nextNodeId}`);
    }
  }
  const removeUnecessaryLink=()=>{
    if (linksToBeUpdated.length != 0) {
      for (let i = 0; i < linksToBeUpdated.length; i++) {
        //linksToBeUpdated[i].output = `node-${schema.nodes.length-1}`;
        const indexofcrap=schema.links.indexOf(linksToBeUpdated[i]);
        schema.links.splice(indexofcrap,1);


        //console.log(`The output of ${linksToBeUpdated[i].input} has been updated to ${linksToBeUpdated[i].output}`)

      }
    }
  }
  const updateLink=()=>{
    if(linksToBeUpdated.length>0){
    console.log(`Inside update link; printing the links that need to be updated`);
    console.log(linksToBeUpdated);
    }
    if (linksToBeUpdated.length != 0) {
      for (let i = 0; i < linksToBeUpdated.length; i++) {
        console.log(`trying to find`)
        console.log(linksToBeUpdated[i]);
        const removecrap=schema.links.find(link=>link===linksToBeUpdated[i][0]);
        console.log(`found removecrap:`);
        console.log(removecrap)
        removecrap.output=`node-${schema.nodes.length-1}`
        
       
        console.log(schema.links);
       
      //removeAllOutputsToNode(linksToBeUpdated[i].output);
        
        //linksToBeUpdated[i].output = `node-${schema.nodes.length-1}`;
        //schema.links.push(linksToBeUpdated[i]);
        //console.log(`The output of ${linksToBeUpdated[i].input} has been updated to ${linksToBeUpdated[i].output}`)

      }
      setLinksToBeUpdated([]);
    
    }
  }
  const emptySelected=()=>{
    while(selected.length>0){
    toggleSelect(selected[0]);}
  }
  
  const addLinks=(nextNode)=>{
     let newlink={}
    selected.forEach(function(selectedId){
     // connect(`node-${schema.nodes.length + 1}`,selectedId)

        newlink={input: nextNode.id, output: selectedId};
        console.log(JSON.stringify(newlink));
        schema.links.push(newlink);
    })

  }


  return (
    <div style={{ height: '27rem' }}>

      <div style={{ backgroundColor: '#240090', textAlign: 'center', borderRadius: '4px 4px 0px 0px', height: '32px'}}>
        <label>Create</label>
      <Button color="primary"  style={{ fontSize: '12px', margin: '5px', borderStyle:'none', borderRadius: '4px', width: '40px' , height: '22px'}} onMouseOver={onChange} onClick={createNode}>
        <img style={{width: '16px', height: 'auto'}} src='images/mknode-icon.png'></img></Button>
        <label>Delete</label>
      <Button color="danger" className="red" style={{ fontSize: '12px', margin: '5px', borderStyle:'none', borderRadius: '4px', width: '40px', height: '22px' }} onClick={deleteNodeFromSchema}>
        <img style={{width: '16px', height: 'auto'}} src='images/delete-icon.png'></img></Button>
        <label>Save</label>
        <DownloadButton outputObject={schema} />
      </div>
        
      
      <Diagram style={{ height: '100%', overflow: 'scroll' }} onMouseMove={onChange} schema={schema} />
      

      
    </div>
  );
};

<UncontrolledDiagram />
export default UncontrolledDiagram;
