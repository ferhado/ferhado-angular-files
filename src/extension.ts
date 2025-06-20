import * as vscode from 'vscode';
import {executeCliCommand} from './cli-command-executor';
import {commands} from './cli-commands';
import {RenameHandler} from './rename-command';
import {RoutesCommand} from './routes-command';

export function activate(context: vscode.ExtensionContext) {
  for (const cmd of commands) {
    const disposable = vscode.commands.registerCommand(`extension.${cmd.id}`, async (uri: vscode.Uri) => {
      const name = await vscode.window.showInputBox({prompt: `${cmd.title} name`});
      if (!name) return;

      const path = uri?.fsPath || vscode.workspace.workspaceFolders?.[0].uri.fsPath || '.';

      await executeCliCommand(cmd.cli(name), path, `Creating ${cmd.title}: ${name}`);
    });

    context.subscriptions.push(disposable);
  }

  const routeCommand = vscode.commands.registerCommand('extension.ngfFilesNewRoutes', async (uri: vscode.Uri) => {
    const handler = new RoutesCommand(uri);
    await handler.run();
  });
  context.subscriptions.push(routeCommand);

  // Register the rename command
  const renameCommand = vscode.commands.registerCommand('extension.ngfFilesRename', async (uri: vscode.Uri) => {
    const handler = new RenameHandler(uri);
    await handler.run();
  });
  context.subscriptions.push(renameCommand);

  vscode.commands.executeCommand('setContext', 'ngfFilesActivated', true);
}
