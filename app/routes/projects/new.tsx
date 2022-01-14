import { ActionFunction, json, useActionData } from 'remix';
import { redirect, Form } from 'remix';
import { db } from '~/utils/db.server';

interface FieldErrors {
	name: string | null;
}

interface ActionData {
	formError?: string;
	fieldErrors?: FieldErrors;
	fields?: { name: string };
}

export const action: ActionFunction = async ({ request }) => {
	// 1. Retrieve form data
	const form = await request.formData();
	const name = form.get('name');

	const fieldErrors: FieldErrors = {
		name: null,
	};

	// 2. If the form data is not the type I expected, just return a generic error
	if (typeof name !== 'string') {
		const data: ActionData = {
			formError: 'Form was submitted incorrectly. Please try again',
		};
		return json(data, { status: 400 });
	}

	// 3. Validate each field. If the input is not valid, return an error
	const fields = { name };

	if (!name) {
		fieldErrors.name = 'Project name is required';
	} else if (name.length < 3) {
		fieldErrors.name = 'Project name must be at least 3 characters long';
	}

	if (Object.values(fieldErrors).some(Boolean)) {
		return json({ fieldErrors, fields }, { status: 400 });
	}

	// 4. If no errors, try to create a project
	try {
		const project = await db.project.create({ data: { name } });
		return redirect(`/projects/${project.id}`);
	} catch (err) {
		const data: ActionData = {
			formError: 'Something went wrong. Please try again later',
		};
		return json(data, { status: 400 });
	}
};

export default function New() {
	const actionData = useActionData<ActionData>();
	return (
		<div className="max-w-lg">
			<Form
				method="post"
				aria-describedby={actionData?.formError ? 'form-error' : undefined}
			>
				{actionData?.formError ? (
					<div>
						<p role="alert" id="form-error">
							{actionData.formError}
						</p>
					</div>
				) : null}
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
							defaultValue={actionData?.fields?.name}
							aria-invalid={Boolean(actionData?.fieldErrors?.name || undefined)}
							aria-describedby={
								actionData?.fieldErrors?.name ? 'name-error' : undefined
							}
							type="text"
							name="name"
							id="name"
						/>
						{actionData?.fieldErrors?.name ? (
							<p role="alert" id="name-error">
								{actionData.fieldErrors.name}
							</p>
						) : null}
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
