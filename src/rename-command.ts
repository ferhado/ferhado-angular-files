import * as vscode from 'vscode';

export class RenameHandler {
  constructor(private uri: vscode.Uri) {}

  private toClassName(name: string): string {
    return name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
  }

  private getOldDir() {
    return this.uri.fsPath.replace(/\\/g, '/').replace(/[^/]+$/, '');
  }

  private getOldFileName() {
    return this.uri.path.split('/').pop()!;
  }

  private getBaseAndSuffix() {
    const oldFileName = this.getOldFileName();
    const oldNameMatch = oldFileName.match(/^([^.]+)/);
    const oldBaseName = oldNameMatch ? oldNameMatch[1] : oldFileName;
    const suffixMatch = oldFileName.match(/^([^.]+)(\.[^.]+)?\.ts$/);
    const suffix = suffixMatch && suffixMatch[2] ? suffixMatch[2] : '';
    return {oldBaseName, suffix};
  }

  private async promptNewName(oldBaseName: string) {
    return vscode.window.showInputBox({
      prompt: 'New file base name',
      value: oldBaseName,
      placeHolder: 'e.g. user-card',
    });
  }

  private async renameFiles(oldDir: string, oldBaseName: string, suffix: string, newName: string) {
    const fs = vscode.workspace.fs;
    const extList = ['ts', 'html', 'scss', 'css', 'spec.ts'];

    for (const ext of extList) {
      const oldFile = vscode.Uri.file(`${oldDir}${oldBaseName}${suffix}.${ext}`);
      const newFile = vscode.Uri.file(`${oldDir}${newName}${suffix}.${ext}`);
      try {
        await fs.rename(oldFile, newFile, {overwrite: false});
      } catch {
        // ignore if not exist
      }
    }
  }

  private async updateMainFileContent(oldDir: string, newName: string, oldBaseName: string, suffix: string) {
    const fs = vscode.workspace.fs;
    const newMainFile = vscode.Uri.file(`${oldDir}${newName}${suffix}.ts`);
    const textBytes = await fs.readFile(newMainFile);
    const text = Buffer.from(textBytes).toString();

    const declMatch = text.match(/export\s+(class|interface|enum)\s+(\w+)/);
    if (!declMatch) return null;

    const [_, declType, oldClassName] = declMatch;
    const oldBaseClassName = oldClassName.replace(/(Component|Service|Directive|Pipe|Module)$/, '');
    const newBaseClassName = this.toClassName(newName);
    const newClassName = oldClassName.replace(oldBaseClassName, newBaseClassName);

    const updated = text
      .replace(new RegExp(`export\\s+${declType}\\s+${oldClassName}`, 'g'), `export ${declType} ${newClassName}`)
      .replace(
        new RegExp(`(['"\`])${oldBaseName}(\\.component|\\.service|\\.directive|\\.pipe|\\.module)?`, 'g'),
        `$1${newName}$2`
      )
      .replace(
        new RegExp(
          `(templateUrl|styleUrls?|styleUrl):\\s*(\\[)?\\s*(['"\`])\\.\\/${oldBaseName}([^'"\`]+)\\3\\s*(\\])?(,?)(\\s*)`,
          'g'
        ),
        (match) => {
          return match.replace(`./${oldBaseName}`, `./${newName}`);
        }
      );

    await fs.writeFile(newMainFile, Buffer.from(updated));
    return {oldClassName, newClassName};
  }

  private async updateSiblingImports(
    oldDir: string,
    oldBaseName: string,
    suffix: string,
    newName: string,
    oldClassName: string,
    newClassName: string
  ) {
    const fs = vscode.workspace.fs;
    const dirEntries = await fs.readDirectory(vscode.Uri.file(oldDir));

    for (const [fileName, fileType] of dirEntries) {
      if (fileType !== vscode.FileType.File || !fileName.endsWith('.ts')) continue;
      if (fileName === `${newName}${suffix}.ts`) continue;

      const fileUri = vscode.Uri.file(`${oldDir}${fileName}`);
      try {
        const contentBytes = await fs.readFile(fileUri);
        let content = Buffer.from(contentBytes).toString();

        const importRegex = new RegExp(`(['"\`])\\.\\/(${oldBaseName}${suffix})(['"\`])`, 'g');
        if (importRegex.test(content)) {
          content = content.replace(importRegex, `$1./${newName}${suffix}$3`);
          content = content.replace(new RegExp(`\\b${oldClassName}\\b`, 'g'), newClassName);
          await fs.writeFile(fileUri, Buffer.from(content));
        }
      } catch {
        // ignore errors
      }
    }
  }

  private async renameFolderIfNeeded(oldDir: string, newName: string, shouldRenameFolder: boolean) {
    if (!shouldRenameFolder) return;
    const parentPath = oldDir.replace(/\/$/, '');
    const newFolder = parentPath.replace(/[^/]+$/, newName);
    const parentUri = vscode.Uri.file(parentPath);
    const newUri = vscode.Uri.file(newFolder);
    try {
      await vscode.workspace.fs.rename(parentUri, newUri, {overwrite: false});
      this.revealChildAfterRename(newFolder, newName);
    } catch (e) {
      vscode.window.showErrorMessage(`Failed to rename folder: ${e}`);
    }
  }

  private async revealChildAfterRename(newFolder: string, newName: string) {
    const fs = vscode.workspace.fs;
    const candidates = [
      `${newFolder}/${newName}.ts`,
      `${newFolder}/${newName}.component.ts`,
      `${newFolder}/${newName}.index.ts`,
    ];

    for (const path of candidates) {
      const uri = vscode.Uri.file(path);
      try {
        await fs.stat(uri);
        setTimeout(() => vscode.commands.executeCommand('revealInExplorer', uri));
        break;
      } catch {
        // not found
      }
    }
  }

  async run() {
    const oldDir = this.getOldDir();
    const {oldBaseName, suffix} = this.getBaseAndSuffix();
    const parentFolder = oldDir.split('/').filter(Boolean).pop();
    const shouldRenameFolder = parentFolder === oldBaseName;

    const newNameInput = await this.promptNewName(oldBaseName);
    if (!newNameInput || newNameInput === oldBaseName) return;

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `Renaming: ${oldBaseName}${suffix} → ${newNameInput}${suffix}`,
        cancellable: false,
      },
      async () => {
        await this.renameFiles(oldDir, oldBaseName, suffix, newNameInput);
        const classNames = await this.updateMainFileContent(oldDir, newNameInput, oldBaseName, suffix);
        if (!classNames) return;
        await this.updateSiblingImports(
          oldDir,
          oldBaseName,
          suffix,
          newNameInput,
          classNames.oldClassName,
          classNames.newClassName
        );
        await this.renameFolderIfNeeded(oldDir, newNameInput, shouldRenameFolder);
      }
    );
  }
}
