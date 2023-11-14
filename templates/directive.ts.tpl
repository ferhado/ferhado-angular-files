import { Directive } from "@angular/core";

@Directive({
  selector: "[%APP_PREFIX%-%FILE_NAME%]",
  standalone: true
})
export class %CLASS_NAME%Directive {
  constructor() {}
}