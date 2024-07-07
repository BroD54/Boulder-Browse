import { SelectedCourseProvider } from '../context/SelectedCourseContext'
import SearchBar from '../features/SearchBar/SearchBar'
import Flow from '../features/Flow/Flow'
import SideBar from '../features/SideBar/SideBar'
import AttributesContainer from '../features/Attributes/AttributesContainer'

const CourseFlow = () => {
    return (
        <SelectedCourseProvider>
            <Flow />
            <SideBar />
            <AttributesContainer />
            <SearchBar />
        </SelectedCourseProvider>
    )
}

export default CourseFlow