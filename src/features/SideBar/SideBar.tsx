import { useState } from "react";
import { useSelectedCourse } from "../../context/SelectedCourseContext";
import useDelayedEffect from "../../hooks/useDelayedEffect";

const SideBar = () => {
    const [hideSideBar, setHideSideBar] = useState(true)

    const { selectedCourse, setSelectedCourse } = useSelectedCourse();

    useDelayedEffect(() => {
        if (selectedCourse != null) {
            setHideSideBar(false)
        }
    }, [selectedCourse])

    const handleMouseDown = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
    };

    const closeSideBar = () => {
        setSelectedCourse(null)
        setHideSideBar(true)
    }

    return (
        <div className={`${hideSideBar && "hidden"} fixed right-4 bottom-4 w-80 h-4/5 bg-white shadow-md p-6 rounded-lg border border-gray-200 z-10`} onMouseDown={handleMouseDown}>
            <div className="flex justify-between items-center h-12">
                <h2 className="text-xl font-bold mb-2">{selectedCourse?.code}</h2>
                <span className="text-red-400 text-2xl font-bold cursor-pointer  mb-2" onClick={closeSideBar}>&times;</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{selectedCourse?.title}</h2>
            <p className="text-sm text-gray-600"><strong>Hours:</strong> {selectedCourse?.hours}</p>
            <p className="text-sm text-gray-600"><em>Last Offered {selectedCourse?.database_name}</em></p>
            <div className="text-sm text-gray-800 course-description" dangerouslySetInnerHTML={{ __html: selectedCourse?.description as string}}></div>
            <p className="text-sm text-gray-600 mt-2">{selectedCourse?.restrict_info}</p>
            <style>
                {`
                    .course-description a {
                        pointer-events: none;
                        color: inherit;
                        text-decoration: none;
                    }
                `}
            </style>
        </div>
    )
}

export default SideBar;
