/**
 * Created by alex on 14/02/17.
 */
export class Question {
  text : string;
  answers : Answer[] = [];
  rightanswer : number;

  constructor(text : string, answers : Answer[]){
    this.text = text;
    for (var x = 0; x < answers.length; x++){
      this.answers.push(answers[x]);
      if (answers[x].right) this.rightanswer = x;
    }
  }

  generateSequences(right_sequence : string[]){
    let index = 0;
    let used_seqs : string[]= [right_sequence.toString()];
    while (index < this.answers.length){
      if (this.answers[index].right){
        // Good answer.
        this.answers[index].setSequence(right_sequence);
      }
      else {
        // Bad answer
      while(true){
        let seq : string[] = this.randomArray(right_sequence.length);
        if (used_seqs.indexOf(seq.toString()) > -1) continue;
        this.answers[index].setSequence(seq)
        used_seqs.push(seq.toString());
        break;
      }
      }
      index++;
    }

  }

  randomArray (length) {
    var possible = "ABCDEFG";
    var out = [];
    for (var i = 0; i < length; i++) {
      var char = possible.charAt(Math.floor(Math.random() * possible.length));
      out.push(char);
    }
    return out;
  }
}

class Answer {
  text : string;
  sequence :string[];
  right: boolean;
  constructor(text : string, right : boolean){
    this.text = text;
    this.right = right;
  }

  setSequence(seq:string[]){
    this.sequence = seq;
  }
}

export class Questions_All {

  public static ANSWER_ARRAY = [
    ["E", "E"],
    ["F", "G"],
    ["G", "F"],
    ["E", "D"],
    ["C", "C"],
    ["D", "E"],
    ["E", "D", "D"],
    // Ode to joy: EEFG GFED CCDE EDD - EEFG GFED CCDE DCC
  ]
  public static Q1 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another wrong answer", false),
      new Answer("This is the RIGHT answer", true),
      new Answer("This is another wrong answerz", false),
    ]
  )
  public static Q2 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another RIGHT answer", true),
      new Answer("This is a further wrogn answer", false),
      new Answer("This is another wrong answer and a half", false),
    ]
  )
  public static Q3 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another wrong answer", false),
      new Answer("This is a further RIGHT answer", true),
      new Answer("This is another wrong answer and a half", false),
    ]
  )
  public static Q4 = new Question(
    "This is a question",
    [
      new Answer("This is a RIGHT answer",  true),
      new Answer("This is another wrong answer", false),
      new Answer("This is a further wrogn answer", false),
      new Answer("This is another wrong answer and a half", false),
    ]
  )
  public static Q5 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another wrong answer", false),
      new Answer("This is a further wrogn answer", false),
      new Answer("This is another RIGHT answer and a half", true),
    ]
  )
  public static Q6 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another RIGHT answer", true),
      new Answer("This is a further wrogn answer", false),
      new Answer("This is another wrong answer and a half", false),
    ]
  )
  public static Q7 = new Question(
    "This is a question",
    [
      new Answer("This is a wrong answer",  false),
      new Answer("This is another wrong answer", false),
      new Answer("This is a further RIGHT answer", true),
      new Answer("This is another wrong answer and a half", false),
    ]
  )

}
