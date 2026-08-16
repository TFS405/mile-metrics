import { ArrowDown, ArrowRight, MoveRight } from 'lucide-react';
import DateInput from '../../DateInput';

const DateFilterControls = () => {
  return (
    <div className="flex flex-col gap-1.5 py-1">
      <h3 className="font-data mb-2 text-center font-medium text-gray-500/75">
        Select one or more dates to filter...
      </h3>
      <div className="flex gap-3">
        <DateInput
          searchParamName="from"
          popover={{
            side: 'left',
            align: 'center',
            sideOffset: 295,
          }}
        />
        <ArrowRight className={`mx-auto text-slate-500`} />
        <DateInput
          searchParamName="to"
          popover={{
            side: 'right',
            align: 'center',
            sideOffset: 45,
          }}
        />
      </div>
    </div>
  );
};

export default DateFilterControls;
