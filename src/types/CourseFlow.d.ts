interface SelectedCourseContextType {
    selectedCourse: Course | null;
    setSelectedCourse: (course: Course | null) => void;
}
