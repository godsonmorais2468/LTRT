import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LOGIN_FOR_ROLE = {
  chapter_admin: '/login', member: '/login', superadmin: '/login',
}

const DEMO_NAME = {
  chapter_admin: 'Admin', member: 'Member', superadmin: 'Superadmin',
}

export default function ProtectedRoute({ roles, children }) {
  const { user, login } = useAuth()
  const fallbackRole = roles?.[0]

  useEffect(() => {
    if (!user && fallbackRole) {
      login(fallbackRole, DEMO_NAME[fallbackRole] || 'User', { chapter: '' })
    }
  }, [user, fallbackRole])

  if (!user) return null // auto-login fires above, next render passes through
  if (roles && !roles.includes(user.role)) return <Navigate to={LOGIN_FOR_ROLE[user.role] || '/login'} replace />
  return children
}
