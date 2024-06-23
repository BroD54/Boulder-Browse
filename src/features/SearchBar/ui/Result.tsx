import { useSelectedCourse } from '../../../context/SelectedCourseContext'

interface ResultProps {
    course: Course
}


const Result = ({ course }: ResultProps) => {
    const { setSelectedCourse } = useSelectedCourse();

    return (
        <div 
            className="flex flex-col p-4 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedCourse(course)}
        >
            <div className="flex justify-between">
                <div className="font-bold">{course.code}</div>
                <div className="flex-1 ml-4 overflow-hidden">
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">{course.title}</div>
                </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
                {course.database_name}
                {course.database_name.includes('Fall 2024') && (
                    <span className="text-gray-400 ml-1">&#9733;</span>
                )}
            </div>
        </div>
    )
}

export default Result