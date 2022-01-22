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
import { db } from '~/utils/db.server';
import {
	Header,
	ProjectsNav,
	Sidebar,
	SidebarNav,
	TopLevelNavItem,
} from '~/components/SidebarLayout';
import { ButtonLink, IconButton } from '~/components/Button';

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
						<IconButton
							alt="Open Nav"
							onClick={() => {
								setSidebarIsOpen(isOpen => {
									const nextState = !isOpen;
									if (nextState) navNode.current?.focus();
									return nextState;
								});
							}}
						>
							<MenuAlt1Icon />
						</IconButton>
						<h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100">
							Temporary header
						</h1>
					</div>
				</Header>

				<ButtonLink
					href="#content"
					className="z-50 sr-only focus:fixed focus:not-sr-only top-4 left-4 focus:px-4 focus:py-2"
				>
					Skip to content
				</ButtonLink>
			</div>

			<Sidebar
				className={clsx(sidebarIsOpen ? 'translate-x-0' : '-translate-x-full')}
			>
				<SidebarNav>
					<ul onFocus={() => setSidebarIsOpen(true)}>
						<TopLevelNavItem
							ref={navNode}
							to=""
							icon={<InboxIcon className="w-6 h-6" />}
						>
							Inbox
						</TopLevelNavItem>
						<TopLevelNavItem
							to="today"
							icon={<CalendarIcon className="w-6 h-6" />}
						>
							Today
						</TopLevelNavItem>
						<TopLevelNavItem
							to="all"
							icon={<CollectionIcon className="w-6 h-6" />}
						>
							All Tasks
						</TopLevelNavItem>
					</ul>
					<ProjectsNav projects={data.projects} />
				</SidebarNav>
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
