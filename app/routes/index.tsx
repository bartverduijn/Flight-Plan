import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';
import { Project } from '@prisma/client';
import Nav from '../components/Nav';

type LoaderData = { projects: Array<Project> };
export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		projects: await db.project.findMany(),
	};
	return data;
};

export default function Index() {
	const data: LoaderData = useLoaderData();
	return (
		<>
			<Nav projects={data.projects} />
			<div>
				<main></main>
			</div>
		</>
	);
}
