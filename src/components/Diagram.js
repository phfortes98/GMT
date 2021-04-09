import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
  import { Button } from 'beautiful-react-ui';
  import React, { useEffect } from 'react';
  import './Diagram.css'

  import sentence from './Form';
  
  const initialSchema = createSchema({
    nodes: [
      
    ]
  });
  
  const NewNode = ({}) => (
    <div className='button blue' style={{ fontSize: '0.5rem',textAlign: 'left', padding: '4px', width: '70px', height: '40px'}}>
      <a>
      <div role="button">
        <label>Form: </label><input style={{width: '25px', height: '12px'}} type='text'></input> <button className="submitf" icon='plus'>+</button> <br></br>
        
        <label>Func: </label><input style={{width: '25px', height: '12px'}}type='text'></input><button className="submitf" icon='plus'>+</button> 
      </div>
      </a>
    </div>
);
  
  const BaseNode = ({content}) => (
      <div className='button' style={{width: '70px', fontSize: '0.6rem', textAlign: 'center'}}>
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
            coordinates: [80+80*index, 320],
            content: word,
            render: BaseNode,//()=><div style={{backgroundColor: 'lightblue',borderColor: 'black', width: '70px', borderRadius: '10px', padding: '8px'}} onClick={()=>clickNode(word)}>{word}</div>
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
         render: NewNode,
         data: {onClick: deleteNodeFromSchema},
         inputs: [{ id: `port-${Math.random()}`}],
         outputs: [{ id: `port-${Math.random()}`}],
     };
     
     addNode(nextNode);
    }
  
    return (
      <div style={{ height: '27rem' }}>
        <Button color="primary" icon="plus" style={{fontSize: '12px'}} onClick={addNewNode}>Add new node</Button>
        <Button color="secondary" icon="minus" style={{fontSize: '12px'}}>Delete Node</Button>
        <Diagram style={{height: '100%', overflow: 'scroll'}} schema={schema} onChange={onChange} />
      </div>
    );
  };
  
  <UncontrolledDiagram />
export default UncontrolledDiagram;
