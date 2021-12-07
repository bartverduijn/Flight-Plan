import * as React from 'react';
import { Project } from '@prisma/client';
import NavButton from './NavButton';
import { NavLink } from 'remix';

type NavProps = { projects: Array<Project> };

export default function Nav({ projects }: NavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
	return (
		<>
			<div className="px-4 py-4 text-white bg-gray-800 lg:py-12">
				<div className="flex items-center mx-auto max-w-7xl">
					<div>
						<NavButton
							onFocus={e => e.stopPropagation()}
							onClick={() => {
								setIsOpen(currentState => {
									const newState = !currentState;
									return newState;
								});
							}}
						>
							Toggle Menu
						</NavButton>
					</div>
				</div>
			</div>
			<div
				className={`fixed top-0 bottom-0 w-64 overflow-x-hidden overflow-y-auto bg-white shadow-2xl ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
			>
				<div className="flex flex-col w-full min-h-full">
					<header className="px-4 py-4 bg-gray-400">Bart Verduijn</header>
					<nav>
						<ul>
							<li>
								<NavLink to="inbox">Inbox</NavLink>
							</li>
							<li>
								<NavLink to="Today">Today</NavLink>
							</li>
						</ul>
						<hr aria-hidden="true" />
						<ul>
							{projects.map(project => (
								<li key={project.id}>
									<NavLink to={project.id}>{project.name}</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
