import React from 'react';

interface DraggableAttributeProps {
  attribute: Attribute;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, attribute: Attribute) => void;
}

const DraggableAttribute = ({ attribute, onDragStart }: DraggableAttributeProps) => {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, attribute)}
      className="w-24 h-12 p-2 bg-white shadow-md rounded flex flex-col justify-between cursor-move"
    >
      <div className="flex-grow text-center">{attribute.name}</div>
      <div className={`h-2 w-full bg-${attribute.name != "Remove" ? attribute.color : "white border"} rounded-b`}></div>
    </div>
  );
};

export default DraggableAttribute;
