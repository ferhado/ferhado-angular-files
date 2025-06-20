export type CommandDef = {
  id: string;
  title: string;
  cli: (name: string) => string;
};

export const commands: CommandDef[] = [
  {id: 'ngfFilesNewComponent', title: 'Component', cli: (name) => `ng g c ${name}`},
  {
    id: 'ngfFilesNewInlineComponent',
    title: 'Inline Component',
    cli: (name) => `ng g c ${name} --inline-template --inline-style --flat`,
  },
  {id: 'ngfFilesNewFlatComponent', title: 'Flat Component', cli: (name) => `ng g c ${name} --flat`},
  {id: 'ngfFilesNewModule', title: 'Module', cli: (name) => `ng g m ${name} --flat`},
  {id: 'ngfFilesNewService', title: 'Service', cli: (name) => `ng g s ${name}`},
  {id: 'ngfFilesNewDirective', title: 'Directive', cli: (name) => `ng g d ${name}`},
  {id: 'ngfFilesNewPipe', title: 'Pipe', cli: (name) => `ng g p ${name}`},
  {id: 'ngfFilesNewInterface', title: 'Interface', cli: (name) => `ng g interface ${name}`},
  {id: 'ngfFilesNewClass', title: 'Class', cli: (name) => `ng g class ${name}`},
  {id: 'ngfFilesNewEnum', title: 'Enum', cli: (name) => `ng g enum ${name}`},
];
