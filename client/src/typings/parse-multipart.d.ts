declare module "parse-multipart" {
    function parseMultipart(buffer: ArrayBuffer, boundary: string): Array<any>;
    export = parseMultipart;
  }
  