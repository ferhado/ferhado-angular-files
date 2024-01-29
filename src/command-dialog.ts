import * as fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import {getAngularConfig} from './angular.json';
import {ActionConfig, AppConfig} from './app.types';
import {FileCreator} from './files-creator';
import {createDirectory, getInputName} from './utils';

export const openCommandDialog = async (action: ActionConfig, uri: vscode.Uri) => {
  const rootDir = vscode.workspace.workspaceFolders?.[0]?.uri;
  const folderUri = uri || rootDir; // (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : null);

  if (!rootDir) {
    vscode.window.showErrorMessage('No destination directory selected.');
    return;
  }

  const inputName = await getInputName(action.title);

  if (!inputName || /^[0-9]/.test(inputName)) {
    return;
  }

  const pathSegments = inputName.split('/');
  const baseName = pathSegments.pop();

  if (!baseName) {
    vscode.window.showErrorMessage('Invalid file name.');
    return;
  }

  const directoryPath = createDirectory(folderUri, pathSegments);
  await getAngularConfig(rootDir.fsPath).then((angularConfig: any) => {
    const resourcePath = action.isFolder ? path.join(directoryPath, baseName) : directoryPath;

    if (action.isFolder) {
      fs.mkdirSync(resourcePath, {recursive: true});
    }

    const styleExt = angularConfig.style ?? '';

    const config: AppConfig = {
      prefix: angularConfig.prefix ?? 'app',
      style: ['css', 'scss', 'sass', 'less'].includes(styleExt) ? styleExt : 'scss',
    };

    const creator = new FileCreator(resourcePath, baseName, config);

    creator.createFiles(action.files);
  });
};
