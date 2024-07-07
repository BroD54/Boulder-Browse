import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import DatabaseNameFormat from '../../features/Flow/utils/DatabaseNameFormat';

interface CourseNodeProps {
  data: {
    onChange: () => void
    course: Course
    color?: String
    label?: String
  }
}

const CourseNode = memo(({ data }: CourseNodeProps) => {
  const course = data.course

  return (
    <div className={`border-black bg-white p-2 border rounded w-60 hover:cursor-move`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        isConnectable={true}
      />
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start w-16">
          <div className="font-bold text-xs">{course.code}</div>
          <div className="text-xs text-gray-400">
            <DatabaseNameFormat name={course.database_name} />
          </div>
        </div>
        <div className="ml-2 flex-1 text-center flex items-center">
          <div className="whitespace-normal break-words text-sm">{course.title}</div>
        </div>
      </div>
      {data.label && data.color != "black" && (
        <div className={`relative bottom-0 right-0 left-0 bg-${data.color} text-xs text-center rounded`}>
          {data.label}
        </div>
      )}
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
