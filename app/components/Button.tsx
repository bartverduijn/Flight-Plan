import * as React from 'react';
import clsx from 'clsx';
import { AccessibleIcon } from './AccessibleIcon';
import { Link, LinkProps } from 'remix';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

type ButtonProps = React.ComponentPropsWithRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<button
				ref={forwardedRef}
				className={clsx(
					'relative inline-flex justify-center text-center text-indigo-50 font-medium rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70',
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * ButtonLink
 * -----------------------------------------------------------------------------------------------*/

interface ButtonLinkProps extends LinkProps {
	disabled?: boolean;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	({ children, className, disabled, ...props }, forwardedRef) => {
		return (
			<Link
				ref={forwardedRef}
				aria-disabled={disabled || undefined}
				tabIndex={disabled ? -1 : undefined}
				className={clsx(
					'relative inline-flex justify-center text-center text-indigo-50 font-medium rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 aria-disabled:opacity-70 aria-disabled:pointer-events-none',
					className
				)}
				{...props}
			>
				{children}
			</Link>
		);
	}
);

ButtonLink.displayName = 'ButtonLink';

/* -------------------------------------------------------------------------------------------------
 * IconButton
 * -----------------------------------------------------------------------------------------------*/

interface IconButtonProps extends ButtonProps {
	alt: string;
}

export function IconButton({
	children,
	alt,
	className,
	...props
}: IconButtonProps) {
	return (
		<button
			className={clsx(
				'bg-white p-2 rounded-md dark:bg-gray-800 w-10 h-10 dark:hover:bg-gray-600 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300 disabled:opacity-70 disabled:hover:bg-transparent disabled:cursor-not-allowed',
				className
			)}
			{...props}
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

IconButton.displayName = 'IconButton';
