require('dotenv').config()
import express from 'express';
import multer from 'multer';
import cors from 'cors';  
import { generateJsonAndReturnZip } from './controllers/generateJsonController';
import { generateYamlAndReturnZip } from './controllers/gptController';

const app = express();
;
const upload = multer();
app.use(cors())
app.use(express.json());

// Existing route for uploading a YAML file and returning a zip
app.post('/api/project', upload.single('yaml'), generateJsonAndReturnZip);

// New route for generating a YAML file from a prompt and returning a zip
app.post('/api/generate', generateJsonAndReturnZip);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
