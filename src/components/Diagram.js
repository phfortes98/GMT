import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
  import { Button } from 'beautiful-react-ui';
  import React, { useEffect } from 'react';
  import './Diagram.css'

  import sentence from './Form';
  
  const initialSchema = createSchema({
    nodes: [
      
    ]
  });
  
  
  const CustomRender = ({content}) => (
      <div className='button' style={{width: '60px', fontSize: '0.6rem', textAlign: 'center'}}>
        <a>
        <div role="button">
          {content}
        </div>
        </a>
      </div>
  );
  
  const UncontrolledDiagram = ({sentence}) => {
    // create diagrams schema
    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
    const clickNode=(node)=>{
      console.log(node);
    }
    React.useEffect(()=>{
        const wordNodes=sentence.split(" ");
        
        wordNodes.forEach((word,index)=>{
          const node={
            id: `node-${index}`,
            coordinates: [80+80*index, 280],
            content: word,
            render: CustomRender,//()=><div style={{backgroundColor: 'lightblue',borderColor: 'black', width: '70px', borderRadius: '10px', padding: '8px'}} onClick={()=>clickNode(word)}>{word}</div>
          };
          addNode(node);
        });


    },[sentence]);
    
    const deleteNodeFromSchema = (id) => {
      const nodeToRemove = schema.nodes.find(node => node.id === id);
      removeNode(nodeToRemove);
    };
  
    const addNewNode = () => {
      const nextNode = {
         id: `node-${schema.nodes.length+1}`,
         content: `Node ${schema.nodes.length+1}`,
         coordinates: [
           schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
           schema.nodes[schema.nodes.length - 1].coordinates[1],
         ],
         render: CustomRender,
         data: {onClick: deleteNodeFromSchema},
         inputs: [{ id: `port-${Math.random()}`}],
         outputs: [{ id: `port-${Math.random()}`}],
     };
     
     addNode(nextNode);
    }
  
    return (
      <div style={{ height: '27rem' }}>
        <Button color="primary" icon="plus" onClick={addNewNode}>Add new node</Button>
        <Button color="secondary" icon="minus">Delete Node</Button>
        <Diagram style={{height: '100%', overflow: 'scroll'}} schema={schema} onChange={onChange} />
      </div>
    );
  };
  
  <UncontrolledDiagram />
export default UncontrolledDiagram;
