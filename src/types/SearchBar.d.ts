interface Course {
    srcdb: string
    database_name: string
    code: string
    title: string
}

interface Courses {
    count: number
    results: Course[]
}
