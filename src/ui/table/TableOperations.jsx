import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { SettingsButton } from './SettingsButton';
import { SortBy } from '../table/sorting/SortBy';
import { FilterBy } from '../table/filtering/FilterBy';
import SettingsModal from '../modals/SettingsModal';

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
