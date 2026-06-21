
import {useCurrentTime} from '../hooks/useCurrentTime';
import './BerlinClock.css';
import { isSecondsLampOn } from '../common/secondsLogic';
import { LampRow } from './LampRow';
import { getFiveHourLamps, getSingleHourLamps } from '../common/hoursLogic';
import {
  ARIA_FIVE_HOUR_ROW,
  ARIA_SECONDS_LAMP,
  ARIA_SINGLE_HOUR_ROW,
  CLASS_BERLIN_CLOCK,
  CLASS_HOUR_LAMP,
  CLASS_OFF,
  CLASS_ON,
  CLASS_SECONDS_CIRCLE,
  CURRENT_TIME_LABEL_TEXT,
  TEST_ID_FIVE_HOUR_PREFIX,
  TEST_ID_SINGLE_HOUR_PREFIX,
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
      <div>{CURRENT_TIME_LABEL_TEXT} {getTimeString(displayTime.hours, displayTime.minutes, displayTime.seconds)}</div>
</div>
);
}