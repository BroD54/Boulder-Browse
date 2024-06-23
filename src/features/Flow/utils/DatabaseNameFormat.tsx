interface DatabaseNameFormatProps {
  name: string;
}

const DatabaseNameFormat = ({ name }: DatabaseNameFormatProps) => {
  name = name.replace(/Academic Year /gi, '').trim();

  if (name === "Fall 2024") {
    return (
      <>
        {name} <span className="text-gray-500">&#9733;</span>
      </>
    );
  }

  return <>{name}</>;
};

export default DatabaseNameFormat;
