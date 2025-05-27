'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  
  const skillCategories = [
    {
      title: t('skills.languages'),
      icon: "💻",
      gradient: "from-blue-500 to-blue-600",
      skills: [
        { name: "Java", level: 95 },
        { name: "Kotlin", level: 90 },
        { name: "C#", level: 88 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 82 },
        { name: "Python", level: 75 }
      ]
    },
    {
      title: t('skills.backendFrameworks'),
      icon: "⚙️",
      gradient: "from-purple-500 to-purple-600",
      skills: [
        { name: "Spring Boot", level: 95 },
        { name: "Spring WebFlux", level: 88 },
        { name: "Dotnet Core", level: 90 },
        { name: "Entity Framework", level: 85 },
        { name: "Spring Security", level: 85 },
        { name: "Dapper", level: 80 }
      ]
    },
    {
      title: t('skills.frontend'),
      icon: "🎨",
      gradient: "from-green-500 to-green-600",
      skills: [
        { name: "Angular", level: 90 },
        { name: "React", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "TypeScript", level: 88 },
        { name: "HTML5", level: 92 },
        { name: "CSS3", level: 85 }
      ]
    },
    {
      title: t('skills.databases'),
      icon: "🗄️",
      gradient: "from-orange-500 to-orange-600",
      skills: [
        { name: "MongoDB", level: 88 },
        { name: "PostgreSQL", level: 90 },
        { name: "Oracle", level: 85 },
        { name: "DB2", level: 80 },
        { name: "SQL Server", level: 85 },
        { name: "H2", level: 75 }
      ]
    },
    {
      title: t('skills.devopsCloud'),
      icon: "☁️",
      gradient: "from-indigo-500 to-indigo-600",
      skills: [
        { name: "Docker", level: 90 },
        { name: "AWS", level: 85 },
        { name: "PCF", level: 82 },
        { name: "CI/CD", level: 88 },
        { name: "GitLab", level: 85 },
        { name: "New Relic", level: 75 }
      ]
    },
    {
      title: t('skills.methodologies'),
      icon: "📋",
      gradient: "from-pink-500 to-pink-600",
      skills: [
        { name: "Agile", level: 95 },
        { name: "TDD/BDD", level: 88 },
        { name: "SonarQube", level: 85 },
        { name: "Checkmarx", level: 80 },
        { name: "Unit Testing", level: 90 },
        { name: "Code Quality", level: 92 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
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
              {t('skills.title')} <span className="gradient-text">{t('skills.titleHighlight')}</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
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
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${category.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
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
            transition={{ duration: 0.8, delay: 0.5 }}
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