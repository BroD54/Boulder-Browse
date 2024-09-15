import React from 'react';
import DraggableAttribute from './DraggableAttribute';

interface Attribute {
	name: string;
	label: string;
	color: string;
}

const attributes: Attribute[] = [
	{ name: 'Freshman', label: 'Freshman Year', color: 'red-200' },
	{ name: 'Sophomore', label: 'Sophomore Year', color: 'orange-200' },
	{ name: 'Junior', label: 'Junior Year', color: 'yellow-200' },
	{ name: 'Senior', label: 'Senior Year', color: 'green-200' },
	{ name: 'Transfer', label: 'Transfer Credit', color: 'blue-200' },
	{ name: 'Summer', label: 'Summer', color: 'purple-200' },
	{ name: 'Remove', label: '', color: 'white' },
];

const AttributesContainer: React.FC = () => {
	const handleDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		attribute: Attribute
	) => {
		event.dataTransfer.setData('label', attribute.label);
		event.dataTransfer.setData('color', attribute.color);
	};

	return (
		<div className="hidden lg:block fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 p-4 bg-white rounded-lg shadow-lg z-50 border-2 border-dashed cursor-auto">
			<div className="flex space-x-4">
				{attributes.map((attr) => (
					<DraggableAttribute
						key={attr.name}
						attribute={attr}
						onDragStart={handleDragStart}
					/>
				))}
			</div>
			<p className="text-center text-gray-500 mt-2">
				Drag and drop attributes onto the course nodes
			</p>
		</div>
	);
};

export default AttributesContainer;
