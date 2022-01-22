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
 * AnchorOrLink
 * -----------------------------------------------------------------------------------------------*/

type AnchorProps = React.ComponentPropsWithRef<'a'>;

export const AnchorOrLink = React.forwardRef<
	HTMLAnchorElement,
	AnchorProps & {
		to?: LinkProps['to'];
		prefetch?: LinkProps['prefetch'];
	}
>(({ children, to, href, download, ...props }, forwardedRef) => {
	let toUrl = '';
	// Download links should always be a normal <a>
	let shouldBeRegularAnchor = !!download;

	// Allow a href attribute, so that I can fall back on an anchor if I want to
	if (!shouldBeRegularAnchor && typeof href === 'string') {
		// e.g.: to="https://(...)", but also to="mailto:(...)" or to="file:(...)"
		shouldBeRegularAnchor = href.includes(':') || href.startsWith('#');
	}

	// The to attribute on a link can be a string or a object
	if (!shouldBeRegularAnchor && typeof to === 'string') {
		toUrl = to;
		shouldBeRegularAnchor = to.includes(':');
	}

	if (!shouldBeRegularAnchor && typeof to === 'object') {
		// Explanation of the properties: https://github.com/remix-run/history/blob/main/docs/api-reference.md#location.hash
		toUrl = `${to.pathname || ''}${to.hash ? `#${to.hash}` : ''}${
			to.search ? `?${to.search}` : ''
		}`;
		// to.pathname may be undefined
		shouldBeRegularAnchor = to.pathname?.includes(':') || false;
	}

	if (shouldBeRegularAnchor) {
		return (
			<a
				href={href || toUrl}
				download={!!download}
				ref={forwardedRef}
				{...props}
			>
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

/* -------------------------------------------------------------------------------------------------
 * IconButton
 * -----------------------------------------------------------------------------------------------*/

interface IconButtonProps extends ButtonProps {
	alt: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, alt, className, ...props }, forwardedRef) => {
		return (
			<button
				className={clsx(
					'bg-white p-2 rounded-md dark:bg-gray-800 w-10 h-10 dark:hover:bg-gray-600 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300 disabled:opacity-70 disabled:hover:bg-transparent disabled:cursor-not-allowed',
					className
				)}
				ref={forwardedRef}
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
);

IconButton.displayName = 'IconButton';
