import { useEffect, useCallback, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Background, useReactFlow, OnNodesDelete } from 'reactflow';
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

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const FlowComponent = () => {
  const { selectedCourse } = useSelectedCourse();
  const { fitView } = useReactFlow();
  const [addedCourses, setAddedCourses] = useState<string[]>([])
  const [deletedCourses, setDeletedCourses] = useState<Set<string>>(new Set());

  const AddCourse = (course: Course) => {
    if (!addedCourses.includes(course.code)) {
        if (deletedCourses.has(course.code)) {
        setDeletedCourses((prev) => {
            const newSet = new Set(prev);
            newSet.delete(course.code);
            return newSet;
        });
        }

        const newNode = {
        id: `${course.code}`,
        type: 'courseNode',
        position: { x: 0, y: 0 },
        data: { course },
        };
        setNodes((nds) => [...nds, newNode]);
        setAddedCourses([...addedCourses, course.code])

        toast.success(`${course.code} was added`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        className: 'toast-success', // >
        });

        fitView({ padding: 1 });
    } else {
        // highlight the course that exists.
    }
  };

  const DeleteCourse = (course: Course) => {
    if (course) {
      setNodes((nds) => nds.filter((node) => node.id !== course.code));
      setDeletedCourses((prev) => new Set(prev).add(course.code));

      toast.error(`${course.code} was deleted`, {
        position: "bottom-right",
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
  
  useDelayedEffect(() => {
    if (selectedCourse != undefined) {
      AddCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'output',
        data: { label: 'Pre-requisite 1' },
        position: { x: -100, y: 200 },
        targetPosition: Position.Top,
      },
      {
        id: '2',
        type: 'output',
        data: { label: 'Pre-requisite 2' },
        position: { x: 100, y: 200 },
        targetPosition: Position.Top,
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, style: connectionLineStyle }, eds)),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
      <ToastContainer />
    </div>
  );
};

export default FlowComponent;
