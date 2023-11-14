import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { normalizePath, toCamelCase } from './utils';

async function renameImportsInContent(filePath: string, currentBasename: string, newBasename: string): Promise<void> {
  let fileContent = await fs.promises.readFile(filePath, 'utf8');

  const templateUrlRegex = new RegExp(`templateUrl: ["']\\./${currentBasename}\\.component\\.html["']`, 'g');
  const styleUrlsRegex = new RegExp(
    `styleUrls: \\["\\./${currentBasename}\\.component\\.(scss|css|less|sass)"\\]`,
    'g'
  );

  fileContent = fileContent.replace(templateUrlRegex, `templateUrl: "./${newBasename}.component.html"`);
  fileContent = fileContent.replace(styleUrlsRegex, (match, p1) => {
    return `styleUrls: ["./${newBasename}.component.${p1}"]`;
  });

  const oldClassName = toCamelCase(currentBasename);
  const newClassName = toCamelCase(newBasename);
  const classRegex = new RegExp(`${oldClassName}(Component|Module|Service|Directive)`, 'g');
  fileContent = fileContent.replace(classRegex, `${newClassName}$1`);

  fileContent = fileContent.replace(
    new RegExp(`from ["']\\./${currentBasename}\\.(component|module|service|directive)["']`, 'g'),
    `from "./${newBasename}.$1"`
  );

  await fs.promises.writeFile(filePath, fileContent);
}

async function renameComponentFiles(dirPath: string, currentBasename: string, newBasename: string): Promise<void> {
  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const fileStat = await fs.promises.stat(fullPath);

    if (fileStat.isDirectory()) {
      continue;
    }

    if (
      new RegExp(`^${currentBasename}\\.(module|service|directive)\\.ts$`).test(file) ||
      new RegExp(`^${currentBasename}\\.(component)\\.(ts|html|scss|css|less|sass)$`).test(file)
    ) {
      const newFilename = file.replace(currentBasename, newBasename);
      const newFullPath = path.join(dirPath, newFilename);
      await fs.promises.rename(fullPath, newFullPath);

      if (new RegExp(`${currentBasename}\\.(component|module|service|directive)\\.ts$`).test(file)) {
        await renameImportsInContent(newFullPath, currentBasename, newBasename);
      }
    } else {
      await renameImportsInContent(path.join(dirPath, file), currentBasename, newBasename);
    }
  }
}

export async function showRenameComponentDialog(uri: vscode.Uri) {
  const folderUri = uri || (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : null);

  if (!folderUri) {
    vscode.window.showErrorMessage('No destination directory selected.');
    return;
  }

  const currentFilePath = folderUri.fsPath;

  if (!currentFilePath.endsWith('.ts')) return;
  let currentBasename = path.basename(currentFilePath).replace(/(\.component|\.service|\.module|\.directive)\.ts$/, '');

  let newName = await vscode.window.showInputBox({ prompt: 'Rename to', value: currentBasename });
  newName = normalizePath(newName ?? '');

  if (!newName || newName === currentBasename || /^[0-9]/.test(newName)) {
    return;
  }

  const dirPath = path.dirname(currentFilePath);
  await renameComponentFiles(dirPath, currentBasename, newName);
}
