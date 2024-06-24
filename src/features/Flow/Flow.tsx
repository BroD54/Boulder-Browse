import { ReactFlowProvider } from 'reactflow';
import FlowComponent from './ui/FlowComponent';

const Flow = () => (
  <ReactFlowProvider>
    <FlowComponent />
  </ReactFlowProvider>
);

export default Flow;
