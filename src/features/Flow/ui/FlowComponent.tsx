import { useCallback, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  useReactFlow,
  OnNodesDelete,
  MiniMap,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelectedCourse } from '../../../context/SelectedCourseContext';
import CourseNode from '../../../components/nodes/CourseNode';
import useDelayedEffect from '../../../hooks/useDelayedEffect';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const connectionLineStyle = { stroke: '#2D2D2D' };
const snapGrid = [20, 20] as [number, number];
const nodeTypes = {
  courseNode: CourseNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1 }; // Set initial zoom to 1

const FlowComponent = () => {
  const { setSelectedCourse, addCourse } = useSelectedCourse();
  const { getZoom } = useReactFlow();
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [deletedCourses, setDeletedCourses] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const AddCourse = (course: Course) => {
    if (!addedCourses.includes(course.code)) {
      if (deletedCourses.has(course.code)) {
        setDeletedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(course.code);
          return newSet;
        });
      }

      // Get the viewport dimensions and center position
      const centerX = document.documentElement.clientWidth / 2 - 240 / 2;
      const centerY = document.documentElement.clientHeight / 2;
      const zoom = getZoom();


      const newNode = {
        id: `${course.code}`,
        type: 'courseNode',
        position: { x: centerX / zoom, y: centerY / zoom },
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
        className: 'toast-success', // >
      });
    } else {
      setSelectedNodeId(course.code);
      toast.warn(`${course.code} already exists`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        className: 'toast-warn', // >
      });
    }
  };

  const DeleteCourse = (course: Course) => {
    if (course) {
      setNodes((nds) => nds.filter((node) => node.id !== course.code));
      setDeletedCourses((prev) => new Set(prev).add(course.code));

      toast.error(`${course.code} was deleted`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-error', // > 
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
    setSelectedNodeId(node.id);
    setSelectedCourse(node.data.course)

  };

  useDelayedEffect(() => {
    if (addCourse != undefined) {
      AddCourse(addCourse);
    }
  }, [addCourse]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, style: connectionLineStyle }, eds)),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              className: 'pulse'
            };
          }
          return node;
        })}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={(_event, node) => handleNodeClick(node)}
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
