import * as fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import {getAngularConfig} from './angular.json';
import {ActionConfig, AppConfig} from './app.types';
import {FileCreator} from './files-creator';
import {createDirectory, getInputName, isStyleExtSupported} from './utils';

export class FileCreatorDialog {
  private action: ActionConfig;
  private uri: vscode.Uri;

  constructor(action: ActionConfig, uri: vscode.Uri) {
    this.action = action;
    this.uri = uri;
    this.startProcess();
  }

  private async startProcess(): Promise<void> {
    const rootDir = vscode.workspace.workspaceFolders?.[0]?.uri;
    const folderUri = this.uri || rootDir;

    if (!rootDir) {
      vscode.window.showErrorMessage('No destination directory selected.');
      return;
    }

    const inputName = await getInputName(this.action.title ?? this.action.command);

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
      const resourcePath = this.action.isFolder ? path.join(directoryPath, baseName) : directoryPath;

      if (this.action.isFolder) {
        fs.mkdirSync(resourcePath, {recursive: true});
      }

      const styleExt = angularConfig.style ?? '';

      const config: AppConfig = {
        prefix: angularConfig.prefix ?? 'app',
        style: isStyleExtSupported(styleExt) ? styleExt : 'scss',
      };

      const creator = new FileCreator(resourcePath, baseName, config);

      creator.createFiles(this.action.files);
    });
  }
}
