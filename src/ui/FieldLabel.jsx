export default function sectionTitle({
	children,
	htmlFor = '',
	className = '',
}) {
	return (
		<label
			htmlFor={htmlFor}
			className={`text-sm tracking-tight text-slate-600 capitalize ${className}`}
		>
			{children}
		</label>
	);
}
