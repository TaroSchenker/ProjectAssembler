import express, { Express } from 'express';
import { getExampleData } from '../controllers';
import { 
  // uploadYamlAndReturnZip, 
  createProjectFromPrompt, generateJsonAndReturnZip } from '../controllers/generateJsonController';
import multer from 'multer';





export function createRoutes(app: Express) {
  console.log('Creating routes...');
  const upload = multer({ storage: multer.memoryStorage() });
  const router = express.Router();
  router.post('/api/generate', generateJsonAndReturnZip); // Change this line

  // Attach the router to the app
  app.use('/api', router);
}
