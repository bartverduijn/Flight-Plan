import * as React from 'react';
import { Form, Outlet, redirect, useLoaderData, NavLink } from 'remix';
import VisuallyHidden from '@reach/visually-hidden';
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import { Menu, MenuButton, MenuLink, MenuPopover } from '@reach/menu-button';
import {
	InboxIcon,
	StarIcon,
	ViewListIcon,
	PlusIcon,
} from '@heroicons/react/solid';
import { MenuAlt2Icon, FolderIcon, CubeIcon } from '@heroicons/react/outline';
import { db } from '~/utils/db.server';

import type { ActionFunction, LoaderFunction, LinksFunction } from 'remix';
import type { Project } from '@prisma/client';

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

interface NavButtonProps {
	children: React.ReactNode;
	onFocus: (e: React.FocusEvent<HTMLButtonElement>) => void;
	onClick: () => void;
}
export function NavButton({ children, onFocus, onClick }: NavButtonProps) {
	return (
		<button
			onClick={onClick}
			onFocus={onFocus}
			className="w-10 h-10 p-2 rounded-lg hover:bg-indigo-100 focus:bg-indigo-100"
		>
			<span aria-hidden="true">
				<MenuAlt2Icon className="text-slate-700" />
			</span>
			<VisuallyHidden>{children}</VisuallyHidden>
		</button>
	);
}

export function AddNewMenu() {
	return (
		<Menu>
			<MenuButton className="flex items-center w-full h-10 px-5 py-auto">
				<span className="w-5 h-5 mr-2 text-slate-400" aria-hidden="true">
					<PlusIcon />
				</span>
				Add List
			</MenuButton>
			<MenuPopover>
				<div className="ml-4 overflow-hidden text-white rounded-lg bg-slate-800">
					<MenuLink as={NavLink} to="/projects/new" className="highlight">
						<div className="flex py-4">
							<span className="w-6 h-6 mr-4 text-slate-300" aria-hidden="true">
								<FolderIcon />
							</span>
							<div>
								<p className="font-semibold">New Project</p>
								<p className="max-w-xs mt-1 text-slate-400">
									Projects are defined as outcomes that will require more than
									one action step to complete and that you can mark off as
									finished in the next 12 months.
								</p>
							</div>
						</div>
					</MenuLink>
					<MenuLink as={NavLink} to="TODO" className="highlight">
						<div className="flex py-4">
							<span className="w-6 h-6 mr-4 text-slate-300" aria-hidden="true">
								<CubeIcon />
							</span>
							<div>
								<p className="font-semibold">New Area</p>
								<p className="max-w-xs mt-1 text-slate-400">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Laboriosam fugiat aut tempore! Fuga accusantium id mollitia
									nam quasi culpa. Voluptatibus!
								</p>
							</div>
						</div>
					</MenuLink>
				</div>
			</MenuPopover>
		</Menu>
	);
}

interface NavProps {
	projects: Array<Project>;
}
export function Nav({ projects }: NavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(true);
	const navNode = React.useRef<HTMLAnchorElement>(null);
	return (
		<>
			<header className="px-5 py-4">
				<div className="flex items-center mx-auto max-w-7xl">
					<div>
						<NavButton
							onFocus={e => e.stopPropagation()}
							onClick={() => {
								setIsOpen(currentState => {
									const newState = !currentState;
									if (newState && navNode.current) navNode.current.focus();
									return newState;
								});
							}}
						>
							Toggle Menu
						</NavButton>
					</div>
				</div>
			</header>
			<div
				className={`fixed top-0 bottom-0 w-64 overflow-x-hidden overflow-y-auto bg-white shadow-2xl transition-transform motion-reduce:transition-none	 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				<div className="flex flex-col w-full min-h-full">
					<header className="px-5 py-4 ">
						<div className="w-10 h-10 bg-indigo-200 rounded-2xl"></div>
					</header>
					<nav className="flex-1">
						<ul className="my-2">
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
									to="/"
									ref={navNode}
								>
									<span
										className="w-5 h-5 mr-2 text-indigo-500"
										aria-hidden="true"
									>
										<InboxIcon />
									</span>
									Inbox
								</NavLink>
							</li>
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
									to="today"
								>
									<span
										className="w-5 h-5 mr-2 text-amber-500"
										aria-hidden="true"
									>
										<StarIcon />
									</span>
									Today
								</NavLink>
							</li>
						</ul>

						<hr className="border-slate-300" aria-hidden="true" />

						<ul className="my-2">
							{projects.map(project => (
								<li className="h-10 px-2" key={project.id}>
									<NavLink
										className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
										to={project.id}
									>
										<span className="w-5 h-5 mr-2" aria-hidden="true">
											<ViewListIcon className="text-slate-400" />
										</span>
										{project.name}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
					<footer className="block">
						<AddNewMenu />
					</footer>
				</div>
			</div>
		</>
	);
}

export default function Projects() {
	const data: LoaderData = useLoaderData();
	return (
		<>
			<SkipNavLink />
			<Nav projects={data.projects} />
			<div>
				<SkipNavContent>
					<main>
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
		</>
	);
}
