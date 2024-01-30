# Change Log

## [1.0.7]

fix: Regex in file renaming script to correctly escape periods
feat: Add Pipe
feat: Add Class
feat: Group submenu by category

## [1.0.6]

- feat: Add model
- feat: Add interface
- feat: Add enum
- removed: Config options for hiding menu items, as they are no longer needed with the submenu structure.

## [1.0.5]

- feat: Group menu options for creation in a submenu.
- feat: Extension menu now only appears in Angular projects (presence of `angular.json`).

## [1.0.4]

- fix: Correct handling of single and double quotes in renaming paths.
- feat: Adapt renaming functionality to support Angular 17's styleUrls and styleUrl.
- feat: Add extension icon for improved marketplace visibility

## [1.0.3]

- fix: removed filename regex, due incorrect validation.

## [1.0.2]

- Changed extension display name to Ngf.
- Added documentation GIF.

## [1.0.1]

- fix: Enforce Valid TypeScript Class Naming for File Names
- fix: File renaming errors caused by same-named subdirectories.
- fix: Enhanced style extension validation.
- fix: Added the missing `standalone` flag in directive template, aligning it with previously documented features.
- feat: Added `@Input` and `@Output` decorators and `OnInit` in inline component template by default, catering to common use cases.
- feat: Added `OnInit` in Component template by default.

## [Unreleased]

- Initial release
