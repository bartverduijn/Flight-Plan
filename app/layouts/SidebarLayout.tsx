import * as React from 'react';
import { NavLink } from 'remix';
import { Dialog } from '@headlessui/react';
import type { NavLinkProps } from 'remix';
import type { Project } from '@prisma/client';
import clsx from 'clsx';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import {
	ViewListIcon,
	InboxIcon,
	CalendarIcon,
	CollectionIcon,
} from '@heroicons/react/solid';
import { IconButton } from '~/components/IconButton';
import { Header } from '~/components/Header';

interface SidebarContextInterface {
	navIsOpen: boolean;
	openNav: () => void;
	closeNav: () => void;
}
export const SideBarContext =
	React.createContext<SidebarContextInterface | null>(null);

interface TopLevelNavItemProps extends NavLinkProps {
	icon: React.ReactNode;
	shadow: string;
}
const TopLevelNavItem = React.forwardRef<
	HTMLAnchorElement,
	TopLevelNavItemProps
>(({ icon, shadow, children, ...props }, forwardedRef) => {
	const ctx = React.useContext(SideBarContext);
	return (
		<li>
			<NavLink
				ref={forwardedRef}
				className={({ isActive }) =>
					clsx(
						'group flex items-center h-10',
						isActive
							? 'font-bold text-indigo-500'
							: 'font-medium text-gray-700 hover:text-gray-900'
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
								'mr-4 p-1	rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10',
								`group-hover:${shadow}`,
								isActive ? ['shadow-inner ring-gray-900/10', shadow] : ''
							)}
							aria-hidden="true"
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

function TopLevelNav() {
	return (
		<>
			<TopLevelNavItem
				to=""
				shadow="shadow-indigo-200"
				icon={
					<InboxIcon className="w-5 h-5 fill-indigo-300 group-hover:fill-indigo-400" />
				}
			>
				Inbox
			</TopLevelNavItem>
			<TopLevelNavItem
				to="today"
				shadow="shadow-pink-200"
				icon={
					<CalendarIcon className="w-5 h-5 fill-pink-300 group-hover:fill-pink-400" />
				}
			>
				Today
			</TopLevelNavItem>
			<TopLevelNavItem
				to="all"
				shadow="shadow-emerald-200"
				icon={
					<CollectionIcon className="w-5 h-5 fill-emerald-300 group-hover:fill-emerald-400" />
				}
			>
				All Tasks
			</TopLevelNavItem>
		</>
	);
}

interface NavItemProps extends NavLinkProps {
	key: string;
}
const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
	({ key, children, ...props }, forwardedRef) => {
		const ctx = React.useContext(SideBarContext);
		return (
			<li key={key}>
				<NavLink
					ref={forwardedRef}
					className={({ isActive }) =>
						clsx(
							'group flex items-center h-10',
							isActive
								? 'font-semibold text-indigo-500'
								: 'font-normal text-gray-700 hover:text-gray-900'
						)
					}
					onClick={() => ctx?.closeNav()}
					{...props}
				>
					<span className="p-1 mr-4" aria-hidden="true">
						<ViewListIcon className="w-5 h-5 fill-gray-300 group-hover:fill-gray-400" />
					</span>
					{children}
				</NavLink>
			</li>
		);
	}
);

interface NavProps {
	projects: Array<Project>;
	mobile?: boolean;
}
function Nav({ projects, mobile = false }: NavProps) {
	return (
		<nav>
			<div className={clsx(mobile ? 'hidden' : 'block')}>
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Placeholder..."
					className="w-full px-3 py-2 text-sm leading-6 text-gray-400 rounded-md shadow-sm ring-1 ring-gray-900/10"
				/>
			</div>
			<ul className="my-6 space-y-2">
				<TopLevelNav />
			</ul>
			<hr className="border-gray-100 border-b-1" aria-hidden="true" />
			{projects ? (
				<ul className="my-6 space-y-2">
					{projects.map(({ id, name }) => (
						<NavItem key={id} to={id}>
							{name}
						</NavItem>
					))}
				</ul>
			) : (
				<p>No projects found...</p>
			)}
		</nav>
	);
}

interface SidebarLayoutProps {
	children: React.ReactNode;
	projects: Array<Project>;
}
export function SidebarLayout({ children, projects }: SidebarLayoutProps) {
	const [navIsOpen, setNavIsOpen] = React.useState(false);
	const openNav = () => setNavIsOpen(true);
	const closeNav = () => setNavIsOpen(false);
	return (
		<SideBarContext.Provider value={{ navIsOpen, openNav, closeNav }}>
			{/* Mobile Nav*/}
			<div className="lg:hidden">
				<Header>
					<IconButton alt="Open Nav" onClick={openNav}>
						<MenuAlt2Icon />
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
			</div>

			{/* Sidebar Nav for larger screens */}
			<a
				className="z-50 hidden sr-only lg:block focus:bg-indigo-100 focus:not-sr-only focus:absolute focus:p-4"
				href="#content"
			>
				Skip Navigation
			</a>
			<div className="px-4 mx-auto max-w-8xl">
				<div className="fixed top-0 bottom-0 left-0 hidden px-8 py-6 overflow-y-auto lg:block w-80">
					<Nav projects={projects} />
				</div>
				<div id="content" className="lg:pl-80">
					{children}
				</div>
			</div>
		</SideBarContext.Provider>
	);
}
