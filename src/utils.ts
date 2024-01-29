import * as fs from 'fs';
import * as vscode from 'vscode';

export async function getInputName(type: string): Promise<string | undefined> {
  const inputName = await vscode.window.showInputBox({prompt: `Enter Your ${type} Name`});
  return inputName ? normalizePath(inputName) : undefined;
}

export function createDirectory(folderUri: vscode.Uri, pathSegments: string[]): string {
  const directoryPath = vscode.Uri.joinPath(folderUri, ...pathSegments);
  fs.mkdirSync(directoryPath.fsPath, {recursive: true});
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

export function isStyleExtSupported(styleExt: string): boolean {
  return ['css', 'scss', 'sass', 'less'].includes(styleExt);
}
