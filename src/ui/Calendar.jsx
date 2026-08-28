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
  classNames: {
    container: containerClassName,
    group: groupClassName,
    calendarHeader: calendarHeaderClassName,
    calendarHeaderCell: CalendarHeaderCellClassName,
    calendarCell: CalendarCellClassName,
    arrowLeft: arrowLeftClassName,
    arrowRight: arrowRightClassName,
  } = {},
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
      className={containerClassName}
    >
      <Group className={groupClassName}>
        <Button slot='previous'>
          <ArrowLeft size={svgSize} className={arrowLeftClassName} />
        </Button>
        <CalendarHeading
          format={calendarHeaderFormat}
          className={calendarHeaderClassName}
        />
        <Button slot='next'>
          <ArrowRight size={svgSize} className={arrowRightClassName} />
        </Button>
      </Group>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={CalendarHeaderCellClassName}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              className={CalendarCellClassName}

              date={date}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  );
};

export default Calendar;
