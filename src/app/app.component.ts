import { Component,Inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { Profile } from './profile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profile-app';
  constructor(
    private router: Router
    ){}
    profileList: Profile[] = []
    profileService: ProfileService = Inject(ProfileService)

    ngOnInit(){
      this.router.navigate(['pipe'])
    }
  }
