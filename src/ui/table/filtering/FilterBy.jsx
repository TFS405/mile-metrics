import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import Button from '../../Button';

export const FilterBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedField, setSelectedField] = useState(null);
  const fields = ['Date', 'Initial', 'Ending', 'Total', 'Locations'];

  function renderFilterComponent() {
    const componentLookup = {
      date: <DateFilterControls />,
    };
  }

  // Handlers
  function ResetSearchParameters() {
    searchParams.delete('sort');
    searchParams.delete('direction');
    setSelectedField(null);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex text-sm">
      <p className="pr-1.5 font-semibold tracking-tighter text-slate-600">
        Filter :
      </p>

      <div className="flex gap-1.5 pr-1">
        <select className="rounded-full border border-slate-400 bg-slate-50">
          {fields.map((field) => (
            <option
              onChange={(e) => setSelectedField(e.target.value)}
              className="text-center"
            >
              {field}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
