declare module 'parse-json' {
    function parseJson(jsonString: string, reviver?: (key: any, value: any) => any, filename?: string): any;
    export = parseJson;
  }
  