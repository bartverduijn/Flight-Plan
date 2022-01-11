import { Outlet, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import type { Project } from '@prisma/client';
import { db } from '~/utils/db.server';
import { SidebarLayout } from '~/components/SidebarLayout';

interface LoaderData {
	projects: Array<Project>;
}
export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		projects: await db.project.findMany(),
	};

	return data;
};

export default function Projects() {
	const data: LoaderData = useLoaderData();

	return (
		<SidebarLayout projects={data.projects}>
			<main className="">
				<Outlet />
			</main>
		</SidebarLayout>
	);
}
