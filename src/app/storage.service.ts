/**
 * Created by alex on 14/02/17.
 */
import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ng2-webstorage';

import { Participant } from './participant.class'

@Injectable()
export class StorageService {

  current : Participant = null;
  // An object which stores Participants by their email
  private all: { [name: string]: Participant };
  constructor (private storage:LocalStorageService) {
    this.all = storage.retrieve("allusers");
    if (!this.all) this.all = {};
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

  public saveUser(person:Participant) {
    this.all[person.email] = person;
    this.persist();
  }

  public deleteAll() {
    this.all = {};
    this.persist();
  }


  public usersToConsole(winscore){
    if (winscore) console.log("Winners (threshold: " + winscore + ")")
    var allthis = this.all;
    Object.keys(allthis).forEach(function(key){
      let p :Participant = allthis[key];
      if (winscore){
        if (Participant.getProgress(p) < winscore) return;
      }
      console.log(p.email + " - " + "Day:" + p.day + " Correct answers: " + Participant.getProgress(p));
    })

  }

  /** Gives texty winners for each day. */
  public pickWinners(winscore){
    let allthis = this.all;
    let winnergroups = {};
    let winners = [];
    Object.keys(allthis).forEach(function(key){
      let p :Participant = allthis[key];
      if (winscore){
        if (Participant.getProgress(p) < winscore) return;
      }
      if (!winnergroups[p.day]) winnergroups[p.day] = [];
        winnergroups[p.day].push(p.email);
    })

    Object.keys(winnergroups).forEach(function(key){
      let listOfWinners = winnergroups[key];
      if (listOfWinners.length){
        winners.push("DAY: " + key + " WINNER:" + listOfWinners[Math.floor(Math.random() * listOfWinners.length)]);
      }
    })
    return winners;
  }

  persist() {
    this.storage.store("allusers", this.all);
  }
}
