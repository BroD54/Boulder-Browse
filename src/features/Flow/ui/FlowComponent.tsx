import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelectedCourse } from '../../../context/SelectedCourseContext';
import CourseNode from '../../../components/nodes/CourseNode';
import useDelayedEffect from '../../../hooks/useDelayedEffect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFlow from '../../../hooks/useFlow';

const nodeTypes = {
  courseNode: CourseNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1 }; // Set initial zoom to 1

const FlowComponent = () => {
  const { setSelectedCourse, addCourse } = useSelectedCourse();
  const {
    nodes,
    edges,
    snapGrid,
    onNodesChange,
    onEdgesChange,
    addCourse: addCourseToFlow,
    onNodesDelete,
    onConnect,
    selectedNodeId,
    connectionLineStyle,
    setSelectedNodeId,
  } = useFlow();

  useDelayedEffect(() => {
    if (addCourse != undefined) {
      addCourseToFlow(addCourse);
    }
  }, [addCourse]);

  const handleNodeClick = (
    _event: React.MouseEvent,
    node: Node
  ) => {
    setSelectedNodeId(node.id);
    setSelectedCourse(node.data.course);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              className: 'pulse',
            };
          }
          return node;
        })}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={handleNodeClick}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <ToastContainer />
    </div>
  );
};

export default FlowComponent;
