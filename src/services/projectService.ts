//for reading the YAML file, creating the project structure, and compressing it into a ZIP file.
import yaml from 'js-yaml';
import archiver from 'archiver';
import { PassThrough } from 'stream';

interface ProjectStructure {
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
