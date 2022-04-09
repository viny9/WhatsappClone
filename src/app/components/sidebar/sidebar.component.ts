import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() user = new EventEmitter()

  chats:any [] = []
  archived:any = false
  sidebar:any = false
  
  constructor(private fire:DbService) {
   }

  ngOnInit(): void {
    const chat:any = []
    this.fire.readChats().subscribe((infos:any) => {
      infos.docs.forEach((doc:any) => {
          chat.push(doc.data())
      })

      const filte = chat.filter(function (obj: any) {
        if (obj.archived == false) {
          return obj
        } else {
          return false
        }
      })

      this.chats = filte

      chat.map((infos:any) => {
        if(infos.archived == true) {
          this.archived = true
        }
      })
    })
  }

  getInfos(infos:any) {
    this.user.emit(infos)
  }

  recive(infos:any) {
    this.sidebar = infos
  }
  
  archive() {
  this.fire.archiveAndUnarchive({ archived: true })  
  }
}
