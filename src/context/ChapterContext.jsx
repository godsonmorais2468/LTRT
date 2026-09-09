import { createContext, useContext, useState } from 'react'
import { mockChapters } from '../data/mock'

const ChapterContext = createContext(null)

let nextId = mockChapters.length + 1

export function ChapterProvider({ children }) {
  const [chapters, setChapters] = useState(mockChapters)

  function addChapter(data) {
    setChapters((r) => [...r, { id: nextId++, ...data }])
  }

  function updateChapter(id, data) {
    setChapters((r) => r.map((row) => (row.id === id ? { ...row, ...data } : row)))
  }

  function deleteChapter(id) {
    setChapters((r) => r.filter((row) => row.id !== id))
  }

  function toggleChapterActive(id) {
    setChapters((r) => r.map((row) => (row.id === id ? { ...row, active: !row.active } : row)))
  }

  return (
    <ChapterContext.Provider value={{ chapters, addChapter, updateChapter, deleteChapter, toggleChapterActive }}>
      {children}
    </ChapterContext.Provider>
  )
}

export function useChapters() {
  return useContext(ChapterContext)
}
