import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFont'
})
export class NumFontPipe implements PipeTransform {

  farsi = ['۰','۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  english = ['0','1','2','3','4','5','6','7','8','9']
  result = ''
  transform(num: string): string {
    if(num == null || num == undefined || num==''){
      this.result = ''
      return ''
    }
    // if(num.length < this.result.length){
    //     this.result = this.result.substring(0, num.length)
      
    // }
    let Array = num.split('')
    Array.forEach((el, i)=>{
      this.english.forEach((ell, j)=>{
        if(el == ell){
          this.result += this.farsi[j]
        }
      })
    })
    return this.result
  }

}
