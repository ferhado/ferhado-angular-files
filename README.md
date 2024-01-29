# Ngf Angular Files Extension

A Visual Studio Code (VSCode) extension for quickly generating Angular files and renaming components.

<p align="center">
  <img src="https://raw.githubusercontent.com/ferhado/ferhado-angular-files/main/assets/ngf-angular-files-vsce-ext3.gif" alt="Description of GIF">
</p>

## Features

- Quick scaffolding with predefined templates.
- Rename components and all associated files to component, including import paths, and class names for consistency.
- Supports `angular.json` configuration for prefix and style file extension.

## Usage:

- Right-click a folder for file generation.
- Right-click on `.component.ts` file for renaming.

## Commands and Generated Files

- Component Inline:

  - file.`component.ts` single file _(standalone: true)_.

- Component:

  - file.`component.ts` _(standalone: true)_.
  - file.`component.html`
  - file.`component.scss/css/less/sass`
  - `index.ts`

- Module:

  - file.`module.ts`
  - file.`component.ts` _(declared in module)_.
  - file.`component.html`
  - file.`component.scss/css/less/sass`
  - file.`service.ts` _(provided in module)_.
  - `index.ts`

- Service:

  - file.`service.ts` _(provided in root)_.

- Directive:

  - file.`directive.ts` _(standalone: true)_.

- Model:

  - file.`model.ts`

- Enum:

  - file.`enum.ts`

- Interface:
  - file.`interface.ts`

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
