import { ChangeDetectorRef, Component,Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProfilerComponent } from '../profiler/profiler.component';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
constructor(
  private http: HttpClient,
  private profileService: ProfileService,
  private fb: FormBuilder,
  private cdr:ChangeDetectorRef,
  private profiles: ProfilerComponent,
  private router: Router,
  private route: ActivatedRoute
  ){}
  
  profileForm = this.fb.group({
    id: 0,
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ]*")]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ]*")]],
    cellNum: ['', [Validators.required, Validators.pattern('^(9|09)+(10|11|12|13|14|15|16|17|18|19|90|91|92|30|33|01|02|03|04|05|35|36|37|38|39|32|20|21|22)+([0-9]{7})$')]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    gender: ['', [Validators.required]],
    phone: this.fb.array([
      this.fb.control('')
    ])
  })
  //, [Validators.pattern('^(\s*|[0-9]{8})$')]
  
  ngOnInit(){
    if(this.route.snapshot.paramMap.get('id')){
      this.getProfile()
      this.editing = true
      console.log(this.editing)
    }
  }
  wtf: string = ''
 editing: boolean = false
submitted: boolean = false
loading: boolean = false
invalid: boolean = false
failed: boolean = false

submit(){
  this.submitted = true
  if (this.profileForm.valid){
    this.loading=true
    this.profileService.submitProfile(
      this.profileForm.value as Profile
      ).subscribe((profile) => {
        this.profiles.profileList.push(profile)
      }, () =>{
        this.failed = true
        this.loading = false
        this.submitted = false
      },
      ()=> {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['home']);
      });
        this.loading = false
        this.submitted = false
      })
      this.profileForm.reset()
    } 
    else {
      console.log('Please fill the required fields')
      this.invalid = true
      this.submitted = false
    }
}

getProfile(){
  const id = Number(this.route.snapshot.paramMap.get('id'))
  this.profileService.getProfile(id).subscribe(
    (profile)=> {this.profile = profile
    this.cdr.detectChanges()
    },
    ()=>{},
    ()=>(this.formSet()))
}




  formSet(){
    this.profileForm.patchValue({
      id: this.profile.id,
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      cellNum: this.profile.cellNum,
      email: this.profile.email,
      address: this.profile.address,
      gender: this.profile.gender,
      phone: this.profile.phone
    })
    if (this.profile.phone.length>1) {
      this.profile.phone.forEach((element, i) => {
        if(i > 0){
          this.phone.push(this.fb.control(element))
        }
        
      });
    }
  }
  id = Number(this.route.snapshot.paramMap.get('id'))
  save(){
    this.submitted = true
    if (this.profileForm.valid){
      this.loading=true
      this.profileService.updateProfile(this.profileForm.value as Profile, this.id).subscribe(
        ()=>{},
        ()=>{},
        ()=> {        
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['home']);
      });
    })
      } 
      else {
        console.log('Please fill the required fields')
        this.invalid = true
        this.submitted = false
      }
  }



get phone(){
  return this.profileForm.get('phone') as FormArray;
}

get firstName(){ return this.profileForm.get('firstName') }
get lastName(){ return this.profileForm.get('lastName') }
get email(){ return this.profileForm.get('email') }
get cellNum(){ return this.profileForm.get('cellNum') }
get gender(){ return this.profileForm.get('gender') }
get address(){ return this.profileForm.get('address') }

addPhone(){
  this.phone.push(this.fb.control(''))
  this.cdr.detectChanges()
}
@Input() profile!: Profile
}
