import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

constructor(private db:AngularFirestore, private fire:AngularFireDatabase) { }
  
 readChats() {
  return this.db.collection('chats').get()
}

messages() {
  return this.db.collection('/chats/MpJznJTm5hoP6aHMePYB/messages').get()
  
}

sendMessages(mesaage:any) {
   return this.db.collection('/chats/MpJznJTm5hoP6aHMePYB/messages').add(mesaage)
 }

 archiveAndUnarchive(user:any) {
  return this.db.collection('/chats').doc('MpJznJTm5hoP6aHMePYB').update(user)
 }

}