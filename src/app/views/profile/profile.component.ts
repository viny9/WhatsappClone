import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() profile = new EventEmitter()

  name:any
  bio:any
  img:any
  showN:any = true
  showB:any = true

  constructor(private db:DbService) { }

  ngOnInit(): void {
    const profileInfos:any = []
    this.db.getProfile().subscribe(infos => {
      infos.docs.forEach((doc:any) => {
        profileInfos.push(doc.data())
    })

    this.bio = profileInfos[0].bio
    this.name = profileInfos[0].name
    this.img = profileInfos[0].img

    })
  }

  close() {
    this.profile.emit(false)
  }

  updateInfos() {
    this.db.updateProfile({name: this.name, bio: this.bio})
  }

}
