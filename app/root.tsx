import { Links, LiveReload, Outlet, Scripts } from 'remix';
import type { LinksFunction } from 'remix';
import tailwindStyles from './styles/generated.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: tailwindStyles }];
};

type LayoutProps = {
	children: React.ReactNode;
};
function Document({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Flight Plan</title>
				<Links />
			</head>
			<body className="relative h-screen antialiased text-gray-500 bg-white">
				{children}
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}
