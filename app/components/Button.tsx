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
				// I absolutely hate this
				className={clsx(
					'group relative inline-flex cursor-pointer outline-none overflow-hidden items-center justify-center align-middle whitespace-nowrap rounded-md select-none touch-manipulation text-center',
					{
						'h-6 text-xs px-2': size === 'small',
						'h-8 text-sm px-4': size === 'medium',
						'h-10 text-base px-6': size === 'large',
					},
					{
						'w-6 px-0': shape !== 'rectangle' && size === 'small',
						'w-8 px-0': shape !== 'rectangle' && size === 'medium',
						'w-10 px-0': shape !== 'rectangle' && size === 'large',
					},
					'disabled:cursor-not-allowed disabled:opacity-70',
					{
						'bg-indigo-600 text-indigo-50 hover:bg-indigo-500 dark:hover:bg-indigo-700 disabled:hover:bg-indigo-600 dark:disabled:hover:bg-indigo-600':
							variant === 'base',
						'bg-transparent border border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-700 dark:border-gray-500 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:border-indigo-500 disabled:hover:border-gray-300 disabled:hover:text-gray-700 dark:disabled:hover:border-gray-500 dark:disabled:hover:text-gray-300':
							variant === 'outline',
						'text-gray-700 bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-700 disabled:hover:bg-transparent dark:disabled:hover:text-gray-300 dark:disabled:hover:bg-transparent':
							variant === 'text',
					},
					{ 'block w-full': block },
					'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800',
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

interface ButtonLinkProps {
	disabled?: boolean;
}

export const ButtonLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonLinkProps
>(({ children, className, disabled, ...props }, forwardedRef) => {
	return (
		<AnchorOrLink
			ref={forwardedRef}
			aria-disabled={disabled || undefined}
			tabIndex={disabled ? -1 : undefined}
			className={clsx(
				'inline-flex justify-center text-center text-indigo-50 font-medium rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 aria-disabled:opacity-70 aria-disabled:pointer-events-none',
				className
			)}
			{...props}
		>
			{children}
		</AnchorOrLink>
	);
});

ButtonLink.displayName = 'ButtonLink';
