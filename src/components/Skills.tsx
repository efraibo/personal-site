'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  
  const skillCategories: {
    title: string;
    icon: string;
    gradient: string;
    skills: { name: string; level: 'advanced' | 'intermediate' | 'basic' }[];
  }[] = [
    {
      title: t('skills.languages'),
      icon: "💻",
      gradient: "from-blue-500 to-blue-600",
      skills: [
        { name: "Java", level: "advanced" },
        { name: "Kotlin", level: "advanced" },
        { name: "C#", level: "intermediate" },
        { name: "JavaScript", level: "intermediate" },
        { name: "TypeScript", level: "intermediate" },
        { name: "Python", level: "basic" }
      ]
    },
    {
      title: t('skills.backendFrameworks'),
      icon: "⚙️",
      gradient: "from-purple-500 to-purple-600",
      skills: [
        { name: "Spring Boot", level: "advanced" },
        { name: "Spring WebFlux", level: "intermediate" },
        { name: "Dotnet Core", level: "advanced" },
        { name: "Entity Framework", level: "intermediate" },
        { name: "Spring Security", level: "intermediate" },
        { name: "Dapper", level: "intermediate" }
      ]
    },
    {
      title: t('skills.frontend'),
      icon: "🎨",
      gradient: "from-green-500 to-green-600",
      skills: [
        { name: "Angular", level: "advanced" },
        { name: "React", level: "intermediate" },
        { name: "Next.js", level: "intermediate" },
        { name: "TypeScript", level: "intermediate" },
        { name: "HTML5", level: "advanced" },
        { name: "CSS3", level: "intermediate" }
      ]
    },
    {
      title: t('skills.databases'),
      icon: "🗄️",
      gradient: "from-orange-500 to-orange-600",
      skills: [
        { name: "MongoDB", level: "intermediate" },
        { name: "PostgreSQL", level: "advanced" },
        { name: "Oracle", level: "intermediate" },
        { name: "DB2", level: "intermediate" },
        { name: "SQL Server", level: "intermediate" },
        { name: "H2", level: "basic" }
      ]
    },
    {
      title: t('skills.devopsCloud'),
      icon: "☁️",
      gradient: "from-indigo-500 to-indigo-600",
      skills: [
        { name: "Docker", level: "advanced" },
        { name: "AWS", level: "intermediate" },
        { name: "PCF", level: "intermediate" },
        { name: "CI/CD", level: "intermediate" },
        { name: "GitLab", level: "intermediate" },
        { name: "New Relic", level: "basic" }
      ]
    },
    {
      title: t('skills.methodologies'),
      icon: "📋",
      gradient: "from-pink-500 to-pink-600",
      skills: [
        { name: "Agile", level: "advanced" },
        { name: "TDD/BDD", level: "intermediate" },
        { name: "SonarQube", level: "intermediate" },
        { name: "Checkmarx", level: "intermediate" },
        { name: "Unit Testing", level: "advanced" },
        { name: "Code Quality", level: "advanced" }
      ]
    }
  ];

  const levelBadgeStyles: Record<'advanced' | 'intermediate' | 'basic', string> = {
    advanced: 'bg-blue-100 text-blue-700',
    intermediate: 'bg-purple-100 text-purple-700',
    basic: 'bg-gray-100 text-gray-600'
  };

  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              {t('skills.title')} <span className="gradient-text">{t('skills.titleHighlight')}</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('skills.description')}
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(categoryIndex * 0.05, 0.25) }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(skillIndex * 0.03, 0.15) }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${levelBadgeStyles[skill.level]}`}>
                        {t(`skills.level.${skill.level}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">20+</div>
                <div className="text-blue-100">Tecnologias</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Anos Experiência</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Projetos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-blue-100">Empresas</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 