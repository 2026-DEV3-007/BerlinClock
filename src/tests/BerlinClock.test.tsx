import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BerlinClock } from '../component/BerlinClock.tsx';

const renderBerlinClockAt = (isoString: string) => {
  vi.setSystemTime(new Date(isoString));
  return render(<BerlinClock />);
};

describe('BerlinClock component (minimal)', () => {
  it('displays current time in HH:MM:SS format', () => {
    const { getByText } = renderBerlinClockAt('2026-06-17T09:05:03');

    expect(getByText(/Current Time:/).textContent).toContain('09:05:03');
  });

  it('displays formatted time with leading zeros', () => {
    const { getByText } = renderBerlinClockAt('2026-06-17T01:02:05');

    expect(getByText(/Current Time:/).textContent).toContain('01:02:05');
  });
  
  it('uses the correct aria-label for the seconds lamp on', () => {
    const { getByLabelText } = renderBerlinClockAt('2026-06-17T12:00:58');
    const lamp = getByLabelText(/seconds lamp 0 on/i);

    expect(lamp.getAttribute('aria-label')).toBe('seconds lamp 0 on');
  });

  it('uses the correct aria-label for the seconds lamp off', () => {
    const { getByLabelText } = renderBerlinClockAt('2026-06-17T12:00:57');
    const lamp = getByLabelText(/seconds lamp 0 off/i);

    expect(lamp.getAttribute('aria-label')).toBe('seconds lamp 0 off');
  });

  it('shows an illuminated circle for even seconds', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:58');
    const lamp = getByLabelText(/seconds lamp/i);

    expect(lamp.classList.contains('on')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:58');
  });

  it('shows a dark circle for odd seconds', () => {
    const { getByLabelText, getByText } = renderBerlinClockAt('2026-06-17T12:00:59');
    const lamp = getByLabelText(/seconds lamp/i);

    expect(lamp.classList.contains('off')).toBe(true);
    expect(getByText(/Current Time:/).textContent).toContain('12:00:59');
  });

  it('renders 5-hour and single-hour lamps for a given time', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:00:00');

    expect(getByTestId('five-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-hour-2').classList.contains('off')).toBe(true);
    expect(getByTestId('five-hour-3').classList.contains('off')).toBe(true);

    expect(getByTestId('single-hour-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-2').classList.contains('on')).toBe(true);
    expect(getByTestId('single-hour-3').classList.contains('off')).toBe(true);
  });

  it('renders 5-minute and single-minute lamps for a given time', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:17:00');

    expect(getByTestId('five-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-2').classList.contains('on')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('off')).toBe(true);
    expect(getByTestId('five-minute-4').classList.contains('off')).toBe(true);

    expect(getByTestId('single-minute-0').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-1').classList.contains('on')).toBe(true);
    expect(getByTestId('single-minute-2').classList.contains('off')).toBe(true);
    expect(getByTestId('single-minute-3').classList.contains('off')).toBe(true);
  });

  it('renders quarter-minute markers only at the 3rd, 6th, and 9th five-minute lamps', () => {
    const { getByTestId } = renderBerlinClockAt('2026-06-17T13:17:00');

    expect(getByTestId('five-minute-2').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-5').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-8').classList.contains('quarter')).toBe(true);
    expect(getByTestId('five-minute-3').classList.contains('quarter')).toBe(false);
    expect(getByTestId('five-minute-4').classList.contains('quarter')).toBe(false);
  });
});