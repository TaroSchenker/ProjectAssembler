import { Request, Response, NextFunction } from 'express';
import { createProjectStructureFromYaml } from '../services/projectService';

export async function uploadYamlAndReturnZip(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file || !req.file.buffer) {
      res.status(400).json({ error: 'No file or buffer found in the request.' });
      return;
    }

    const yamlContent = req.file.buffer.toString();
    const zipBuffer = await createProjectStructureFromYaml(yamlContent);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=project.zip');
    res.send(zipBuffer);
  } catch (error) {
    next(error);
  }
}
