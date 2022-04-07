import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  chats:any [] = []
  @Output() user = new EventEmitter()

  constructor(private fire:DbService) {
   }

  ngOnInit(): void {
    this.fire.readChats().subscribe((infos:any) => {
      infos.docs.forEach((doc:any) => {
          this.chats.push(doc.data())
      })
    })
  }

  getInfos(infos:any) {
    this.user.emit(infos)
  }
}
