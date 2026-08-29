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


    // ============================================
    // ABOUT ANSHIKA
    // ============================================

    if (
      q.includes('who is anshika') ||
      q.includes('about anshika') ||
      q.includes('tell me about anshika') ||
      q.includes('introduce anshika')
    ) {
      return of({
        response:
          `${portfolioData.name} is a ${portfolioData.role} at ` +
          `${portfolioData.company} with ${portfolioData.experience} ` +
          `of professional experience.`
      });
    }


    // ============================================
    // EXPERIENCE
    // ============================================

    if (
      q.includes('experience') ||
      q.includes('how many years') ||
      q.includes('years of experience') ||
      q.includes('professional experience') ||
      q.includes('career')
    ) {
      return of({
        response:
          `Anshika has ${portfolioData.experience} of professional ` +
          `experience at ${portfolioData.company}.`
      });
    }


    // ============================================
    // COMPANY
    // ============================================

    if (
      q.includes('company') ||
      q.includes('where does anshika work') ||
      q.includes('where does she work') ||
      q.includes('where has she worked')
    ) {
      return of({
        response:
          `Anshika currently works as a ${portfolioData.role} ` +
          `at ${portfolioData.company}.`
      });
    }


    // ============================================
    // ROLE
    // ============================================

    if (
      q.includes('role') ||
      q.includes('position') ||
      q.includes('job title') ||
      q.includes('designation')
    ) {
      return of({
        response:
          `Anshika is currently working as a ${portfolioData.role} ` +
          `at ${portfolioData.company}.`
      });
    }


    // ============================================
    // ALL TECHNOLOGIES / SKILLS
    // ============================================

    if (
      q.includes('technology') ||
      q.includes('technologies') ||
      q.includes('tech stack') ||
      q.includes('technical skills') ||
      q.includes('skills') ||
      q.includes('what tech') ||
      q.includes('which tech') ||
      q.includes('what does she work with') ||
      q.includes('what has she worked with')
    ) {
      return of({
        response:
          "Anshika has worked with the following technologies and tools:\n\n" +
          portfolioData.technologies
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // BACKEND
    // ============================================

    if (
      q.includes('backend') ||
      q.includes('back end') ||
      q.includes('server side')
    ) {
      return of({
        response:
          "Anshika's backend technologies include:\n\n" +
          portfolioData.backend
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // FRONTEND
    // ============================================

    if (
      q.includes('frontend') ||
      q.includes('front end') ||
      q.includes('client side')
    ) {
      return of({
        response:
          "Anshika's frontend technologies include:\n\n" +
          portfolioData.frontend
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // DATABASE
    // ============================================

    if (
      q.includes('database') ||
      q.includes('databases') ||
      q.includes('sql')
    ) {
      return of({
        response:
          "Anshika has worked with the following database technologies:\n\n" +
          portfolioData.databases
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // CLOUD
    // ============================================

    if (
      q.includes('cloud') ||
      q.includes('infrastructure')
    ) {
      return of({
        response:
          "Anshika has experience with:\n\n" +
          portfolioData.cloud
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // AI
    // ============================================

    if (
      q.includes('ai') ||
      q.includes('artificial intelligence') ||
      q.includes('llm') ||
      q.includes('machine learning')
    ) {
      return of({
        response:
          "Anshika has worked with AI-related technologies including:\n\n" +
          portfolioData.ai
            .map(x => `• ${x}`)
            .join('\n')
      });
    }


    // ============================================
    // PROJECTS
    // ============================================

    if (
      q.includes('project') ||
      q.includes('projects') ||
      q.includes('built') ||
      q.includes('developed')
    ) {
      return of({
        response:
          "Anshika has worked on projects including:\n\n" +
          portfolioData.projects
            .map(
              project =>
                `• ${project.name}\n  ${project.description}`
            )
            .join('\n\n')
      });
    }


    // ============================================
    // INDIVIDUAL TECHNOLOGY
    // ============================================

    const technologyAliases: Record<string, string[]> = {

      ".NET": [
        ".net",
        "dot net",
        "dotnet"
      ],

      "C#": [
        "c#",
        "c sharp",
        "csharp"
      ],

      "ASP.NET": [
        "asp.net",
        "asp net",
        "aspnet"
      ],

      "ASP.NET Core": [
        "asp.net core",
        "asp net core"
      ],

      "Web API": [
        "web api",
        "webapi"
      ],

      "REST API": [
        "rest api",
        "restful api",
        "restful services"
      ],

      "Angular": [
        "angular"
      ],

      "TypeScript": [
        "typescript",
        "type script"
      ],

      "JavaScript": [
        "javascript",
        "java script"
      ],

      "SQL Server": [
        "sql server",
        "sqlserver"
      ],

      "Entity Framework": [
        "entity framework",
        "entityframework"
      ],

      "Azure": [
        "azure",
        "microsoft azure"
      ],

      "Docker": [
        "docker"
      ],

      "GitHub": [
        "github",
        "git hub"
      ]
    };


    for (const [technology, aliases] of Object.entries(
      technologyAliases
    )) {

      const found = aliases.some(alias =>
        q.includes(alias)
      );

      if (found) {
        return of({
          response:
            `Yes. Anshika has experience with ${technology}.`
        });
      }
    }


    // ============================================
    // DEFAULT
    // ============================================

    return of({
      response:
        "I can answer questions about Anshika's experience, " +
        "skills, technologies, backend, frontend, databases, " +
        "cloud, AI, projects, role and company."
    });
  }
}