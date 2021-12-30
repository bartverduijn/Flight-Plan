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
		<div>
			<Form method="post">
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
	);
}
