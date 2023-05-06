import { Request, Response, NextFunction } from 'express';
import { generateYamlFromPrompt } from '../services/gptService';
import { createProjectStructureFromYaml } from '../services/projectService';

export async function generateYamlAndReturnZip(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("generateYamlAndReturnZip starting..")
    const prompt = req.body.prompt;
console.log("prompt: ", prompt)
    if (!prompt) {
      res.status(400).json({ error: 'No prompt found in the request.' });
      return;
    }

    const generatedYaml = await generateYamlFromPrompt(prompt);
    console.log("Generated YAML: ", generatedYaml)
    const zipBuffer = await createProjectStructureFromYaml(generatedYaml);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=project.zip');
    res.send(zipBuffer);
  } catch (error) {
    next(error);
  }
}
