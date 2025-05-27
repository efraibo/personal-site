'use client';

import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Sistema de Investimentos",
      description: "Plataforma de investimentos desenvolvida durante minha passagem pelo Itaú Unibanco, utilizando arquitetura de microsserviços e integração com AWS.",
      technologies: ["C#", "Dotnet Core", "AWS", "Docker", "DynamoDB"],
      category: "Backend/Cloud"
    },
    {
      title: "Sistema BACEN",
      description: "Sistema para o Banco Central do Recife desenvolvido na Cast Group, com foco em segurança e alta disponibilidade.",
      technologies: ["Java 8", "Spring Boot", "Angular", "DB2", "Docker"],
      category: "Full Stack"
    },
    {
      title: "Aplicações Microserviços",
      description: "Desenvolvimento de aplicações reativas e microsserviços no Grupo Boticário, focando em alta performance e escalabilidade.",
      technologies: ["Kotlin", "Java", "Spring WebFlux", "MongoDB", "PostgreSQL"],
      category: "Microsserviços"
    },
    {
      title: "Sistemas Corporativos",
      description: "Liderança no desenvolvimento de sistemas corporativos na Cesar, aplicando melhores práticas de arquitetura e DevOps.",
      technologies: ["C#", "Angular", "Entity Framework", "PCF", "GitLab CI/CD"],
      category: "Liderança Técnica"
    },
    {
      title: "Nota Fiscal Eletrônica",
      description: "Sistema de NFA (Electronic Invoice) para SAFAZ - Secretaria da Fazenda de Pernambuco, garantindo conformidade fiscal.",
      technologies: ["Java EE", "JSP", "WebSphere", "JavaScript", "DB2"],
      category: "Governo"
    },
    {
      title: "Aplicações Mobile",
      description: "Desenvolvimento de aplicações Android e jogos utilizando Unity3D durante período como estagiário.",
      technologies: ["Android", "Unity3D", "C#", "Java", "Git"],
      category: "Mobile/Games"
    }
  ];

  return (
    <section id="projetos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Projetos Destacados</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Alguns dos principais projetos desenvolvidos ao longo da minha carreira
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-20 rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
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