export interface Project {
  id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  category: { pt: string; en: string };
  technologies: string[];
  links?: { repo?: string; demo?: string };
}

export const projects: Project[] = [
  {
    id: 'itau-investimentos',
    title: { pt: 'Sistema de Investimentos', en: 'Investment System' },
    description: {
      pt: 'Plataforma de investimentos desenvolvida durante minha passagem pelo Itaú Unibanco, utilizando arquitetura de microsserviços e integração com AWS.',
      en: 'Investment platform built during my time at Itaú Unibanco, using a microservices architecture and AWS integration.'
    },
    category: { pt: 'Backend/Cloud', en: 'Backend/Cloud' },
    technologies: ['C#', 'Dotnet Core', 'AWS', 'Docker', 'DynamoDB']
  },
  {
    id: 'bacen-cast',
    title: { pt: 'Sistema BACEN', en: 'BACEN System' },
    description: {
      pt: 'Sistema para o Banco Central do Recife desenvolvido na Cast Group, com foco em segurança e alta disponibilidade.',
      en: 'System for the Central Bank of Recife built at Cast Group, focused on security and high availability.'
    },
    category: { pt: 'Full Stack', en: 'Full Stack' },
    technologies: ['Java 8', 'Spring Boot', 'Angular', 'DB2', 'Docker']
  },
  {
    id: 'boticario-microservices',
    title: { pt: 'Aplicações Microserviços', en: 'Microservices Applications' },
    description: {
      pt: 'Desenvolvimento de aplicações reativas e microsserviços no Grupo Boticário, focando em alta performance e escalabilidade.',
      en: 'Development of reactive applications and microservices at Grupo Boticário, focused on high performance and scalability.'
    },
    category: { pt: 'Microsserviços', en: 'Microservices' },
    technologies: ['Kotlin', 'Java', 'Spring WebFlux', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'cesar-corporativo',
    title: { pt: 'Sistemas Corporativos', en: 'Corporate Systems' },
    description: {
      pt: 'Liderança no desenvolvimento de sistemas corporativos na Cesar, aplicando melhores práticas de arquitetura e DevOps.',
      en: 'Led development of corporate systems at Cesar, applying architecture and DevOps best practices.'
    },
    category: { pt: 'Liderança Técnica', en: 'Technical Leadership' },
    technologies: ['C#', 'Angular', 'Entity Framework', 'PCF', 'GitLab CI/CD']
  },
  {
    id: 'safaz-nfe',
    title: { pt: 'Nota Fiscal Eletrônica', en: 'Electronic Invoice' },
    description: {
      pt: 'Sistema de NFA (Nota Fiscal Eletrônica) para SEFAZ - Secretaria da Fazenda de Pernambuco, garantindo conformidade fiscal.',
      en: 'Electronic invoice (NFA) system for SEFAZ - Pernambuco State Treasury Department, ensuring tax compliance.'
    },
    category: { pt: 'Governo', en: 'Government' },
    technologies: ['Java EE', 'JSP', 'WebSphere', 'JavaScript', 'DB2']
  },
  {
    id: 'mobile-unity',
    title: { pt: 'Aplicações Mobile', en: 'Mobile Applications' },
    description: {
      pt: 'Desenvolvimento de aplicações Android e jogos utilizando Unity3D durante período como estagiário.',
      en: 'Development of Android applications and games using Unity3D during my internship.'
    },
    category: { pt: 'Mobile/Games', en: 'Mobile/Games' },
    technologies: ['Android', 'Unity3D', 'C#', 'Java', 'Git']
  }
];
