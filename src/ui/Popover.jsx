import {
	flip,
	FloatingPortal,
	offset,
	shift,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
} from '@floating-ui/react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const Popover = ({ children, content, className, disabled }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: 'top',
		middleware: [offset(8), flip(), shift({ padding: 8 })],
	});

	const dismiss = useDismiss(context, { enabled: !disabled });
	const hover = useHover(context, { enabled: !disabled });

	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		dismiss,
	]);

	return (
		<>
			<div ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</div>

			{isOpen && (
				<FloatingPortal>
					{' '}
					<div
						// eslint-disable-next-line react-hooks/refs
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className={twMerge(
							'rounded-full border border-gray-400 bg-white p-1 text-xs font-semibold tracking-tight text-gray-600',
							className,
						)}
					>
						{content}
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
