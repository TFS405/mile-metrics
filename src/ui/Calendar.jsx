import { Group } from 'react-aria-components';
import {
  Calendar as AriaCalendar,
  Button,
  CalendarHeading,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarCell,
  CalendarGrid,
  CalendarHeaderCell,
} from 'react-aria-components/Calendar';

import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Calendar = ({
  svgSize = 20,
  calendarConfig: {
    firstDayOfWeek = 'mon',
    visibleDuration = { months: 1 },
    calendarHeaderFormat = {
      month: 'long',
    },
  } = {},
  classNames = {},
}) => {
  const [focusedDate, setFocusedDate] = useState(today(getLocalTimeZone()));
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <AriaCalendar
      value={selectedDate}
      onChange={setSelectedDate}
      onFocusChange={setFocusedDate}
      focusedValue={focusedDate}
      firstDayOfWeek={firstDayOfWeek}
      visibleDuration={visibleDuration}
      className={classNames.container}
    >
      <Group className={classNames.headerGroup}>
        <Button slot='previous' className={classNames.arrowLeft}>
          <ArrowLeft size={svgSize} />
        </Button>
        <CalendarHeading
          format={calendarHeaderFormat}
          className={classNames.calendarHeader}
        />
        <Button slot='next' className={classNames.arrowRight}>
          <ArrowRight size={svgSize} />
        </Button>
      </Group>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={classNames.calendarHeaderCell}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              className={classNames.calendarCell}

              date={date}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  );
};

export default Calendar;
