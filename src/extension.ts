import * as vscode from "vscode";
import { openCommandDialog } from "./command-dialog";
import { fileConfig } from "./files.config";
import { showRenameComponentDialog } from "./rename-component";

export function activate(context: vscode.ExtensionContext) {
  console.log(context);
  for (let config of fileConfig) {
    let disposable = vscode.commands.registerCommand(`extension.ngfFilesNew${config.command}`, (uri: vscode.Uri) =>
      openCommandDialog(config, uri)
    );

    context.subscriptions.push(disposable);
  }

  let disposable = vscode.commands.registerCommand(`extension.ngfFilesRename`, (uri: vscode.Uri) =>
    showRenameComponentDialog(uri)
  );

  context.subscriptions.push(disposable);
}
