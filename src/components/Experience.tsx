'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  
  const experiences = [
    {
      title: "Developer Specialist",
      company: "Grupo Boticário",
      period: `Abril 2024 - ${t('experience.present')}`,
      description: t('exp.boticario.desc')
    },
    {
      title: "Tech Lead",
      company: "Cesar",
      period: "Agosto 2022 - Fevereiro 2024",
      description: t('exp.cesar1.desc')
    },
    {
      title: "Software Engineer",
      company: "Itaú Unibanco",
      period: "Março 2022 - Agosto 2022",
      description: t('exp.itau.desc')
    },
    {
      title: "Tech Lead / Software Engineer",
      company: "Cesar",
      period: "Junho 2020 - Março 2022",
      description: t('exp.cesar2.desc')
    },
    {
      title: "Systems Analyst",
      company: "Cast Group",
      period: "Fevereiro 2019 - Junho 2020",
      description: t('exp.cast.desc')
    }
  ];

  return (
    <section id="experiencia" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                transition={{ duration: 0.5 }}
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