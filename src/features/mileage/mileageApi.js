import supabase from '../../services/supabase';

export const getMileageEntries = async ({
  dateFiltering: { exactDate = null, startDate = null, endDate = null } = {},
  sorting: { field = null, isAscending = null } = {},
} = {}) => {
  // Check validity of arguments and rename for readability
  const hasExactDate = Boolean(exactDate);
  const hasStartDate = Boolean(startDate);
  const hasEndDate = Boolean(endDate);
  const hasFieldToSort = Boolean(field);
  const hasSortingDirection = typeof isAscending === 'boolean';

  // Check for errors
  if (!hasExactDate) {
    if (hasStartDate && !hasEndDate) {
      throw new Error(
        'Please provide an endDate argument to getMileageEntries()',
      );
    }
    if (!hasStartDate && hasEndDate) {
      throw new Error(
        'Please provide a startDate argument to getMileageEntries()',
      );
    }
  }

  if (hasExactDate && (hasStartDate || hasEndDate)) {
    throw new Error(
      'Please provide only a targetDate, or a startDate and endDate to getMileageEntries()',
    );
  }

  if (
    (!hasFieldToSort && hasSortingDirection) ||
    (hasFieldToSort && !hasSortingDirection)
  ) {
    const missingArg = hasFieldToSort ? 'isAscending' : 'Field';

    throw new Error(
      `field and isAscending must both have values in order to sort data. ${missingArg} was undefined or invalid`,
    );
  }

  let query = supabase.from('Miles').select('*');

  if (exactDate) {
    query = query.eq('date', exactDate);
  }

  if (startDate && endDate) {
    query = query.gte('date', startDate).lte('date', endDate);
  }

  // Sorting
  if (hasFieldToSort && hasSortingDirection) {
    query = query.order(field, { ascending: isAscending });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Mileage entries could not be fetched', { cause: error });
  }

  return data;
};

export const insertMileageEntry = async (entry) => {
  const { error } = await supabase.from('Miles').insert([entry]);

  if (error) {
    console.log(error);
    throw new Error('Mileage entry could not be created');
  }
};

export const updateMileageEntry = async (id, payload) => {
  const { data, error } = await supabase
    .from('Miles')
    .update(payload)
    .eq('id', id)
    .select();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
};

export const deleteMileageEntry = async (id) => {
  const { error } = await supabase.from('Miles').delete().eq('id', id);

  if (error) throw new Error(error.message);
};

/* Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])

  // Logical operators
  .not('column', 'like', 'Negate filter')
  .or('some_column.eq.Some value

	*/
