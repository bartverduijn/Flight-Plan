interface HeaderProps {
	children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
	return (
		<header className="px-5 py-4">
			<div className="flex items-center mx-auto max-w-7xl">{children}</div>
		</header>
	);
}
