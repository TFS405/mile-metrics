import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FilterBy } from '../table/filtering/FilterBy';
import { SortBy } from '../table/sorting/SortBy';
import Button from '../Button';
import { useSearchParams } from 'react-router';

const SettingsModal = ({ isOpen, setIsOpen }) => {
  const [, setSearchParams] = useSearchParams();

  // Handlers
  function closeModal() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }
  function resetQueryState() {
    setSearchParams({});
  }

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogBackdrop className="fixed inset-0 bg-black/25" />

      <div className="fixed inset-0 flex items-center justify-center border border-slate-500">
        <DialogPanel className="rounded-xl bg-slate-50 p-5">
          <div className="flex flex-col gap-1.5">
            <FilterBy />
            <SortBy />
          </div>

          <div className="flex items-center justify-center gap-3 pt-3">
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={resetQueryState}>Reset</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
