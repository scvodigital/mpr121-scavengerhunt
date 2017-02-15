/**
* Created by alex on 14/02/17.
*/
export class Participant {

    public progress = {
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
        F: false,
        G: false
    }

    public lives: number = 5;

    constructor (public email: string) {
        this.email = email;
    }
}
