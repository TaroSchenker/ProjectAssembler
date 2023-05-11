declare module "multipart-stream" {
    export class MultipartStream {
      constructor(boundary: string);
      addPart(options: {
        headers: { [key: string]: string };
        body: NodeJS.ReadableStream;
      }): void;
      finalize(): void;
      pipe(res: NodeJS.WritableStream): void;
    }
  }
  