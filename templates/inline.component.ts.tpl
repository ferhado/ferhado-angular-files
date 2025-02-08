import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
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
export class %CLASS_NAME%Component implements OnInit {

  ngOnInit(): void {
    
  }
}
