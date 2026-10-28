import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.alcoholdeaths

const EXPLAINERS = [
  { title: 'What the alcohol deaths counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.082 people per second. That is roughly 2.6 million alcohol-related deaths per year, based on the WHO Global Status Report on Alcohol. The counter shows deaths since the start of the current UTC day.' },
  { title: 'What counts as an alcohol-related death', body: 'The figure includes deaths from liver cirrhosis, alcohol-related cancers (mouth, throat, oesophagus, liver, breast, colon), alcohol poisoning, alcohol-related road traffic accidents, and violence where alcohol is a contributing factor. It also includes foetal alcohol spectrum disorders. Roughly 40 percent of alcohol deaths come from chronic conditions and 60 percent from acute causes such as accidents and injuries.' },
  { title: 'Where alcohol deaths are concentrated', body: 'Europe has the highest alcohol-related death rate per capita, followed by the Americas and parts of sub-Saharan Africa. In absolute numbers, the largest totals are in Russia, India, China, the United States, and Brazil. Russia has one of the highest rates globally, driven by heavy spirit consumption. Alcohol is a factor in about 7 percent of all deaths in the WHO European Region.' },
  { title: 'How alcohol deaths are changing', body: 'Global alcohol deaths have risen from about 1.8 million per year in 2000 to 2.6 million today, driven by population growth and rising consumption in Asia. Consumption has fallen in Southern Europe, Russia, and the United States, but risen sharply in China and India. The WHO projects 3 million alcohol-related deaths per year by 2030 if current trends continue.' },
]

const FAQS = [
  { q: 'How many people die from alcohol each day?', a: 'About 7,100 people per day worldwide, which is roughly 0.082 per second, or around 2.6 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows alcohol-related deaths since the start of the current UTC day.' },
  { q: 'Which country has the most alcohol deaths?', a: 'In absolute numbers, Russia, India, China, the United States, and Brazil. As a share of population, Russia and Belarus have among the highest rates globally.' },
  { q: 'What is the most common cause of alcohol death?', a: 'Liver cirrhosis and alcohol-related cancers account for the majority of chronic deaths. Alcohol-related road accidents and injuries account for most acute deaths. Roughly 60 percent are from acute causes.' },
  { q: 'Where does the data come from?', a: 'The WHO Global Status Report on Alcohol, which compiles national mortality data and uses alcohol-attributable fraction modelling to estimate deaths where alcohol is a contributing factor.' },
]

const RELATED = [
  { to: '/smoking-deaths-today', name: 'Deaths From Smoking Today', desc: 'Tobacco-related deaths today' },
  { to: '/cigarettes-smoked-today', name: 'Cigarettes Smoked Today', desc: 'Cigarettes smoked worldwide today' },
  { to: '/road-traffic-deaths-today', name: 'Road Traffic Deaths Today', desc: 'Road accident deaths today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'All deaths worldwide today' },
]

export default function AlcoholDeathsTodayPage() {

  useEffect(() => {
    document.title = 'Alcohol Deaths Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}