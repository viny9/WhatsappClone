import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

constructor(private db:AngularFirestore) { }
  
 readChats() {
  return this.db.collection('chats').get()
}

deleteChat(id:any) {
  return this.db.collection('chats').doc(id).delete()
}

getProfile() {
  return this.db.collection('profile').get()
}

updateProfile(profileInfos:any) {
  return this.db.collection('profile').doc('ByUiN2KRqGV2KOpDDtnz').update(profileInfos)
}

messages(id:any) {
  return this.db.collection(`/chats/${id}/messages`).get()
}

sendMessages(mesaage:any, id:any) {
   return this.db.collection(`/chats/${id}/messages`).add(mesaage)
 }

 deleteMessage(userId:any, id:any) {
   return this.db.collection(`/chats/${userId}/messages`).doc(id).delete()
 }

 archiveAndUnarchive(user:any, id:any) {
  return this.db.collection('/chats').doc(id).update(user)
 }

}