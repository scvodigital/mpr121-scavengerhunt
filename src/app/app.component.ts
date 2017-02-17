import { Component, OnInit, AfterViewInit, HostListener, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Question, Questions_All } from './question.class';
import { Participant } from './participant.class';
import { Cmd } from './cmd.class';

import { StorageService } from './storage.service';

@Component({
  selector: 'fruitkeyboard',
  providers: [StorageService],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // i.e. how many questions to win?
  WIN : number = 6;
  progress : number = 0;
  fruitListener = new FruitListener();
  currentUser: Participant = null;
  currentQuestion : string = null;
  participant: FormGroup;
  mode: string = "select";
  lastKey: string = null;
  email_input: string = null;
  progressBar : string[] = [];
  winnerstext : string[] = [];
  public focusSettingEventEmitter = new EventEmitter<boolean>();

  // Don't use key B, alt shift and B does something!
  ALLOWED_KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyL']
  COMMAND_BACK = 'BACK';
  KEY_MAP = {
    'KeyA' : 'B',
    'KeyS' : 'C',
    'KeyD' : 'D',
    'KeyF' : 'E',
    'KeyG' : 'F',
    'KeyH' : 'G',
    'KeyJ' : 'A', // Not used, but is a note.
    // 'KeyK' : 'H',  // I know there is no H, do with this what you will, maybe Change instrument?
    'KeyL' : Cmd.BACK,
  }

  QUESTIONS = {
    A: Questions_All.Q1,
    B: Questions_All.Q2,
    C: Questions_All.Q3,
    D: Questions_All.Q4,
    E: Questions_All.Q5,
    F: Questions_All.Q6
  }

  constructor(private st:StorageService) {}

  ngOnInit() {
    this.participant = new FormGroup({
      email: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.focusSettingEventEmitter.emit(true);
  }

  qKeys() : string[] {
    return Object.keys(this.QUESTIONS);
  }

  onSubmit({ value, valid }: { value:Participant, valid: boolean }, event) {
    event.preventDefault();
    if (value.email === Cmd.CODE_DELETE_ALL){
      return this.st.deleteAll();
    }
    if (value.email === Cmd.CODE_PRINT_ALL){
      return this.st.usersToConsole(0);
    }
    if (value.email === Cmd.CODE_PRINT_WINNERS){
      return this.st.usersToConsole(this.WIN);
    }
    if (value.email === Cmd.CODE_PICK_WINNERS){
      this.winnerstext = this.st.pickWinners(this.WIN);
      return
    }
    // console.log(value, valid);
    this.currentUser = this.st.getUser(value.email.toLowerCase())
    this.setProgressBar();

  }

  logOut() {
    this.resetState();
    this.currentUser = null;
    this.email_input = null;
    this.focusSettingEventEmitter.emit(true);
    this.mode = "select";
  }

  setQuestion(command: string) {
    if (command === this.COMMAND_BACK) {
      return this.logOut();
    } else if (this.currentUser.progress[command] || command === 'G') {
      return // No action, question done.
    } else {
      let sequence = Questions_All.ANSWER_ARRAY[Participant.getProgress(this.currentUser)];
      // if (!sequence) return console.error("No sequence associated with this key!");
      // console.log(this.QUESTIONS[command]);
      this.QUESTIONS[command].generateSequences(sequence);
      this.fruitListener.load(sequence);
      this.currentQuestion = command;
      this.mode = "go";
    }
  }

  answerQuestion(command: string) {
    if (command === this.COMMAND_BACK){
      this.backToSelect();
    }
    else {
      let isGood = this.fruitListener.listen(command);
      // this.lastKey = command + " (" + isGood + "!)";
      this.lastKey = command;

      if (isGood == Cmd.WIN) {
        return this.winQuestion();
      }
      if (isGood == Cmd.OK || isGood == Cmd.NO_ACTION){
        return;
      }
      if (isGood = Cmd.INJURE){
        this.fruitListener
        return this.injureUser();
      }
    }
  }

  backToSelect() {
    this.resetState();
    this.mode = "select";
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
    this.setProgressBar();
    // console.log("Win mode, " + this.mode);
  }

  setProgressBar(){
    // Gets answers up to now. Inefficient, but doesn't leave variables hanging around to be wrong.
    this.progress = Participant.getProgress(this.currentUser);
    let out = [];
    for (var x = 0; x < this.progress ; x++){
      var aa = Questions_All.ANSWER_ARRAY[x];
      out = out.concat(Questions_All.ANSWER_ARRAY[x]);
    }
    this.progressBar = out;
  }

  injureUser() {
    this.currentUser.lives--;
    this.st.saveUser(this.currentUser);
    this.injureEffect();
    if (this.currentUser.lives < 1) this.mode = "dead";
  }

  injureEffect() {
    // Play a sound? Special lighting effect? Dunno what to do here.
  }

  handleFruitCommand(command: string) {
    if (!this.currentUser){
      console.log("Not logged in, not doing anything");
    } else if (this.mode === 'select') {
      this.setQuestion(command);
    } else if (this.mode === 'go') {
        console.log(command + "pressed");
      this.answerQuestion(command);
    } else if (this.mode === 'win') {
      this.backToSelect();
    } else if (this.mode === 'dead') {
      if (command === this.COMMAND_BACK){
        this.logOut();
      }
      else {
        // Nothing else.
      }
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

  createRange(number) {
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }
}

// This is the thing which checks music status
class FruitListener {

  sequence : string[] = null;
  partialsequence : string [] = [];
  index : number = 0;
  lastNote : string = null;
  error : boolean = false;
  constructor () {}

  reset() {
    this.sequence = null;
    this.partialsequence= null;
    this.index = 0;
    this.lastNote = null;
    this.error = false;
  }

  load(sequence : string[]) {
    this.sequence = sequence;
  }

  setIndex(to){
    this.index = to;
    this.partialsequence = this.sequence.slice(0, this.index);
  }

  listen(note : string){
    // Right note
    if (this.sequence[this.index] === note){
      this.error = false;
      this.setIndex(this.index+1);
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
      this.setIndex(0);
      this.error = true;
      return Cmd.INJURE;

    }
    // Wrong note

  }
}
