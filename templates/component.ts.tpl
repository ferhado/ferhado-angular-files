import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "%APP_PREFIX%-%FILE_NAME%",
  templateUrl: "./%FILE_NAME%.component.html",
  styleUrls: ["./%FILE_NAME%.component.%STYLE_EXT%"],
  imports: [CommonModule]
})
export class %CLASS_NAME%Component implements OnInit {

  ngOnInit(): void {
    
  }
}
