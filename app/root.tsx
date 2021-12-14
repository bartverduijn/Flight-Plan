import { Links, LiveReload, Outlet, Scripts } from 'remix';
import type { LinksFunction } from 'remix';
import styles from './styles/generated.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

type LayoutProps = {
	children: React.ReactNode;
};
function Document({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Remix: So great, it's funny!</title>
				<Links />
			</head>
			<body className="text-sm antialiased text-slate-900">
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
