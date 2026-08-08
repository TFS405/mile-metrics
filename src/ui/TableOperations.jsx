import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { SettingsButton } from './SettingsButton';
import { SortBy } from './SortBy';
import { FilterBy } from './FilterBy';

export const TableOperations = () => {
  const [isExtended, setIsExtended] = useState(false);

  function handleClick(e) {
    e.stopPropagation();

    if (isExtended) setIsExtended(!isExtended);
    else setIsExtended(!isExtended);
  }

  return (
    <div className="flex flex-col pb-1 pl-1">
      <SettingsButton onClick={handleClick} />

      <div
        className={`grid transition-all duration-150 ${isExtended ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="flex flex-col gap-1 overflow-hidden pt-1">
          <FilterBy />
          <SortBy />
        </div>
      </div>
    </div>
  );
};
