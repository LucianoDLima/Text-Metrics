import { Header } from '@widgets/header';
import './layout.scss';
import { Hero } from '@widgets/hero';
import {
  TextMetricsProvider,
  CheckFiltersProvider,
} from '@features/textMetrics/provider';
import { TextMetrics } from '@features/textMetrics';

export function Layout() {
  return (
    <div className='wrapper'>
      <Header />

      <main className='block'>
        <section>
          <Hero />

          <CheckFiltersProvider>
            <TextMetricsProvider>
              <TextMetrics />
            </TextMetricsProvider>
          </CheckFiltersProvider>
        </section>
      </main>
    </div>
  );
}
