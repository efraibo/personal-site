'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Education() {
  const { t } = useLanguage();
  const education = [
    {
      degree: t('edu.pos.title'),
      institution: "Instituto Infnet",
      period: "Julho 2021 - Junho 2022",
      description: t('edu.pos.desc')
    },
    {
      degree: t('edu.esp.title'),
      institution: "IFPE Campus Jaboatão",
      period: "2018 - 2021",
      description: t('edu.esp.desc')
    },
    {
      degree: t('edu.grad.title'),
      institution: "UNIFG",
      period: "2013 - 2016",
      description: t('edu.grad.desc')
    },
    {
      degree: t('edu.tec.title'),
      institution: "Unibratec",
      period: "Agosto 2010 - Junho 2012",
      description: t('edu.tec.desc')
    }
  ];

  const certifications = [
    "Introduction to Amazon Elastic Compute Cloud (EC2)",
    "Introduction to Amazon CloudFront", 
    "Spring Boot Fundamentals",
    "SQL (Intermediate)",
    "Técnico em Informática para Internet"
  ];

  return (
    <section id="educacao" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('education.title')} <span className="gradient-text">{t('education.titleHighlight')}</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Educação */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('edu.educationSection')}</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div
                    key={`${edu.institution}-${edu.degree}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-blue-600 font-medium mt-1">{edu.institution}</p>
                    <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
                    <p className="text-gray-600 mt-3">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certificações */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('edu.certificationsSection')}</h3>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{cert}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Idiomas */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('edu.languagesSection')}</h3>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{t('edu.portuguese')}</span>
                      <span className="text-sm text-gray-500">{t('edu.native')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{t('edu.english')}</span>
                      <span className="text-sm text-gray-500">{t('edu.professional')}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
