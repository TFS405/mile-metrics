import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router';
import { getMileageEntries } from '../features/mileage/mileageApi';
import {
  getDateStringFromOffset,
  getTodayDateString,
} from '../utils/dateUtils';
import Loader from '../ui/Loader';
import { MileageTable } from '../features/mileage/table/MileageTable';
import Button from '../ui/Button';
import ButtonLink from '../ui/ButtonLink';
import { TableOperations } from '../ui/table/TableOperations';

export default function MileageDetails() {
  const [searchParams] = useSearchParams();
  const { timeFrame } = useParams();

  const sortValue = searchParams.get('sort');
  const directionValue = searchParams.get('direction');
  const sortFieldLookup = {
    date: 'date',
    initial: 'initialMiles',
    ending: 'endingMiles',
    total: 'totalMiles',
    locations: 'locations',
  };

  // Create a query obj builder
  let query = {
    queryKey: ['miles'],
    queryFn: () => getMileageEntries(),
  };

  // API calls
  if (timeFrame === 'daily') {
    query.queryKey = ['miles', 'daily'];
    query.queryFn = () =>
      getMileageEntries({
        dateFiltering: {
          exactDate: getTodayDateString(),
        },
      });
  }

  if (timeFrame === 'weekly') {
    query.queryKey = ['miles', 'weekly'];
    query.queryFn = () =>
      getMileageEntries({
        dateFiltering: {
          startDate: getDateStringFromOffset(-6),
          endDate: getTodayDateString(),
        },
      });
  }

  if (timeFrame === 'monthly') {
    query.queryKey = ['miles', 'monthly'];
    query.queryFn = () =>
      getMileageEntries({
        dateFiltering: {
          startDate: getDateStringFromOffset(-29),
          endDate: getTodayDateString(),
        },
      });
  }

  if (sortValue && directionValue) {
    query.queryKey = ['miles', sortValue, directionValue];
    query.queryFn = () =>
      getMileageEntries({
        sorting: {
          field: sortFieldLookup[sortValue],
          isAscending: directionValue === 'asc',
        },
      });
  }

  // Execute query
  const {
    data: mileageEntries,
    isLoading,
    isFetching,
  } = useQuery({
    ...query,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loader size={45} containerClassName="min-h-screen" />;

  return (
    <main className="bg-athens-gray-50 flex min-h-dvh min-w-dvw justify-center py-5.5">
      <div className="w-14/16 text-slate-700">
        <div className="grid grid-cols-[1fr_1fr_1fr]">
          <div className="flex items-center justify-start">
            <TableOperations />
          </div>

          <div className="col-start-2 flex flex-col items-center justify-center pb-2">
            <h1 className="text-center text-3xl font-medium text-gray-600 capitalize">{`${timeFrame} Miles`}</h1>
            <p className="font-data text-sm tracking-wide text-slate-500">
              Every mile logged with the details that{' '}
              <em className="italic">matter</em>.
            </p>
          </div>

          <div className="col-start-3 flex items-center justify-end">
            <ButtonLink
              to={'/view-miles'}
              className="px-0 duration-100 active:scale-90"
            >
              Go Back
            </ButtonLink>
          </div>
        </div>
        <MileageTable data={mileageEntries} isFetching={isFetching} />
      </div>
    </main>
  );
}
