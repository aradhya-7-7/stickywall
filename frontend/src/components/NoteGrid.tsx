import NoteCard from "./NoteCard"
import type { Note } from "../types/Note"

export default function NoteGrid({ notes }: { notes: Note[] }) {

  return (
   <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {notes.map(note => (
        <NoteCard key={note.id} note={note}/>
      ))}
    </div>
  )
}