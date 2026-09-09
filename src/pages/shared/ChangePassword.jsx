import { useState } from 'react'
import { CheckCircle2, KeyRound, Eye, EyeOff } from 'lucide-react'
import { PageHeader, Card, Button, Input } from '../../components/ui'

function PasswordField({ label, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">{label}</label>
      <div className="relative">
        <Input type={show ? 'text' : 'password'} value={value} onChange={onChange} required className="!pr-12" />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[10px] flex items-center justify-center
            text-[var(--ltrt-text-secondary)] hover:text-[var(--ltrt-red)] transition-all duration-200 active:scale-90 z-10"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
        </button>
      </div>
    </div>
  )
}

export default function ChangePassword() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (next !== confirm) {
      setError('New password and confirmation do not match.')
      return
    }
    setError('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Change Password" subtitle="Update your account password" />
      <Card className="p-6 max-w-lg" hover={false}>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(240,0,70,0.10)',
              color: 'var(--ltrt-red)',
              border: '1px solid rgba(255,255,255,0.75)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            <KeyRound size={22} strokeWidth={1.9} />
          </div>
          <p className="text-[13px] text-[var(--ltrt-text-secondary)]">
            Choose a strong password you don't use elsewhere.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <PasswordField label="Current Password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          <PasswordField label="New Password" value={next} onChange={(e) => setNext(e.target.value)} />
          <PasswordField label="Confirm New Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

          {error && (
            <p className="text-[12.5px] font-medium animate-[fadeIn_0.2s_ease-out]" style={{ color: 'var(--ltrt-danger)' }}>
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-1">
            <Button type="submit">Update Password</Button>
            {saved && (
              <span
                className="flex items-center gap-2 text-[13.5px] font-semibold animate-[fadeIn_0.2s_ease-out]"
                style={{ color: 'var(--ltrt-success)' }}
              >
                <CheckCircle2 size={17} strokeWidth={2.2} /> Updated
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
