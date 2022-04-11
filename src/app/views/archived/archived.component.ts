import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  @Output() sidebar = new EventEmitter()

  chats: any[] = []
  archived: any

  constructor(private fire: DbService) {}

  ngOnInit(): void {
    const chat: any = []

    this.fire.readChats().subscribe((infos: any) => {
      infos.docs.forEach((doc: any) => {
        chat.push(doc.data())
      })

      const filte = chat.filter(function (obj: any) {
        if (obj.archived == true) {
          return obj
        } else {
          return false
        }
      })
      
      this.chats = filte
      this.archived = filte
      
      this.chats.map((infos: any) => {
        if (infos.archived == true) {
          this.archived = true
        }
      })

    })
  }

  close() {
    this.sidebar.emit(false)
  }

  unarchive() {
    this.fire.archiveAndUnarchive({ archived: false })
  }

}
