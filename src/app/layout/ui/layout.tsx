import { Header } from '@widgets/header';
import './layout.scss';
import { Hero } from '@widgets/hero';
import { TextArea } from '@widgets/textArea';

export function Layout() {
  return (
    <div className='wrapper'>
      <Header />

      <main className='block'>
        <section className='block__hero'>
          <Hero />
        </section>

        <section className='block__text-area'>
          <TextArea />
        </section>
      </main>
    </div>
  );
}
