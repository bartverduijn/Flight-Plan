import { XCircleIcon } from '@heroicons/react/solid';
import {
	ActionFunction,
	json,
	useActionData,
	useTransition,
	redirect,
	Form,
} from 'remix';
import * as React from 'react';
import { Button } from '~/components/Button';
import { TextField } from '~/components/Form';
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
			formError: 'Form was submitted incorrectly. Please try again.',
		};
		return json(data, { status: 400 });
	}

	// 3. Validate each field. If the input is not valid, return an error
	const fields = { name };

	if (!name) {
		fieldErrors.name = 'Project name is required.';
	} else if (name.length < 3) {
		fieldErrors.name = 'Project name must be at least 3 characters long.';
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
			formError: 'Something went wrong. Please try again later.',
		};
		return json(data, { status: 400 });
	}
};

export default function New() {
	const actionData = useActionData<ActionData>();

	const transition = useTransition();
	const state: 'idle' | 'submitting' | 'error' = transition.submission
		? 'submitting'
		: actionData?.fieldErrors || actionData?.formError
		? 'error'
		: 'idle';
	const inputRef = React.useRef<HTMLInputElement>(null);
	React.useEffect(() => {
		if (state === 'error') {
			inputRef.current?.focus();
		}
	}, [state]);

	return (
		<div className="max-w-lg">
			<Form
				method="post"
				aria-describedby={actionData?.formError ? 'form-error' : undefined}
			>
				<fieldset disabled={state === 'submitting'}>
					<div className="grid grid-cols-2 gap-6">
						<div className="col-span-2">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-400"
							>
								New Project
							</label>
							<TextField
								placeholder="Project Name"
								defaultValue={actionData?.fields?.name}
								aria-invalid={Boolean(
									actionData?.fieldErrors?.name || undefined
								)}
								aria-describedby={
									actionData?.fieldErrors?.name ? 'name-error' : undefined
								}
								type="text"
								name="name"
								id="name"
								ref={inputRef}
							/>
						</div>
						<div className="col-span-2 text-right">
							<Button type="submit" size="large" variant="base">
								{state === 'submitting' ? 'Submitting...' : 'Submit'}
							</Button>
						</div>

						{/* Errors */}
						{actionData?.formError || actionData?.fieldErrors?.name ? (
							<div className="col-span-2 flex gap-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-100">
								<span aria-hidden="true">
									<XCircleIcon className="h-5 w-5 text-red-400" />
								</span>
								<div>
									<h5 className="font-semibold text-red-700 dark:text-red-50">
										The following errors occurred with your submission
									</h5>
									<ul className="mt-2 list-inside list-disc">
										{actionData?.formError ? (
											<li role="alert" id="form-error">
												{actionData.formError}
											</li>
										) : null}
										{actionData?.fieldErrors?.name ? (
											<li role="alert" id="name-error">
												{actionData.fieldErrors.name}
											</li>
										) : null}
									</ul>
								</div>
							</div>
						) : null}
					</div>
				</fieldset>
			</Form>
		</div>
	);
}
