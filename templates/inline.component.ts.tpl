import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "%APP_PREFIX%-%FILE_NAME%",
  imports: [CommonModule],
  template: `
    <h5>%FILE_NAME% works!</h5>
  `,
  styles: [
    `
      :host {
      }
    `
  ]
})
export class %CLASS_NAME%Component {
  constructor() {}
}
