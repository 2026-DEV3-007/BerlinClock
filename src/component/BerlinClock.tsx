
import {useCurrentTime} from '../hooks/useCurrentTime';
import './BerlinClock.css';
import {
  CLASS_BERLIN_CLOCK,
  CURRENT_TIME_LABEL_TEXT,
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

return (
<div className={CLASS_BERLIN_CLOCK}>
      <div>{CURRENT_TIME_LABEL_TEXT} {getTimeString(displayTime.hours, displayTime.minutes, displayTime.seconds)}</div>
</div>
);
}