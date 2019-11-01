import {expect} from 'chai'
import NotesHandler from "../src/notesHandler";

const notesHandler = new NotesHandler()

// TODO: create mock database and add tests for data from database
describe('Notes Handler', () => {
  it('Temperature: -0.0001, note: Lets get some tea. ', async () => {
    const temperature: number =  -0.0001

    expect(notesHandler.createNote(temperature)).equal('Lets get some tea.')
  })

  it('Temperature: 0, note: Lets go for a walk. ', async () => {
    const temperature: number = 0

    expect(notesHandler.createNote(temperature)).equal('Lets go for a walk.')
  })

  it('Temperature: 24.99, note: Lets go for a walk. ', async () => {
    const temperature: number = 24.99

    expect(notesHandler.createNote(temperature)).equal('Lets go for a walk.')
  })

  it('Temperature: 25, note: Lets go for a walk. ', async () => {
    const temperature: number = 25

    expect(notesHandler.createNote(temperature)).equal('Lets have a pint.')
  })
})
