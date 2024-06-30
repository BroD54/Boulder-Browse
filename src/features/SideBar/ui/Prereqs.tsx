import getPrerequisites from '../../../utils/getPrerequisites'

interface PrereqsProps {
    code: string
    restrict_info: string
}

const Prereqs = ({ code, restrict_info }: PrereqsProps) => {
    const prereq_tree = getPrerequisites(code, restrict_info)
    
    return (
        <>
            <h2><strong>Prerequisites:</strong></h2>
            <ul className='list-disc ml-8'>
                <li key="root">{code}</li>
                { prereq_tree.children?.length != 0 ? prereq_tree.children?.map((child, i) => (
                    <>
                        <li className='ml-8' key={`child-${i}`}>{child.courseCode}</li>
                        {child.children?.map((grandchild, i) => (
                            <li className='ml-16' key={`grandchildchild-${i}`}>{grandchild.courseCode}</li>
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