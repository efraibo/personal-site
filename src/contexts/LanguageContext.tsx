'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Detectar idioma do navegador/SO
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt';
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'pt-BR';
  
  // Se começar com 'en', usar inglês, senão português
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'pt';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    // Verificar se há preferência salva no localStorage
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Detectar idioma do navegador
      const detectedLanguage = detectBrowserLanguage();
      setLanguage(detectedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language];
    return (translation as any)[key] ?? key;
  };

  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Traduções
const translations = {
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.experience': 'Experiência',
    'nav.skills': 'Skills',
    'nav.education': 'Educação',
    'nav.contact': 'Contato',
    'nav.portfolio': 'Portfolio',
    
    // Hero Section
    'hero.title': 'Evandro Nascimento',
    'hero.subtitle': 'Software Developer • Tech Lead',
    'hero.description': 'Com mais de <span class="font-semibold text-blue-600">8 anos de experiência</span> em desenvolvimento de software, lidero equipes no desenvolvimento de <span class="font-semibold text-purple-600">soluções inovadoras e escaláveis</span>.',
    'hero.contact': 'Entre em Contato',
    'hero.learnMore': 'Saiba Mais',
    'hero.location': 'Ipojuca, Pernambuco, Brazil',
    
    // About Section
    'about.title': 'Sobre',
    'about.titleHighlight': 'Mim',
    'about.description': 'Technical Leader apaixonado por tecnologia, com foco em <span class="font-semibold text-blue-600">arquitetura de software</span> e desenvolvimento de <span class="font-semibold text-purple-600">soluções inovadoras</span>. Especialista em liderar equipes e transformar ideias complexas em realidade.',
    'about.yearsExperience': 'Anos de Experiência',
    'about.projectsCompleted': 'Projetos Concluídos',
    'about.companies': 'Empresas de Renome',
    'about.technologies': 'Tecnologias Dominadas',
    'about.backend': 'Backend Development',
    'about.backendDesc': 'Especialista em Java, Kotlin, C# e Spring Boot para sistemas robustos e escaláveis',
    'about.frontend': 'Frontend Development',
    'about.frontendDesc': 'Desenvolvimento de interfaces modernas e responsivas com foco na experiência do usuário',
    'about.cloud': 'Cloud & DevOps',
    'about.cloudDesc': 'Arquitetura e deploy de soluções na nuvem com práticas de CI/CD e containerização',
    'about.leadership': 'Technical Leadership',
    'about.leadershipDesc': 'Liderança técnica com foco em arquitetura, qualidade de código e crescimento da equipe',
    
    // Skills Section
    'skills.title': 'Habilidades',
    'skills.titleHighlight': 'Técnicas',
    'skills.description': 'Tecnologias e ferramentas que domino para entregar soluções de alta qualidade',
    'skills.languages': 'Linguagens',
    'skills.backendFrameworks': 'Frameworks Backend',
    'skills.frontend': 'Frontend',
    'skills.databases': 'Banco de Dados',
    'skills.devopsCloud': 'DevOps & Cloud',
    'skills.methodologies': 'Metodologias',
    'skills.technologies': 'Tecnologias',
    'skills.experience': 'Anos Experiência',
    'skills.projects': 'Projetos',
    'skills.companies': 'Empresas',
    
    // Experience Section
    'experience.title': 'Experiência',
    'experience.titleHighlight': 'Profissional',
    'experience.present': 'Presente',
    
    // Education Section
    'education.title': 'Educação &',
    'education.titleHighlight': 'Certificações',
    'education.degree': 'Graduação',
    'education.specialization': 'Especialização',
    'education.certification': 'Certificação',
    
    // Contact Section
    'contact.title': 'Vamos Conversar?',
    'contact.description': 'Estou sempre interessado em novos projetos e oportunidades de colaboração.',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.phone': 'Telefone',
    'contact.whatsapp': 'WhatsApp',
    'contact.connect': 'Conecte-se comigo',
    
    // Footer
    'footer.description': 'Desenvolvendo soluções inovadoras e liderando equipes há mais de 8 anos. Especialista em arquitetura de software e tecnologias modernas.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.builtWith': 'Desenvolvido com ❤️ usando Next.js & Tailwind CSS',
    
    // Projects Section
    'projects.title': 'Projetos',
    'projects.titleHighlight': 'Destacados',
    'projects.description': 'Alguns dos principais projetos desenvolvidos ao longo da minha carreira',

    // Experience descriptions in Portuguese
    'exp.boticario.desc': 'Trabalho como especialista no desenvolvimento de soluções tecnológicas robustas e escaláveis, usando uma abordagem prática e versátil com tecnologias de ponta. Focado em microsserviços, projeto e implemento sistemas de alto desempenho, resilientes e sustentáveis, principalmente usando Kotlin e Java com frameworks como Spring Boot e WebFlux.',
    'exp.cesar1.desc': 'Liderei uma equipe de desenvolvimento utilizando diversas tecnologias, incluindo C#, Java, Dotnet Core 6, Entity Framework, Dapper, Oracle, Docker, Angular 9, PCF (Pivotal Cloud Foundry), Swagger, CI/CD e GITLAB. Responsável por decisões arquiteturais e DevOps, garantindo a qualidade e segurança dos produtos desenvolvidos.',
    'exp.itau.desc': 'Trabalhei em um produto de investimento, adquirindo conhecimentos valiosos com C#, Dotnet Core, Docker e serviços AWS como DynamoDB, CloudFront, API Gateway, ECS Fargate, Bucket S3, Lambda, SQS e SNS. Implementei pipelines CI/CD com AWS Code Pipeline.',
    'exp.cesar2.desc': 'Desenvolvimento de software e liderança técnica utilizando C#, Dotnet Core 3.1, Entity Framework, Dapper, Docker, Angular 9, PCF (Pivotal Cloud Foundry), Teradata, MongoDB, Swagger, CI/CD, GITLAB, testes unitários e ferramentas de qualidade de código.',
    'exp.cast.desc': 'Desenvolvimento de software para o contrato BACEN (Banco Central do Recife). Tecnologias utilizadas: Java 8, Linux, Docker, Spring Boot, Spring Security, Angular 7, WebSphere, ICP (IBM Cloud Private), banco de dados DB2 e H2 para testes.',

    // Education descriptions in Portuguese
    'edu.pos.title': 'Pós-graduação em Arquitetura de Software',
    'edu.pos.desc': 'Especialização em arquitetura de software, padrões de design e boas práticas de desenvolvimento.',
    'edu.esp.title': 'Especialização em Desenvolvimento, Inovação e Tecnologias Emergentes',
    'edu.esp.desc': 'Foco em tecnologias emergentes, inovação em desenvolvimento de software e metodologias ágeis.',
    'edu.grad.title': 'Bacharelado em Ciência da Computação',
    'edu.grad.desc': 'Formação sólida em fundamentos da computação, algoritmos, estruturas de dados e programação.',
    'edu.tec.title': 'Técnico em Informática para Internet',
    'edu.tec.desc': 'Formação técnica em desenvolvimento web, banco de dados e tecnologias para internet.',

    // Education sections in Portuguese
    'edu.educationSection': 'Educação',
    'edu.certificationsSection': 'Certificações',
    'edu.languagesSection': 'Idiomas',
    'edu.portuguese': 'Português',
    'edu.english': 'Inglês',
    'edu.native': 'Nativo',
    'edu.professional': 'Profissional',
  },
  
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.portfolio': 'Portfolio',
    
    // Hero Section
    'hero.title': 'Evandro Nascimento',
    'hero.subtitle': 'Software Developer • Tech Lead',
    'hero.description': 'With over <span class="font-semibold text-blue-600">8 years of experience</span> in software development, I lead teams in developing <span class="font-semibold text-purple-600">innovative and scalable solutions</span>.',
    'hero.contact': 'Get In Touch',
    'hero.learnMore': 'Learn More',
    'hero.location': 'Ipojuca, Pernambuco, Brazil',
    
    // About Section
    'about.title': 'About',
    'about.titleHighlight': 'Me',
    'about.description': 'Technical Leader passionate about technology, focused on <span class="font-semibold text_blue-600">software architecture</span> and developing <span class="font-semibold text-purple-600">innovative solutions</span>. Expert in leading teams and turning complex ideas into reality.',
    'about.yearsExperience': 'Years of Experience',
    'about.projectsCompleted': 'Projects Completed',
    'about.companies': 'Renowned Companies',
    'about.technologies': 'Technologies Mastered',
    'about.backend': 'Backend Development',
    'about.backendDesc': 'Expert in Java, Kotlin, C# and Spring Boot for robust and scalable systems',
    'about.frontend': 'Frontend Development',
    'about.frontendDesc': 'Development of modern and responsive interfaces focused on user experience',
    'about.cloud': 'Cloud & DevOps',
    'about.cloudDesc': 'Cloud solution architecture and deployment with CI/CD practices and containerization',
    'about.leadership': 'Technical Leadership',
    'about.leadershipDesc': 'Technical leadership focused on architecture, code quality and team growth',
    
    // Skills Section
    'skills.title': 'Technical',
    'skills.titleHighlight': 'Skills',
    'skills.description': 'Technologies and tools I master to deliver high-quality solutions',
    'skills.languages': 'Languages',
    'skills.backendFrameworks': 'Backend Frameworks',
    'skills.frontend': 'Frontend',
    'skills.databases': 'Databases',
    'skills.devopsCloud': 'DevOps & Cloud',
    'skills.methodologies': 'Methodologies',
    'skills.technologies': 'Technologies',
    'skills.experience': 'Years Experience',
    'skills.projects': 'Projects',
    'skills.companies': 'Companies',
    
    // Experience Section
    'experience.title': 'Professional',
    'experience.titleHighlight': 'Experience',
    'experience.present': 'Present',
    
    // Education Section
    'education.title': 'Education &',
    'education.titleHighlight': 'Certifications',
    'education.degree': 'Degree',
    'education.specialization': 'Specialization',
    'education.certification': 'Certification',
    
    // Contact Section
    'contact.title': 'Let\'s Talk?',
    'contact.description': 'I\'m always interested in new projects and collaboration opportunities.',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.connect': 'Connect with me',
    
    // Footer
    'footer.description': 'Developing innovative solutions and leading teams for over 8 years. Expert in software architecture and modern technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.builtWith': 'Built with ❤️ using Next.js & Tailwind CSS',
    
    // Projects Section
    'projects.title': 'Featured',
    'projects.titleHighlight': 'Projects',
    'projects.description': 'Some of the main projects developed throughout my career',

    // Experience descriptions in English
    'exp.boticario.desc': 'I work as a specialist in developing robust and scalable technological solutions, using a practical and versatile approach with cutting-edge technologies. Focused on microservices, I design and implement high-performance, resilient and sustainable systems, mainly using Kotlin and Java with frameworks like Spring Boot and WebFlux.',
    'exp.cesar1.desc': 'I led a development team using various technologies, including C#, Java, Dotnet Core 6, Entity Framework, Dapper, Oracle, Docker, Angular 9, PCF (Pivotal Cloud Foundry), Swagger, CI/CD and GITLAB. Responsible for architectural and DevOps decisions, ensuring the quality and security of developed products.',
    'exp.itau.desc': 'I worked on an investment product, gaining valuable knowledge with C#, Dotnet Core, Docker and AWS services like DynamoDB, CloudFront, API Gateway, ECS Fargate, S3 Bucket, Lambda, SQS and SNS. Implemented CI/CD pipelines with AWS Code Pipeline.',
    'exp.cesar2.desc': 'Software development and technical leadership using C#, Dotnet Core 3.1, Entity Framework, Dapper, Docker, Angular 9, PCF (Pivotal Cloud Foundry), Teradata, MongoDB, Swagger, CI/CD, GITLAB, unit testing and code quality tools.',
    'exp.cast.desc': 'Software development for the BACEN (Central Bank of Recife) contract. Technologies used: Java 8, Linux, Docker, Spring Boot, Spring Security, Angular 7, WebSphere, ICP (IBM Cloud Private), DB2 database and H2 for testing.',

    // Education descriptions in English
    'edu.pos.title': 'Postgraduate in Software Architecture',
    'edu.pos.desc': 'Specialization in software architecture, design patterns and development best practices.',
    'edu.esp.title': 'Specialization in Development, Innovation and Emerging Technologies',
    'edu.esp.desc': 'Focus on emerging technologies, innovation in software development and agile methodologies.',
    'edu.grad.title': 'Bachelor in Computer Science',
    'edu.grad.desc': 'Solid foundation in computing fundamentals, algorithms, data structures and programming.',
    'edu.tec.title': 'Technician in Internet Computing',
    'edu.tec.desc': 'Technical training in web development, databases and internet technologies.',

    // Education sections in English
    'edu.educationSection': 'Education',
    'edu.certificationsSection': 'Certifications',
    'edu.languagesSection': 'Languages',
    'edu.portuguese': 'Portuguese',
    'edu.english': 'English',
    'edu.native': 'Native',
    'edu.professional': 'Professional',
  }
};
