export type StyleExtension = 'scss' | 'css' | 'less' | 'sass';

export type AppConfig = {
  prefix: string;
  style: StyleExtension;
};

export type FileSource = {
  fileName: string;
  content?: string;
  templatePth?: string;
  addToIndex?: boolean;
};

export type ActionConfig = {
  title?: string;
  command: string;
  files: FileSource[];
  isFolder?: boolean;
};
