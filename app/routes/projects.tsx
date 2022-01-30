import * as React from 'react';
import { Outlet, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import type { Project } from '@prisma/client';
import clsx from 'clsx';
import {
	InboxIcon,
	CalendarIcon,
	CollectionIcon,
	MenuAlt1Icon,
} from '@heroicons/react/outline';
import { PlusSmIcon } from '@heroicons/react/solid';
import { db } from '~/utils/db.server';
import {
	Header,
	NavItem,
	NavSection,
	Sidebar,
	TopLevelNavItem,
} from '~/components/SidebarLayout';
import { Button, ButtonLink } from '~/components/Button';

interface LoaderData {
	projects: Array<Project>;
}

export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		projects: await db.project.findMany(),
	};

	return data;
};

function Projects() {
	const data: LoaderData = useLoaderData();

	const [sidebarIsOpen, setSidebarIsOpen] = React.useState<boolean>(true);

	const navNode = React.useRef<HTMLAnchorElement>(null);

	return (
		<>
			<div className={clsx(sidebarIsOpen ? 'pl-80' : null)}>
				<Header>
					<div className="flex items-center space-x-6">
						<Button
							size="large"
							shape="square"
							variant="text"
							icon={
								<span>
									<MenuAlt1Icon aria-hidden="true" className="h-6 w-6" />
									<span className="sr-only">Toggle Sidebar</span>
								</span>
							}
							onClick={() => {
								setSidebarIsOpen((isOpen) => {
									const nextState = !isOpen;
									if (nextState && navNode.current) {
										navNode.current.focus();
									}
									return nextState;
								});
							}}
						/>
						<h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100">
							Temporary header
						</h1>
					</div>
				</Header>

				<ButtonLink
					href="#content"
					size="large"
					className="sr-only top-4 left-4 z-50 focus:not-sr-only focus:fixed focus:h-10 focus:px-6"
				>
					Skip to content
				</ButtonLink>
			</div>

			<Sidebar
				className={clsx(sidebarIsOpen ? 'translate-x-0' : '-translate-x-full')}
			>
				<div className="mt-8">
					<nav className="space-y-8">
						<ul onFocus={() => setSidebarIsOpen(true)}>
							<TopLevelNavItem
								ref={navNode}
								to=""
								icon={<InboxIcon className="h-6 w-6" />}
							>
								Inbox
							</TopLevelNavItem>
							<TopLevelNavItem
								to="today"
								icon={<CalendarIcon className="h-6 w-6" />}
							>
								Today
							</TopLevelNavItem>
							<TopLevelNavItem
								to="all"
								icon={<CollectionIcon className="h-6 w-6" />}
							>
								All Tasks
							</TopLevelNavItem>
						</ul>
						<NavSection
							link={
								<ButtonLink to="new" shape="square" variant="text">
									<PlusSmIcon className="h-5 w-5" />
								</ButtonLink>
							}
						>
							{data.projects.length ? (
								<ul>
									{data.projects.map(({ id, name }) => (
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
						</NavSection>
					</nav>
				</div>
			</Sidebar>

			<div className={clsx(sidebarIsOpen ? 'pl-80' : null)}>
				<div className="mx-auto max-w-7xl">
					<main id="content">
						<div className="p-8 py-4">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default Projects;
