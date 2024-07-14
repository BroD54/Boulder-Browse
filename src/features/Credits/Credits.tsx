
interface CreditHoursProps {

}

const Credits = ({  }: CreditHoursProps) => {
    const attributes: any[] = [
        {
            attribute: "Freshman", 
            hour: 14
        },
        {
            attribute: "Sophomore", 
            hours: 4
        },
        {
            attribute: "Junior", 
            hours: 4
        },
        {
            attribute: "Senior", 
            hours: 4
        },
        {
            attribute: "Summer", 
            hours: 4
        },
        {
            attribute: "Transfer", 
            hours: 4
        },
    ]
    const totalHours = 17
  return (
    <div className="fixed top-0 right-0 m-4 w-80 p-2 bg-white shadow-lg z-50 border-dashed border-2">
        <div className="grid grid-cols-3 gap-2">
            {attributes.map((attr) => (
            <div key={attr.attribute} className="flex flex-col items-center">
                <div className="text-sm font-bold">{attr.attribute}</div>
                <div className="text-xs text-gray-500">{attr.hours} hours</div>
            </div>
            ))}
        </div>
        <div className="flex justify-end mt-2">
            <div className="flex flex-row items-end">
                <div className="text-sm font-bold">Total <span className="text-xs font-normal text-gray-500">{totalHours} hours</span></div>
            </div>
        </div>
    </div>

  );
};

export default Credits;
