import { createApp } from './app';

function startServer(app: any) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

const app = createApp();
startServer(app);
