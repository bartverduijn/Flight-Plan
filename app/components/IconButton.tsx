import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';

interface IconButtonProps {
	children: React.ReactNode;
	alt: string;
	onFocus: (e: React.FocusEvent<HTMLButtonElement>) => void;
	onClick: () => void;
}

function IconButton({ children, alt, onFocus, onClick }: IconButtonProps) {
	return (
		<button
			onClick={onClick}
			onFocus={onFocus}
			className="w-10 h-10 p-2 rounded-lg hover:bg-indigo-100 focus:bg-indigo-100"
		>
			<span aria-hidden="true" className="text-slate-700">
				{children}
			</span>
			<VisuallyHidden>{alt}</VisuallyHidden>
		</button>
	);
}

export default IconButton;
