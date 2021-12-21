import * as React from 'react';
import { NavLink } from 'remix';
import { Menu, MenuButton, MenuLink, MenuPopover } from '@reach/menu-button';
import { MenuAlt2Icon, FolderIcon, CubeIcon } from '@heroicons/react/outline';
import {
	InboxIcon,
	StarIcon,
	ViewListIcon,
	PlusIcon,
} from '@heroicons/react/solid';
import IconButton from '~/components/IconButton';
import { Project } from '@prisma/client';

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
				<div className="ml-4 overflow-hidden text-white rounded-lg shadow-xl bg-slate-800">
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
	media?: string;
	ref: React.Ref<HTMLAnchorElement> | undefined;
}

export const Nav = React.forwardRef(function Nav({
	projects,
	media = '',
	ref,
}: NavProps) {
	return (
		<div
			className={`w-64 h-full overflow-x-hidden overflow-y-auto bg-white ${media}`}
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
								ref={ref}
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
	);
});

interface MobileNavProps {
	projects: Array<Project>;
	media: string;
}

export function MobileNav({ projects, media }: MobileNavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const navNode = React.useRef<HTMLAnchorElement>(null);
	return (
		<div className={media}>
			<IconButton
				alt="Toggle Nav"
				onFocus={e => e.stopPropagation()}
				onClick={() => {
					setIsOpen(currentState => {
						const newState = !currentState;
						if (newState && navNode.current) navNode.current.focus();
						return newState;
					});
				}}
			>
				<MenuAlt2Icon />
			</IconButton>

			<div
				className={`fixed top-0 bottom-0 -ml-5 shadow-2xl transition-transform motion-reduce:transition-none	 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				<Nav ref={navNode} projects={projects} />
			</div>
		</div>
	);
}
