import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFormat'
})
export class NumFormatPipe implements PipeTransform {
  transform(value: string) {
    let splited = value.split(',')
    let string = ''
    splited.forEach((el=>{
      string += el
    }))
    return string.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }

}
