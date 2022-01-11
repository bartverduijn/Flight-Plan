interface HeaderProps {
	children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
	return (
		<header className="bg-white p-6 dark:bg-gray-800">
			<div className="flex items-center justify-between">
				<div>{children}</div>
			</div>
		</header>
	);
}
