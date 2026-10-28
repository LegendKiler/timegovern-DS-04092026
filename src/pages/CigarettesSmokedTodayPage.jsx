import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.cigarettes

const EXPLAINERS = [
  { title: 'What the cigarettes counter shows', body: 'This counter resets at midnight UTC and ticks up at about 173,000 cigarettes per second. That is roughly 5.5 trillion cigarettes smoked worldwide per year, based on the WHO Report on the Global Tobacco Epidemic. The counter shows cigarettes smoked since the start of the current UTC day.' },
  { title: 'What counts as a cigarette', body: 'The figure includes manufactured cigarettes, hand-rolled cigarettes, and roll-your-own tobacco products. It excludes cigars, pipe tobacco, bidis, kreteks, and smokeless tobacco such as snus and chewing tobacco. Heated tobacco products and e-cigarettes are also excluded because they are separate categories in WHO reporting.' },
  { title: 'Where cigarettes are smoked', body: 'China accounts for roughly 40 percent of global cigarette consumption, with about 2.3 trillion cigarettes smoked per year. Indonesia, Russia, the United States, and Japan round out the top five. Smoking prevalence has fallen sharply in high-income countries but continues to rise in parts of Southeast Asia and sub-Saharan Africa, where tobacco companies have shifted marketing.' },
  { title: 'How smoking is changing', body: 'Global cigarette consumption peaked around 2010 at about 6.1 trillion and has declined slowly since. The decline reflects falling prevalence in high-income countries, offset by population growth in low- and middle-income countries. The WHO estimates that without stronger tobacco control, more than 1 billion people will die from tobacco-related causes this century.' },
]

const FAQS = [
  { q: 'How many cigarettes are smoked each day?', a: 'About 15 billion cigarettes per day worldwide, which is roughly 173,000 per second, or around 5.5 trillion per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows cigarettes smoked since the start of the current UTC day.' },
  { q: 'Which country smokes the most cigarettes?', a: 'China, at about 2.3 trillion cigarettes per year. Indonesia, Russia, the United States, and Japan are next.' },
  { q: 'Does this include vaping?', a: 'No. E-cigarettes, heated tobacco, and other novel nicotine products are excluded because they are tracked separately by the WHO. Only combustible cigarettes and roll-your-own tobacco are counted.' },
  { q: 'Where does the data come from?', a: 'The WHO Report on the Global Tobacco Epidemic, which compiles national consumption data from tax records, manufacturer reports, and household health surveys.' },
]

const RELATED = [
  { to: '/smoking-deaths-today', name: 'Deaths From Smoking Today', desc: 'Tobacco-related deaths today' },
  { to: '/alcohol-deaths-today', name: 'Alcohol-Related Deaths Today', desc: 'Alcohol-related deaths today' },
  { to: '/road-traffic-deaths-today', name: 'Road Traffic Deaths Today', desc: 'Road accident deaths today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'All deaths worldwide today' },
]

export default function CigarettesSmokedTodayPage() {

  useEffect(() => {
    document.title = 'Cigarettes Smoked Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}