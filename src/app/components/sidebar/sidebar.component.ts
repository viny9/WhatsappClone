import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Output() user = new EventEmitter()

  chats: any [] = []
  newChat:any [] = []
  messages:any [] = []
  archived: Boolean = false
  sidebar: Boolean = false
  profile: Boolean = false
  searchInput: string = ''
  userInfos: any
  id: any

  constructor(private db: DbService) {}

  ngOnInit(): void {
    const chat: any = []

    //Pega as informações do fireStore do firebase 
    this.db.readChats().subscribe((infos: any) => {
      infos.docs.forEach((doc: any) => {
        chat.push(doc.data())
      })

      // Pega as conversas não arquivadas
      const filte = chat.filter(function (obj: any) {
        if (obj.archived == false) {
          return obj
        } else {
          return false
        }
      })

      this.chats = filte
      this.newChat = filte

      // Vai dizer se o componente de arquivadas vai ser disponibilizado
      chat.map((infos: any) => {
        if (infos.archived == true) {
          this.archived = true
        }
      })
    })
  }

  close(infos: any) {
    // Componentes
    this.sidebar = infos
    this.profile = infos
  }

  archive() {
    this.db.archiveAndUnarchive({
      archived: true
    }, this.id)
  }

  search() {
    // Pesquisar as conversas
    const input = this.searchInput
    const chate = this.chats
    const filter = this.chats.filter(function (chat: any) {
      if (chat.name.includes(input)) {
        return chat
      } else {
      }
    })

      if(filter.length === 0) {
        this.newChat = this.chats
      } else{
        this.newChat = filter
      }
  }

  delete() {
    this.db.deleteChat(this.id)
  }

  getUserInfos(infos: any) {
    this.userInfos = infos
  }

  findId(name: any) {
    // Procurar o id das conversas
    this.db.readChats().subscribe(infos => {

      const ids: any = infos.docs
      const names: any = ids.map((infos: any) => {
        return infos.data().name
      })
      const index = names.indexOf(name)
      const id = ids[index].id
      this.id = id

      // this.selectChat() //Tem que ser chamada aqui se não o id vai ter um click de atraso
      this.selectChat()
    })
  }

  selectChat() {
    this.user.emit({
      user: this.userInfos,
      id: this.id
    })
  }

  send(chat:any) {
    this.user.emit(chat)
  }

}
