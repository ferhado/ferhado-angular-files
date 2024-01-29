import * as fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import {AppConfig, FileSource} from './app.types';
import {toCamelCase} from './utils';

export class FileCreator {
  private directoryPath!: string;
  private fileNameBase!: string;
  private config!: AppConfig;

  constructor(directoryPath: string, fileNameBase: string, config: AppConfig) {
    this.directoryPath = directoryPath;
    this.fileNameBase = fileNameBase;
    this.config = config;
  }

  createFiles(files: FileSource[]) {
    files.forEach((source) => {
      if (source.extention === 'scss') {
        source.extention = this.config.style;
      }

      this.createFile(source);

      if (source.addToIndex) {
        this.addToIndex(`${this.fileNameBase}.${source.suffix}`);
      }
    });
  }

  private createFile(source: FileSource) {
    const fileName =
      source.suffix === 'index' ? 'index.ts' : `${this.fileNameBase}.${source.suffix}.${source.extention}`;
    const filePath = path.join(this.directoryPath, fileName);
    const className = toCamelCase(this.fileNameBase);

    let content = source.content ?? this.loadTemplate(source.templatePth || '');

    // Replace variables
    const replacments = {
      DIR_PATH: this.directoryPath,
      FILE_NAME: this.fileNameBase,
      FILE_PATH: filePath,
      CLASS_NAME: className,
      APP_PREFIX: this.config.prefix,
      STYLE_EXT: this.config.style,
    };

    content = this.replaceTemplateVariables(content, replacments);

    this.writeFile(filePath, content);
  }

  private writeFile(filePath: string, content: string): void {
    if (fs.existsSync(filePath)) {
      vscode.window.showErrorMessage(`File already exists "${filePath}"`);
      return;
    }

    fs.writeFileSync(filePath, content);
  }

  private replaceTemplateVariables(content: string, replacements: {[key: string]: string}) {
    for (const key in replacements) {
      content = content.replace(new RegExp(`%${key}%`, 'g'), replacements[key]);
    }

    return content;
  }

  private loadTemplate(templatePath: string): string {
    try {
      const tplPath = path.join(__dirname, '..', 'templates', `${templatePath}.tpl`);
      return fs.readFileSync(tplPath, 'utf8');
    } catch (error) {
      return '';
    }
  }

  private addToIndex(fileName: string) {
    const indexFilePath = path.join(this.directoryPath, 'index.ts');

    if (fs.existsSync(indexFilePath)) {
      const exportRegex = new RegExp(`export \\* from ['"]\\./${fileName}['"]`);
      let indexContent = fs.readFileSync(indexFilePath, 'utf8');

      if (!exportRegex.test(indexContent)) {
        indexContent = indexContent.replace(/\n+$/, '');
        const exportStatement = `\nexport * from './${fileName}';\n`;
        fs.writeFileSync(indexFilePath, indexContent + exportStatement);
      }
    }
  }
}
