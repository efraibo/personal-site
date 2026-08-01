'use client';

import { motion } from 'framer-motion';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface MonthYear {
  year: number;
  month: number; // 1-12
}

function formatMonthYear(date: MonthYear, language: Language): string {
  const locale = language === 'en' ? 'en-US' : 'pt-BR';
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    new Date(date.year, date.month - 1, 1)
  );
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.year}`;
}

function formatPeriod(
  start: MonthYear,
  end: MonthYear | undefined,
  language: Language,
  presentLabel: string
): string {
  const startLabel = formatMonthYear(start, language);
  const endLabel = end ? formatMonthYear(end, language) : presentLabel;
  return `${startLabel} - ${endLabel}`;
}

export default function Experience() {
  const { t, language } = useLanguage();
  
  const experiences = [
    {
      title: "Developer Specialist",
      company: "Grupo Boticário",
      period: formatPeriod({ year: 2024, month: 4 }, undefined, language, t('experience.present')),
      description: t('exp.boticario.desc')
    },
    {
      title: "Tech Lead",
      company: "Cesar",
      period: formatPeriod({ year: 2022, month: 8 }, { year: 2024, month: 2 }, language, t('experience.present')),
      description: t('exp.cesar1.desc')
    },
    {
      title: "Software Engineer",
      company: "Itaú Unibanco",
      period: formatPeriod({ year: 2022, month: 3 }, { year: 2022, month: 8 }, language, t('experience.present')),
      description: t('exp.itau.desc')
    },
    {
      title: "Tech Lead / Software Engineer",
      company: "Cesar",
      period: formatPeriod({ year: 2020, month: 6 }, { year: 2022, month: 3 }, language, t('experience.present')),
      description: t('exp.cesar2.desc')
    },
    {
      title: "Systems Analyst",
      company: "Cast Group",
      period: formatPeriod({ year: 2019, month: 2 }, { year: 2020, month: 6 }, language, t('experience.present')),
      description: t('exp.cast.desc')
    }
  ];

  return (
    <section id="experiencia" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('experience.title')} <span className="gradient-text">{t('experience.titleHighlight')}</span>
          </h2>
          
          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                <p className="text-blue-600 font-medium mt-1">{exp.company}</p>
                <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                <p className="text-gray-600 mt-4">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 