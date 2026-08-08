import { twMerge } from 'tailwind-merge';
import Button from '../Button';

export const ConfirmationModal = ({
  confirmState,
  onClickDiv,
  onClickBtnRight,
  onClickBtnLeft,
}) => {
  // Lookup table for styles and classNames
  const modalConfig = {
    delete: {
      messages: {
        primary: 'Are you sure you want to delete this entry?',
        buttons: {
          left: 'cancel deletion',
          right: 'Delete entry permanently',
        },
      },
      classNames: {
        divs: {
          outer: 'border-3 border-red-400',
        },
        buttons: {
          left: '',
          right: 'border-2 font-bold border-slate-600 bg-red-500 text-white',
        },
      },
    },
    save: {
      messages: {
        primary: 'Would you like to save your changes?',
        buttons: {
          left: 'Continue editing',
          right: 'save changes',
        },
      },
      classNames: {
        divs: {
          outer: 'border-2 border-green-500',
        },
        buttons: {
          left: '',
          right:
            'border-2 border-slate-600 bg-emerald-500 font-bold text-white hover:bg-emerald-600 hover:text-gray-200',
        },
      },
    },
    closeRow: {
      messages: {
        primary: 'You cannot close this entry while editing',
        buttons: {
          left: 'Continue editing',
          right: 'Cancel Changes',
        },
      },
      classNames: {
        divs: {
          outer: '',
        },
        buttons: {
          left: '',
          right: '',
        },
      },
    },
  };

  // Extracting into variables
  const type = confirmState.type;
  const message = modalConfig[type].messages.primary;
  const messageBtnLeft = modalConfig[type].messages.buttons.left;
  const messageBtnRight = modalConfig[type].messages.buttons.right;

  const classNameOuterDiv = modalConfig[type].classNames.divs.outer;
  const classNameBtnLeft = modalConfig[type].classNames.buttons.left;
  const classNameBtnRight = modalConfig[type].classNames.buttons.right;

  return (
    <div
      className={twMerge(
        'flex flex-col justify-between rounded-full bg-slate-100 p-10 text-center',
        classNameOuterDiv,
      )}
      onClick={onClickDiv}
    >
      <h1 className="font-data font-semibold tracking-tight text-slate-600">
        {message}
      </h1>
      <div className="flex gap-5 pt-3">
        <Button
          className={twMerge(classNameBtnLeft, 'font-data, capitalize')}
          onClick={onClickBtnLeft}
        >
          {messageBtnLeft}
        </Button>
        <Button
          className={twMerge(classNameBtnRight, 'font-data capitalize')}
          onClick={onClickBtnRight}
        >
          {messageBtnRight}
        </Button>
      </div>
    </div>
  );
};
