import * as React from 'react';
import { NavLink } from 'remix';
import type { NavLinkProps } from 'remix';
import type { Project } from '@prisma/client';
import clsx from 'clsx';
import { PlusSmIcon } from '@heroicons/react/outline';
import { Logo } from '~/components/Logo';

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
}

export function Header({ children, className }: HeaderProps) {
	return (
		<header className={clsx('bg-white p-6 dark:bg-gray-800', className)}>
			<div className="flex items-center justify-between">
				<div>{children}</div>
			</div>
		</header>
	);
}

/* -------------------------------------------------------------------------------------------------
 * TopLevelNav
 * -----------------------------------------------------------------------------------------------*/

interface TopLevelNavItemProps extends NavLinkProps {
	icon: React.ReactNode;
}

export const TopLevelNavItem = React.forwardRef<
	HTMLAnchorElement,
	TopLevelNavItemProps
>(({ icon, children, ...props }, forwardedRef) => {
	return (
		<li>
			<NavLink
				ref={forwardedRef}
				className={({ isActive }) =>
					clsx(
						'group flex items-center h-10 px-10 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-inset focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:outline-none',
						isActive
							? 'font-semibold text-indigo-600 dark:text-gray-50'
							: 'dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200'
					)
				}
				prefetch="intent"
				{...props}
				end
			>
				{({ isActive }) => (
					<>
						{/* // FIXME: Replace with AccessibleIcon */}
						<span
							className={clsx(
								'mr-4',
								isActive
									? 'text-indigo-500 dark:text-gray-100'
									: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
							)}
						>
							{icon}
						</span>
						{children}
					</>
				)}
			</NavLink>
		</li>
	);
});

TopLevelNavItem.displayName = 'TopLevelNavItem';

/* -------------------------------------------------------------------------------------------------
 * NavItem
 * -----------------------------------------------------------------------------------------------*/

interface NavItemProps extends NavLinkProps {
	key: string;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
	({ children, ...props }, forwardedRef) => {
		return (
			<li>
				<NavLink
					ref={forwardedRef}
					className={({ isActive }) =>
						clsx(
							'group flex items-center h-10 px-10 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-inset focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:outline-none',
							isActive
								? 'font-semibold text-indigo-600 dark:text-gray-50'
								: 'dark:text-gray-300 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200'
						)
					}
					prefetch="intent"
					{...props}
				>
					<span className="truncate">{children}</span>
				</NavLink>
			</li>
		);
	}
);

NavItem.displayName = 'NavItem';

/* -------------------------------------------------------------------------------------------------
 * ProjectsNav
 * -----------------------------------------------------------------------------------------------*/

export function ProjectsNav({ projects }: { projects: Array<Project> }) {
	return (
		<div>
			<div className="px-10">
				<div className="flex items-center justify-between">
					<h5 className="text-sm font-bold tracking-wide text-gray-400 uppercase dark:text-gray-500">
						Projects
					</h5>
					<NavLink
						to="new"
						className="p-2 rounded-md dark:hover:bg-gray-600 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300"
					>
						<PlusSmIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
					</NavLink>
				</div>
			</div>

			{projects.length ? (
				<ul>
					{projects.map(({ id, name }) => (
						<NavItem key={id} to={id}>
							{name}
						</NavItem>
					))}
				</ul>
			) : (
				// TODO: Add empty state
				<div className="px-10">
					<p>No projects found...</p>
				</div>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------------------------------
 * SidebarNav
 * -----------------------------------------------------------------------------------------------*/

export function SidebarNav({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-8">
			<nav className="space-y-8">{children}</nav>
		</div>
	);
}

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 * -----------------------------------------------------------------------------------------------*/

interface SidebarProps {
	children: React.ReactNode;
	className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
	return (
		<div
			className={clsx(
				'fixed top-0 bottom-0 left-0 overflow-y-auto w-80',
				className
			)}
		>
			<div className="h-full bg-gray-100 dark:bg-gray-700">
				<div className="py-6">
					<div className="px-10">
						<Logo className="w-10 h-10 text-gray-600 dark:text-indigo-300" />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
