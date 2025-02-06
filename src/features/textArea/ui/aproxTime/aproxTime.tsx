interface AproxTimeProps {
  readingTime: string;
}

export function AproxTime({ readingTime }: AproxTimeProps) {
  return (
    <p
      className='text-clr--secondary'
      data-testid='aprox-time'
    >
      Approx. reading time: {readingTime} minute
      {readingTime !== '<1' && Number(readingTime) > 1 ? 's' : ''}
    </p>
  );
}
