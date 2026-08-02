import { Settings2 } from 'lucide-react';
import { useState } from 'react';

export const TableOperations = () => {
	const [isExtended, setIsExtended] = useState(false);

	function handleClick(e) {
		e.stopPropagation();

		if (isExtended) setIsExtended(!isExtended);
		else setIsExtended(!isExtended);
	}

	return (
		<div>
			<div
				onClick={(e) => handleClick(e)}
				className="flex cursor-pointer items-center justify-center gap-1.5 text-slate-500 transition-all duration-150 hover:text-slate-700"
			>
				<p className="font-data pl-1 font-medium tracking-wide">Filter</p>
				<Settings2 className="" size={23} />
			</div>
			<div
				className={`grid transition-all duration-150 ${isExtended ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
			>
				<div className="overflow-hidden">
					<h1>PEEKABOO</h1>
				</div>
			</div>
		</div>
	);
};
