import { Request, Response, NextFunction } from 'express';


export async function generateYamlAndReturnZip(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("generateYamlAndReturnZip starting..")
    const prompt = req.body.prompt;
console.log("prompt: ", prompt)
    if (!prompt) {
      res.status(400).json({ error: 'No prompt found in the request.' });
      return;
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=project.zip');
    res.send("zipBuffer");
  } catch (error) {
    next(error);
  }
}
