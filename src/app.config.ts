import {ActionConfig} from './app.types';

export const ACTIONS_CONFIG: ActionConfig[] = [
  {
    title: 'Component',
    command: 'InlineComponent',
    files: [
      {
        suffix: 'component',
        extention: 'ts',
        templatePth: 'inline.component.ts',
        addToIndex: true,
      },
    ],
  },

  {
    title: 'Component',
    command: 'Component',
    isFolder: true,
    files: [
      {
        suffix: 'component',
        extention: 'ts',
        templatePth: 'component.ts',
      },
      {
        suffix: 'component',
        extention: 'html',
        templatePth: 'component.html',
      },
      {
        suffix: 'component',
        extention: 'scss',
      },
      {
        suffix: 'index',
        extention: 'ts',
        content: `export * from './%FILE_NAME%.component';`,
      },
    ],
  },

  {
    title: 'Module',
    command: 'Module',
    isFolder: true,
    files: [
      {
        suffix: 'module',
        extention: 'ts',
        templatePth: 'module.ts',
      },
      {
        suffix: 'component',
        extention: 'ts',
        templatePth: 'module.component.ts',
      },
      {
        suffix: 'service',
        extention: 'ts',
        templatePth: 'module.service.ts',
      },
      {
        suffix: 'component',
        extention: 'html',
        content: '<h5>%FILE_NAME% works!</h5>',
      },
      {
        suffix: 'component',
        extention: 'scss',
      },
      {
        suffix: 'index',
        extention: 'ts',
        content: `export * from './%FILE_NAME%.module';\nexport * from './%FILE_NAME%.service';`,
      },
    ],
  },

  {
    title: 'Service',
    command: 'Service',
    files: [
      {
        suffix: 'service',
        extention: 'ts',
        templatePth: 'service.ts',
        addToIndex: true,
      },
    ],
  },

  {
    title: 'Directive',
    command: 'Directive',
    files: [
      {
        suffix: 'directive',
        extention: 'ts',
        templatePth: 'directive.ts',
        addToIndex: true,
      },
    ],
  },
];
