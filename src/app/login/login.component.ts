import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { StorageService } from '../storage/storage.service';

import { Participant } from '../Participant';
import { Cmd } from '../Cmd';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    fruitListener = new FruitListener();
    currentUser: Participant = null;
    currentQuestion : string = null;
    login: FormGroup;
    mode: string = "select";
    // Don't use key B, alt shift and B does something!
    ALLOWED_KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL']
    COMMAND_BACK = 'BACK';
    KEY_MAP = {
      'KeyA' : 'A',
      'KeyS' : 'B',
      'KeyD' : 'C',
      'KeyF' : 'D',
      'KeyG' : 'E',
      'KeyH' : 'F',
      'KeyJ' : 'G',
      'KeyK' : 'H',  // I know there is no H, do with this what you will, maybe Change instrument?
      'KeyL' : Cmd.BACK,
    }

    // Ode to joy: EEFG GFED CCDE EDD - EEFG GFED CCDE DCC
    ANSWERS = {
      A: ['E', 'E'],
      B: ['F', 'G'],
      C: ['G', 'F'],
      D: ['E', 'D'],
      E: ['C', 'C'],
      F: ['D', 'E'],
      G: ['E', 'D', 'D'],
    }

    constructor(private st:StorageService) {}

    ngOnInit() {
        this.login = new FormGroup({
            email: new FormControl(''),
        });
    }

    onSubmit({ nouser, valid }: { nouser: Participant, valid: boolean }) {
        console.log(nouser, valid);
        this.currentUser = this.st.getUser(nouser.email)
    }

    logOut() {
      this.mode = "select";
      this.fruitListener.reset();
      this.currentUser = null;
    }

    setQuestion(command : string){
      if (command === this.COMMAND_BACK) return this.logOut();
      else {
        let sequence = this.ANSWERS[command];
        if (!sequence) return console.error("No sequence associated with this key!");
        this.fruitListener.load(sequence);
        this.currentQuestion = command;
        this.mode="go";
      }
    }

    answerQuestion(command : string){
      if (command === this.COMMAND_BACK){
        this.backToSelect();
      }
      else {
        let isGood = this.fruitListener.listen(command);
        if (isGood == Cmd.WIN){
          return this.winQuestion();
        }
        if (isGood == Cmd.OK || isGood == Cmd.NO_ACTION){
          return;
        }
        if (isGood = Cmd.DIE){
          return this.injureUser();
        }
      }
    }

    backToSelect(){
      this.fruitListener.reset();
      this.currentQuestion = null;
      this.mode= "select";
    }

    winQuestion(){
      this.currentUser.progress[this.currentQuestion] = true;
      this.st.saveUser(this.currentUser);
      this.backToSelect()
    }

    injureUser(){
      this.currentUser.lives--;
      this.injureEffect();
      if (this.currentUser.lives <= 0) this.mode = "failstate";
    }

    injureEffect(){
      // Play a sound? Special lighting effect? Dunno what to do here.
    }

  handleFruitCommand(command : string){
      if (!this.currentUser){
        console.log("Not logged in, not doing anything");
      } else if (this.mode === 'select'){
        this.setQuestion(command);
      } else if (this.mode === 'go'){
        this.answerQuestion(command);
      }
    }

  @HostListener('document:keydown', ['$event'])
    keydown(e: KeyboardEvent) {
      if (!e.altKey || !e.shiftKey) return;
      if (this.ALLOWED_KEYS.indexOf(e.code) > -1){
        let command = this.KEY_MAP[e.code];
        this.handleFruitCommand(command);
      }
      return;
    }

}

// This is the thing which checks music status
class FruitListener {

  sequence : string[] = null;
  index : 0;
  lastNote : string = null;

  constructor(){}

  reset(){
    this.sequence = null;
    this.index = 0;
    this.lastNote = null;
  }

  load(sequence : string[]){
    this.sequence = sequence;
  }

  listen(note : string){
    // Right note
    if (this.sequence[this.index] === note){
      this.index++;
      this.lastNote = note;
      if (this.index >= this.sequence.length){
        // All done, win!
        this.reset();
        return Cmd.WIN;
      } else {
        // Is good, next note.
        return Cmd.OK;
      }
    }
    // Catch stutters -- this means that you can play the same note as many times as you want, and not fail
    else if (note === this.lastNote){
      return Cmd.NO_ACTION;
    }
    else {
      return Cmd.DIE;
    }
    // Wrong note

  }
}
