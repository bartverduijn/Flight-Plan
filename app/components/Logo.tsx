export function Logo({ className }: { className: string }) {
	return (
		<svg
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
		>
			<path fill="none" d="M0 0h40v40H0z" />
			<path
				d="M10 12v-2a2 2 0 0 0-2 2h2Zm2 0h2a2 2 0 0 0-2-2v2Zm0 .02v2a2 2 0 0 0 2-2h-2Zm-2 0H8a2 2 0 0 0 2 2v-2ZM18 10a2 2 0 1 0 0 4v-4Zm-8 4h2v-4h-2v4Zm0-2v.02h4V12h-4Zm2-1.98h-2v4h2v-4Zm0 2V12H8v.02h4ZM26 17c0 2.096-1.289 3-2 3v4c3.707 0 6-3.573 6-7h-4Zm-2-3c.711 0 2 .904 2 3h4c0-3.427-2.293-7-6-7v4Zm-2 18a2 2 0 0 1-2 2v4a6 6 0 0 0 6-6h-4Zm-2-2a2 2 0 0 1 2 2h4a6 6 0 0 0-6-6v4Zm-7-4a1 1 0 0 1-1-1H8a5 5 0 0 0 5 5v-4Zm-1-1a1 1 0 0 1 1-1v-4a5 5 0 0 0-5 5h4Zm1 5h7v-4h-7v4Zm11-10H13v4h11v-4Zm-6-6h6v-4h-6v4ZM8 6h24V2H8v4Zm26 2v24h4V8h-4Zm-2 26H8v4h24v-4ZM6 32V8H2v24h4Zm2 2a2 2 0 0 1-2-2H2a6 6 0 0 0 6 6v-4Zm26-2a2 2 0 0 1-2 2v4a6 6 0 0 0 6-6h-4ZM32 6a2 2 0 0 1 2 2h4a6 6 0 0 0-6-6v4ZM8 2a6 6 0 0 0-6 6h4a2 2 0 0 1 2-2V2Z"
				fill="currentColor"
			/>
		</svg>
	);
}
