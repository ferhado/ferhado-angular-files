import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export async function getInputName(type: string): Promise<string | undefined> {
  const inputName = await vscode.window.showInputBox({ prompt: `Enter Your ${type} Name` });
  return inputName ? normalizePath(inputName) : undefined;
}

export function createDirectory(folderUri: vscode.Uri, pathSegments: string[]): string {
  const directoryPath = vscode.Uri.joinPath(folderUri, ...pathSegments);
  fs.mkdirSync(directoryPath.fsPath, { recursive: true });
  return directoryPath.fsPath;
}

export function toCamelCase(str: string): string {
  return str
    .replace(/^[a-z]/, (match) => match.toUpperCase())
    .replace(/[-_]+(.)?/g, (match, group1) => (group1 ? group1.toUpperCase() : ''));
}

export function normalizePath(inputName: string): string {
  return (
    inputName
      .trim()
      // Remove any leading non-alpha characters followed by numbers
      .replace(/^[^a-zA-Z]+/, '')
      // Rest of the normalization
      .replace(/[^a-zA-Z0-9 \_\-/\.]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\/+/g, '/')
      .toLowerCase()
  );
}

export function loadTemplate(template: string): string {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', `${template}.tpl`);
    return fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    return '';
  }
}

export function translate(content: string, prefix: string, fileName: string, styleExt: string | null) {
  const className = toCamelCase(fileName);
  content = content.replace(/%APP_PREFIX%/g, prefix);
  content = content.replace(/%FILE_NAME%/g, fileName);
  content = content.replace(/%CLASS_NAME%/g, className);

  if (styleExt) {
    content = content.replace(/%STYLE_EXT%/g, styleExt);
  }

  return content;
}
