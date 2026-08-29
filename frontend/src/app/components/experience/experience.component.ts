import { Component } from '@angular/core';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  experiences: Experience[] = [

    {
      role: 'Software Engineer',
      company: 'Newgen Software Technologies Limited',
      period: 'July 2024 – Present',
      description:
        'Working as a Software Engineer, developing and maintaining software solutions using .NET technologies, APIs, databases and modern web technologies.',
      technologies: [
        'C#',
        '.NET',
        'ASP.NET',
        'Web API',
        'SQL Server'
      ]
    },

    {
      role: 'Software Engineer Trainee',
      company: 'Newgen Software Technologies Limited',
      period: 'January 2024 – June 2024',
      description:
        'Worked as a Software Engineer Trainee and gained hands-on experience in software development, .NET technologies, web applications and databases.',
      technologies: [
        'C#',
        '.NET',
        'ASP.NET',
        'SQL Server',
        'JavaScript'
      ]
    }

  ];

}