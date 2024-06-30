interface SelectedCourseContextType {
    selectedCourse: Course | null;
    setSelectedCourse: (course: Course | null) => void;
    addCourse: Course | null;
    setAddCourse: (course: Course | null) => void;
}
