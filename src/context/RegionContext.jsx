import { createContext, useContext, useState } from 'react'
import { mockRegions } from '../data/mock'

const RegionContext = createContext(null)

let nextId = mockRegions.length + 1

export function RegionProvider({ children }) {
  const [regions, setRegions] = useState(mockRegions)

  function addRegion(data) {
    setRegions((r) => [...r, { id: nextId++, ...data }])
  }

  function updateRegion(id, data) {
    setRegions((r) => r.map((row) => (row.id === id ? { ...row, ...data } : row)))
  }

  function deleteRegion(id) {
    setRegions((r) => r.filter((row) => row.id !== id))
  }

  function toggleRegionActive(id) {
    setRegions((r) => r.map((row) => (row.id === id ? { ...row, active: !row.active } : row)))
  }

  return (
    <RegionContext.Provider value={{ regions, addRegion, updateRegion, deleteRegion, toggleRegionActive }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegions() {
  return useContext(RegionContext)
}
