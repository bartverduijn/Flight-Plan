import { AccessibleIcon } from './AccessibleIcon';

export function Logo({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M27.778 16.667c0-2.33-1.432-3.334-2.222-3.334V8.89c4.119 0 6.666 3.97 6.666 7.778 0 3.807-2.547 7.777-6.666 7.777V20c.79 0 2.222-1.004 2.222-3.333ZM23.333 33.333a2.222 2.222 0 0 0-2.222-2.222v-4.444a6.667 6.667 0 1 1 0 13.333v-4.444a2.222 2.222 0 0 0 2.222-2.223ZM13.333 24.444a1.111 1.111 0 0 0 0 2.223v4.444a5.556 5.556 0 0 1 0-11.111v4.444Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.111 31.111h-7.778v-4.444h7.778v4.444ZM13.333 20h12.223v4.444H13.333V20ZM16.667 11.111c0-1.227.995-2.222 2.222-2.222h6.667a2.222 2.222 0 1 1 0 4.444h-6.667a2.222 2.222 0 0 1-2.222-2.222Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 6.667A6.667 6.667 0 0 1 6.667 0h26.666A6.667 6.667 0 0 1 40 6.667v26.666A6.667 6.667 0 0 1 33.333 40H6.667A6.667 6.667 0 0 1 0 33.333V6.667Zm6.667-2.223a2.222 2.222 0 0 0-2.223 2.223v26.666c0 1.228.995 2.223 2.223 2.223h26.666a2.222 2.222 0 0 0 2.223-2.223V6.667a2.222 2.222 0 0 0-2.223-2.223H6.667Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.778 11.111c0-.454.276-.863.698-1.032l5.556-2.222a1.111 1.111 0 0 1 1.49 1.301l-.488 1.953.488 1.953a1.111 1.111 0 0 1-1.49 1.301l-5.556-2.222a1.111 1.111 0 0 1-.698-1.032Zm5.061.384-.028-.114a1.11 1.11 0 0 1 0-.54l.028-.113-.958.383.958.384Z"
				fill="currentColor"
			/>
		</svg>
	);
}
