import * as React from 'react';
import { VisuallyHidden } from './VisuallyHidden';

/* -------------------------------------------------------------------------------------------------
 * AccessibleIcon
 * -----------------------------------------------------------------------------------------------*/

interface AccessibleIconProps {
	children: React.ReactNode;
	alt: string;
}

export function AccessibleIcon({ children, alt }: AccessibleIconProps) {
	const child = React.Children.only(children);
	return (
		<>
			{React.cloneElement(child as React.ReactElement, {
				'aria-hidden': 'true',
				focusable: 'false',
			})}
			<VisuallyHidden>{alt}</VisuallyHidden>
		</>
	);
}

/* -------------------------------------------------------------------------------------------------
 * HiddenIcon
 * -----------------------------------------------------------------------------------------------*/

interface HiddenIconProps {
	children: React.ReactNode;
}

export function HiddenIcon({ children }: HiddenIconProps) {
	const child = React.Children.only(children);
	return (
		<>
			{React.cloneElement(child as React.ReactElement, {
				'aria-hidden': 'true',
				focusable: 'false',
			})}
		</>
	);
}
