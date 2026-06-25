import { twMerge } from 'tailwind-merge';

export const CheckBox = ({
	register,
	className = '',
	value,
	id,
	registeredName,
	validationMessage,
}) => {
	return (
		<input
			{...register(registeredName, {
				required: validationMessage,
			})}
			id={id}
			value={value}
			type="checkbox"
			className={twMerge('', className)}
		/>
	);
};
