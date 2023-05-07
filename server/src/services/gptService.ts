import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateJsonFromPrompt(prompt: string): Promise<string> {
  console.log("generateYamlFromPrompt starting..")
  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create a JSON object representing a typical node js project file structure based on the following description: ${prompt}. The output should be a structured JSON object with folder names as keys and their values being either an empty string (for files) or a nested JSON object (for folders). 
    `,
    max_tokens: 2000,
    n: 1, 
    stop: null,
    temperature: 0.8,
  });
  

  if(!result.data.choices[0].text) throw new Error("No JSON generated");
  const generatedJson = result.data.choices[0].text.trim();
  return generatedJson;
}
