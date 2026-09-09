import { createContext, useContext, useState } from 'react'
import { mockDesignations } from '../data/mock'

const DesignationContext = createContext(null)

let nextId = mockDesignations.length + 1

export function DesignationProvider({ children }) {
  const [designations, setDesignations] = useState(mockDesignations)

  function addDesignation(data) {
    setDesignations((r) => [...r, { id: nextId++, ...data }])
  }

  function updateDesignation(id, data) {
    setDesignations((r) => r.map((row) => (row.id === id ? { ...row, ...data } : row)))
  }

  function deleteDesignation(id) {
    setDesignations((r) => r.filter((row) => row.id !== id))
  }

  function toggleDesignationActive(id) {
    setDesignations((r) => r.map((row) => (row.id === id ? { ...row, active: !row.active } : row)))
  }

  return (
    <DesignationContext.Provider
      value={{ designations, addDesignation, updateDesignation, deleteDesignation, toggleDesignationActive }}
    >
      {children}
    </DesignationContext.Provider>
  )
}

export function useDesignations() {
  return useContext(DesignationContext)
}
