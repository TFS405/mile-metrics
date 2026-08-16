import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react';
import { useSearchParams } from 'react-router';
import Button from '../../Button';
import DateFilterControls from './DateFilterControls';

export const FilterBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get('filter') ?? '';
  const fields = [
    'Date',
    'Initial Miles',
    'Ending Miles',
    'Total Miles',
    'Locations',
  ];

  function renderFilterComponent() {
    const componentLookup = {
      date: <DateFilterControls />,
    };

    return componentLookup[filterValue];
  }

  // Handlers
  function selectField(e) {
    searchParams.set('filter', e.target.value);
    setSearchParams(searchParams);
  }

  function ResetSearchParameters() {
    searchParams.delete('sort');
    searchParams.delete('direction');
    setSearchParams(searchParams);
  }

  return (
    <div className="flex text-sm">
      <p className="h-fit pr-1.5 font-semibold tracking-tighter text-slate-600">
        Filter :
      </p>

      <div className="flex flex-col gap-1.5 pr-1">
        <select
          onChange={(e) => selectField(e)}
          value={filterValue}
          className={`rounded-full border border-slate-400 bg-white p-0.5 px-1 ${filterValue ? 'text-slate-700' : 'text-gray-400'}`}
        >
          {/* Default value */}
          <option value="" disabled>
            Filter by...
          </option>
          {fields.map((field, index) => (
            <option
              key={`${field}-${index}`}
              value={field.toLowerCase()}
              className="text-center text-slate-700"
            >
              {field}
            </option>
          ))}
        </select>

        <div className="flex flex-col items-center justify-center">
          {filterValue && renderFilterComponent()}
        </div>
      </div>
    </div>
  );
};
