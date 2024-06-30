import { SelectedCourseProvider } from '../context/SelectedCourseContext'
import SearchBar from '../features/SearchBar/SearchBar'
import Flow from '../features/Flow/Flow'
import SideBar from '../features/SideBar/SideBar'

const CourseFlow = () => {
    return (
        <SelectedCourseProvider>
            <Flow />
            <SideBar />
            <SearchBar />
        </SelectedCourseProvider>
    )
}

export default CourseFlow