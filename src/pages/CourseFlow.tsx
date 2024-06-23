import { SelectedCourseProvider } from '../context/SelectedCourseContext'
import SearchBar from '../features/SearchBar/SearchBar'
import Flow from '../features/Flow/Flow'

const CourseFlow = () => {
    return (
        <SelectedCourseProvider>
            <Flow />
            <SearchBar />
        </SelectedCourseProvider>
    )
}

export default CourseFlow