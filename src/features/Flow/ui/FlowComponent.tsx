import { useCallback, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
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
  const { selectedCourse, setSelectedCourse, addCourse, setAddCourse, edge } = useSelectedCourse();
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [deletedCourses, setDeletedCourses] = useState<Set<string>>(new Set());
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const addEdgeBetweenCourses = (sourceCode: string, targetCode: string) => {
    const newEdge = {
      id: `${sourceCode}-${targetCode}`,
      source: sourceCode,
      target: targetCode,
      animated: false,
      style: connectionLineStyle,
    };
  
    setEdges((eds) => addEdge(newEdge, eds));
  };

  useDelayedEffect(() => {
    if (edge != null) {
        addEdgeBetweenCourses(edge[0], edge[1])
    }
  }, [edge])

  const AddCourse = (course: Course) => {
    if (!addedCourses.includes(course.code)) {
      if (deletedCourses.has(course.code)) {
        setDeletedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(course.code);
          return newSet;
        });
      }

      setSelectedCourse(null)

      const newNode = {
        id: `${course.code}`,
        type: 'courseNode',
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
      })
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
      setAddCourse(null)

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

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, style: connectionLineStyle }, eds)),
    []
  );

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
