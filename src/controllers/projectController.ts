import { Request, Response, NextFunction } from 'express';
import { ProjectStructure, createProjectStructureFromJson, 
} from '../services/projectService';
import { generateJsonFromPrompt } from '../services/gptService';


export async function generateJsonAndReturnZip(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("generateJsonAndReturnZip starting..")
    const prompt = req.body.prompt;
    console.log("prompt: ", prompt)
    if (!prompt) {
      res.status(400).json({ error: 'No prompt found in the request.' });
      return;
    }

    const generatedJson = await generateJsonFromPrompt(prompt);
    console.log("Generated JSON: ", JSON.stringify(generatedJson, null, 2))
    const zipBuffer = await createProjectStructureFromJson(generatedJson);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=project.zip');
    res.send(zipBuffer);
  } catch (error) {
    next(error);
  }
}

export async function createProjectFromPrompt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const prompt  = req.query.prompt as string;
  console.log
      if (!prompt) {
        res.status(400).json({ error: 'No prompt provided in the request.' });
        return;
      }
  
      const generatedJson = await generateJsonFromPrompt(prompt);
      const zipBuffer = await createProjectStructureFromJson(generatedJson);
  
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=project.zip');
      res.send(zipBuffer);
    } catch (error) {
      next(error);
    }
  }
