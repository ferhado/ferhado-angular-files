import * as vscode from 'vscode';
import {ACTIONS_CONFIG} from './app.config';
import {openCommandDialog} from './command-dialog';
import {showRenameDialog} from './rename-component';

export function activate(context: vscode.ExtensionContext) {
  for (let action of ACTIONS_CONFIG) {
    const command = `extension.ngfFilesNew${action.command}`;
    let disposable = vscode.commands.registerCommand(command, (uri: vscode.Uri) => openCommandDialog(action, uri));
    context.subscriptions.push(disposable);
  }

  let disposable = vscode.commands.registerCommand(`extension.ngfFilesRename`, (uri: vscode.Uri) =>
    showRenameDialog(uri)
  );

  context.subscriptions.push(disposable);
  vscode.commands.executeCommand('setContext', 'ngfFilesActivated', true);
}
