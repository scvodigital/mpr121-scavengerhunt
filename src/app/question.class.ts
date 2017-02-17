/**
 * Created by alex on 14/02/17.
 */
export class Question {
  organisation: string;
  question: string;
  answers: Answer[] = [];
  rightanswer: number;

  constructor (organisation: string, question: string, answers: Answer[]) {
    this.organisation = organisation;
    this.question = question;
    for (var x = 0; x < answers.length; x++) {
      this.answers.push(answers[x]);
      if (answers[x].right) this.rightanswer = x;
    }
  }

  generateSequences (right_sequence: string[]) {
    let index = 0;
    let used_seqs : string[]= [right_sequence.toString()];
    let rightindex;
    for (var x = 0 ; x < this.answers.length; x++) {
      if (this.answers[x].right) {
        // Good answer.
        this.answers[x].setSequence(right_sequence);
        rightindex = x;
      }
    }
    for (var y = 0; y < this.answers.length; y++){
      if (!this.answers[y].right) {
        let seq : string[] = this.randomArray((rightindex + y % 4), right_sequence);
        this.answers[y].setSequence(seq)
      }
    }
  }


  randomArray ( inputIndex, inputsequence) {
    var possible = "ABCDEFG";
    var out = [];
    for (var i = 0; i < inputsequence.length; i++) {
      let seqchar = inputsequence[i];
      for (var j = 0; j < possible.length; j++) {

        if (seqchar === possible[j]) {
            var newindex = (j + (inputIndex + 1)) % 7;
            out.push(possible.charAt(newindex));
        }
      }

    }
    return out;
  }
}

class Answer {
  answer: string;
  sequence: string[];
  right: boolean;

  constructor (answer: string, right: boolean) {
    this.answer = answer;
    this.right = right;
  }

  setSequence(seq:string[]) {
    this.sequence = seq;
  }
}

export class Questions_All {


  public static ANSWER_ARRAY = [
    ['E','E','F','G','G'],
    ['F','E','D','C','C'],
    ['D','E','E','D','D'],
    ['E','E','F','G','G'],
    ['F','E','D','C','C'],
    ['D','E','D','C','C']
    // Ode to joy: EEFGG FEDCC DEEDD - EEFGG FEDCC DEDCC
  ]

    public static Q1 = new Question(
        "SCVO Team Digital (you are here!)",
        "Who is Good HQ being built by?",
        [
            new Answer("SCVO Comms", false),
            new Answer("SCVO Digital", false),
            new Answer("SCVO Labs", true),
            new Answer("SCVO Golden Retrievers", false),
        ]
    )
    public static Q2 = new Question(
        "Organisation 2",
        "This is a very long question. I don't know why anyone would want to have a question as long as this one but here it is in order to test. What was the question?",
        [
            new Answer("This is a wrong answer", false),
            new Answer("This is another RIGHT answer", true),
            new Answer("This is a further wrong answer", false),
            new Answer("This is another wrong answer that is longer than the rest", false),
        ]
    )
    public static Q3 = new Question(
        "Browsealoud (stand 7)",
        "How many languages does Browsealoud offer?",
        [
            new Answer("7",  false),
            new Answer("89", false),
            new Answer("99", true),
            new Answer("35", false),
        ]
    )
    public static Q4 = new Question(
        "Organisation 4",
        "This is a question",
        [
            new Answer("This is a RIGHT answer",  true),
            new Answer("This is another wrong answer that is longer than the rest", false),
            new Answer("This is a further wrong answer", false),
            new Answer("This is another wrong answer and more", false),
        ]
    )
    public static Q5 = new Question(
        "Organisation 5",
        "This is a question that is longer than the rest",
        [
            new Answer("This is a wrong answer",  false),
            new Answer("This is another wrong answer that is longer than the rest", false),
            new Answer("This is a further wrong answer", false),
            new Answer("This is another RIGHT answer that is longer than the rest", true),
        ]
    )
    public static Q6 = new Question(
        "Organisation 6",
        "This is a question",
        [
            new Answer("This is a wrong answer",  false),
            new Answer("This is another RIGHT answer", true),
            new Answer("This is a further wrong answer", false),
            new Answer("This is another wrong answer and a half", false),
        ]
    )
    // public static Q7 = new Question(
    //     "Organisation 7",
    //     "This is a question",
    //     [
    //         new Answer("This is a wrong answer",  false),
    //         new Answer("This is another wrong answer", false),
    //         new Answer("This is a further RIGHT answer", true),
    //         new Answer("This is another wrong answer and a half", false),
    //     ]
    // )
}
