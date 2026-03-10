import type { Note } from "../types/Note"

export default function NoteCard({ note }: { note: Note }) {

  const randomRotation = Math.floor(Math.random() * 6) - 3

  return (
    <div
      className="p-4 rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: note.color,
        transform: `rotate(${randomRotation}deg)`
      }}
    >
      <p className="text-sm sm:text-base leading-relaxed">
        {note.content}
      </p>

      {note.author && (
        <p className="text-xs mt-4 text-right opacity-70 italic">
          — {note.author}
        </p>
      )}
    </div>
  )
}