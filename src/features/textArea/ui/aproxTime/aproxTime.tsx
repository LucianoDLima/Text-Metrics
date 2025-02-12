interface AproxTimeProps {
  readingTime: string;
}

/**
 * Display the estimated time to read the text
 *
 * @param readingTime - The estimated time to read the text
 */
export function AproxTime({ readingTime }: AproxTimeProps) {
  return (
    <p
      className='text-clr--secondary'
      data-testid='aprox-time'
    >
      Approx. reading time: {readingTime} minute
      {Number(readingTime) === 0 || Number(readingTime) > 1 ? 's' : ''}
    </p>
  );
}
