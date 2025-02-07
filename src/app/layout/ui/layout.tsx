import { Header } from '@widgets/header';
import './layout.scss';
import { Hero } from '@widgets/hero';
import { TextArea } from '@features/textArea';
import { TextMetricsProvider } from '@features/textArea/provider/textMetrics/textMetrics';
import { CheckFiltersProvider } from '@features/textArea/provider/checkFilters/checkFilters';

export function Layout() {
  return (
    <div className='wrapper'>
      <Header />

      <main className='block'>
        <section className='block__hero'>
          <Hero />
        </section>

          <CheckFiltersProvider>
        <TextMetricsProvider>
            <section className='block__text-area'>
              <TextArea />
            </section>
        </TextMetricsProvider>
          </CheckFiltersProvider>
      </main>
    </div>
  );
}
