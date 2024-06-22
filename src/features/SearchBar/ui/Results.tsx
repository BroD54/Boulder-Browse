interface ResultsProps {
    results: Course[]
}

const Results = ({ results }: ResultsProps) => {
  return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-2/5 max-w-xl bg-white shadow-lg rounded-lg overflow-hidden z-10">
      <ul className="max-h-72 overflow-y-auto">
        {results.map(course => (
          <li key={course.code} className="px-4 py-3 border-b border-gray-300 last:border-b-0 hover:bg-gray-100 transition-colors flex items-center">
            <div className="flex-shrink-0 w-16 text-gray-600">{course.code}</div>
            <div className="flex-grow ml-2 overflow-hidden">
              <div className="font-semibold">{course.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Results