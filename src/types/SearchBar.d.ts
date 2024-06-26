interface GenericJsonData {
    [key: string]: any;
}

interface Course {
    srcdb: string
    database_name: string
    code: string
    title: string
    crn: string[]
    hours: string
    restrict_info: string
    description: string
}

interface Courses {
    count: number
    results: Course[]
}

interface ResultHandleContextProps {
    handleClick: (course: Course) => void
}
