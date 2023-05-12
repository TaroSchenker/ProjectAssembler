import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateJsonFromChatGPT4(prompt: string): Promise<string> {
  console.log("chat gpt 4 generation starting..");
const promptTemplate = `Given the following project description, create a JSON object representing a well-structured file hierarchy for the project. The output should be a structured JSON object with folder names as keys and their values being either an empty string or the relevant / boilerplate code for the file  (for files),or a nested JSON object (for folders). 

Project description: ${prompt}

Please consider any relevant programming languages, libraries, frameworks, and best practices when generating the file structure.`;
  const result = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "user", content: promptTemplate}],
  });

  if (!result.data.choices[0].message) throw new Error("No JSON generated");
  const generatedJson = result.data.choices[0].message.content.trim();
  return generatedJson;
}

