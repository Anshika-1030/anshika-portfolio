import { ChatOllama } from "@langchain/ollama";

import { getResumeText } from "./resume-parser.service.js";


const model = new ChatOllama({

  model: "llama3.2:1b",

  temperature: 0.1,

  baseUrl: "http://localhost:11434",

  numPredict: 120

});


function findRelevantSections(
  resume: string,
  question: string
): string {

  const words = question
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);

  const lines = resume.split("\n");

  const relevantLines: string[] = [];

  for (const line of lines) {

    const lowerLine = line.toLowerCase();

    const matches = words.some(
      word => lowerLine.includes(word)
    );

    if (matches) {
      relevantLines.push(line);
    }
  }

  if (relevantLines.length === 0) {
    return resume;
  }

  return relevantLines
    .slice(0, 80)
    .join("\n");
}


export async function askPortfolioAI(
  question: string
): Promise<string> {

  const resume = await getResumeText();

  const context = findRelevantSections(
    resume,
    question
  );

  const prompt = `
You are the AI assistant for the professional portfolio.

Answer ONLY using the resume information provided below.

IMPORTANT RULES:

1. Never invent information.
2. Never guess missing information.
3. If the answer is not in the resume, say:
"I don't have that information in the resume."
4. Keep the answer professional and concise.
5. Answer directly.
6. Do not mention that you are an AI model unless asked.

RESUME INFORMATION:

${context}

VISITOR QUESTION:

${question}

ANSWER:
`;

  const response = await model.invoke(prompt);

  return response.content.toString().trim();
}