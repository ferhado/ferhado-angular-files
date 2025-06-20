import * as vscode from 'vscode';

export class RoutesCommand {
  constructor(private uri?: vscode.Uri) {}

  async run() {
    const folderPath = this.uri?.fsPath || vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!folderPath) {
      vscode.window.showErrorMessage('No folder selected or workspace open');
      return;
    }

    const baseName = await vscode.window.showInputBox({
      prompt: 'Enter routes file base name (without suffix)',
      value: '',
      placeHolder: 'e.g. app, main, custom',
      validateInput: (value) => {
        if (!value || value.trim() === '') return 'Name cannot be empty';
        if (value.includes('.')) return 'Do not include dots';
        return null;
      },
    });
    if (!baseName) return;

    const fileName = `${baseName}.routes.ts`;
    const routesFileUri = vscode.Uri.file(`${folderPath}/${fileName}`);

    try {
      await vscode.workspace.fs.stat(routesFileUri);
      vscode.window.showErrorMessage(`File ${fileName} already exists`);
      return;
    } catch {
      // File does not exist, continue
    }

    const routesVarName = `${baseName}Routes`;
    const content = `import { Routes } from '@angular/router';\n\nexport const ${routesVarName}: Routes = [];`;

    try {
      await vscode.workspace.fs.writeFile(routesFileUri, Buffer.from(content));
      // vscode.window.showInformationMessage(`Created ${fileName}`);
      await vscode.window.showTextDocument(routesFileUri);
    } catch (e) {
      vscode.window.showErrorMessage(`Failed to create ${fileName}: ${e}`);
    }
  }
}
