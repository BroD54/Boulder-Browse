import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import DatabaseNameFormat from '../../features/Flow/utils/DatabaseNameFormat';

interface HorizontalCourseNodeProps {
  data: {
    onChange: () => void;
    course: Course;
    color?: string;
    label?: string;
  };
}

const HorizontalCourseNode = memo(({ data }: HorizontalCourseNodeProps) => {
  const course = data.course;

  return (
    <div className={`border-2 ${data.color ? `border-${data.color}` : 'border-black'} bg-white p-2 rounded w-80 h-28 flex flex-col justify-between hover:cursor-move relative`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2"
        isConnectable={true}
      />
      <div className="flex justify-between items-center">
        <div className="font-bold">{course.code}</div>
        <div className=" text-gray-400">
          <DatabaseNameFormat name={course.database_name} />
        </div>
      </div>
      <div className="text-md text-center overflow-hidden overflow-ellipsis whitespace-normal line-clamp-3 px-2 mb-2">
        {course.title}
      </div>
      <div className="flex justify-center items-center">
        <div className={`relative bg-${data.color} h-4 w-full text-center text-xs rounded mx-1`}>
          <span className="absolute top-0 left-0 right-0">{data.label && data.color !== "black" && `${data.label}`}</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        className="w-2 h-2"
        isConnectable={true}
      />
    </div>
  );
});

export default HorizontalCourseNode;
