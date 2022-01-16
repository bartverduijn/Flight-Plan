import clsx from 'clsx';
import * as React from 'react';

/* -------------------------------------------------------------------------------------------------
 * TextField
 * -----------------------------------------------------------------------------------------------*/

type TextFieldProps = React.ComponentPropsWithRef<'input'>;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ className, ...props }, forwardedRef) => {
		return (
			<input
				ref={forwardedRef}
				className={clsx(
					'block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-none dark:ring-offset-gray-800',
					className
				)}
				{...props}
			/>
		);
	}
);

TextField.displayName = 'TextField';
