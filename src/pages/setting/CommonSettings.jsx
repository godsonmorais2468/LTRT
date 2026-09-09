import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Settings2 } from 'lucide-react'
import { PageHeader, SectionCard, Input, Select, Button } from '../../components/ui'
import { useChapters } from '../../context/ChapterContext'

const today = () => new Date().toISOString().slice(0, 10)

const blankForm = {
  presentationTime: '3',
  slides: '15',
  leadershipFeedback: 'YES',
  meetingType: 'Offline',
  meetingDate: today(),
  startTime: '18:00',
  endTime: '20:00',
  attendanceChapter: '',
  deleteData: '2 - 50',
  openPresentationEntry: 'No',
  chapter: 'All',
}

function Field({ label, children, span = 'col-span-2 sm:col-span-1' }) {
  return (
    <div className={span}>
      <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">{label}</label>
      {children}
    </div>
  )
}

export default function CommonSettings() {
  const { chapters } = useChapters()
  const [form, setForm] = useState(blankForm)
  const [saved, setSaved] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  function submit(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }


  return (
    <div>
      <div className="mb-5 flex justify-end">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
          style={{
            background: 'rgba(255,255,255,0.62)',
            border: '1px solid rgba(232,60,91,0.28)',
            color: 'var(--ltrt-red)',
          }}
        >
          <AlertTriangle size={15} strokeWidth={2.2} /> Slide Preparation Locked
        </span>
      </div>

      <PageHeader title="Common Settings" subtitle="Meeting, presentation and attendance defaults" />

      <SectionCard icon={Settings2} title="Common Settings">
        <form onSubmit={submit} className="p-5 sm:p-6">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-4">
          <Field label="Presentation Time" span="col-span-1">
            <Input type="number" min="0" value={form.presentationTime} onChange={set('presentationTime')} />
          </Field>

          <Field label="No of Slides" span="col-span-1">
            <Input type="number" min="0" value={form.slides} onChange={set('slides')} />
          </Field>

          <Field label="Leadership Feedback">
            <Select value={form.leadershipFeedback} onChange={set('leadershipFeedback')}>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>

          <Field label="Meeting Type">
            <Select value={form.meetingType} onChange={set('meetingType')}>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </Select>
          </Field>

          <Field label="Meeting Date">
            <Input type="date" value={form.meetingDate} onChange={set('meetingDate')} />
          </Field>

          <Field label="Start Time" span="col-span-1">
            <Input type="time" value={form.startTime} onChange={set('startTime')} />
          </Field>

          <Field label="End Time" span="col-span-1">
            <Input type="time" value={form.endTime} onChange={set('endTime')} />
          </Field>

          <Field label="Attendance Chapter">
            <Select value={form.attendanceChapter} onChange={set('attendanceChapter')}>
              <option value="">Select chapter...</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.chapter}>{c.chapter}</option>
              ))}
            </Select>
          </Field>

          <Field label="Delete Data">
            <Input value={form.deleteData} onChange={set('deleteData')} />
          </Field>

          <Field label="Open Presentation Entry">
            <Select value={form.openPresentationEntry} onChange={set('openPresentationEntry')}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </Select>
          </Field>

          <Field label="Chapter">
            <Select value={form.chapter} onChange={set('chapter')}>
              <option value="All">All</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.chapter}>{c.chapter}</option>
              ))}
            </Select>
          </Field>
          </div>

          <div className="flex items-center gap-3 pt-5">
            <Button type="submit">Update</Button>
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
      </SectionCard>

    </div>
  )
}
