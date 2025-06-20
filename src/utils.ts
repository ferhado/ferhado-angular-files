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

export function generateClassName(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9_]/g, ' ') // Replace non-allowed characters with space
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]+/, ''); // Remove leading numbers
}

export function normalizePath(inputName: string): string {
  return inputName.trim();
}

export function isStyleExtSupported(styleExt: string): boolean {
  return ['css', 'scss', 'sass', 'less'].includes(styleExt);
}

export function toClassName(name: string): string {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}
