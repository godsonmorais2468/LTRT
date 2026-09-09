import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ROLE_HOME = {
  chapter_admin: '/dashboard',
  member: '/app/home',
  superadmin: '/superadmin/dashboard',
  reseller: '/reseller/dashboard',
  landlord: '/landlord/home',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('bni_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  function login(role, name, extra = {}) {
    const u = { role, name, ...extra }
    setUser(u)
    sessionStorage.setItem('bni_user', JSON.stringify(u))
    return ROLE_HOME[role] || '/dashboard'
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('bni_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ROLE_HOME }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
