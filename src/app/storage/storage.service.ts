/**
 * Created by alex on 14/02/17.
 */
import { Injectable } from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';
import {Participant} from '../Participant'

@Injectable()
export class StorageService {

  current : Participant = null;
  // An object which stores Participants by their email
  all : {} = null;
  constructor(private storage:LocalStorageService) {
    this.all = storage.retrieve("allusers");
  }

  public getUser(email): Participant {
      if (this.all[email]) return this.all[email];
      else {
        let x = new Participant(email);
        this.all[email] = x;
        this.persist();
        return x;
      }
  }

  public saveUser(person:Participant){
      this.all[person.email] = person;
      this.persist();
  }

  persist(){
    this.storage.store("allusers", this.all);
  }
}
