import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import type { LinksFunction } from 'remix';
import type { Project } from '@prisma/client';
import { db } from '~/utils/db.server';
import Nav from '~/components/Nav';
import styles from '@reach/skip-nav/styles.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

type LoaderData = { projects: Array<Project> };
export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		projects: await db.project.findMany(),
	};
	return data;
};

export default function Projects() {
	const data: LoaderData = useLoaderData();
	return (
		<>
			<SkipNavLink />
			<Nav projects={data.projects} />
			<div>
				<SkipNavContent />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}
