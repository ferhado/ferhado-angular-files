# Ngf Angular Files Extension

A vscode extension for quick generation of Angular components, services, modules, directives, and renames angular files with it's class name and related files.

<p align="center">
  <img src="assets\ngf-angular-files-vsce-ext.gif" alt="Description of GIF">
</p>

## Features

- Quick scaffolding with predefined templates.
- Right-click on a `.ts` file to rename it and all associated files, including import paths, and class names for consistency.
- Right-click or Command Palette file generation.
- Supports `angular.json` configuration for prefix and style file extension.

## Commands and Generated Files

- New Component Inline:

  - `component.ts` single file

- New Component:

  - `component.ts` _(standalone: true)_.
  - `component.html`
  - `component.scss/css/less/sass`
  - `index.ts`

- New Module: [_(needs to be activated via settings)_](#module-settings)

  - `module.ts`
  - `component.ts` _(declared in module)_.
  - `component.html`
  - `component.scss/css/less/sass`
  - `service.ts` _(provided in module)_.
  - `index.ts`

- New Service:

  - `service.ts` _(provided in root)_.

- New Directive:
  - `directive.ts` _(standalone: true)_.

## Configuration Options

All commands are enabled by default expect module:<a id="module-settings"></a>

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
