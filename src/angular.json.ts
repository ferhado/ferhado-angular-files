import * as fs from 'fs';
import * as path from 'path';

export async function getAngularConfig(
  workspacePath: string
): Promise<{ style: string | null; prefix: string | null }> {
  return new Promise((resolve, reject) => {
    let style = null;
    let prefix = null;

    try {
      const angularJsonPath = path.join(workspacePath, 'angular.json');
      const angularJsonExists = fs.existsSync(angularJsonPath);

      if (!angularJsonExists) {
        resolve({ style, prefix });
      }

      const angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
      const angularJson = JSON.parse(angularJsonContent);
      let defaultProject = angularJson.defaultProject;

      // Fall back to the first project if defaultProject is not specified
      if (!defaultProject) {
        defaultProject = Object.keys(angularJson.projects)[0];
      }

      const projectConfig = angularJson.projects[defaultProject];
      style = projectConfig.schematics['@schematics/angular:component'].style;
      prefix = projectConfig.prefix;
    } catch (error) {}

    resolve({ style, prefix });
  });
}
