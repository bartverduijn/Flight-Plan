import * as React from 'react';

interface VisuallyHiddenProps {
	children: React.ReactNode;
}

export const VisuallyHidden = React.forwardRef<
	HTMLSpanElement,
	VisuallyHiddenProps
>(({ children, ...props }, forwardedRef) => {
	return (
		<span className="sr-only" ref={forwardedRef} {...props}>
			{children}
		</span>
	);
});

VisuallyHidden.displayName = 'VisuallyHidden';
