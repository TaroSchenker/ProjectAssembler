import express, { Express } from 'express';
import { getExampleData } from '../controllers';
import { 
  // uploadYamlAndReturnZip, 
  createProjectFromPrompt, generateJsonAndReturnZip } from '../controllers/projectController';
import multer from 'multer';





export function createRoutes(app: Express) {
  console.log('Creating routes...');
  const upload = multer({ storage: multer.memoryStorage() });
  const router = express.Router();
  // router.post('/project', upload.single('yamlFile'), uploadYamlAndReturnZip);

  // Example route
  router.get('/example', getExampleData);
  router.post('/api/generate', generateJsonAndReturnZip); // Change this line

  // Add more routes as needed

  // Attach the router to the app
  app.use('/api', router);
}
