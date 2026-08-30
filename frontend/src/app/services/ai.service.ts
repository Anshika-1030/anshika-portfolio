import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { portfolioData } from '../../assets/data/portfolio-data';

export interface AIResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() {}

  ask(question: string): Observable<AIResponse> {

    const q = question
      .toLowerCase()
      .replace(/[^\w\s.#/+&-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();


    // =====================================================
    // PROJECTS
    // IMPORTANT:
    // This must come BEFORE "ABOUT ANSHIKA"
    // because "tell me about anshika projects"
    // contains "about anshika".
    // =====================================================

    if (
      q.includes('project') ||
      q.includes('projects') ||
      q.includes('portfolio project') ||
      q.includes('portfolio projects') ||
      q.includes('her project') ||
      q.includes('her projects') ||
      q.includes('anshika project') ||
      q.includes('anshika projects') ||
      q.includes('projects has anshika worked') ||
      q.includes('what projects has anshika worked on') ||
      q.includes('tell me about anshika projects') ||
      q.includes('tell me about her projects') ||
      q.includes('what projects did anshika') ||
      q.includes('what projects has she') ||
      q.includes('what has anshika built') ||
      q.includes('what has she built') ||
      q.includes('what has anshika developed') ||
      q.includes('what has she developed') ||
      q.includes('built by anshika') ||
      q.includes('developed by anshika')
    ) {

      if (
        portfolioData.projects &&
        portfolioData.projects.length > 0
      ) {

        return of({
          response:
            `Anshika has worked on the following projects:\n\n` +
            portfolioData.projects
              .map(project => {

                let result =
                  `• ${project.name}\n` +
                  `  ${project.description}`;

                if (
                  project.technologies &&
                  project.technologies.length > 0
                ) {
                  result +=
                    `\n  Technologies: ` +
                    project.technologies.join(', ');
                }

                return result;
              })
              .join('\n\n')
        });

      }

      return of({
        response:
          `Anshika's project information is not available in the portfolio data.`
      });
    }


    // =====================================================
    // ABOUT ANSHIKA
    // =====================================================

    if (
      q === 'anshika' ||
      q === 'who is anshika' ||
      q === 'who is anshika gupta' ||
      q === 'about anshika' ||
      q === 'tell me about anshika' ||
      q === 'tell me about anshika gupta' ||
      q === 'introduce anshika' ||
      q === 'introduce anshika gupta' ||
      q === 'who is she' ||
      q === 'tell me about her'
    ) {

      return of({
        response:
          `${portfolioData.name} is a ${portfolioData.role} at ` +
          `${portfolioData.company} with ${portfolioData.experience} ` +
          `of professional experience.`
      });
    }


    // =====================================================
    // COLLEGE
    // =====================================================

    if ( q === 'college' || 
        q === 'college name' || 
        q.includes('which college') || 
        q.includes('what college') || 
        q.includes('which college did anshika attend') || 
        q.includes('what college did anshika attend') || 
        q.includes('college did anshika attend') || 
        q.includes('college did she attend') || 
        q.includes('where did anshika study') || 
        q.includes('where did she study') || 
        q.includes('what is anshika college') || 
        q.includes('what is her college') ){

      if (portfolioData.education.college) {
        return of({
          response:
            `Anshika studied at ${portfolioData.education.college}.`
        });
      }

      return of({
        response:
          `Anshika's college information is not available in the portfolio data.`
      });
    }


    // =====================================================
    // UNIVERSITY
    // =====================================================

    if (
      q.includes('which university') ||
      q.includes('what university') ||
      q.includes('university did anshika attend') ||
      q.includes('university did she attend') ||
      q.includes('university name')
    ) {

      if (portfolioData.education.university) {
        return of({
          response:
            `Anshika studied at ${portfolioData.education.university}.`
        });
      }

      return of({
        response:
          `Anshika's university information is not available in the portfolio data.`
      });
    }


    // =====================================================
    // DEGREE
    // =====================================================

    if (
      q.includes('which degree') ||
      q.includes('what degree') ||
      q.includes('degree does anshika have') ||
      q.includes('what did anshika study') ||
      q.includes('what did she study') ||
      q.includes('qualification') ||
      q.includes('educational qualification')
    ) {

      if (portfolioData.education.degree) {
        return of({
          response:
            `Anshika completed ${portfolioData.education.degree}.`
        });
      }

      return of({
        response:
          `Anshika's degree information is not available in the portfolio data.`
      });
    }


    // =====================================================
    // COMPLETE EDUCATION
    // =====================================================

    if (
      q === 'education' ||
      q.includes('educational background') ||
      q.includes('academic background') ||
      q.includes('tell me about her education') ||
      q.includes('tell me about anshika education') ||
      q.includes('education details')
    ) {

      const education = portfolioData.education;

      const details: string[] = [];

      if (education.degree) {
        details.push(`Degree: ${education.degree}`);
      }

      if (education.college) {
        details.push(`College: ${education.college}`);
      }

      if (education.university) {
        details.push(`University: ${education.university}`);
      }

      if (education.graduationYear) {
        details.push(
          `Graduation Year: ${education.graduationYear}`
        );
      }

      if (details.length === 0) {
        return of({
          response:
            `Anshika's education information is not available in the portfolio data.`
        });
      }

      return of({
        response:
          `Anshika's education details are:\n\n` +
          details.join('\n')
      });
    }


    // =====================================================
    // PASSOUT / GRADUATION YEAR
    // =====================================================

    if (
      q.includes('passout') ||
      q.includes('pass out') ||
      q.includes('pass-out') ||
      q.includes('graduation year') ||
      q.includes('which year did she graduate') ||
      q.includes('when did she graduate') ||
      q.includes('when did anshika graduate') ||
      q.includes('college passout year') ||
      q.includes('graduated in which year') ||
      q.includes('college year')
    ) {

      if (portfolioData.education.graduationYear) {
        return of({
          response:
            `Anshika graduated in ${portfolioData.education.graduationYear}.`
        });
      }

      return of({
        response:
          `Anshika's graduation year is not available in the portfolio data.`
      });
    }


    // =====================================================
    // INTERNSHIP
    // =====================================================

    if (
      q.includes('internship') ||
      q.includes('intern') ||
      q.includes('interned') ||
      q.includes('internship experience') ||
      q.includes('did anshika do internship') ||
      q.includes('has she done internship')
    ) {

      if (portfolioData.internship.hasInternship) {

        let answer =
          'Yes. Anshika has internship experience';

        if (portfolioData.internship.company) {
          answer +=
            ` at ${portfolioData.internship.company}`;
        }

        if (portfolioData.internship.role) {
          answer +=
            ` as a ${portfolioData.internship.role}`;
        }

        if (portfolioData.internship.duration) {
          answer +=
            ` for ${portfolioData.internship.duration}`;
        }

        answer += '.';

        return of({
          response: answer
        });
      }

      return of({
        response:
          `Anshika's portfolio currently does not list any internship experience.`
      });
    }


    // =====================================================
    // FULL-TIME
    // =====================================================

    if (
      q.includes('full time') ||
      q.includes('full-time') ||
      q.includes('fulltime') ||
      q.includes('is anshika working full time') ||
      q.includes('is she working full time')
    ) {

      return of({
        response:
          `Yes. Anshika is working ${portfolioData.employment.type} ` +
          `as a ${portfolioData.employment.currentRole} at ` +
          `${portfolioData.employment.company}.`
      });
    }


    // =====================================================
    // CURRENT COMPANY
    // =====================================================

    if ( q === 'company' || 
        q === 'organization' || 
        q === 'organisation' || 
        q === 'company name' || 
        q === 'organization name' || 
        q === 'organisation name' || 
        q.includes('current company') || 
        q.includes('current organization') || 
        q.includes('current organisation') || 
        q.includes('which company does anshika work') || 
        q.includes('which company is anshika working') || 
        q.includes('which organization does anshika work') || 
        q.includes('which organisation does anshika work') || 
        q.includes('where does anshika work') || 
        q.includes('where is anshika working') || 
        q.includes('what company does anshika work for') || 
        q.includes('what organization does anshika work for') || 
        q.includes('what organisation does anshika work for') || 
        q.includes('what is anshika company') || 
        q.includes('what is anshika organization') || 
        q.includes('what is anshika organisation') || 
        q.includes('what is her company') || 
        q.includes('what is her organization') || 
        q.includes('what is her organisation') || 
        q.includes('company does she work') || 
        q.includes('organization does she work') || 
        q.includes('organisation does she work') ){

      return of({
        response:
          `Anshika currently works at ${portfolioData.company}.`
      });
    }


    // =====================================================
    // WORKING SINCE / JOINING YEAR
    // =====================================================

    if (
      q.includes('working since') ||
      q.includes('working from which year') ||
      q.includes('started working') ||
      q.includes('when did anshika start working') ||
      q.includes('when did she start working') ||
      q.includes('joining year') ||
      q.includes('when did anshika join') ||
      q.includes('when did she join') ||
      q.includes('since when')
    ) {

      return of({
        response:
          `Anshika has been working at ` +
          `${portfolioData.employment.company} since ` +
          `${portfolioData.employment.joiningDate}.`
      });
    }


    // =====================================================
    // PREVIOUS ROLE
    // =====================================================

    if (
      q.includes('previous role') ||
      q.includes('previous position') ||
      q.includes('earlier role') ||
      q.includes('first role') ||
      q.includes('what was her previous role') ||
      q.includes('what was anshika previous role')
    ) {

      return of({
        response:
          `Anshika started her career as a ` +
          `${portfolioData.employment.previousRole} at ` +
          `${portfolioData.employment.company} in ` +
          `${portfolioData.employment.previousRoleStartDate}.`
      });
    }


    // =====================================================
    // CURRENT ROLE
    // =====================================================

    if (
      q.includes('current role') ||
      q.includes('current position') ||
      q.includes('job title') ||
      q.includes('what is her role') ||
      q.includes('what role does anshika have') ||
      q.includes('what is anshika role') ||
      q.includes('designation')
    ) {

      return of({
        response:
          `Anshika is currently working as a ` +
          `${portfolioData.employment.currentRole} at ` +
          `${portfolioData.employment.company}.`
      });
    }


    // =====================================================
    // EXPERIENCE
    // =====================================================

    if (
      q.includes('how many years') ||
      q.includes('years of experience') ||
      q.includes('how much experience') ||
      q.includes('total experience') ||
      q.includes('experience does anshika have') ||
      q.includes('professional experience') ||
      q.includes('career experience') ||
      q === 'experience' ||
      q.includes('previous work') ||
      q.includes('previous works')
    ) {

      return of({
        response:
          `Anshika has ${portfolioData.experience} of ` +
          `professional experience at ${portfolioData.company}.`
      });
    }


    // =====================================================
    // EMAIL
    // =====================================================

    if (
      q.includes('email') ||
      q.includes('email id') ||
      q.includes('email address') ||
      q.includes('mail id') ||
      q.includes('contact email') ||
      q.includes('what is her email') ||
      q.includes('what is anshika email')
    ) {

      if (portfolioData.contact.email) {
        return of({
          response:
            `Anshika's email address is ` +
            `${portfolioData.contact.email}.`
        });
      }

      return of({
        response:
          `Anshika's email address is not available in the portfolio data.`
      });
    }


    // =====================================================
    // LINKEDIN
    // =====================================================

    if (
      q.includes('linkedin') ||
      q.includes('linkedin profile') ||
      q.includes('linkedin link') ||
      q.includes('linkedin profile link') ||
      q.includes('what is her linkedin') ||
      q.includes('give me her linkedin')
    ) {

      if (portfolioData.contact.linkedin) {
        return of({
          response:
            `Anshika's LinkedIn profile is ` +
            `${portfolioData.contact.linkedin}`
        });
      }

      return of({
        response:
          `Anshika's LinkedIn profile link is not available in the portfolio data.`
      });
    }


    // =====================================================
    // GITHUB
    // =====================================================

    if (
      q.includes('github') ||
      q.includes('github profile') ||
      q.includes('github link') ||
      q.includes('github profile link') ||
      q.includes('what is her github') ||
      q.includes('give me her github')
    ) {

      if (portfolioData.contact.github) {
        return of({
          response:
            `Anshika's GitHub profile is ` +
            `${portfolioData.contact.github}`
        });
      }

      return of({
        response:
          `Anshika's GitHub profile link is not available in the portfolio data.`
      });
    }


    // =====================================================
    // ALL TECHNOLOGIES / SKILLS
    // =====================================================

    if (
      q.includes('what technologies') ||
      q.includes('which technologies') ||
      q.includes('what technology') ||
      q.includes('which technology') ||
      q.includes('what tech') ||
      q.includes('which tech') ||
      q.includes('tech stack') ||
      q.includes('technology stack') ||
      q.includes('what skills') ||
      q.includes('which skills') ||
      q.includes('technical skills') ||
      q.includes('what does she work with') ||
      q.includes('what has she worked with') ||
      q.includes('what technologies has she worked with') ||
      q.includes('technologies has anshika') ||
      q.includes('technologies does anshika') ||
      q.includes('skills does anshika') ||
      q.includes('skills has anshika')
    ) {

      return of({
        response:
          `Anshika has worked with the following technologies and tools:\n\n` +
          portfolioData.technologies
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // BACKEND
    // =====================================================

    if (
      q.includes('backend') ||
      q.includes('back end') ||
      q.includes('server side')
    ) {

      return of({
        response:
          `Anshika's backend technologies include:\n\n` +
          portfolioData.backend
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // FRONTEND
    // =====================================================

    if (
      q.includes('frontend') ||
      q.includes('front end') ||
      q.includes('client side')
    ) {

      return of({
        response:
          `Anshika's frontend technologies include:\n\n` +
          portfolioData.frontend
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // DATABASE
    // =====================================================

    if (
      q.includes('database') ||
      q.includes('databases') ||
      q.includes('sql server') ||
      q === 'sql'
    ) {

      return of({
        response:
          `Anshika has worked with the following database technologies:\n\n` +
          portfolioData.databases
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // CLOUD
    // =====================================================

    if (
      q.includes('cloud') ||
      q.includes('cloud technology') ||
      q.includes('cloud technologies') ||
      q.includes('infrastructure')
    ) {

      return of({
        response:
          `Anshika has experience with the following cloud and ` +
          `infrastructure technologies:\n\n` +
          portfolioData.cloud
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // AI
    // =====================================================

    if (
      q.includes('artificial intelligence') ||
      q.includes('ai technologies') ||
      q.includes('ai tools') ||
      q.includes('llm') ||
      q.includes('ollama') ||
      q.includes('claude') ||
      q.includes('copilot')
    ) {

      return of({
        response:
          `Anshika has worked with the following AI-related technologies:\n\n` +
          portfolioData.ai
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // =====================================================
    // INDIVIDUAL TECHNOLOGY
    // =====================================================

    const technologyAliases: Record<string, string[]> = {

      '.NET': [
        '.net',
        'dot net',
        'dotnet'
      ],

      'C#': [
        'c#',
        'c sharp',
        'csharp'
      ],

      'ASP.NET': [
        'asp.net',
        'asp net',
        'aspnet'
      ],

      'ASP.NET Core': [
        'asp.net core',
        'asp net core'
      ],

      'Web API': [
        'web api',
        'webapi'
      ],

      'REST API': [
        'rest api',
        'restful api',
        'restful services'
      ],

      'MVC': [
        'mvc',
        'asp.net mvc'
      ],

      'Angular': [
        'angular'
      ],

      'TypeScript': [
        'typescript',
        'type script'
      ],

      'JavaScript': [
        'javascript',
        'java script'
      ],

      'HTML': [
        'html'
      ],

      'CSS': [
        'css'
      ],

      'Bootstrap': [
        'bootstrap'
      ],

      'jQuery': [
        'jquery'
      ],

      'AJAX': [
        'ajax'
      ],

      'SQL Server': [
        'sql server',
        'sqlserver'
      ],

      'Entity Framework': [
        'entity framework',
        'entityframework'
      ],

      'Azure': [
        'azure',
        'microsoft azure'
      ],

      'AWS': [
        'aws',
        'amazon web services'
      ],

      'Docker': [
        'docker'
      ],

      'Git': [
        'git'
      ],

      'GitHub': [
        'github',
        'git hub'
      ],

      'CI/CD': [
        'ci cd',
        'ci/cd',
        'continuous integration',
        'continuous deployment'
      ],

      'Microservices': [
        'microservices',
        'microservice'
      ],

      'Agile': [
        'agile'
      ],

      'Claude': [
        'claude'
      ],

      'GitHub Copilot': [
        'github copilot',
        'copilot'
      ],

      'LLM': [
        'llm',
        'large language model'
      ],

      'Ollama': [
        'ollama'
      ],

      'AI': [
        'ai',
        'artificial intelligence'
      ]
    };


    for (
      const [technology, aliases]
      of Object.entries(technologyAliases)
    ) {

      const found = aliases.some(alias =>
        q.includes(alias.toLowerCase())
      );

      if (found) {

        const technologyExists =
          portfolioData.technologies.some(
            item =>
              item.toLowerCase() ===
              technology.toLowerCase()
          );

        if (technologyExists) {

          return of({
            response:
              `Yes. Anshika has experience with ${technology}.`
          });
        }
      }
    }


    // =====================================================
    // DEFAULT
    // =====================================================

    return of({
      response:
        `I can answer questions about Anshika's ` +
        `education, experience, company, role, employment, ` +
        `internship, technologies, skills, backend, frontend, ` +
        `databases, cloud, AI, projects, email, LinkedIn and GitHub.`
    });
  }
}
