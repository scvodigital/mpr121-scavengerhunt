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

  public day: number = new Date().getDate();

  constructor (public email: string) {
    this.email = email;
  }


  /**
   * Static, because TS is a pain in the arse.
   * @param userObject
   * @returns {number}
   */
  public static getProgress(userObject) {
    let done : number = 0;
    var prog = userObject.progress;
    Object.keys(prog).forEach(function(key){
      if (prog[key]) done++;
    })
    return done;
  }

  // /** Because TS Lies, and  **/
  // static castParticipant(o : {}) : Participant{
  //   let ourpar = new Participant(o["email"]);
  //   ourpar.lives = o["lives"];
  //   ourpar.progress = o["progress"];
  //   ourpar.day = o["day"];
  //   return ourpar;
  // }
}
