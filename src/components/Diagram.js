import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import React, { useEffect } from 'react';
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

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  let selected=[]

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

  const createNode = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: NewNode,
      data: { onClick: deleteNodeFromSchema },
      inputs: [{ id: `port-${Math.random()}` }],
      outputs: [{ id: `port-${Math.random()}` }],
    };

    addNode(nextNode);
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
