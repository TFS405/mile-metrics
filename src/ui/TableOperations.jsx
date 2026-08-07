import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { SettingsButton } from './SettingsButton';
import { SortBy } from './SortBy';

export const TableOperations = () => {
  const [isExtended, setIsExtended] = useState(false);

  function handleClick(e) {
    e.stopPropagation();

    if (isExtended) setIsExtended(!isExtended);
    else setIsExtended(!isExtended);
  }

  return (
    <div className="flex flex-col gap-0.5 pl-1">
      <SettingsButton onClick={handleClick} />

      <div
        className={`grid transition-all duration-150 ${isExtended ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <SortBy />
        </div>
      </div>
    </div>
  );
};
