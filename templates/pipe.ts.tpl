import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: '%FILE_NAME%'
})
export class %CLASS_NAME%Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}