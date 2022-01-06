import * as React from 'react';
import clsx from 'clsx';
import { AccessibleIcon } from './AccessibleIcon';

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
				'w-10 h-10 p-2 rounded-md group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500',
				className
			)}
		>
			<AccessibleIcon
				alt={alt}
				className="text-gray-400 group-hover:text-gray-500"
			>
				{children}
			</AccessibleIcon>
		</button>
	);
}
