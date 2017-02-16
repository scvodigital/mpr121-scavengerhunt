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

        // Ode to joy: EEFG GFED CCDE EDD - EEFG GFED CCDE DCC
    ]

    public static Q1 = new Question(
        "SCVO Team Digital",
        "What does the HQ in Good HQ stand for?",
        [
            new Answer("Honorary consulate", false),
            new Answer("Headquarters", true),
            new Answer("Highly Qualified", false),
            new Answer("Hard Questions", false),
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
        "Organisation 3",
        "This is a question",
        [
            new Answer("This is a wrong answer",  false),
            new Answer("This is another wrong answer", false),
            new Answer("This is a further RIGHT answer that is longer than the rest", true),
            new Answer("This is another wrong answer", false),
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
