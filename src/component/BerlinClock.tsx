
import {useCurrentTime} from '../hooks/useCurrentTime';
import './BerlinClock.css';
import { isSecondsLampOn } from '../common/secondsLogic';
import { LampRow } from './LampRow';
import { getFiveMinuteLamps, getSingleMinuteLamps } from '../common/minutesLogic';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';
import {
  ARIA_FIVE_HOUR_ROW,
  ARIA_FIVE_MINUTE_ROW,
  ARIA_SECONDS_LAMP,
  ARIA_SINGLE_HOUR_ROW,
  ARIA_SINGLE_MINUTE_ROW,
  CLASS_BERLIN_CLOCK,
  CLASS_HOUR_LAMP,
  CLASS_MINUTE_LAMP_FIRST_ROW,
  CLASS_MINUTE_LAMP_SECOND_ROW,
  CLASS_OFF,
  CLASS_ON,
  CLASS_QUARTER,
  CLASS_SECONDS_CIRCLE,
  CURRENT_TIME_LABEL_TEXT,
  QUARTER_MINUTE_DIVISOR,
  QUARTER_MINUTE_REMAINDER,
  TEST_ID_FIVE_HOUR_PREFIX,
  TEST_ID_FIVE_MINUTE_PREFIX,
  TEST_ID_SINGLE_HOUR_PREFIX,
  TEST_ID_SINGLE_MINUTE_PREFIX,
  TIME_PAD_CHARACTER,
  TIME_PAD_LENGTH,
} from '../constants';

const getTimeString = (hours: number, minutes: number, seconds: number) => {
  const paddedHours = String(hours).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedMinutes = String(minutes).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  const paddedSeconds = String(seconds).padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER);
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export function BerlinClock() {
  const displayTime = useCurrentTime();
  const isSecondsOn = isSecondsLampOn(displayTime.seconds);
  const fiveHourLamps = getFiveHourLamps(displayTime.hours);
  const singleHourLamps = getSingleHourLamps(displayTime.hours);
  const fiveMinuteLamps = getFiveMinuteLamps(displayTime.minutes);
  const singleMinuteLamps = getSingleMinuteLamps(displayTime.minutes);

return (
<div className={CLASS_BERLIN_CLOCK}>
      <div
        className={`${CLASS_SECONDS_CIRCLE} ${isSecondsOn ? CLASS_ON : CLASS_OFF}`}
        aria-label={`${ARIA_SECONDS_LAMP} 0 ${isSecondsOn ? 'on' : 'off'}`}
      />
      <LampRow
        rowClassName="hours-row"
        rowAriaLabel={ARIA_FIVE_HOUR_ROW}
        lampStates={fiveHourLamps}
        lampClassName={CLASS_HOUR_LAMP}
        testIdPrefix={TEST_ID_FIVE_HOUR_PREFIX}
        ariaLabelPrefix={ARIA_FIVE_HOUR_ROW}
      />
      <LampRow
        rowClassName="hours-row"
        rowAriaLabel={ARIA_SINGLE_HOUR_ROW}
        lampStates={singleHourLamps}
        lampClassName={CLASS_HOUR_LAMP}
        testIdPrefix={TEST_ID_SINGLE_HOUR_PREFIX}
        ariaLabelPrefix={ARIA_SINGLE_HOUR_ROW}
      />
      <LampRow
        rowClassName="minutes-row"
        rowAriaLabel={ARIA_FIVE_MINUTE_ROW}
        lampStates={fiveMinuteLamps}
        lampClassName={CLASS_MINUTE_LAMP_FIRST_ROW}
        testIdPrefix={TEST_ID_FIVE_MINUTE_PREFIX}
        ariaLabelPrefix={ARIA_FIVE_MINUTE_ROW}
        additionalLampClass={(lampIndex) => (
          lampIndex % QUARTER_MINUTE_DIVISOR === QUARTER_MINUTE_REMAINDER ? CLASS_QUARTER : ''
        )}
      />
      <LampRow
        rowClassName="minutes-row"
        rowAriaLabel={ARIA_SINGLE_MINUTE_ROW}
        lampStates={singleMinuteLamps}
        lampClassName={CLASS_MINUTE_LAMP_SECOND_ROW}
        testIdPrefix={TEST_ID_SINGLE_MINUTE_PREFIX}
        ariaLabelPrefix={ARIA_SINGLE_MINUTE_ROW}
      />
      <div>{CURRENT_TIME_LABEL_TEXT} {getTimeString(displayTime.hours, displayTime.minutes, displayTime.seconds)}</div>
</div>
);
}