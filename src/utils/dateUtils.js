import { format as getFormattedDate } from 'date-fns';

const dateStringToMilliseconds = (dateString) => {
  const [year, month, date] = dateString.split('-').map(Number);
  return new Date(year, month - 1, date).getTime();
};

const getTodayDateString = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());

  return `${year}-${month}-${day}`;
};

const getDateStringFromOffset = (offset) => {
  const date = new Date();

  date.setDate(date.getDate() + offset);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${year}-${month}-${day}`;
};

const isWithinDateRange = (
  startDateString,
  endDateString,
  targetDateString,
) => {
  const startRange = dateStringToMilliseconds(startDateString);
  const endRange = dateStringToMilliseconds(endDateString);
  const targetDate = dateStringToMilliseconds(targetDateString);

  if (!startDateString || !endDateString || !targetDateString) {
    console.log('Invalid data provided to isWithinDateRange function.');
    return false;
  }

  return targetDate >= startRange && targetDate <= endRange;
};

function formatDate(date, format, options = {}) {
  return getFormattedDate(date, format, options);
}

export {
  isWithinDateRange,
  getDateStringFromOffset,
  getTodayDateString,
  formatDate,
};
