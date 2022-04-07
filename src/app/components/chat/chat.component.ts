import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() infos:any

  messages:any [] = []
  input:string = ''

  constructor(private db:DbService) { }

  ngOnInit(): void {
    this.db.messages().subscribe((infos:any) => {
      infos.docs.map((doc:any) => {
        this.messages.push(doc.data())
      })
      })
      console.log(this.messages)
  }
  

  sendMessage() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()

    const message = {
      message: this.input,
      time: `${hours < 10? `0${hours}` : hours}:${minutes < 10? `0${minutes}` : minutes}`,
      user: true,
      checked: false
    }

    this.db.sendMessages(message).then(() => {
      window.location.reload()
    })
  }
}
