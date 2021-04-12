import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import React, { useState, useEffect} from 'react';

import './Diagram.css'

import sentence from './Form';

const initialSchema = createSchema({
  nodes: [

  ]
});

const NewNode = ({ }) => (
  <div className='button blue' style={{ fontSize: '0.5rem', textAlign: 'left', padding: '4px', width: '70px', height: '40px' }}>
    <a>
      <div role="button">
        <label>Form: </label><input style={{ width: '25px', height: '12px' }} type='text'></input> <br></br>

        <label>Func: </label><input style={{ width: '25px', height: '12px' }} type='text'></input>
      </div>
    </a>
  </div>
);





const UncontrolledDiagram = ({ sentence }) => {
  // create diagrams schema

  const [schema, { onChange, addNode, addLink, removeNode }] = useSchema(initialSchema);

  const [selected, setSelected] = useState([]);
  

  const clickNode = (id) => {
    console.log(`${id} clicked!`);
    if(selected.includes(id)){
      for(let i=0;i<selected.length;i++){
        if(selected[i]===id){
          selected.splice(i,1);}
      }
    }
    else{ selected.push(id)}
    console.log(selected);
    setSelected(selected);
  }
  const BaseNode = ({ content,id}) => (
    <div className='button active' style={{ width: '70px', fontSize: '0.6rem', textAlign: 'center' }}>
      <a onClick={()=>clickNode(id)}>
        <div role="button">
          {content}
        </div>
      </a>
    </div>
  );
  React.useEffect(() => {
    const wordNodes = sentence.split(" ");

    wordNodes.forEach((word, index) => {
      const node = {
        id: `node-${index}`,
        coordinates: [80 + 80 * index, 320],
        content: word,
        parentid: null,
        render: BaseNode,//()=><div style={{backgroundColor: 'lightblue',borderColor: 'black', width: '70px', borderRadius: '10px', padding: '8px'}} onClick={()=>clickNode(word)}>{word}</div>
      };
      addNode(node);
      console.log(`Node ${index} corresponds to the word "${word}"`)
    });

    console.log(JSON.stringify(schema));


  }, [sentence]);

  const deleteNodeFromSchema = (id) => {
    const nodeToRemove = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
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
    resultY=minYCoordinate-80;

    return [resultX,resultY];

  }

  const createNode = () => {
    let desiredcoordinates=findcoordinates();
    console.log(`The desired coordinates for the new node are: (${desiredcoordinates[0]},${desiredcoordinates[1]})`);
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        desiredcoordinates[0] ,
        desiredcoordinates[1],
      ],
      render: NewNode,
      data: { onClick: deleteNodeFromSchema },
      inputs: [{ id: `port-${Math.random()}` }],
      outputs: [{ id: `port-${Math.random()}` }],
    };

    addNode(nextNode);

    //let newlink={input: nextNode.id, output: 'node-0'};
    console.log(`The nodes currently selected are ${selected}.`);
    //console.log(JSON.stringify(newlink));
    //schema.links.push(newlink);
    let newlink={}
    
    selected.forEach(function(selectedId){
      newlink={input: nextNode.id, output: selectedId};
      console.log(JSON.stringify(newlink));
      schema.links.push(newlink);
    }
    
    )
    

    
  }



  return (
    <div style={{ height: '27rem' }}>
      <Button color="primary" icon="plus" style={{ fontSize: '12px' }} onClick={createNode}>Add new node</Button>
      <Button color="secondary" icon="minus" style={{ fontSize: '12px' }}>Delete Node</Button>
      <Diagram style={{ height: '100%', overflow: 'scroll' }} schema={schema} onChange={onChange} />
    </div>
  );
};

<UncontrolledDiagram />
export default UncontrolledDiagram;
