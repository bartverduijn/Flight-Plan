import * as React from 'react';
import { NavLink } from 'remix';
import { Dialog } from '@headlessui/react';
import type { NavLinkProps } from 'remix';
import type { Project } from '@prisma/client';
import clsx from 'clsx';
import {
	MenuAlt1Icon,
	XIcon,
	InboxIcon,
	CalendarIcon,
	CollectionIcon,
} from '@heroicons/react/outline';
import { ViewListIcon } from '@heroicons/react/solid';
import { IconButton } from '~/components/IconButton';
import { Header } from '~/components/Header';
import { Logo } from '~/components/Logo';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import { AccessibleIcon } from '~/components/AccessibleIcon';

interface SidebarContextInterface {
	navIsOpen: boolean;
	openNav: () => void;
	closeNav: () => void;
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
						'group flex items-center h-10 px-10 hover:bg-slate-200 dark:hover:bg-gray-600 dark:font-medium focus:ring-inset focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:outline-none',
						isActive
							? 'font-bold text-indigo-600 dark:text-gray-100'
							: 'dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
					)
				}
				onClick={() => ctx?.closeNav()}
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
							'group flex items-center h-10 px-10 hover:bg-slate-200 dark:hover:bg-gray-600 dark:font-medium focus:ring-inset focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:outline-none',
							isActive
								? 'font-bold text-indigo-600 dark:text-gray-100'
								: 'dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
						)
					}
					onClick={() => ctx?.closeNav()}
					{...props}
				>
					<span className="truncate">{children}</span>
				</NavLink>
			</li>
		);
	}
);

/* -------------------------------------------------------------------------------------------------
 * Nav
 * -----------------------------------------------------------------------------------------------*/

interface NavProps {
	projects: Array<Project>;
	mobile?: boolean;
}

function Nav({ projects, mobile = false }: NavProps) {
	return (
		<nav>
			<div className="px-10">
				<Logo className="w-10 h-10 text-gray-600 dark:text-indigo-300" />
			</div>
			<ul className="mt-8">
				<TopLevelNav />
			</ul>
			<div className="mt-8">
				<h5 className="px-10 text-sm font-bold tracking-wide text-gray-400 uppercase dark:text-gray-500">
					Projects
				</h5>
				<div className="mt-1">
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
	// TODO: Fix mobile Nav
	return (
		<SideBarContext.Provider value={{ navIsOpen, openNav, closeNav }}>
			{/* Mobile Nav*/}
			{/* <div className="lg:hidden">
				<Header>
					<IconButton alt="Open Nav" onClick={openNav}>
						<MenuAlt1Icon />
					</IconButton>
				</Header>
				<Dialog className="fixed inset-0" open={navIsOpen} onClose={closeNav}>
					<Dialog.Overlay className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
					<div className="relative z-10 max-w-[calc(100%-3rem)] p-6 bg-white w-80 h-full">
						<IconButton
							className="absolute top-4 right-4"
							alt="Close Nav"
							onClick={closeNav}
						>
							<XIcon />
						</IconButton>
						<Nav projects={projects} mobile={true} />
					</div>
				</Dialog>
			</div> */}

			{/* Sidebar Nav for larger screens */}
			{/* <a
				className="z-50 hidden sr-only lg:block focus:bg-indigo-100 focus:not-sr-only focus:absolute focus:p-4 focus:font-medium focus:text-gray-900"
				href="#content"
			>
				Skip to Content
			</a> */}
			<div>
				<div className="fixed top-0 bottom-0 left-0 block bg-gray-100 w-80 dark:bg-gray-700">
					<div className="py-6 overflow-y-auto ">
						<Nav projects={projects} />
					</div>
				</div>
				<div className="pl-80">
					<div>header</div>
					<div id="content">{children}</div>
				</div>
			</div>
		</SideBarContext.Provider>
	);
}
