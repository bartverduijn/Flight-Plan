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
					'mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-none dark:bg-gray-700 dark:ring-offset-gray-800',
					className
				)}
				{...props}
			/>
		);
	}
);

TextField.displayName = 'TextField';
