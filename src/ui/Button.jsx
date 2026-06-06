export default function Button({
	type = '',
	disabled = 'false',
	className = '',
	children,
}) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`${className} rounded-xl border-2 border-slate-300/75 bg-white p-3 text-center text-sm font-semibold tracking-wider text-slate-500 transition-all duration-150 hover:cursor-pointer hover:bg-slate-50 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300 focus:outline-none active:scale-95 active:border-slate-400/75 active:bg-slate-100 active:text-slate-600/75`}
		>
			{children}
		</button>
	);
}
