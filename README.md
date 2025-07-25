# Ngf Angular Files Extension

A VSCode extension using Angular CLI commands to generate Angular files and rename classes/components with all related files and imports. Works seamlessly with Angular v20+ conventions. For older Angular versions, generated files include traditional suffixes automatically.

<p align="center">
  <img src="https://raw.githubusercontent.com/ferhado/ferhado-angular-files/main/assets/ngf-angular-files-vsce-ext3.gif" alt="Demo GIF">
</p>

## Features

- Generates Angular components, services, directives, pipes, interfaces, classes, and enums via Angular CLI commands.
- Renames components and all related files, updating import paths and class names automatically.
- Adds custom route files with empty `Routes` arrays.
- Works with Angular CLI v20+ without suffixes; supports older Angular versions with suffixes.

## Usage

- Right-click a folder to generate Angular files using CLI.
- Right-click any `.ts` file to rename the component/class and all related files automatically.
- Use the route creation command to add route files.

## Configuration

Angular CLI already supports customizing flags such as styles, flat structure, or skipping tests in your `angular.json` schematics configuration, for example:

```json
// angular.json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "your-project-name": {
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": true <-----
        }
      }
    }
  }
}
```

This extension uses the Angular CLI commands directly and respects your CLI configurations. For flag customization, edit your `angular.json` instead of modifying extension settings.

## Issues

Report bugs or suggest features on [GitHub Issues](https://github.com/ferhado/ferhado-angular-files/issues).

## License

MIT License — see [LICENSE.md](LICENSE.md)

Happy coding! 😉
