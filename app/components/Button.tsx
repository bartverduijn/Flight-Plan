import * as React from 'react';
import clsx from 'clsx';
import { AnchorOrLink } from './AnchorOrLink';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	type?: 'button' | 'reset' | 'submit';
	variant?: 'base' | 'outline' | 'text';
	size?: 'small' | 'medium' | 'large';
	shape?: 'rectangle' | 'square';
	icon?: React.ReactNode;
	block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			type = 'button',
			variant = 'base',
			size = 'medium',
			shape = 'rectangle',
			icon,
			block,
			className,
			...props
		},
		forwardedRef
	) => {
		return (
			<button
				ref={forwardedRef}
				// eslint-disable-next-line react/button-has-type
				type={type}
				className={clsx(
					'group relative inline-flex cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-md text-center align-middle outline-none',
					{
						'h-6 px-2 text-xs': size === 'small',
						'h-8 px-4 text-sm': size === 'medium',
						'h-10 px-6 text-base': size === 'large',
					},
					{
						'w-6 px-0': shape !== 'rectangle' && size === 'small',
						'w-8 px-0': shape !== 'rectangle' && size === 'medium',
						'w-10 px-0': shape !== 'rectangle' && size === 'large',
					},
					'disabled:cursor-not-allowed disabled:opacity-70',
					{
						'bg-indigo-600 text-indigo-50 hover:bg-indigo-500 disabled:hover:bg-indigo-600 dark:hover:bg-indigo-700 dark:disabled:hover:bg-indigo-600':
							variant === 'base',
						'border border-gray-300 bg-transparent text-gray-700 hover:border-indigo-500 hover:text-indigo-700 disabled:hover:border-gray-300 disabled:hover:text-gray-700 dark:border-gray-500 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400 dark:disabled:hover:border-gray-500 dark:disabled:hover:text-gray-300':
							variant === 'outline',
						'bg-transparent text-gray-700 hover:bg-gray-100 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-300':
							variant === 'text',
					},
					{ 'block w-full': block },
					'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
					className
				)}
				{...props}
			>
				{icon ? (
					<>
						{icon}
						{children ? (
							<span className="relative ml-2">{children}</span>
						) : null}
					</>
				) : (
					<span className="relative">{children}</span>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * ButtonLink
 * -----------------------------------------------------------------------------------------------*/

// TODO: Create 1 polymorphic component instead of copy pasting props and classes

interface ButtonLinkProps {
	disabled?: boolean;
	variant?: 'base' | 'outline' | 'text';
	size?: 'small' | 'medium' | 'large';
	shape?: 'rectangle' | 'square';
	icon?: React.ReactNode;
	block?: boolean;
}

export const ButtonLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonLinkProps
>(
	(
		{
			children,
			disabled,
			className,
			variant = 'base',
			size = 'medium',
			shape = 'rectangle',
			icon,
			block,
			...props
		},
		forwardedRef
	) => {
		return (
			<AnchorOrLink
				ref={forwardedRef}
				aria-disabled={disabled || undefined}
				tabIndex={disabled ? -1 : undefined}
				className={clsx(
					'group inline-flex cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-md text-center align-middle outline-none',
					{
						'h-6 px-2 text-xs': size === 'small',
						'h-8 px-4 text-sm': size === 'medium',
						'h-10 px-6 text-base': size === 'large',
					},
					{
						'w-6 px-0': shape !== 'rectangle' && size === 'small',
						'w-8 px-0': shape !== 'rectangle' && size === 'medium',
						'w-10 px-0': shape !== 'rectangle' && size === 'large',
					},
					'disabled:cursor-not-allowed disabled:opacity-70',
					{
						'bg-indigo-600 text-indigo-50 hover:bg-indigo-500 disabled:hover:bg-indigo-600 dark:hover:bg-indigo-700 dark:disabled:hover:bg-indigo-600':
							variant === 'base',
						'border border-gray-300 bg-transparent text-gray-700 hover:border-indigo-500 hover:text-indigo-700 disabled:hover:border-gray-300 disabled:hover:text-gray-700 dark:border-gray-500 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400 dark:disabled:hover:border-gray-500 dark:disabled:hover:text-gray-300':
							variant === 'outline',
						'bg-transparent text-gray-700 hover:bg-gray-100 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-300':
							variant === 'text',
					},
					{ 'block w-full': block },
					'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-70 dark:focus:ring-offset-gray-800',
					className
				)}
				{...props}
			>
				{icon ? (
					<>
						{icon}
						{children ? (
							<span className="relative ml-2">{children}</span>
						) : null}
					</>
				) : (
					<span className="relative">{children}</span>
				)}
			</AnchorOrLink>
		);
	}
);

ButtonLink.displayName = 'ButtonLink';
