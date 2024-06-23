import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface CourseNodeProps {
  
}

const CourseNode = memo(({ }: CourseNodeProps) => {
  return (
    <div className="bg-white p-2 border border-black rounded w-40">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        isConnectable={true}
      />
      <div className="text-center">
        Course Node
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="w-2 h-2"
        isConnectable={true}
      />
    </div>
  );
});

export default CourseNode;
