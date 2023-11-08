import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { %CLASS_NAME%Component } from "./%FILE_NAME%.component";
import { %CLASS_NAME%Service } from "./%FILE_NAME%.service";

@NgModule({
  declarations: [%CLASS_NAME%Component],
  imports: [CommonModule],
  providers: [%CLASS_NAME%Service]
})
export class %CLASS_NAME%Module {}