import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  @Output() sidebar = new EventEmitter()
  @Output() chat = new EventEmitter()

  chats: any[] = []
  archived: Boolean = false
  id:string = ''
  selected:any

  constructor(private db: DbService) {}

  ngOnInit(): void {
    const chat: any = []

    this.db.readChats().subscribe((infos: any) => {
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
    this.db.archiveAndUnarchive({ archived: false }, this.id)
  }

  findId(name:any) {
    this.db.readChats().subscribe(infos => {

      const ids:any = infos.docs
      const names:any = ids.map((infos:any) => { return infos.data().name })
      const index = names.indexOf(name)

    this.id = ids[index].id

    this.selectedChat()
    }
  )}

  getChat(chat:any) {
    this.selected = chat
  }

  selectedChat() {
    const chat = {
      id: this.id,
      user: this.selected
    }

    this.chat.emit(chat)
  }

  delete() {
    this.db.deleteChat(this.id)
  }

}
