import { Links, LinksFunction, LiveReload } from 'remix';
import styles from './styles/generated.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Remix: So great, it's funny!</title>
				<Links />
			</head>
			<body className="text-xl">
				Hello world
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	);
}
