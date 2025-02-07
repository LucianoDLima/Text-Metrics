import './hero.scss';

export function Hero() {
  return (
    <div className='hero'>
      <h1
        className='fs-heading--lg text-clr--primary'
        data-testid='hero-title'
      >
        Analyze your text in real-time.
      </h1>
    </div>
  );
}
