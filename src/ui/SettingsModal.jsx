import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FilterBy } from './FilterBy';
import { SortBy } from './SortBy';
import Button from './Button';

const SettingsModal = ({ isOpen, setIsOpen }) => {
  function closeModal() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
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

          <div className="flex items-center justify-center pt-3">
            <Button onClick={closeModal}>Close</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
