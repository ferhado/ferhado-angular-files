import * as fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { SUPPORTED_STYLE_EXTENSIONS, fileConfigFileInterface } from './files.config';
import { loadTemplate, toCamelCase } from './utils';

export function generateFileContent(directoryPath: string, baseName: string, action: any, angularConfig: any): void {
  const resourcePath = /^(Component|Module)$/.test(action.command) ? path.join(directoryPath, baseName) : directoryPath;

  if (/^(Component|Module)$/.test(action.command)) {
    fs.mkdirSync(resourcePath, { recursive: true });
  }

  action.files.forEach((source: fileConfigFileInterface) => {
    let content = '';
    let fileExt = source.ext;
    let styleExt = angularConfig.style ?? 'scss';

    if (!SUPPORTED_STYLE_EXTENSIONS.includes(styleExt)) {
      vscode.window.showWarningMessage(`Unsupported style extension "${styleExt}". Defaulting to "scss".`);
      styleExt = 'scss';
    }

    if (fileExt === 'scss') {
      fileExt = styleExt;
    }

    let templatePath = `${source.file}.${fileExt}`;
    let fileName = source.file === 'index' ? templatePath : `${baseName}.${templatePath}`;
    const filePath = path.join(resourcePath, fileName);

    if (action.command === 'InlineComponent') {
      templatePath = 'inline.component.ts';
    } else if (action.command === 'Module' && /(component|service)\.ts$/.test(templatePath)) {
      templatePath = `module.${templatePath}`;
    }

    const className = toCamelCase(baseName);
    content = source.content ?? loadTemplate(templatePath);
    content = content.replace(/%APP_PREFIX%/g, angularConfig.prefix ?? 'app');
    content = content.replace(/%FILE_NAME%/g, baseName);
    content = content.replace(/%CLASS_NAME%/g, className);
    content = content.replace(/%STYLE_EXT%/g, styleExt);

    writeFile(filePath, content);
  });
}

export function writeFile(filePath: string, content: string): void {
  if (fs.existsSync(filePath)) {
    vscode.window.showErrorMessage(`File already exists "${filePath}"`);
    return;
  }

  fs.writeFileSync(filePath, content);
}

/*
  const config = vscode.workspace.getConfiguration("ngf.files");
 */
