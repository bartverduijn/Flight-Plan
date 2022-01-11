import * as React from 'react';
import clsx from 'clsx';
import { AccessibleIcon } from './AccessibleIcon';

interface IconButtonProps {
	className?: string;
	children: React.ReactNode;
	alt: string;
	onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	onClick: () => void;
	disabled?: boolean;
}

export function IconButton({
	children,
	alt,
	className,
	onFocus,
	onClick,
	disabled,
}: IconButtonProps) {
	return (
		<button
			onClick={onClick}
			onFocus={onFocus}
			className={clsx(
				'bg-white p-2 rounded-md dark:bg-gray-800 w-10 h-10 dark:hover:bg-gray-600 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300 hover:disabled:bg-white dark:hover:disabled:bg-gray-800 disabled:cursor-not-allowed',
				className
			)}
			disabled={disabled}
		>
			<AccessibleIcon
				alt={alt}
				className="text-gray-400 dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-200 group-disabled:text-gray-200 dark:group-disabled:text-gray-600"
			>
				{children}
			</AccessibleIcon>
		</button>
	);
}
