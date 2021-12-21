import type { ActionFunction, LoaderFunction, LinksFunction } from 'remix';
import { Form, Outlet, redirect, useLoaderData } from 'remix';
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

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const name = form.get('name');
	console.log(name);
	if (typeof name !== 'string') {
		throw new Error('Projectname not allowed');
	}
	const project = await db.project.create({ data: { name } });
	return redirect(`/projects/${project.id}`);
};

export default function Projects() {
	const data: LoaderData = useLoaderData();
	return (
		<div className="flex h-full">
			<SkipNavLink />
			<Nav projects={data.projects} media="hidden lg:block" />
			<div className="relative w-full ">
				<Header>
					<MobileNav projects={data.projects} media="block lg:hidden" />
				</Header>
				<SkipNavContent>
					<main className="">
						<div>
							<Form action="/projects" method="post">
								<label>
									New Project
									<input
										className="px-4 py-2 rounded border-1 bg-slate-200 border-slate-500"
										type="text"
										name="name"
									/>
								</label>
								<button
									className="px-4 py-2 font-semibold bg-indigo-500 rounded text-indigo-50"
									type="submit"
								>
									Submit
								</button>
							</Form>
						</div>
						<Outlet />
					</main>
				</SkipNavContent>
			</div>
		</div>
	);
}
