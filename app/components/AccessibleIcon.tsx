import * as React from 'react';
import { VisuallyHidden } from './VisuallyHidden';

export function AccessibleIcon({
	children,
	alt,
	className,
}: {
	children: React.ReactNode;
	alt: string;
	className?: string;
}) {
	const child = React.Children.only(children);
	return (
		<>
			{React.cloneElement(child as React.ReactElement, {
				'aria-hidden': 'true',
				focusable: 'false',
				className,
			})}
			<VisuallyHidden>{alt}</VisuallyHidden>
		</>
	);
}
