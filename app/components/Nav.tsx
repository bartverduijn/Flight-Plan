import * as React from 'react';
import { NavLink } from 'remix';
import { NavLinkProps } from 'remix';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { ViewListIcon, InboxIcon, CalendarIcon } from '@heroicons/react/solid';
import IconButton from '~/components/IconButton';
import { Project } from '@prisma/client';
import clsx from 'clsx';

interface TopLevelLinkProps extends NavLinkProps {
	icon: React.ReactNode;
	shadow: string;
}
const TopLevelLink = React.forwardRef<HTMLAnchorElement, TopLevelLinkProps>(
	({ className, icon, shadow, children, ...props }, ref) => {
		return (
			<li>
				<NavLink
					ref={ref}
					{...props}
					className={({ isActive }) =>
						clsx(
							'group flex items-center h-10',
							className,
							isActive
								? 'font-semibold text-indigo-700'
								: 'font-medium text-gray-700 hover:text-gray-900'
						)
					}
					end
				>
					{({ isActive }) => (
						<>
							<span
								className={clsx(
									'mr-4 p-1				 rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10',
									shadow,
									isActive ? '' : ''
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

interface NavProps {
	projects: Array<Project>;
	media: string;
}

export const Nav = React.forwardRef(function Nav(
	{ projects, media = '' }: NavProps,
	ref: React.Ref<HTMLAnchorElement> | undefined
) {
	return (
		<div
			className={`w-80 px-8 h-full overflow-x-hidden overflow-y-auto ${media}`}
		>
			<div className="flex flex-col w-full min-h-full">
				<header className="py-4">
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Placeholder..."
						className="w-full px-3 py-2 text-sm leading-6 text-gray-400 rounded-md shadow-sm ring-1 ring-gray-900/10"
					/>
				</header>
				<nav className="flex-1">
					<ul className="my-2">
						<TopLevelLink
							ref={ref}
							to=""
							className="mb-2"
							shadow="group-hover:shadow-indigo-200"
							icon={
								<InboxIcon className="w-5 h-5 fill-indigo-300 group-hover:fill-indigo-400" />
							}
						>
							Inbox
						</TopLevelLink>
						<TopLevelLink
							to="today"
							className="mb-4"
							shadow="group-hover:shadow-pink-200"
							icon={
								<CalendarIcon className="w-5 h-5 fill-pink-400 group-hover:fill-pink-500" />
							}
						>
							Today
						</TopLevelLink>
					</ul>

					<hr className="border-gray-300" aria-hidden="true" />

					<ul className="my-2">
						{projects.map(project => (
							<li className="h-10 px-2" key={project.id}>
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
									to={project.id}
								>
									<span className="w-5 h-5 mr-2" aria-hidden="true">
										<ViewListIcon className="text-gray-400" />
									</span>
									{project.name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	);
});

interface MobileNavProps {
	projects: Array<Project>;
	media?: string;
}

export function MobileNav({ projects, media }: MobileNavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const navNode = React.useRef<HTMLAnchorElement>(null);
	return (
		<div className={media}>
			<IconButton
				alt="Toggle Nav"
				onFocus={e => e.stopPropagation()}
				onClick={() => {
					setIsOpen(currentState => {
						const newState = !currentState;
						if (newState && navNode.current) navNode.current.focus();
						return newState;
					});
				}}
			>
				<MenuAlt2Icon />
			</IconButton>

			<div
				className={`fixed top-0 bottom-0 -ml-5 shadow-2xl transition-transform motion-reduce:transition-none	 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				<Nav ref={navNode} projects={projects} />
			</div>
		</div>
	);
}
