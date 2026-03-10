import { useEffect, useState } from "react"
import { api } from "../services/api"
import type { Note } from "../types/Note"

export function useNotes() {

  const [notes, setNotes] = useState<Note[]>([])
  const [count, setCount] = useState<number>(0)

  async function fetchNotes() {

    const res = await api.get("/notes?page=0&size=50")

    setNotes(res.data.content)
  }

  async function fetchCount() {

    const res = await api.get("/notes/count")

    setCount(res.data)
  }

  async function createNote(data: {
    content: string
    author?: string
    color: string
  }) {

    await api.post("/notes", data)

    fetchNotes()
    fetchCount()
  }

  useEffect(() => {

    fetchNotes()
    fetchCount()

  }, [])

  return {
    notes,
    count,
    createNote
  }
}