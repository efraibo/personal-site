'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  
  const stats = [
    { number: "8+", label: t('about.yearsExperience'), icon: "🚀" },
    { number: "50+", label: t('about.projectsCompleted'), icon: "💼" },
    { number: "5", label: t('about.companies'), icon: "🏢" },
    { number: "20+", label: t('about.technologies'), icon: "⚡" }
  ];

  const specialties = [
    {
      icon: "💻",
      title: t('about.backend'),
      description: t('about.backendDesc'),
      technologies: ["Java", "Kotlin", "C#", "Spring Boot", "Microservices"]
    },
    {
      icon: "🌐",
      title: t('about.frontend'), 
      description: t('about.frontendDesc'),
      technologies: ["Angular", "React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    {
      icon: "☁️",
      title: t('about.cloud'),
      description: t('about.cloudDesc'),
      technologies: ["AWS", "Docker", "Kubernetes", "GitLab CI/CD", "PCF"]
    },
    {
      icon: "🎯",
      title: t('about.leadership'),
      description: t('about.leadershipDesc'),
      technologies: ["Architecture", "Code Review", "Mentoring", "Agile", "Innovation"]
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('about.title')} <span className="gradient-text">{t('about.titleHighlight')}</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{ __html: t('about.description') }}
            />
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Specialties */}
          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {specialty.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {specialty.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {specialty.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {specialty.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 