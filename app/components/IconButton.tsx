import * as React from 'react';
import clsx from 'clsx';

interface IconButtonProps {
	className?: string;
	children: React.ReactNode;
	alt: string;
	onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	onClick: () => void;
}

export function IconButton({
	children,
	alt,
	className,
	onFocus,
	onClick,
}: IconButtonProps) {
	return (
		<button
			onClick={onClick}
			onFocus={onFocus}
			className={clsx(
				'w-10 h-10 p-2 rounded-lg hover:bg-indigo-100 focus:bg-indigo-100',
				className
			)}
		>
			<span aria-hidden="true" className="text-slate-700">
				{children}
			</span>
			<span className="sr-only">{alt}</span>
		</button>
	);
}
