import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumePath = path.join(
  __dirname,
  "../data/resume/AnshikaGupta_Resume.pdf"
);

let cachedResumeText: string | null = null;

export async function getResumeText(): Promise<string> {

  if (cachedResumeText !== null) {
    return cachedResumeText;
  }

  console.log("Resume path:", resumePath);

  if (!fs.existsSync(resumePath)) {
    throw new Error(
      `Resume not found at: ${resumePath}`
    );
  }

  const buffer = fs.readFileSync(resumePath);

  const parser = new PDFParse({
    data: buffer
  });

  try {

    const result = await parser.getText();

    cachedResumeText =
      result.text
        .replace(/\s+/g, " ")
        .trim();

    console.log(
      `Resume loaded successfully: ${cachedResumeText.length} characters`
    );

    return cachedResumeText;

  } finally {

    await parser.destroy();

  }
}