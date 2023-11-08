# Ferhado Angular Files Extension

A vscode extension for quick generation of Angular components, services, modules, directives, and renames angular files with it's class name and related files.

## Features

- Quick scaffolding with predefined templates.
- Right-click on a `.ts` file to rename it and all associated files, including import paths, and class names for consistency.
- Right-click or Command Palette file generation.
- Supports `angular.json` configuration for prefix and style file extension.

## Commands and Generated Files

- New Component Inline:

  - `component.ts` single file

- New Component:

  - `component.ts` (standalone: true).
  - `component.html`
  - `component.scss/css/less/sass`
  - `index.ts`

- New Module:

  - `module.ts`
  - `component.ts` (declared in module).
  - `component.html`
  - `component.scss/css/less/sass`
  - `service.ts` (provided in module).
  - `index.ts`

- New Service:

  - `service.ts` (provided in root).

- New Directive:
  - `directive.ts` (standalone: true).

## Configuration Options

All commands are enabled by default:

- `ngf.files.menu.rename`: Toggle `Rename Angular Files` in Explorer Context (default: true).
- `ngf.files.menu.component`: Toggle `New Component` in Explorer Context (default: true).
- `ngf.files.menu.component-inline`: Toggle `New Component Inline` in Explorer Context (default: true).
- `ngf.files.menu.module`: Toggle `New Module` in Explorer Context (default: true).
- `ngf.files.menu.service`: Toggle `New Service` in Explorer Context (default: true).
- `ngf.files.menu.directive`: Toggle `New Directive` in Explorer Context (default: true).

## angular.json support

```json
...
"projects": {
  "my-project": {
    ...
    "schematics": {
      "@schematics/angular:component": {
        ...
        "style": "css|scss|sass|less", <-------
        ...
      },
    },
    ...
    "prefix": "my-app", <-------
    ...
  }
}
...
```

## Issues

If you encounter any problems or have a suggestion, please [open an issue](https://github.com/ferhado/ferhado-angular-files/issues) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Enjoy your coding! 😉
