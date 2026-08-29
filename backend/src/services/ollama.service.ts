import { ChatOllama } from "@langchain/ollama";
import { getResumeText } from "./resume-parser.service.js";

const model = new ChatOllama({
  model: "llama3.2:1b",
  temperature: 0,
  baseUrl: "http://localhost:11434"
});


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s.#/+&-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/* =========================================================
   TECHNOLOGY / SKILL DEFINITIONS
========================================================= */

const technologies: Record<string, string[]> = {

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

  "MVC": [
    "mvc",
    "asp.net mvc"
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

  "HTML": [
    "html"
  ],

  "CSS": [
    "css"
  ],

  "Bootstrap": [
    "bootstrap"
  ],

  "jQuery": [
    "jquery",
    "jquery"
  ],

  "AJAX": [
    "ajax"
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

  "AWS": [
    "aws",
    "amazon web services"
  ],

  "Docker": [
    "docker"
  ],

  "Git": [
    "git"
  ],

  "GitHub": [
    "github",
    "git hub"
  ],

  "CI/CD": [
    "ci cd",
    "ci/cd",
    "continuous integration",
    "continuous deployment"
  ],

  "Microservices": [
    "microservices",
    "microservice"
  ],

  "Agile": [
    "agile"
  ],

  "Claude": [
    "claude"
  ],

  "GitHub Copilot": [
    "copilot",
    "github copilot"
  ],

  "LLM": [
    "llm",
    "large language model"
  ],

  "Ollama": [
    "ollama"
  ]

};


/* =========================================================
   FIND TECHNOLOGIES ACTUALLY PRESENT IN RESUME
========================================================= */

function getTechnologiesFromResume(
  resume: string
): string[] {

  const normalizedResume = normalize(resume);

  const found: string[] = [];

  for (const [technology, aliases] of Object.entries(technologies)) {

    const exists = aliases.some(
      alias =>
        normalizedResume.includes(
          normalize(alias)
        )
    );

    if (exists) {
      found.push(technology);
    }
  }

  return found;
}


/* =========================================================
   TECHNOLOGY / SKILL LIST QUESTIONS
========================================================= */

function getTechnologyListResponse(
  question: string,
  resume: string
): string | null {

  const q = normalize(question);

  const isListQuestion =
    q.includes("what technologies") ||
    q.includes("which technologies") ||
    q.includes("what technology") ||
    q.includes("which technology") ||
    q.includes("what tech") ||
    q.includes("which tech") ||
    q.includes("tech stack") ||
    q.includes("technology stack") ||
    q.includes("what skills") ||
    q.includes("which skills") ||
    q.includes("what technical skills") ||
    q.includes("technical skills") ||
    q.includes("technologies has anshika") ||
    q.includes("skills does anshika") ||
    q.includes("technologies does anshika") ||
    q.includes("what does anshika work with") ||
    q.includes("what has anshika worked on") ||
    q.includes("technologies she worked") ||
    q.includes("technology she worked") ||
    q.includes("skills she worked");


  if (!isListQuestion) {
    return null;
  }


  const foundTechnologies =
    getTechnologiesFromResume(resume);


  if (foundTechnologies.length === 0) {
    return "I don't have Anshika's technical skills information in her resume.";
  }


  return (
    "Anshika has worked with the following technologies and tools:\n\n" +
    foundTechnologies
      .map(technology => `• ${technology}`)
      .join("\n")
  );
}


/* =========================================================
   TECHNOLOGY CATEGORY QUESTIONS
========================================================= */

function getTechnologyCategoryResponse(
  question: string,
  resume: string
): string | null {

  const q = normalize(question);

  const found =
    getTechnologiesFromResume(resume);


  /* BACKEND */

  if (
    q.includes("backend") ||
    q.includes("back end") ||
    q.includes("server side")
  ) {

    const backend = found.filter(tech =>
      [
        ".NET",
        "C#",
        "ASP.NET",
        "ASP.NET Core",
        "Web API",
        "REST API",
        "MVC",
        "Entity Framework",
        "SQL Server"
      ].includes(tech)
    );

    if (backend.length > 0) {
      return (
        "Anshika has worked with the following backend technologies:\n\n" +
        backend
          .map(x => `• ${x}`)
          .join("\n")
      );
    }
  }


  /* FRONTEND */

  if (
    q.includes("frontend") ||
    q.includes("front end") ||
    q.includes("client side")
  ) {

    const frontend = found.filter(tech =>
      [
        "Angular",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Bootstrap",
        "jQuery",
        "AJAX"
      ].includes(tech)
    );

    if (frontend.length > 0) {
      return (
        "Anshika has worked with the following frontend technologies:\n\n" +
        frontend
          .map(x => `• ${x}`)
          .join("\n")
      );
    }
  }


  /* DATABASE */

  if (
    q.includes("database") ||
    q.includes("databases")
  ) {

    const databases = found.filter(tech =>
      [
        "SQL Server",
        "Entity Framework"
      ].includes(tech)
    );

    if (databases.length > 0) {
      return (
        "Anshika has worked with the following database technologies:\n\n" +
        databases
          .map(x => `• ${x}`)
          .join("\n")
      );
    }
  }


  /* CLOUD */

  if (
    q.includes("cloud") ||
    q.includes("cloud technologies")
  ) {

    const cloud = found.filter(tech =>
      [
        "Azure",
        "AWS",
        "Docker"
      ].includes(tech)
    );

    if (cloud.length > 0) {
      return (
        "Anshika has experience with the following cloud and infrastructure technologies:\n\n" +
        cloud
          .map(x => `• ${x}`)
          .join("\n")
      );
    }
  }


  /* AI */

  if (
    q.includes("ai") ||
    q.includes("artificial intelligence") ||
    q.includes("llm") ||
    q.includes("ai technologies")
  ) {

    const ai = found.filter(tech =>
      [
        "LLM",
        "Ollama",
        "Claude",
        "GitHub Copilot"
      ].includes(tech)
    );

    if (ai.length > 0) {
      return (
        "Anshika has worked with the following AI-related technologies:\n\n" +
        ai
          .map(x => `• ${x}`)
          .join("\n")
      );
    }
  }


  return null;
}


/* =========================================================
   INDIVIDUAL TECHNOLOGY QUESTIONS
========================================================= */

function getKeywordResponse(
  question: string,
  resume: string
): string | null {

  const q = normalize(question);
  const r = normalize(resume);


  for (
    const [technology, aliases]
    of Object.entries(technologies)
  ) {

    const questionContainsKeyword =
      aliases.some(alias =>
        q.includes(normalize(alias))
      );


    if (!questionContainsKeyword) {
      continue;
    }


    const resumeContainsKeyword =
      aliases.some(alias =>
        r.includes(normalize(alias))
      );


    if (!resumeContainsKeyword) {
      continue;
    }


    if (
      q.includes("does") ||
      q.includes("has") ||
      q.includes("have") ||
      q.includes("experience") ||
      q.includes("worked") ||
      q.includes("know") ||
      q.includes("use") ||
      q.includes("used")
    ) {

      return `Yes. Anshika has experience with ${technology}.`;
    }


    return `Anshika has experience with ${technology}.`;
  }


  return null;
}


/* =========================================================
   EXPERIENCE / COMPANY / ROLE / LOCATION
========================================================= */

function getExperienceResponse(
  question: string,
  resume: string
): string | null {

  const q = normalize(question);
  const r = normalize(resume);


  /* TOTAL EXPERIENCE */

  if (
    q.includes("how many years") ||
    q.includes("years of experience") ||
    q.includes("how much experience") ||
    q.includes("total experience") ||
    q.includes("experience does anshika have") ||
    q.includes("how long has anshika")
  ) {

    if (
      r.includes("almost 3 years") ||
      r.includes("3 years")
    ) {
      return "Anshika has almost 3 years of professional experience.";
    }
  }


  /* COMPANIES */

  if (
    q.includes("which companies") ||
    q.includes("what companies") ||
    q.includes("companies has anshika") ||
    q.includes("where has anshika worked") ||
    q.includes("where did anshika work") ||
    q.includes("work in which companies") ||
    q.includes("worked at which companies")
  ) {

    if (
      r.includes("newgen software")
    ) {

      return (
        "Anshika has worked at Newgen Software Technologies Limited."
      );
    }
  }


  /* COMPANY DURATION */

  if (
    q.includes("how many years in") ||
    q.includes("how long in") ||
    q.includes("duration in") ||
    q.includes("years at newgen") ||
    q.includes("how long at newgen")
  ) {

    if (
      r.includes("january 2024") &&
      r.includes("june 2024") &&
      r.includes("july 2024") &&
      r.includes("present")
    ) {

      return (
        "Anshika has been with Newgen Software Technologies Limited " +
        "since January 2024, for almost 3 years. She started as a " +
        "Software Engineer Trainee and became a Software Engineer in July 2024."
      );
    }
  }


  /* CURRENT ROLE */

  if (
    q.includes("current role") ||
    q.includes("current position") ||
    q.includes("working on which role") ||
    q.includes("which role") ||
    q.includes("what is her role") ||
    q.includes("what role does anshika") ||
    q.includes("job title") ||
    q.includes("position")
  ) {

    if (r.includes("software engineer")) {

      return (
        "Anshika is currently working as a Software Engineer " +
        "at Newgen Software Technologies Limited."
      );
    }
  }


  /* WORK EXPERIENCE */

  if (
    q.includes("work experience") ||
    q.includes("professional experience") ||
    q.includes("career")
  ) {

    if (r.includes("newgen software")) {

      return (
        "Anshika has almost 3 years of professional experience at " +
        "Newgen Software Technologies Limited. She joined as a " +
        "Software Engineer Trainee in January 2024 and has been working " +
        "as a Software Engineer since July 2024."
      );
    }
  }


  return null;
}


/* =========================================================
   MAIN AI FUNCTION
========================================================= */

export async function askPortfolioAI(
  question: string
): Promise<string> {

  const resume = await getResumeText();


  /*
   * 1. EXPERIENCE / COMPANY / ROLE
   */

  const experienceAnswer =
    getExperienceResponse(
      question,
      resume
    );

  if (experienceAnswer !== null) {
    return experienceAnswer;
  }


  /*
   * 2. TECHNOLOGY LIST
   */

  const technologyListAnswer =
    getTechnologyListResponse(
      question,
      resume
    );

  if (technologyListAnswer !== null) {
    return technologyListAnswer;
  }


  /*
   * 3. TECHNOLOGY CATEGORY
   */

  const categoryAnswer =
    getTechnologyCategoryResponse(
      question,
      resume
    );

  if (categoryAnswer !== null) {
    return categoryAnswer;
  }


  /*
   * 4. INDIVIDUAL TECHNOLOGY
   */

  const keywordAnswer =
    getKeywordResponse(
      question,
      resume
    );

  if (keywordAnswer !== null) {
    return keywordAnswer;
  }


  /*
   * 5. OLLAMA
   */

  const prompt = `
You are Anshika's professional portfolio AI assistant.

Answer ONLY using information contained in Anshika's resume.

IMPORTANT RULES:

- Never invent information.
- Never guess.
- Always refer to the person as Anshika.
- Keep answers concise and professional.
- For yes/no questions, answer YES or NO first.
- If information is not present in the resume, say:
"I don't have that information in Anshika's resume."

Technology aliases should be understood:

dot net = .NET
dotnet = .NET
c sharp = C#
csharp = C#
asp net = ASP.NET
aspnet = ASP.NET
webapi = Web API
type script = TypeScript
java script = JavaScript
sqlserver = SQL Server
microsoft azure = Azure
restful api = REST API
ci cd = CI/CD
github = GitHub
github copilot = GitHub Copilot

If the visitor asks about Anshika's:
- technologies
- technical skills
- experience
- companies
- roles
- projects
- databases
- frontend
- backend
- cloud
- AI

use the resume information.

RESUME:

${resume}

VISITOR QUESTION:

${question}

ANSWER:
`;


  const response =
    await model.invoke(prompt);


  return response.content
    .toString()
    .trim();
}