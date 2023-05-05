interface ExampleData {
    id: number;
    message: string;
  }
  
  export async function fetchExampleData(): Promise<ExampleData> {
    // Replace this with a real implementation, such as fetching data from a database or an external API
    const exampleData: ExampleData = {
      id: 1,
      message: 'Hello, world!',
    };
  
    return new Promise((resolve) => setTimeout(() => resolve(exampleData), 1000));
  }
  