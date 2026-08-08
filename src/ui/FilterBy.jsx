import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import Button from '../ui/Button';

export const FilterBy = () => {
  const [selectedField, setSelectedField] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const directionValue = searchParams.get('direction');

  const fields = ['Date', 'Initial', 'Ending', 'Total', 'Locations'];

  // Handlers
  // function handleClick(fieldName) {
  //   // Allow deselect onClick of selected field
  //   if (fieldName === selectedField) {
  //     searchParams.delete('sort');
  //     if (directionValue) searchParams.delete('direction');
  //     setSelectedField(null);
  //     setSearchParams(searchParams);
  //     return;
  //   }

  // searchParams.set('sort', fieldName.toLowerCase());
  // setSelectedField(fieldName);

  // if (!searchParams.get('direction')) {
  //   searchParams.set('direction', 'asc');
  // }

  //   setSearchParams(searchParams);
  // }

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
            <option className="text-center">{field}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
