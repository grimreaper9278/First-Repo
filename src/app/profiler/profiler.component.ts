import { Component, Input} from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { ChangeDetectorRef } from '@angular/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiler',
  templateUrl: './profiler.component.html',
  styleUrls: ['./profiler.component.css']
})
export class ProfilerComponent {
  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private router: Router
    ){}
    @Input() profile?: Profile
    search: string = ''
    profileList: Profile[] = []

  ngOnInit(){
    this.getProfiles()
  }

  getProfiles(){
    this.profileService.getProfiles().subscribe(
      (profileList) =>{
        this.profileList = []
        if (this.search) {
          profileList.forEach(arrMem => {
            if ((arrMem.firstName.toLowerCase() + arrMem.lastName.toLowerCase() + arrMem.address?.toLowerCase()).includes(
              this.search.toLowerCase()
              )) {
              this.profileList.push(arrMem)
            }
          });
        }else{
          this.profileList = profileList
        }
      } )
      this.cdr.detectChanges()
  }

  delete(profile: Profile): void{
    this.profileList = this.profileList.filter(p => p!== profile)
    this.profileService.deleteProfile(profile.id).subscribe()
  }

nav(id: number){

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['home', id]);
});
}  

}
