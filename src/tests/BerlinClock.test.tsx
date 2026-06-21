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
});