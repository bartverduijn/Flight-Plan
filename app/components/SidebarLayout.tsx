import * as React from 'react';
import { NavLink } from 'remix';
import type { NavLinkProps } from 'remix';
import type { Project } from '@prisma/client';
import clsx from 'clsx';
import {
	MenuAlt1Icon,
	InboxIcon,
	CalendarIcon,
	CollectionIcon,
	PlusSmIcon,
} from '@heroicons/react/outline';
import { IconButton } from '~/components/IconButton';
import { Header } from '~/components/Header';
import { Logo } from '~/components/Logo';
import { AccessibleIcon } from './AccessibleIcon';

interface SidebarContextInterface {
	navIsOpen: boolean;
	openNav: () => void;
	closeNav: () => void;
	toggleNav: () => void;
}
export const SideBarContext =
	React.createContext<SidebarContextInterface | null>(null);

/* -------------------------------------------------------------------------------------------------
 * TopLevelNav
 * -----------------------------------------------------------------------------------------------*/

interface TopLevelNavItemProps extends NavLinkProps {
	icon: React.ReactNode;
}

const TopLevelNavItem = React.forwardRef<
	HTMLAnchorElement,
	TopLevelNavItemProps
>(({ icon, children, ...props }, forwardedRef) => {
	const ctx = React.useContext(SideBarContext);
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
				onClick={() => ctx?.closeNav()}
				prefetch="intent"
				{...props}
				end
			>
				{({ isActive }) => (
					<>
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

/* -----------------------------------------------------------------------------------------------*/

function TopLevelNav() {
	return (
		<>
			<TopLevelNavItem to="" icon={<InboxIcon className="w-6 h-6" />}>
				Inbox
			</TopLevelNavItem>
			<TopLevelNavItem to="today" icon={<CalendarIcon className="w-6 h-6" />}>
				Today
			</TopLevelNavItem>
			<TopLevelNavItem to="all" icon={<CollectionIcon className="w-6 h-6" />}>
				All Tasks
			</TopLevelNavItem>
		</>
	);
}

/* -------------------------------------------------------------------------------------------------
 * NavItem
 * -----------------------------------------------------------------------------------------------*/

interface NavItemProps extends NavLinkProps {
	key: string;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
	({ children, ...props }, forwardedRef) => {
		const ctx = React.useContext(SideBarContext);
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
					onClick={() => ctx?.closeNav()}
					prefetch="intent"
					{...props}
				>
					<span className="truncate">{children}</span>
				</NavLink>
			</li>
		);
	}
);

/* -------------------------------------------------------------------------------------------------
 * ProjectsList
 * -----------------------------------------------------------------------------------------------*/

function ProjectsList({ projects }: { projects: Array<Project> }) {
	return (
		<>
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
		</>
	);
}

/* -------------------------------------------------------------------------------------------------
 * Nav
 * -----------------------------------------------------------------------------------------------*/

function Nav({ children }: { children: React.ReactNode }) {
	return (
		<nav>
			<div className="px-10">
				<Logo className="w-10 h-10 text-gray-600 dark:text-indigo-300" />
			</div>
			<ul className="mt-8">
				<TopLevelNav />
			</ul>
			<div className="mt-8">
				<div className="flex items-center justify-between px-10">
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
				<div>{children}</div>
			</div>
		</nav>
	);
}

/* -------------------------------------------------------------------------------------------------
 * SidebarLayout
 * -----------------------------------------------------------------------------------------------*/

interface SidebarLayoutProps {
	children: React.ReactNode;
	projects: Array<Project>;
}

export function SidebarLayout({ children, projects }: SidebarLayoutProps) {
	const [navIsOpen, setNavIsOpen] = React.useState(false);
	const openNav = () => setNavIsOpen(true);
	const closeNav = () => setNavIsOpen(false);
	const toggleNav = () => setNavIsOpen(!navIsOpen);

	return (
		<SideBarContext.Provider
			value={{ navIsOpen, openNav, closeNav, toggleNav }}
		>
			<div>
				<div className="fixed top-0 bottom-0 left-0 block bg-gray-100 w-80 dark:bg-gray-700">
					<div className="py-6 overflow-y-auto ">
						<Nav>
							<ProjectsList projects={projects} />
						</Nav>
					</div>
				</div>

				<div className="pl-80">
					<Header>
						<div className="flex items-center space-x-6">
							<IconButton alt="Open Nav" onClick={toggleNav} disabled>
								<MenuAlt1Icon />
							</IconButton>
							<h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100">
								Temporary header
							</h1>
						</div>
					</Header>
					<div id="content" className="px-8 py-4">
						{children}
					</div>
				</div>
			</div>
		</SideBarContext.Provider>
	);
}
