import type { ActionFunction } from 'remix';
import { redirect, Form } from 'remix';
import invariant from 'tiny-invariant';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const name = form.get('name');
	invariant(typeof name === 'string', 'Expected a project name');
	const project = await db.project.create({ data: { name } });
	return redirect(`/projects/${project.id}`);
};

export default function New() {
	return (
		<div className="max-w-lg">
			<Form method="post">
				<div className="grid grid-cols-2 gap-6">
					<div className="col-span-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 dark:text-gray-400"
						>
							New Project
						</label>
						<input
							className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-none dark:ring-offset-gray-800"
							placeholder="Project Name"
							type="text"
							name="name"
							id="name"
						/>
					</div>
					<div className="col-span-2 text-right">
						<button
							className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-800"
							type="submit"
						>
							Submit
						</button>
					</div>
				</div>
			</Form>
		</div>
	);
}
