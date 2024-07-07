import React from 'react';
import DraggableAttribute from './DraggableAttribute';

const attributes: Attribute[] = [
  { name: 'Freshman', label: 'Freshman Year', color: 'bg-blue-500' },
  { name: 'Sophomore', label: 'Sophomore Year', color: 'bg-green-500' },
  { name: 'Junior', label: 'Junior Year', color: 'bg-orange-500' },
  { name: 'Senior', label: 'Senior Year', color: 'bg-red-500' },
  { name: 'Transfer', label: 'Transfer Credit', color: 'bg-yellow-500' },
  { name: 'Summer', label: 'Summer', color: 'bg-gray-500' },
];

const AttributesContainer: React.FC = () => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, attribute: Attribute) => {
        event.dataTransfer.setData('label', attribute.label);
        event.dataTransfer.setData('color', attribute.color);
    };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 p-4 bg-white rounded-lg shadow-lg z-50 border-2 border-dashed border-gray-300 cursor-auto">
      <div className="flex space-x-4">
        {attributes.map(attr => (
          <DraggableAttribute
            key={attr.name}
            attribute={attr}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <p className="text-center text-gray-500 mt-2">Drag and drop attributes onto the course nodes</p>
    </div>
  );
};

export default AttributesContainer;
