import { parse } from 'date-fns';
import handleError from '../utils/handleError';

export function getLocaleDateFormat({
  formatStyle = 'long',
  includeSpaces = false,
  uppercase: {
    day: uppercaseDay = false,
    month: uppercaseMonth = false,
    year: uppercaseYear = false,
  } = {},
} = {}) {
  const locale = navigator.language;

  const formatter = Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedParts = formatter.formatToParts(new Date());

  const localeFormat = formattedParts
    .map((part) => {
      if (part.type === 'year') {
        if (formatStyle === 'full') return uppercaseYear ? 'YEAR' : 'year';
        if (formatStyle === 'long') return uppercaseYear ? 'YYYY' : 'yyyy';
        if (formatStyle === 'short') return uppercaseYear ? 'Y' : 'y';
      }

      if (part.type === 'month') {
        if (formatStyle === 'full') return uppercaseMonth ? 'MONTH' : 'month';
        if (formatStyle === 'long') return uppercaseMonth ? 'MM' : 'mm';
        if (formatStyle === 'short') return uppercaseMonth ? 'M' : 'm';
      }

      if (part.type === 'day') {
        if (formatStyle === 'full') return uppercaseDay ? 'DAY' : 'day';
        if (formatStyle === 'long') return uppercaseDay ? 'DD' : 'dd';
        if (formatStyle === 'short') return uppercaseDay ? 'D' : 'd';
      }

      return part.value;
    })
    .join(includeSpaces ? ' ' : '');

  return localeFormat;
}

export function parseDate(dateString, dateStringFormat) {
  if (!dateString)
    handleError('parseDate requires a dateString argument', { dateString });

  if (!dateStringFormat)
    handleError('parseDate requires a dateStringFormat argument', {
      dateString,
    });

  return parse(dateString, dateStringFormat, new Date());
}
