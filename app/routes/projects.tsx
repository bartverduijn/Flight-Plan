import { Outlet, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import type { Project } from '@prisma/client';
import { db } from '~/utils/db.server';
import {
	Header,
	ProjectsNav,
	Sidebar,
	SidebarNav,
	TopLevelNav,
	useSidebarContext,
	withSidebarProvider,
} from '~/components/SidebarLayout';
import { IconButton } from '~/components/Button';
import { MenuAlt1Icon } from '@heroicons/react/outline';

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
	const { toggleSidebar } = useSidebarContext();

	return (
		<>
			<div className="pl-80">
				<Header>
					<div className="flex items-center space-x-6">
						<IconButton alt="Open Nav" onClick={toggleSidebar}>
							<MenuAlt1Icon />
						</IconButton>
						<h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100">
							Temporary header
						</h1>
					</div>
				</Header>
			</div>

			<Sidebar>
				<SidebarNav>
					<TopLevelNav />
					<ProjectsNav projects={data.projects} />
				</SidebarNav>
			</Sidebar>

			<div className="pl-80">
				<div className="mx-auto max-w-7xl">
					<main>
						<div className="p-8 py-4">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default withSidebarProvider(Projects);
