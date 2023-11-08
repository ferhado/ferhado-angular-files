export interface fileConfigFileInterface {
  file: string;
  ext: string;
  content?: string;
}

export interface fileConfigInterface {
  title: string;
  command: string;
  files: fileConfigFileInterface[];
}

export const fileConfig: fileConfigInterface[] = [
  {
    title: "Component",
    command: "InlineComponent",
    files: [{ file: "component", ext: "ts" }]
  },

  {
    title: "Component",
    command: "Component",
    files: [
      { file: "component", ext: "ts" },
      { file: "component", ext: "html" },
      { file: "component", ext: "scss" },
      { file: "index", ext: "ts", content: "export * from './%FILE_NAME%.component';" }
    ]
  },

  {
    title: "Module",
    command: "Module",
    files: [
      { file: "module", ext: "ts" },
      { file: "component", ext: "ts" },
      { file: "service", ext: "ts" },
      { file: "component", ext: "html" },
      { file: "component", ext: "scss" },
      {
        file: "index",
        ext: "ts",
        content: "export * from './%FILE_NAME%.module';\nexport * from './%FILE_NAME%.service';"
      }
    ]
  },

  {
    title: "Service",
    command: "Service",
    files: [{ file: "service", ext: "ts" }]
  },

  {
    title: "Directive",
    command: "Directive",
    files: [{ file: "directive", ext: "ts" }]
  }
];
