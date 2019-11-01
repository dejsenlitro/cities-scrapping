import {INotesHandler} from "./interfaces";

// Right now the logic is too simple for it to be worth being in a separate class.
// This way the function for creating notes can be unit tested and easily extended if newer functionality is needed.
export default class NotesHandler implements INotesHandler{
  createNote(teperature: number): string {
    if (teperature < 0)
      return 'Lets get some tea.'
    else if (teperature < 25)
      return 'Lets go for a walk.'
    else
      return 'Lets have a pint.'
  }
}
