import type { LoaderFunction, LinksFunction } from 'remix';
import { Outlet, useLoaderData } from 'remix';
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import type { Project } from '@prisma/client';
import { db } from '~/utils/db.server';
import Header from '~/components/Header';
import { MobileNav, Nav } from '~/components/Nav';

import skipNavStyles from '@reach/skip-nav/styles.css';
import menuButtonStyles from '@reach/menu-button/styles.css';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: skipNavStyles },
		{ rel: 'stylesheet', href: menuButtonStyles },
	];
};

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
		<div className="flex h-full">
			<SkipNavLink />
			<Nav projects={data.projects} media="hidden lg:block" />
			<div className="relative w-full ">
				<Header>
					{/* <MobileNav projects={data.projects} media="block lg:hidden" /> */}
				</Header>
				<SkipNavContent>
					<main className="">
						<Outlet />
					</main>
				</SkipNavContent>
			</div>
		</div>
	);
}
