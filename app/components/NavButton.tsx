import VisuallyHidden from '@reach/visually-hidden';
import { Menu } from 'react-feather';

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
			className="w-10 h-10 p-2 rounded-lg hover:bg-gray-600"
		>
			<span aria-hidden="true">
				<Menu />
			</span>
			<VisuallyHidden>{children}</VisuallyHidden>
		</button>
	);
}
