import * as React from 'react';
import { NavLink } from 'remix';
import { NavLinkProps } from 'remix';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import {
	ViewListIcon,
	InboxIcon,
	CalendarIcon,
	CollectionIcon,
} from '@heroicons/react/solid';
import IconButton from '~/components/IconButton';
import { Project } from '@prisma/client';
import clsx from 'clsx';

interface TopLevelLinkProps extends NavLinkProps {
	icon: React.ReactNode;
	shadow: string;
}
const TopLevelLink = React.forwardRef<HTMLAnchorElement, TopLevelLinkProps>(
	({ icon, shadow, children, ...props }, ref) => {
		return (
			<li>
				<NavLink
					ref={ref}
					{...props}
					className={({ isActive }) =>
						clsx(
							'group flex items-center h-10',
							isActive
								? 'font-bold text-indigo-500'
								: 'font-medium text-gray-700 hover:text-gray-900'
						)
					}
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
	}
);

function TopLevelNav() {
	return (
		<>
			<TopLevelLink
				to=""
				shadow="shadow-indigo-200"
				icon={
					<InboxIcon className="w-5 h-5 fill-indigo-300 group-hover:fill-indigo-400" />
				}
			>
				Inbox
			</TopLevelLink>
			<TopLevelLink
				to="today"
				shadow="shadow-pink-200"
				icon={
					<CalendarIcon className="w-5 h-5 fill-pink-300 group-hover:fill-pink-400" />
				}
			>
				Today
			</TopLevelLink>
			<TopLevelLink
				to="all"
				shadow="shadow-emerald-200"
				icon={
					<CollectionIcon className="w-5 h-5 fill-emerald-300 group-hover:fill-emerald-400" />
				}
			>
				All Tasks
			</TopLevelLink>
		</>
	);
}

interface NavItemProps extends NavLinkProps {
	key: string;
}
const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
	({ key, children, ...props }, ref) => {
		return (
			<li key={key}>
				<NavLink
					ref={ref}
					className={({ isActive }) =>
						clsx(
							'group flex items-center h-10',
							isActive
								? 'font-semibold text-indigo-500'
								: 'font-medium text-gray-700 hover:text-gray-900'
						)
					}
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
}
export function Nav({ projects }: NavProps) {
	return (
		<div className="h-full px-8 py-4 overflow-x-hidden overflow-y-auto w-80">
			<nav>
				<div>
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
		</div>
	);
}

// export const Nav = React.forwardRef(function Nav(
// 	{ projects, media = '' }: NavProps,
// 	ref: React.Ref<HTMLAnchorElement> | undefined
// ) {
// 	return (
// 		<div
// 			className={`w-80 px-8 py-4 h-full overflow-x-hidden overflow-y-auto ${media}`}
// 		>
// 			<div className="flex flex-col w-full min-h-full">
// 				<header className="py-4">
// 					<input
// 						type="search"
// 						name="search"
// 						id="search"
// 						placeholder="Placeholder..."
// 						className="w-full px-3 py-2 text-sm leading-6 text-gray-400 rounded-md shadow-sm ring-1 ring-gray-900/10"
// 					/>
// 				</header>
// 				<nav className="flex-1">
// 					<ul className="my-2"></ul>

// 					<hr className="border-gray-100 border-b-1" aria-hidden="true" />

// 					<ul className="my-2">
// 						{projects.map(project => (
// 							<li className="h-10 px-2" key={project.id}>
// 								<NavLink
// 									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
// 									to={project.id}
// 								>
// 									<span className="w-5 h-5 mr-2" aria-hidden="true">
// 										<ViewListIcon className="text-gray-400" />
// 									</span>
// 									{project.name}
// 								</NavLink>
// 							</li>
// 						))}
// 					</ul>
// 				</nav>
// 			</div>
// 		</div>
// 	);
// });

// interface MobileNavProps {
// 	projects: Array<Project>;
// 	media?: string;
// }

// export function MobileNav({ projects, media }: MobileNavProps) {
// 	const [isOpen, setIsOpen] = React.useState<boolean>(false);
// 	const navNode = React.useRef<HTMLAnchorElement>(null);
// 	return (
// 		<div className={media}>
// 			<IconButton
// 				alt="Toggle Nav"
// 				onFocus={e => e.stopPropagation()}
// 				onClick={() => {
// 					setIsOpen(currentState => {
// 						const newState = !currentState;
// 						if (newState && navNode.current) navNode.current.focus();
// 						return newState;
// 					});
// 				}}
// 			>
// 				<MenuAlt2Icon />
// 			</IconButton>

// 			<div
// 				className={`fixed top-0 bottom-0 -ml-5 shadow-2xl transition-transform motion-reduce:transition-none	 ${
// 					isOpen ? 'translate-x-0' : '-translate-x-64'
// 				}`}
// 				onFocus={() => setIsOpen(true)}
// 				onBlur={() => setIsOpen(false)}
// 			>
// 				<Nav ref={navNode} projects={projects} />
// 			</div>
// 		</div>
// 	);
// }
