import { Header } from '@widgets/header';
import './layout.scss';
import { Hero } from '@widgets/hero';

export function Layout() {
  return (
    <div className='wrapper'>
      <Header />
      <Hero />
    </div>
  );
}
