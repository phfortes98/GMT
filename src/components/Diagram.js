import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import 'beautiful-react-diagrams/styles.css';

const BaseNode = (props) => {
  const { inputs } = props;
  
  return (
    <div style={{ width: '60px',background: '#afaeae', borderRadius: '10px',alignItems: 'center' }}>
      <div style={{ padding: '10px', color: 'white'  }}>
        Custom Node
      </div>
    </div>
  );
};

const CustomNode = (props) => {
  const { inputs } = props;
  
  return (
    <div style={{ background: '#240090', borderRadius: '10px',fontSize: '0.6rem' }}>
      <div style={{ color: 'white'  }}>
        <div style={{ padding: '1px 3px'}}>
        <select style={{backgroundColor:'#240090',color: '#fff' }}name="function" id="function">
          <option value="function 1">func 1</option>
          <option value="function 2">func 2</option>
          <option value="function 3">func 3</option>
          <option value="function 4">func 4</option>
        </select>
        </div>
        <div style={{height:'10px', backgroundColor: '#3e02f3'}}></div>
        <div style={{padding:'1px 3px'}}>
        <select style={{backgroundColor:'#240090',color: '#fff'}} name="function" id="function">
          <option value="form 1">form 1</option>
          <option value="form 2">form 2</option>
          <option value="form 3">form 3</option>
          <option value="form 4">form 4</option>
        </select>
        </div>
      </div>
    </div>
  );
};
const CustomNode2 = (props) => {
  const { inputs } = props;
  
  return (
    <div style={{ background: '#8b0000', borderRadius: '10px',fontSize: '0.6rem' }}>
      <div style={{ color: 'white'  }}>
        <div style={{ padding: '1px 3px'}}>
        <select style={{backgroundColor:'#8b0000',color: '#fff' }}name="function" id="function">
          <option value="function 1">func 1</option>
          <option value="function 2">func 2</option>
          <option value="function 3">func 3</option>
          <option value="function 4">func 4</option>
        </select>
        </div>
        <div style={{height:'10px', backgroundColor: '#ff0000'}}></div>
        <div style={{padding:'1px 3px'}}>
        <select style={{backgroundColor:'#8b0000',color: '#fff'}} name="function" id="function">
          <option value="form 1">form 1</option>
          <option value="form 2">form 2</option>
          <option value="form 3">form 3</option>
          <option value="form 4">form 4</option>
        </select>
        </div>
      </div>
    </div>
  );
};
const CustomNode3 = (props) => {
  const { inputs } = props;
  
  return (
    <div style={{ background: '#006400', borderRadius: '10px',fontSize: '0.6rem' }}>
      <div style={{ color: 'white'  }}>
        <div style={{ padding: '1px 3px'}}>
        <select style={{backgroundColor:'#006400',color: '#fff' }}name="function" id="function">
          <option value="function 1">func 1</option>
          <option value="function 2">func 2</option>
          <option value="function 3">func 3</option>
          <option value="function 4">func 4</option>
        </select>
        </div>
        <div style={{height:'10px', backgroundColor: '#008000'}}></div>
        <div style={{padding:'1px 3px'}}>
        <select style={{backgroundColor:'#006400',color: '#fff'}} name="function" id="function">
          <option value="form 1">form 1</option>
          <option value="form 2">form 2</option>
          <option value="form 3">form 3</option>
          <option value="form 4">form 4</option>
        </select>
        </div>
      </div>
    </div>
  );
};
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'We', coordinates: [200, 360],  },
    { id: 'node-2', content: 'are', coordinates: [300, 360], },
    { id: 'node-3', content: 'capable', coordinates: [400, 360], },
    /*
    { id: 'node-lvl2-1', coordinates: [200, 280], render: CustomNode,},
    { id: 'node-lvl2-2', coordinates: [300, 280], render: CustomNode,},
    { id: 'node-lvl2-3', coordinates: [400, 280], render: CustomNode,},
    { id: 'node-lvl3-1', coordinates: [200, 200], render: CustomNode2,},
    { id: 'node-lvl3-2', coordinates: [350, 200], render: CustomNode2,},
    { id: 'node-lvl4-1', coordinates: [275, 120], render: CustomNode3,},
    */
  ],
  links: [
    /*
   { input: 'node-lvl2-1',  output: 'node-1', readonly: true },
   { input: 'node-lvl2-2',  output: 'node-2', readonly: true },
   { input: 'node-lvl2-3',  output: 'node-3', readonly: true },
   { input: 'node-lvl3-1',  output: 'node-lvl2-1', readonly: true },
   { input: 'node-lvl3-2',  output: 'node-lvl2-2', readonly: true },
   { input: 'node-lvl3-2',  output: 'node-lvl2-3', readonly: true },
   { input: 'node-lvl4-1',  output: 'node-lvl3-1', readonly: true },
   { input: 'node-lvl4-1',  output: 'node-lvl3-2', readonly: true },
   */
   
  ]
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div style={{ height: '29rem', overflow: 'scroll'}}>
      <Diagram schema={schema} />
    </div>
  );
};

export default UncontrolledDiagram;