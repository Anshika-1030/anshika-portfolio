import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: Project[] = [

    {
      title: 'API-Rate-Limiting-Authentication-System',
      description:
        'A secure ASP.NET Core Web API project demonstrating JWT authentication, authorization, API rate limiting, and request protection. The system controls API access based on authenticated users and request limits, helping prevent API abuse while providing secure role-based access and a structured, scalable backend architecture.',
      technologies: [
        'ASP.NET Core',
        'SQL Server',
        'Redis',
      ],
      github:
        'https://github.com/Anshika-1030/API-Rate-Limiting-Authentication-System'
    },

    {
      title: 'Multi LLM Web Orchestrator',
      description:
        'A browser-based AI assistant that can work with multiple large language models through a Chrome extension interface.',
      technologies: [
        'TypeScript',
        'Chrome Extension',
        'JavaScript',
        'LLM'
      ],
      github:
        'https://github.com/Anshika-1030/Multi-LLM-Web-Orchestrator'
    },

    {
      title: 'youtube-clone-dotnet',
      description:
        'A full-stack YouTube-inspired video streaming platform built with C#, ASP.NET Core Web API, .NET, SQL Server, and modern frontend technologies. The application includes user authentication, video management, search, categories, and an interactive video-watching experience, demonstrating REST API development, database integration, and scalable backend architecture.',
      technologies: [
        'ASP.NET,',
        'JavaScript',
        'JWT',
        'SQL Server',
        'Redis'
      ],
      github:
        'https://github.com/Anshika-1030/youtube-clone-dotnet'
    }

  ];

  openGithub(url: string): void {
    window.open(url, '_blank');
  }

}