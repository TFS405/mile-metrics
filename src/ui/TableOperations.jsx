import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { FilterButton } from './FilterButton';

export const TableOperations = () => {
	const [isExtended, setIsExtended] = useState(false);

	function handleClick(e) {
		e.stopPropagation();

		if (isExtended) setIsExtended(!isExtended);
		else setIsExtended(!isExtended);
	}

	return (
		<div>
			<FilterButton onClick={handleClick} />
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
