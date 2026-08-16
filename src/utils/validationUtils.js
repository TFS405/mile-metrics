import { isExists, isFuture, isValid, parse } from 'date-fns';

function validateDate(validationData, expectedFormat = 'YYYY-MM-DD') {
  const errors = {};
  const parsedDate = parse(validationData, 'yyyy-MM-dd', new Date());

  const [year, month, day] = validationData.split('-').map(Number);

  if (validationData.length < 10)
    return {
      hasError: true,
      payload: { incomplete: `Please provide a full date (${expectedFormat})` },
    };

  if (!isValid(parsedDate))
    errors.validDate = `Please provide a full date (${expectedFormat})`;

  if (!isExists(year, month - 1, day))
    errors.exist = `Please provide a full date (${expectedFormat})`;

  if (isFuture(parsedDate))
    errors.isFuture = 'Provided Dates cannot be in the future';

  return Object.keys(errors).length > 0
    ? { hasError: true, payload: errors }
    : { hasError: false, payload: '' };
}

export { validateDate };
