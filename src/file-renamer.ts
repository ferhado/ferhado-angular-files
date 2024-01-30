import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {generateClassName, normalizePath} from './utils';

export class FileRenamer {
  constructor(uri: vscode.Uri) {
    this.startRenameProcess(uri);
  }

  private async startRenameProcess(uri: vscode.Uri): Promise<void> {
    const folderUri = uri || (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : null);

    if (!folderUri) {
      vscode.window.showErrorMessage('No destination directory selected.');
      return;
    }

    const currentFilePath = folderUri.fsPath;

    if (!currentFilePath.endsWith('.component.ts')) {
      return;
    }

    let currentBasename = path.basename(currentFilePath).replace(/\.component\.ts$/, '');

    let newName = await vscode.window.showInputBox({prompt: 'Rename to', value: currentBasename});
    newName = normalizePath(newName ?? '');

    if (!newName || newName === currentBasename || /^[0-9]/.test(newName)) {
      return;
    }

    const dirPath = path.dirname(currentFilePath);
    await this.scanDirAndRenameFiles(dirPath, currentBasename, newName);
  }

  private async scanDirAndRenameFiles(dirPath: string, currentBasename: string, newBasename: string): Promise<void> {
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const fileStat = await fs.promises.stat(fullPath);

      if (fileStat.isDirectory()) {
        continue;
      }

      if (
        new RegExp(`^${currentBasename}\\.(module)\\.ts$`).test(file) ||
        new RegExp(`^${currentBasename}\\.(component)\\.(ts|html|scss|css|less|sass)$`).test(file)
      ) {
        const newFilename = file.replace(currentBasename, newBasename);
        const newFullPath = path.join(dirPath, newFilename);
        await fs.promises.rename(fullPath, newFullPath);
        await this.updateImportsInFile(newFullPath, currentBasename, newBasename);
      } else {
        await this.updateImportsInFile(path.join(dirPath, file), currentBasename, newBasename);
      }
    }
  }

  private async updateImportsInFile(filePath: string, currentBasename: string, newBasename: string): Promise<void> {
    let fileContent = await fs.promises.readFile(filePath, 'utf8');

    const regex = new RegExp(`\\.\/${currentBasename}\\.(component|module)`, 'g');
    fileContent = fileContent.replace(regex, `./${newBasename}.$1`);

    const oldClassName = generateClassName(currentBasename);
    const newClassName = generateClassName(newBasename);
    const classRegex = new RegExp(`\\b${oldClassName}(Component|Module)`, 'g');
    fileContent = fileContent.replace(classRegex, `${newClassName}$1`);

    await fs.promises.writeFile(filePath, fileContent);
  }
}
