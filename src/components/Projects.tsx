'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';

const Projects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projetos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            {t('projects.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-20 rounded-full">
                    {project.category[language]}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title[language]}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">{project.description[language]}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.links?.repo || project.links?.demo) && (
                    <div className="flex gap-4 mt-auto pt-2">
                      {project.links?.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {t('projects.viewRepo')}
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-purple-600 hover:text-purple-700"
                        >
                          {t('projects.viewDemo')}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
