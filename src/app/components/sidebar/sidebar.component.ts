import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  profile:any [] = []
  chats:any [] = []

  constructor(private fire:DbService) { }

  ngOnInit(): void {
    this.fire.readChats().subscribe((infos:any) => {
      infos.docs.forEach((doc:any) => {
          this.chats.push(doc.data())
      })
    })
  }
}
