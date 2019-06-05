import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseCharacters'
})
export class ReverseCharactersPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let reverseString : string="" ;
    for(var i=value.length-1;i>=0;i--)
    {
      reverseString += value.charAt(i);
    }
    return reverseString;
  }

}
