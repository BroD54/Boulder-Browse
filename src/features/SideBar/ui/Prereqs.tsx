import getPrerequisites from '../../../utils/getPrerequisites'
import { useSelectedCourse } from '../../../context/SelectedCourseContext'
import getCourseDetails from '../../../services/api/GetCourseDetails'

interface PrereqsProps {
    code: string
    restrict_info: string
}

const Prereqs = ({ code, restrict_info }: PrereqsProps) => {
    const { setAddCourse, setEdge } = useSelectedCourse()
    const prereq_tree = getPrerequisites(code, restrict_info)

    const handlePrereqAdd = (root: CourseNode, child: CourseNode) => {
        console.log(root.courseCode + " --> " + child.courseCode)
        const course = getCourseDetails(child.courseCode)
        if (course != null) {
            setAddCourse(course)
            setEdge([root.courseCode, child.courseCode])        
        }
    }
    
    return (
        <>
            <h2><strong>Prerequisites:</strong></h2>
            <ul className='list-disc ml-8'>
                <li key="root">{code}</li>
                { prereq_tree.children?.length != 0 ? prereq_tree.children?.map((child, i) => (
                    <>
                        <li className='ml-8' key={`child-${i}`}>{child.courseCode}</li>
                        {child.children?.map((grandchild, i) => (
                            <li className='ml-16' key={`grandchildchild-${i}`}>
                                <a className='cursor-pointer text-cyan-600 hover:underline' onClick={() => handlePrereqAdd(prereq_tree, grandchild)}>{grandchild.courseCode}</a>
                            </li>
                        ))}
                    </>
                )) : 
                    <li className='ml-8' key="no children">None</li>
                }
            </ul>
        </>
    )
}

export default Prereqs