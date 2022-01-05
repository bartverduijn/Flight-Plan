import { Link } from 'remix';
import { Logo } from './Logo';

interface HeaderProps {
	children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
	return (
		<header className="bg-white">
			<div className="px-4 mx-auto max-w-7xl sm:px-6">
				<div className="flex items-center justify-between py-6 border-b-2 border-gray-100">
					<Link to="">
						<span className="sr-only">Flight Plan</span>
						<span aria-hidden="true">
							<Logo className="w-auto h-8 text-gray-800 sm:h-10" />
						</span>
					</Link>
					<div>{children}</div>
				</div>
			</div>
		</header>
	);
}
