import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { StorageService } from '../storage/storage.service';
import { Question, Questions_All } from '../Question';

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
    participant: FormGroup;
    mode: string = "select";
    lastKey: string = null;
    // Don't use key B, alt shift and B does something!
    ALLOWED_KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyL']
    COMMAND_BACK = 'BACK';
    KEY_MAP = {
      'KeyA' : 'A',
      'KeyS' : 'B',
      'KeyD' : 'C',
      'KeyF' : 'D',
      'KeyG' : 'E',
      'KeyH' : 'F',
      'KeyJ' : 'G',
      // 'KeyK' : 'H',  // I know there is no H, do with this what you will, maybe Change instrument?
      'KeyL' : Cmd.BACK,
    }

    QUESTIONS = {
      A: Questions_All.Q1,
      B: Questions_All.Q2,
      C: Questions_All.Q3,
      D: Questions_All.Q4,
      E: Questions_All.Q5,
      F: Questions_All.Q6,
      G: Questions_All.Q7,
    }

    constructor(private st:StorageService) {}

    ngOnInit() {
      this.participant = new FormGroup({
        email: new FormControl(''),
      });
    }

    qKeys() : string[] {
      return Object.keys(this.QUESTIONS);
    }

    onSubmit({ value, valid }: { value:Participant, valid: boolean }, event) {
        event.preventDefault();
        console.log(value, valid);
        this.currentUser = this.st.getUser(value.email)
    }

    logOut() {
      this.resetState();
      this.currentUser = null;
    }

    setQuestion(command : string){
      if (command === this.COMMAND_BACK) return this.logOut();
      else if (this.currentUser.progress[command]){
        return // No action, question done.
      }
      else {
        let sequence = Questions_All.ANSWER_ARRAY[this.currentUser.getProgress()]
        if (!sequence) return console.error("No sequence associated with this key!");
        this.QUESTIONS[command].generateSequences(sequence);
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
        this.lastKey = command + " (" + isGood + "!)"

        if (isGood == Cmd.WIN){
          return this.winQuestion();
        }
        if (isGood == Cmd.OK || isGood == Cmd.NO_ACTION){
          return;
        }
        if (isGood = Cmd.INJURE){
          return this.injureUser();
        }
      }
    }

    backToSelect(){
      this.resetState();
      this.mode= "select";
    }

    resetState(){
      this.fruitListener.reset();
      this.currentQuestion = null;
      this.lastKey = null;
    }

    winQuestion(){
      this.currentUser.progress[this.currentQuestion] = true;
      this.st.saveUser(this.currentUser);
      this.mode = "win";
      console.log("Win mode, " + this.mode);
    }

    injureUser(){
      this.currentUser.lives--;
      this.injureEffect();
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
      } else if (this.mode === 'win'){
        this.backToSelect();
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
  index : number = 0;
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
      this.lastNote = note;
      return Cmd.INJURE;
    }
    // Wrong note

  }
}
