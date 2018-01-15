import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CustomPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let month = value.substring(5, 2);
    let year = value.substring(0, 4);
    let formatted = month + '/' + year;
    return formatted;
  }
}
