import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge, useReactFlow, Node, Edge } from 'reactflow';
import { toast } from 'react-toastify';

const connectionLineStyle = { stroke: '#2D2D2D' };
const snapGrid = [20, 20] as [number, number];

const useFlow = () => {
  const { getZoom } = useReactFlow();
  const [addedCourses, setAddedCourses] = useState<string[]>([]);
  const [deletedCourses, setDeletedCourses] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CourseNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const addCourse = (course: Course) => {
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

      const newNode: Node = {
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
        className: 'toast-success',
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
        className: 'toast-warn',
      });
    }
  };

  const deleteCourse = (course: Course) => {
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
        className: 'toast-error',
      });
    }
  };

  const onNodesDelete = useCallback(
    (nodes: Node[]) => {
      nodes.forEach((node) => {
        if (node.data && node.data.course) {
          deleteCourse(node.data.course);
        }
      });
    },
    [deleteCourse]
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, style: connectionLineStyle }, eds)),
    []
  );

  return {
    nodes,
    edges,
    snapGrid,
    onNodesChange,
    onEdgesChange,
    addCourse,
    deleteCourse,
    onNodesDelete,
    onConnect,
    connectionLineStyle,
    selectedNodeId,
    setSelectedNodeId,
  };
};

export default useFlow;
