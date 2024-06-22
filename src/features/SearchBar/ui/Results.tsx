interface ResultsProps {
    results: Course[]
}

const Results = ({ results }: ResultsProps) => {
  return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-2/5 max-w-xl bg-white rounded-xl shadow-lg shadow-gray-500 overflow-hidden">
      <div className="max-h-48 overflow-y-auto">
        {results.map((course, index) => (
          <div key={index} className="flex flex-col p-4 border-b hover:bg-gray-100 cursor-pointer">
            <div className="flex justify-between">
              <div className="font-bold">{course.code}</div>
              <div className="flex-1 ml-4 overflow-hidden">
                <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">{course.title}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {course.database_name}
              {course.database_name.includes('Fall 2024') && (
                <span className="text-gray-400 ml-1">&#9733;</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results