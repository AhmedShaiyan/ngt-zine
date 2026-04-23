import { Zine } from './components/Zine';
import { ZineProvider } from './context/ZineContext';
import { spreads } from './data/spreads';

export default function App() {
  return (
    <ZineProvider totalSpreads={spreads.length}>
      <Zine spreads={spreads} soundtrack="/media/soundtrack.mp3" />
    </ZineProvider>
  );
}
