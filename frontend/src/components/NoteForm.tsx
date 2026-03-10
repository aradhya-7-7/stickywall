import { useState } from "react"

interface Props {
  createNote: (data: {
    content: string
    author?: string
    color: string
  }) => void
}

export default function NoteForm({ createNote }: Props) {

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")

  const colors = [
    { name: "Sunny Yellow", value: "#fde68a" },
    { name: "Sky Blue", value: "#bfdbfe" },
    { name: "Mint Green", value: "#bbf7d0" },
    { name: "Soft Pink", value: "#fbcfe8" },
    { name: "Coral Red", value: "#fecaca" },
    { name: "Lavender Purple", value: "#e9d5ff" }
  ]

  const [color, setColor] = useState(colors[0].value)

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (!content.trim()) return

    createNote({
      content,
      author,
      color
    })

    setContent("")
    setAuthor("")
    setOpen(false)
  }

  return (
    <>
      {/* Write Note Button */}

      <div className="flex justify-center mb-10">

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          + Write a Note
        </button>

      </div>

      {/* Modal */}

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl mx-4">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold">
                Leave a Note
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>

            </div>

            <form onSubmit={submit} className="space-y-4">

              <textarea
                placeholder="Write your thought..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
                rows={3}
              />

              <input
                type="text"
                placeholder="Name (optional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200"
              />

              {/* Color Picker */}

              <div className="grid grid-cols-2 gap-2">

                {colors.map((c) => (

                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition ${
                      color === c.value
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: c.value }}
                    />

                    <span className="text-sm">
                      {c.name}
                    </span>

                  </button>

                ))}

              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Post Note
              </button>

            </form>

          </div>

        </div>

      )}
    </>
  )
}