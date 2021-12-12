import * as React from 'react';
import { Project } from '@prisma/client';
import NavButton from './NavButton';
import { NavLink } from 'remix';
import { InboxIcon, StarIcon, ViewListIcon } from '@heroicons/react/outline';

type NavProps = { projects: Array<Project> };

export default function Nav({ projects }: NavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
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
				className={`fixed top-0 bottom-0 w-64 overflow-x-hidden overflow-y-auto bg-white shadow-2xl motion-safe:transition-transform	 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				<div className="flex flex-col w-full min-h-full">
					<header className="px-4 py-4 ">
						<div className="w-10 h-10 bg-indigo-200 rounded-2xl"></div>
					</header>
					<nav>
						<ul className="my-2">
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
									to="/"
									ref={navNode}
								>
									<span className="w-5 h-5 mr-4" aria-hidden="true">
										<InboxIcon className="text-slate-400" />
									</span>
									Inbox
								</NavLink>
							</li>
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-indigo-50 focus:bg-indigo-100"
									to="today"
								>
									<span className="w-5 h-5 mr-4" aria-hidden="true">
										<StarIcon className="text-slate-400" />
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
										<span className="w-5 h-5 mr-4" aria-hidden="true">
											<ViewListIcon className="text-slate-400" />
										</span>
										{project.name}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
