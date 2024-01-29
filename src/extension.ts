import * as vscode from 'vscode';
import {ACTIONS_CONFIG} from './app.config';
import {FileRenamer} from './file-renamer';
import {FileCreatorDialog} from './files-creator-dialog';

export function activate(context: vscode.ExtensionContext) {
  // create files
  for (let action of ACTIONS_CONFIG) {
    const command = `extension.ngfFilesNew${action.command}`;
    let disposable = vscode.commands.registerCommand(command, (uri: vscode.Uri) => new FileCreatorDialog(action, uri));
    context.subscriptions.push(disposable);
  }

  // rename files
  const command = `extension.ngfFilesRename`;
  let disposable = vscode.commands.registerCommand(command, (uri: vscode.Uri) => new FileRenamer(uri));
  context.subscriptions.push(disposable);

  // activate extension
  vscode.commands.executeCommand('setContext', 'ngfFilesActivated', true);
}
