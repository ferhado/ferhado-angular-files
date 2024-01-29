import {ActionConfig} from './app.types';

export const ACTIONS_CONFIG: ActionConfig[] = [
  {
    title: 'Component',
    command: 'InlineComponent',
    files: [
      {
        fileName: `%FILE_NAME%.component.ts`,
        templatePth: 'inline.component.ts',
        addToIndex: true,
      },
    ],
  },

  {
    command: 'Component',
    isFolder: true,
    files: [
      {
        fileName: `%FILE_NAME%.component.ts`,
        templatePth: 'component.ts',
      },
      {
        fileName: `%FILE_NAME%.component.html`,
        templatePth: 'component.html',
      },
      {
        fileName: `%FILE_NAME%.component.%STYLE_EXT%`,
      },
      {
        fileName: 'index.ts',
        content: `export * from './%FILE_NAME%.component';`,
      },
    ],
  },

  {
    command: 'Module',
    isFolder: true,
    files: [
      {
        fileName: `%FILE_NAME%.module.ts`,
        templatePth: 'module.ts',
      },
      {
        fileName: `%FILE_NAME%.component.ts`,
        templatePth: 'module.component.ts',
      },
      {
        fileName: `%FILE_NAME%.service.ts`,
        templatePth: 'module.service.ts',
      },
      {
        fileName: `%FILE_NAME%.component.html`,
        content: '<h5>%FILE_NAME% works!</h5>',
      },
      {
        fileName: `%FILE_NAME%.component.%STYLE_EXT%`,
      },
      {
        fileName: 'index.ts',
        content: `export * from './%FILE_NAME%.module';\nexport * from './%FILE_NAME%.service';`,
      },
    ],
  },

  {
    command: 'Service',
    files: [
      {
        fileName: `%FILE_NAME%.service.ts`,
        templatePth: 'service.ts',
        addToIndex: true,
      },
    ],
  },

  {
    command: 'Directive',
    files: [
      {
        fileName: `%FILE_NAME%.directive.ts`,
        templatePth: 'directive.ts',
        addToIndex: true,
      },
    ],
  },
  {
    command: 'Model',
    files: [
      {
        fileName: `%FILE_NAME%.model.ts`,
        templatePth: 'model.ts',
        addToIndex: true,
      },
    ],
  },
  {
    command: 'Interface',
    files: [
      {
        fileName: `%FILE_NAME%.interface.ts`,
        templatePth: 'interface.ts',
        addToIndex: true,
      },
    ],
  },
  {
    command: 'Enum',
    files: [
      {
        fileName: `%FILE_NAME%.enum.ts`,
        templatePth: 'enum.ts',
        addToIndex: true,
      },
    ],
  },
];
