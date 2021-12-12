import VisuallyHidden from '@reach/visually-hidden';
import { MenuAlt2Icon } from '@heroicons/react/outline';

type NavButtonProps = {
	children: React.ReactNode;
	onFocus: (e: React.FocusEvent<HTMLButtonElement>) => void;
	onClick: () => void;
};

export default function NavButton({
	children,
	onFocus,
	onClick,
}: NavButtonProps) {
	return (
		<button
			onClick={onClick}
			onFocus={onFocus}
			className="w-10 h-10 p-2 rounded-lg hover:bg-indigo-100 focus:bg-indigo-100"
		>
			<span aria-hidden="true">
				<MenuAlt2Icon className="text-slate-700" />
			</span>
			<VisuallyHidden>{children}</VisuallyHidden>
		</button>
	);
}
