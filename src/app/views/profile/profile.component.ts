import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() profile = new EventEmitter()

  user: any = {}
  showN: any = true
  showB: any = true

  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.db.getProfile().subscribe(infos => {
      const profileInfos: any = []

      infos.docs.forEach((doc: any) => {
        profileInfos.push(doc.data())

        const profile = {
          name: profileInfos[0].name,
          bio: profileInfos[0].bio,
          img: profileInfos[0].img
        }
        
        this.user = profile

      })
    })
  }

  close() {
    this.profile.emit(false)
  }

  updateInfos() {
    this.db.updateProfile({
      name: this.user.name,
      bio: this.user.bio
    })
  }

}
