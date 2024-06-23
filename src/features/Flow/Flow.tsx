import { useEffect, useCallback } from 'react';
import useDelayedEffect from '../../hooks/useDelayedEffect';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelectedCourse } from '../../context/SelectedCourseContext';
import CourseNode from '../../components/nodes/CourseNode';

import data from '../../data/mock/2021Fall-2024Fall.json'
const courses: Courses = data
const course: Course = courses.results[1400]

const connectionLineStyle = { stroke: '#2D2D2D' };
const snapGrid = [20, 20] as [number, number];
const nodeTypes = {
  courseNode: CourseNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const Flow = () => {
  const { selectedCourse } = useSelectedCourse();

    useDelayedEffect(() => {
        if (selectedCourse != undefined) {
          console.log(selectedCourse?.title)
        }
    }, [selectedCourse])

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const onChange = () => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: '2',
        type: 'courseNode',
        data: { 
          onChange: onChange, 
          course: course
        },
        position: { x: 0, y: 0 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: -200 , y: 200 },
        targetPosition: Position.Top,
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 200, y: 200 },
        targetPosition: Position.Top,
      },
    ]);

    setEdges([
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        style: connectionLineStyle,
        deletable: false
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        style: connectionLineStyle,
        deletable: false
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
    </div>
  );
};

export default Flow;
