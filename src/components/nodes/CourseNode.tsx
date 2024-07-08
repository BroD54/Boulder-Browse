import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import DatabaseNameFormat from '../../features/Flow/utils/DatabaseNameFormat';

interface CourseNodeProps {
  data: {
    onChange: () => void;
    course: Course;
    color?: string;
    label?: string;
  };
}

const CourseNode = memo(({ data }: CourseNodeProps) => {
  const course = data.course;

  return (
    <div className={`border-2 ${data.color ? `border-${data.color}` : 'border-black'} bg-white p-2 rounded w-40 h-40 flex flex-col justify-between hover:cursor-move`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        isConnectable={true}
      />
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">{course.code}</div>
        <div className="text-xs text-gray-400">
          <DatabaseNameFormat name={course.database_name} />
        </div>
      </div>
      <div className="text-md text-center overflow-hidden overflow-ellipsis whitespace-normal line-clamp-4">
        {course.title}
      </div>
      <div className="flex justify-center items-center">
        <div className={`relative bg-${data.color} h-4 w-full text-center text-xs rounded`}>
          <span className="absolute top-0 left-0 right-0">{data.label && data.color !== "black" && `${data.label}`}</span>
        </div>
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
