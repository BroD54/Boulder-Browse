import React from 'react';

interface Attribute {
	name: string;
	label: string;
	color: string;
}

interface DraggableAttributeProps {
	attribute: Attribute;
	onDragStart: (
		event: React.DragEvent<HTMLDivElement>,
		attribute: Attribute
	) => void;
}

const DraggableAttribute: React.FC<DraggableAttributeProps> = ({
	attribute,
	onDragStart,
}) => {
	const colorClasses: Record<string, string> = {
		'red-200': 'bg-red-200',
		'orange-200': 'bg-orange-200',
		'yellow-200': 'bg-yellow-200',
		'green-200': 'bg-green-200',
		'blue-200': 'bg-blue-200',
		'purple-200': 'bg-purple-200',
		black: 'bg-black',
	};

	if (!attribute) return null;

	return (
		<div
			draggable
			onDragStart={(event) => onDragStart(event, attribute)}
			className="w-24 h-12 p-2 bg-white shadow-md rounded flex flex-col justify-between cursor-move"
		>
			<div className="flex-grow text-center">{attribute.name}</div>
			<div
				className={`h-2 w-full ${
					attribute.name !== 'Remove' && colorClasses[attribute.color]
				} rounded-b`}
			></div>
		</div>
	);
};

export default DraggableAttribute;
