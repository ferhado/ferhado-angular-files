import * as vscode from "vscode";
import { getAngularConfig } from "./angular.json";
import { generateFileContent } from "./file.generator";
import { createDirectory, getInputName } from "./utils";

export const openCommandDialog = async (config: any, uri: vscode.Uri) => {
  const rootDir = vscode.workspace.workspaceFolders?.[0]?.uri;
  const folderUri = uri || rootDir; // (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : null);

  if (!rootDir) {
    vscode.window.showErrorMessage("No destination directory selected.");
    return;
  }

  const inputName = await getInputName(config.title);

  if (!inputName || /^[0-9]/.test(inputName)) {
    return;
  }

  const pathSegments = inputName.split("/");
  const baseName = pathSegments.pop();

  if (!baseName) {
    vscode.window.showErrorMessage("Invalid file name.");
    return;
  }

  const directoryPath = createDirectory(folderUri, pathSegments);
  await getAngularConfig(rootDir.fsPath).then(angularConfig => {
    generateFileContent(directoryPath, baseName, config, angularConfig);
  });
};
