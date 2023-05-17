import express, { Express } from 'express';
import { generateJsonAndReturnZip } from '../controllers/generateJsonController';

export function createRoutes(app: Express) {
  console.log('Creating routes...');
  const router = express.Router();
  router.post('/api/generate', generateJsonAndReturnZip); 

  // Attach the router to the app
  app.use('/api', router);
}
