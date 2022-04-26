import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  @Input() infos: any

  messages: any[] = []
  input: string = ''
  id: any
  messageId:any

  constructor(private db: DbService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.id = changes['infos'].currentValue.id
    this.getMessage()
  }

  findId(message: any) {
    // Procurar o id das mensagens
    this.db.messages(this.id).subscribe(infos => {
      const ids: any = infos.docs
      const messages: any = ids.map((infos: any) => {
        return infos.data().message
      })

      const index = messages.indexOf(message)
      const id = ids[index]?.id
      this.messageId = id
    })
  }

  sendMessage() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()

    // Messagem e suas informações
    const message = {
      message: this.input,
      time: time,
      user: true,
      checked: false
    }

    this.db.sendMessages(message, this.id).then(() => {
      window.location.reload()
    })
  }

  getMessage() {
    //Zera o array pra quando trocar de conversa não adicionar as mensagens anteriores com as novas.
    this.messages = []

    this.db.messages(this.id).subscribe((infos: any) => {
      infos.docs.map((doc: any) => {
        this.messages.push(doc.data())
      })

      //Vai organizar para a ultima menssagem enviada fique sempre embaixo
      this.messages.sort((a:any, b:any):any => {
        return a.time - b.time 
      })
    })
  }

  removeMessage() {
    this.db.deleteMessage(this.id, this.messageId).then(() => {
      window.location.reload()
    })
  }

  transformTime(time:any) {
    const date = new Date(time * 1000)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return `${hour < 10? `0${ hour }`: hour }:${minutes < 10? `0${ minutes }` : minutes }`
  }

}
