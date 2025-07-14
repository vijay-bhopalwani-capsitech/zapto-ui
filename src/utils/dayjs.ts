import dayjsBase from 'dayjs';
import 'dayjs/locale/en-gb';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import RelativeTime from 'dayjs/plugin/relativeTime';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Weekday from 'dayjs/plugin/weekday';

dayjsBase.locale('en-gb');
dayjsBase.extend(AdvancedFormat);
dayjsBase.extend(CustomParseFormat);
dayjsBase.extend(Weekday);
dayjsBase.extend(IsSameOrAfter);
dayjsBase.extend(IsSameOrBefore);
dayjsBase.extend(RelativeTime);
dayjsBase.extend(utc);
dayjsBase.extend(tz);
dayjsBase.extend(Duration);

declare module 'dayjs' {
  interface Dayjs {
    addWorkdays(amount: number): dayjsBase.Dayjs;
  }
}
const addWorkdays: dayjsBase.PluginFunc = (option, c) => {
  function determineSign(x: number) {
    x = +x;
    return x > 0 ? 1 : -1;
  }

  c.prototype.addWorkdays = function (amount: number) {
    if (amount === 0 || isNaN(amount)) {
      return this;
    }

    var sign = determineSign(amount);
    var day = this.day();
    var absIncrement = Math.abs(amount);

    var days = 0;

    if (day === 0 && sign === -1) {
      days = 1;
    } else if (day === 6 && sign === 1) {
      days = 1;
    }
    // Add padding for weekends.
    var paddedAbsIncrement = absIncrement;
    if (day !== 0 && day !== 6 && sign > 0) {
      paddedAbsIncrement += day;
    } else if (day !== 0 && day !== 6 && sign < 0) {
      paddedAbsIncrement += 6 - day;
    }

    var weekendsInbetween =
      Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) +
      (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);

    // Add the increment and number of weekends.
    days += absIncrement + weekendsInbetween * 2;

    return this.add(sign * days, 'day');
  };
};
dayjsBase.extend(addWorkdays);

export const dayjs = dayjsBase;

//temp type to export plugin interfaces
export type tmpDayJs =
  | typeof dayjsBase
  | typeof AdvancedFormat
  | typeof CustomParseFormat
  | typeof Weekday
  | typeof IsSameOrAfter
  | typeof IsSameOrBefore
  | typeof RelativeTime
  | typeof utc
  | typeof tz
  | typeof Duration;