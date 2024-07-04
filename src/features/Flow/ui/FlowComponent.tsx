import { useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  OnNodesDelete,
  MiniMap,
  ControlButton,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelectedCourse } from '../../../context/SelectedCourseContext';
import CourseNode from '../../../components/nodes/CourseNode';
import HorizontalCourseNode from '../../../components/nodes/HorizontalCourseNode';
import useDelayedEffect from '../../../hooks/useDelayedEffect';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlowData from "../../../data/flow/FlowData.json";
import ELK from 'elkjs/lib/elk.bundled.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faExchangeAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the layout icon

const connectionLineStyle = { stroke: '#2D2D2D' };
const snapGrid = [20, 20] as [number, number];
const nodeTypes = {
  courseNode: CourseNode,
  horizontalCourseNode: HorizontalCourseNode
};

const defaultViewport = { x: 0, y: 0, zoom: 1 }; // Set initial zoom to 1

const FlowComponent = () => {
  const { selectedCourse, setSelectedCourse, addCourse, setAddCourse, edge } = useSelectedCourse();
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [deletedCourses, setDeletedCourses] = useState<Set<string>>(new Set());
  const [nodes, setNodes, onNodesChange] = useNodesState(FlowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(FlowData.edges);
  const [nodeType, setNodeType] = useState('courseNode');
  const [edgeType, setEdgeType] = useState('default');
  const [isHorizontalLayout, setIsHorizontalLayout] = useState(true);

  const toggleNodeType = () => {
    const newType = nodeType === 'courseNode' ? 'horizontalCourseNode' : 'courseNode';
    setNodeType(newType);

    const updatedNodes = nodes.map(node => ({
      ...node,
      type: newType
    }));
  
    setNodes(updatedNodes);
  };  

  const toggleEdgeType = () => {
    const newType = edgeType === 'smoothstep' ? 'default' : 'smoothstep'
    setEdgeType(newType);

    const updatedEdges = edges.map(edge => ({
      ...edge,
      type: newType
    }));
  
    setEdges(updatedEdges);
  };
  
  const addEdgeBetweenCourses = (sourceCode: string, targetCode: string) => {
    const newEdge: Edge = {
      id: `${sourceCode}-${targetCode}`,
      source: sourceCode,
      target: targetCode,
      animated: false,
      type: edgeType,
      style: connectionLineStyle,
    };
  
    setEdges((eds) => addEdge(newEdge, eds));
  };

  useDelayedEffect(() => {
    if (edge != null) {
      addEdgeBetweenCourses(edge[0], edge[1]);
    }
  }, [edge]);

  const AddCourse = (course: Course) => {
    if (!addedCourses.includes(course.code)) {
      if (deletedCourses.has(course.code)) {
        setDeletedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(course.code);
          return newSet;
        });
      }

      setSelectedCourse(null);

      const newNode: Node = {
        id: `${course.code}`,
        type: nodeType,
        position: { x: Math.random() * 800, y: Math.random() * 800 },
        data: { course },
      };
      
      setNodes((nds) => [...nds, newNode]);
      setAddedCourses([...addedCourses, course.code]);
      
      toast.success(`${course.code} was added`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        className: `toast-success`
      });
    } else {
      setSelectedCourse(course);
      toast.warn(`${course.code} already exists`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        className: `toast-warn`
      });
    }
  };

  const DeleteCourse = (course: Course) => {
    if (course) {
      setNodes((nds) => nds.filter((node) => node.id !== course.code));
      setDeletedCourses((prev) => new Set(prev).add(course.code));
      setAddedCourses((prev) => prev.filter((code) => code !== course.code));
      setAddCourse(null);

      toast.error(`${course.code} was deleted`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: `toast-error`,
      });
    }
  };

  const onNodesDelete: OnNodesDelete = (nodes) => {
    nodes.forEach((node) => {
      if (node.data && node.data.course) {
        DeleteCourse(node.data.course);
      }
    });
  };

  const handleNodeClick = (node: Node<any, string | undefined>) => {
    setSelectedCourse(node.data.course);
  };

  useDelayedEffect(() => {
    if (addCourse != undefined) {
      AddCourse(addCourse);
    }
  }, [addCourse]);

  const handleAddEdge = (params: any) => {
    const newEdge = {
      ...params,
      type: edgeType,
      style: connectionLineStyle,
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };


  const handleLayout = async () => {
    const elk = new ELK();
    const layoutDirection = isHorizontalLayout ? 'DOWN' : 'RIGHT';
    setIsHorizontalLayout(!isHorizontalLayout)

    const elkGraph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': layoutDirection },
      children: nodes.map(node => ({
        id: node.id,
        width: 240,
        height: 60
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target]
      }))
    };

    const newGraph = await elk.layout(elkGraph);

    const updatedNodes = nodes.map(node => {
      const nodeLayout = newGraph.children?.find(n => n.id === node.id);
      return {
        ...node,
        position: { x: nodeLayout?.x, y: nodeLayout?.y }
      };
    });

    setNodes(updatedNodes as Node[]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === selectedCourse?.code) {
            return {
              ...node,
              className: 'pulse',
            };
          }
          return node;
        })}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={(_event, node) => handleNodeClick(node)}
        onEdgesChange={onEdgesChange}
        onConnect={handleAddEdge}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        attributionPosition="bottom-left"
        minZoom={0.35}
      >
        <Background />
        <Controls>
          <ControlButton onClick={handleLayout} title="auto layout" >
            <FontAwesomeIcon icon={faProjectDiagram} />
          </ControlButton>
          <ControlButton onClick={toggleNodeType} title="flip node direction">
            <FontAwesomeIcon icon={faExchangeAlt} />
          </ControlButton>
          <ControlButton onClick={toggleEdgeType} title="switch edge type">
            <FontAwesomeIcon icon={faArrowRight} />
          </ControlButton>
        </Controls>
        <MiniMap />
      </ReactFlow>
      <ToastContainer />
    </div>
  );
};

export default FlowComponent;
