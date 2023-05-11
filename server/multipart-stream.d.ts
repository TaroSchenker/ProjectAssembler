declare module "multipart-stream" {
  import { Readable } from "stream";

  interface PartOptions {
    headers: { [header: string]: string };
    body: Readable;
  }

  export class MultipartStream {
    constructor(boundary: string);
    addPart(options: PartOptions): void;
    finalize(): void;
    pipe(res: any): void;
  }
}
