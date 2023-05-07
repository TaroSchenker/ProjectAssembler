import express, { Express } from 'express';
import { createRoutes } from './routes';
import { loadConfig } from './config';
import { logger } from './middlewares';

export function createApp(): Express {
  const app = express();
  
  // Load configuration
  const config = loadConfig();
  
  // Middlewares
  app.use(express.json());
  app.use(logger);
  
  // Routes
  createRoutes(app);
  
  // Error handling middleware (optional)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send({ error: err.message });
  });
  
  return app;
}
