import {exec} from 'child_process';
import * as vscode from 'vscode';

export async function executeCliCommand(command: string, cwd: string, title: string) {
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title,
      cancellable: false,
    },
    () =>
      new Promise<void>((resolve, reject) => {
        exec(command, {cwd}, (error, stdout, stderr) => {
          if (error) {
            vscode.window.showErrorMessage(stderr);
            reject();
          } else {
            resolve();
          }
        });
      })
  );
}
