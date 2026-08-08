import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { SettingsButton } from './SettingsButton';
import { SortBy } from './SortBy';
import { FilterBy } from './FilterBy';
import SettingsModal from './SettingsModal';

export const TableOperations = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    e.stopPropagation();

    setIsOpen(true);
  }

  return (
    <div className="flex flex-col pb-1 pl-1">
      <SettingsButton onClick={handleClick} />

      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
