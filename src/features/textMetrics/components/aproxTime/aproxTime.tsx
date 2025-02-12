import { TReadingTime } from '@features/textMetrics/model/types';

interface AproxTimeProps {
  readingTime: TReadingTime;
}

/**
 * Display the estimated time to read the text
 *
 * @param readingTime - The estimated time to read the text
 */
export function AproxTime({ readingTime }: AproxTimeProps) {
  return (
    <p data-testid='aprox-time'>
      Approx. reading time: {readingTime === 0.1 ? '<1' : readingTime} minute
      {Number(readingTime) === 0 || Number(readingTime) > 1 ? 's' : ''}
    </p>
  );
}
