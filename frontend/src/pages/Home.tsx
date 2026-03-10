import { useNotes } from "../hooks/useNotes"
import NoteForm from "../components/NoteForm"
import NoteGrid from "../components/NoteGrid"

export default function Home(){

  const { notes, createNote, count } = useNotes()

  return (

    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-50 to-pink-50 py-12">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
          Sticky Wall
        </h1>

        <p className="text-center text-gray-500 mb-2">
          Leave a thought for a stranger on the internet
        </p>

        <p className="text-center text-sm text-gray-400 mb-10">
          🌎 {count} thoughts shared by strangers
        </p>

        <NoteForm createNote={createNote} />

        <NoteGrid notes={notes} />

      </div>

    </div>
  )
}