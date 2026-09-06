import MileageLocationFields from './MileageLocationFields';
import FormTiles from './FormTiles';

const LocationEntry = ({ fields, control, resetField }) => {
  return (
    <div className='relative mb-7 h-37 snap-y snap-mandatory scrollbar-gutter-stable overflow-y-auto'>
      {fields.map((field, index) => (
        <div key={field.id} className='h-full shrink-0 snap-start'>
          {/* Location counter */}
          <div>
            <p className='px-1 py-px text-sm font-semibold tracking-tight text-gray-400'>
              {`Location ${index + 1}`}
            </p>
          </div>

          {/* Location selection */}
          <div className='flex justify-evenly pb-6'>
            <MileageLocationFields
              control={control}
              index={index}
              resetField={resetField}
            />
          </div>

          {/* Tiles */}
          <div>
            <FormTiles control={control} index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationEntry;
