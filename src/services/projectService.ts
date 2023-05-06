//for reading the YAML file, creating the project structure, and compressing it into a ZIP file.
import yaml from 'js-yaml';
import archiver from 'archiver';
import { PassThrough } from 'stream';

export interface ProjectStructure {
  [key: string]: string | ProjectStructure;
}
export async function createProjectStructureFromYaml(yamlContent: string): Promise<Buffer> {
  const projectStructure = yaml.load(yamlContent) as ProjectStructure;

  const archive = archiver('zip');
  const output = new PassThrough();
  archive.pipe(output);
  const createProjectFiles = (projectStructure: ProjectStructure, basePath: string) => {
    for (const key in projectStructure) {
      const value = projectStructure[key];
  
      if (typeof value === 'string') {
        const filePath = basePath ? `${basePath}/${key}` : key;
        console.log('Adding file:', filePath); // Log the file path
        archive.append(value, { name: filePath });
      } else {
        const newBasePath = basePath ? `${basePath}/${key}` : key;
        console.log('Processing folder:', newBasePath); // Log the folder path
        createProjectFiles(value, newBasePath);
      }
    }
  };

  createProjectFiles(projectStructure, '');

  await archive.finalize();

  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    output.on('data', (chunk) => chunks.push(chunk));
    output.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

export function fixYamlIndentation(yamlString: string): string {
  const lines = yamlString.split('\n');
  let fixedLines: string[] = [];

  for (let line of lines) {
    if (line.trim().endsWith(':')) {
      fixedLines.push(line);
    } else {
      fixedLines.push('  - ' + line.trim());
    }
  }

  return fixedLines.join('\n');
}

export function fixYamlIndentationAndColons(yamlString: string): string {
  const lines = yamlString.split('\n');
  let fixedLines: string[] = [];

  for (let line of lines) {
    let trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.includes(':')) {
      // Check if the line contains a file extension, indicating it's a file
      if (/\.[a-zA-Z0-9]+$/.test(trimmedLine)) {
        fixedLines.push(line);
      } else {
        // If the line doesn't already have a colon and is not a file, add one.
        fixedLines.push(line + ':');
      }
    } else {
      fixedLines.push(line);
    }
  }

  return fixedLines.join('\n');
}


export async function createProjectStructureFromJson(jsonContent: ProjectStructure): Promise<Buffer> {
  const projectStructure = jsonContent;

  const archive = archiver('zip');
  const output = new PassThrough();
  archive.pipe(output);
  const createProjectFiles = (projectStructure: ProjectStructure, basePath: string) => {
    for (const key in projectStructure) {
      const value = projectStructure[key];
  
      if (typeof value === 'string') {
        const filePath = basePath ? `${basePath}/${key}` : key;
        console.log('Adding file:', filePath); // Log the file path
        archive.append(value, { name: filePath });
      } else {
        const newBasePath = basePath ? `${basePath}/${key}` : key;
        console.log('Processing folder:', newBasePath); // Log the folder path
        createProjectFiles(value, newBasePath);
      }
    }
  };

  createProjectFiles(projectStructure, '');

  await archive.finalize();

  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    output.on('data', (chunk) => chunks.push(chunk));
    output.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
