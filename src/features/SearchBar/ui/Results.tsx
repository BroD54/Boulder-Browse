import Result from "./Result"

interface ResultsProps {
    results: Course[]
}

const Results = ({ results }: ResultsProps) => {
  return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-2/5 max-w-xl bg-white rounded-xl shadow-lg shadow-gray-500 overflow-hidden" >
      <div className="max-h-80 overflow-y-auto">
        {results.map((course, index) => (
          <Result key={index} course={course} />
        ))}
      </div>
    </div>
  )
}

export default Results