require('dotenv').config()
import express from 'express';
import cors from 'cors';  
import { generateJsonAndReturnZip } from './controllers/generateJsonController';

const app = express();
app.use(cors())
app.use(express.json());

app.post('/api/generate', generateJsonAndReturnZip);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
