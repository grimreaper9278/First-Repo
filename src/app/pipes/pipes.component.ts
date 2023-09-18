import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormControlDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent {
    separator = new FormControl('', {nonNullable: true})

  
  number = ''
  string: string = '0'
  log(){
    console.log(this.number)
  }
  numSep(){
    this.string = this.separator.getRawValue()
  }
}
//this is a test
//tests 2
// sdfghjk
// jjjjjjhgfyukjnbvhjk