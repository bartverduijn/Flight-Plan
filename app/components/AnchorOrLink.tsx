import * as React from 'react';
import type { LinkProps } from 'remix';
import { Link } from 'remix';

/* -------------------------------------------------------------------------------------------------
 * AnchorOrLink
 * -----------------------------------------------------------------------------------------------*/

interface AnchorOrLinkProps extends React.ComponentPropsWithRef<'a'> {
	to?: LinkProps['to'];
	prefetch?: LinkProps['prefetch'];
}

export const AnchorOrLink = React.forwardRef<
	HTMLAnchorElement,
	AnchorOrLinkProps
>(({ children, to, href, download, ...props }, forwardedRef) => {
	let toUrl = '';
	// Download links should always be a normal anchor
	let shouldUseRegularAnchor = !!download;

	// Allow an href attribute, so that I can fall back on a regular anchor if I want to
	if (!shouldUseRegularAnchor && typeof href === 'string') {
		// e.g.: href="https://(...)", but also href="mailto:(...)" or to="file:(...)"
		shouldUseRegularAnchor = href.includes(':') || href.startsWith('#');
	}

	// The to attribute on a link can be a string or a object
	if (!shouldUseRegularAnchor && typeof to === 'string') {
		toUrl = to;
		shouldUseRegularAnchor = to.includes(':');
	}

	if (!shouldUseRegularAnchor && typeof to === 'object') {
		// Explanation of the properties: https://github.com/remix-run/history/blob/main/docs/api-reference.md#location.hash
		toUrl = `${to.pathname || ''}${to.hash ? `#${to.hash}` : ''}${
			to.search ? `?${to.search}` : ''
		}`;
		// to.pathname may be undefined
		shouldUseRegularAnchor = to.pathname?.includes(':') || false;
	}

	if (shouldUseRegularAnchor) {
		return (
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			<a href={href || toUrl} download={download} ref={forwardedRef} {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link to={to || href || ''} ref={forwardedRef} {...props}>
			{children}
		</Link>
	);
});

AnchorOrLink.displayName = 'LinkOrAnchor';
