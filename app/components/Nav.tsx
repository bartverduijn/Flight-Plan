import * as React from 'react';
import { Project } from '@prisma/client';
import NavButton from './NavButton';
import { NavLink } from 'remix';

type NavProps = { projects: Array<Project> };

export default function Nav({ projects }: NavProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const navNode = React.useRef<HTMLAnchorElement>(null);
	return (
		<>
			<div className="px-4 py-4 text-white bg-gray-800">
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
			</div>
			<div
				className={`fixed top-0 bottom-0 w-64 overflow-x-hidden overflow-y-auto bg-white shadow-2xl transition-transform	 ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
			>
				<div className="flex flex-col w-full min-h-full">
					<header className="px-4 py-4 text-white bg-gray-800">
						Bart Verduijn
					</header>
					<nav>
						<ul className="my-2">
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-gray-200"
									to="/"
									ref={navNode}
								>
									Inbox
								</NavLink>
							</li>
							<li className="h-10 px-2">
								<NavLink
									className="flex items-center h-full px-3 rounded-md py-auto hover:bg-gray-200"
									to="today"
								>
									Today
								</NavLink>
							</li>
						</ul>
						<hr aria-hidden="true" />
						<ul className="my-2">
							{projects.map(project => (
								<li className="h-10 px-2" key={project.id}>
									<NavLink
										className="flex items-center h-full px-3 rounded-md py-auto hover:bg-gray-200"
										to={project.id}
									>
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
