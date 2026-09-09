import { useMemo, useRef, useState } from 'react'
import {
  AlertTriangle, Users, UserSquare2, BarChart3, Sparkles, UserPlus, CalendarClock, PartyPopper,
  Bold as BoldIcon, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Indent, Outdent, Undo2, Redo2, ImagePlus, Link as LinkIcon,
  Plus, X, Play, Pencil, Trash2, ListChecks, ClipboardList, Lock,
} from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Textarea, Select, FileUpload, Button, IconButton, Modal,
  EmptyState, TableFrame, TableHead, TableRow, Pagination, tableHeadCellClass, tableCellClass,
} from '../../components/ui'
import { useAuth } from '../../context/AuthContext'
import { useDesignations } from '../../context/DesignationContext'
import { mockSlidePreparations, mockHeadTables } from '../../data/mock'

const ENTRY_OPTIONS = [10, 25, 50, 100]

const TABS = [
  { key: 'intro', label: 'Intro', icon: Sparkles },
  { key: 'headTable', label: 'Head Table', icon: UserSquare2 },
  { key: 'leadershipTeam', label: 'Leadership Team', icon: Users },
  { key: 'chapterStats', label: 'Chapter Stats', icon: BarChart3 },
  { key: 'activities', label: 'Activities', icon: ClipboardList },
  { key: 'newInductions', label: 'New Inductions', icon: UserPlus },
  { key: 'upcoming', label: 'Upcoming', icon: CalendarClock },
  { key: 'conclusion', label: 'Conclusion', icon: PartyPopper },
]

const STAT_ROWS = [
  { key: 'business', label: 'Business (TYFCB)', goal: '20000000', previous: '3510924', total: '5538564' },
  { key: 'absenteeism', label: 'Absenteeism (In minus %)', goal: '0', previous: '-5.33', total: '-5.33' },
  { key: 'visitors', label: 'Visitors Per Month', goal: '10', previous: '12', total: '27' },
  { key: 'memberAddition', label: 'Member Addition', goal: '0', previous: '2', total: '5' },
  { key: 'memberDrops', label: 'Member Drops (Incl. Non Renewals)', goal: '0', previous: '-0', total: '0' },
  { key: 'referrals', label: 'Referrals', goal: '50', previous: '73', total: '169' },
]

const today = () => new Date().toISOString().slice(0, 10)
const thisMonth = () => new Date().toISOString().slice(0, 7)

const fmtMonth = (v) => {
  if (!v) return ''
  const [y, m] = v.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

let nextMemberId = 1
let nextActivityId = 1
let nextInductionId = 1
let nextSlideId = mockSlidePreparations.length + 1

const blankMember = () => ({ id: nextMemberId++, checked: true, name: '', designation: '', photo: '' })
const blankActivity = () => ({ id: nextActivityId++, title: '', description: '', file: '' })
const blankInduction = () => ({ id: nextInductionId++, name: '', organization: '', category: '', photo: '' })

/* The chapter's office bearers are already on record, so Head Table opens pre-filled. */
const seedHeadTable = (chapter) => {
  const head = mockHeadTables[chapter]
  if (!head) return [blankMember()]
  return [
    { id: nextMemberId++, checked: true, name: head.president, designation: 'President', photo: 'president.jpg' },
    { id: nextMemberId++, checked: true, name: head.vicePresident, designation: 'Vice-President', photo: 'vice-president.jpg' },
    { id: nextMemberId++, checked: true, name: head.secretary, designation: 'Secretary /Treasurer', photo: 'secretary.jpg' },
  ]
}

const blankChapterStats = () => {
  const rows = {}
  STAT_ROWS.forEach((s) => { rows[s.key] = '0' })
  return { currentStrength: '', setGoal: '', rows }
}

const blankData = (chapter) => ({
  intro: { html: '' },
  headTable: seedHeadTable(chapter),
  leadershipTeam: [],
  chapterStats: blankChapterStats(),
  activities: [blankActivity()],
  newInductions: { skipped: false, entries: [blankInduction()] },
  upcoming: { html: '' },
  conclusion: { mainHeading: '', line1: '', line2: '' },
})

/* ============================================================
   RICH TEXT EDITOR — lightweight TinyMCE-style toolbar
   ============================================================ */
function ToolBtn({ icon: Icon, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[var(--ltrt-text-secondary)] transition-all duration-150 hover:bg-[rgba(21,42,70,0.07)] hover:text-[var(--ltrt-text)] active:scale-90"
    >
      <Icon size={15} strokeWidth={2} />
    </button>
  )
}

function ToolDivider() {
  return <span className="w-px h-5 bg-[rgba(21,42,70,0.14)] mx-1" />
}

function RichTextEditor({ initialHtml, onChange, minHeight = 200 }) {
  const ref = useRef(null)
  const fileRef = useRef(null)
  const savedRange = useRef(null)

  /* execCommand only acts on a selection inside the editable, so the caret is
     captured on every interaction and restored before a toolbar command runs. */
  function rememberCaret() {
    const sel = window.getSelection()
    if (sel && sel.rangeCount && ref.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange()
    }
  }

  function restoreCaret() {
    const el = ref.current
    if (!el) return
    el.focus()
    const sel = window.getSelection()

    // A selection already inside the editor is the user's real intent — leave it alone.
    if (sel?.rangeCount && el.contains(sel.getRangeAt(0).commonAncestorContainer)) return

    if (savedRange.current && el.contains(savedRange.current.commonAncestorContainer)) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    } else {
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  function exec(cmd, val) {
    restoreCaret()
    document.execCommand(cmd, false, val)
    rememberCaret()
    onChange?.(ref.current?.innerHTML ?? '')
  }

  function insertImageFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      restoreCaret()
      document.execCommand('insertHTML', false,
        `<img src="${reader.result}" alt="${file.name}" style="max-width:100%;height:auto;border-radius:10px;margin:6px 0" />`)
      onChange?.(ref.current?.innerHTML ?? '')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-[14px] overflow-hidden border border-[rgba(21,42,70,0.16)]" style={{ background: 'rgba(255,255,255,0.7)' }}>
      <div className="flex flex-wrap items-center gap-0.5 px-2.5 py-2 border-b border-[rgba(21,42,70,0.12)]">
        <ToolBtn icon={Undo2} title="Undo" onClick={() => exec('undo')} />
        <ToolBtn icon={Redo2} title="Redo" onClick={() => exec('redo')} />
        <ToolDivider />
        <ToolBtn icon={BoldIcon} title="Bold" onClick={() => exec('bold')} />
        <ToolBtn icon={Italic} title="Italic" onClick={() => exec('italic')} />
        <ToolBtn icon={UnderlineIcon} title="Underline" onClick={() => exec('underline')} />
        <ToolDivider />
        <ToolBtn icon={AlignLeft} title="Align left" onClick={() => exec('justifyLeft')} />
        <ToolBtn icon={AlignCenter} title="Align center" onClick={() => exec('justifyCenter')} />
        <ToolBtn icon={AlignRight} title="Align right" onClick={() => exec('justifyRight')} />
        <ToolDivider />
        <ToolBtn icon={List} title="Bullet list" onClick={() => exec('insertUnorderedList')} />
        <ToolBtn icon={ListOrdered} title="Numbered list" onClick={() => exec('insertOrderedList')} />
        <ToolBtn icon={Outdent} title="Outdent" onClick={() => exec('outdent')} />
        <ToolBtn icon={Indent} title="Indent" onClick={() => exec('indent')} />
        <ToolDivider />
        <ToolBtn icon={ImagePlus} title="Upload image from device" onClick={() => fileRef.current?.click()} />
        <ToolBtn
          icon={LinkIcon}
          title="Insert link"
          onClick={() => { const u = window.prompt('Link URL', 'https://'); if (u) exec('createLink', u) }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { insertImageFile(e.target.files?.[0]); e.target.value = '' }}
        />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        style={{ minHeight }}
        className="px-4 py-3.5 text-[14px] text-[var(--ltrt-text)] outline-none"
        onInput={(e) => { rememberCaret(); onChange?.(e.currentTarget.innerHTML) }}
        onKeyUp={rememberCaret}
        onMouseUp={rememberCaret}
        onBlur={rememberCaret}
        dangerouslySetInnerHTML={{ __html: initialHtml || '' }}
      />
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">{label}</label>
      {children}
    </div>
  )
}

/* ============================================================
   SLIDE STAGE — the deck as it is projected in the meeting.
   Dark editorial canvas, crimson accent rule, tracked caps.
   ============================================================ */
const SLIDE_INK = '#F4F5F7'
const SLIDE_DIM = 'rgba(244,245,247,0.62)'

function Placeholder({ children }) {
  return <p className="text-[15px] italic" style={{ color: 'rgba(244,245,247,0.35)' }}>{children}</p>
}

function SlideStage({ index, total, label, chapter, month, children }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px]"
      style={{
        aspectRatio: '16 / 9',
        background: 'radial-gradient(120% 120% at 8% 0%, #24123B 0%, #140B22 42%, #0B0713 100%)',
        boxShadow: '0 30px 70px rgba(6,4,14,0.55)',
      }}
    >
      {/* crimson wash + hairline frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(70% 90% at 100% 100%, rgba(212,0,63,0.34), transparent 60%)' }}
      />
      <div
        className="absolute inset-[10px] rounded-[12px] pointer-events-none"
        style={{ border: '1px solid rgba(244,245,247,0.10)' }}
      />
      <div
        className="absolute left-0 top-0 h-full w-[5px]"
        style={{ background: 'linear-gradient(180deg, #F0003F, #D4003F 45%, #7C3AED)' }}
      />

      <div className="relative h-full flex flex-col px-[5%] py-[4.5%]">
        {/* running head */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="shrink-0 px-2 py-[3px] rounded-[6px] text-[11px] font-extrabold tracking-[0.14em]"
              style={{ background: 'linear-gradient(135deg,#F0003F,#A80027)', color: '#fff' }}
            >
              BNI
            </span>
            <span
              className="text-[11.5px] font-semibold tracking-[0.22em] uppercase truncate"
              style={{ color: SLIDE_DIM }}
            >
              {chapter}
            </span>
          </div>
          <span className="text-[11.5px] font-semibold tracking-[0.18em] uppercase shrink-0" style={{ color: SLIDE_DIM }}>
            {month}
          </span>
        </div>

        {/* section eyebrow */}
        <div className="flex items-center gap-3 mt-[3.5%] shrink-0">
          <span className="h-px w-8 shrink-0" style={{ background: '#F0003F' }} />
          <span className="text-[11.5px] font-bold tracking-[0.26em] uppercase" style={{ color: '#FF4D77' }}>
            {label}
          </span>
        </div>

        {/* body */}
        <div className="flex-1 min-h-0 mt-[2.5%] overflow-hidden" style={{ color: SLIDE_INK }}>
          {children}
        </div>

        {/* progress rail */}
        <div className="flex items-center gap-2 shrink-0 pt-[2.5%]">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] rounded-full transition-all"
              style={{
                flex: i === index ? '0 0 34px' : '0 0 14px',
                background: i === index ? '#F0003F' : 'rgba(244,245,247,0.20)',
              }}
            />
          ))}
          <span className="ml-auto text-[11px] font-bold tabular-nums tracking-[0.14em]" style={{ color: SLIDE_DIM }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

function PersonTile({ person }) {
  const initials = (person.name || '?').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <div
      className="rounded-[12px] px-3.5 py-3 min-w-0"
      style={{ background: 'rgba(244,245,247,0.06)', border: '1px solid rgba(244,245,247,0.12)' }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12.5px] font-extrabold shrink-0"
          style={{ background: 'linear-gradient(135deg,#F0003F,#7C3AED)', color: '#fff' }}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight truncate">{person.name}</p>
          <p className="text-[11.5px] tracking-[0.1em] uppercase truncate" style={{ color: '#FF7A9C' }}>
            {person.designation || '—'}
          </p>
        </div>
      </div>
    </div>
  )
}

function RichBody({ html, empty }) {
  if (!html || !html.replace(/<[^>]*>/g, '').trim()) return <Placeholder>{empty}</Placeholder>
  return (
    <div
      className="text-[17px] leading-relaxed h-full overflow-hidden [&_img]:max-h-[42%] [&_img]:rounded-[10px] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/* One rendered slide for a given wizard section */
function SectionSlide({ tabKey, data, chapter, month }) {
  const index = TABS.findIndex((t) => t.key === tabKey)
  const label = TABS[index]?.label ?? ''
  const stage = (children) => (
    <SlideStage index={index} total={TABS.length} label={label} chapter={chapter} month={month}>
      {children}
    </SlideStage>
  )

  if (tabKey === 'intro') {
    return stage(
      <div className="h-full flex flex-col justify-center">
        <RichBody html={data.intro.html} empty="Add your opening words in the Intro editor." />
      </div>
    )
  }

  if (tabKey === 'headTable' || tabKey === 'leadershipTeam') {
    const list = (tabKey === 'headTable' ? data.headTable.filter((r) => r.checked) : data.leadershipTeam).filter((r) => r.name)
    return stage(
      list.length ? (
        <div className="grid grid-cols-3 gap-3 content-start">
          {list.slice(0, 9).map((r) => <PersonTile key={r.id} person={r} />)}
        </div>
      ) : <Placeholder>No members added yet.</Placeholder>
    )
  }

  if (tabKey === 'chapterStats') {
    const { currentStrength, setGoal, rows } = data.chapterStats
    return stage(
      <div className="h-full flex flex-col">
        <div className="flex gap-6 mb-3 shrink-0">
          <div>
            <p className="text-[10.5px] tracking-[0.2em] uppercase" style={{ color: SLIDE_DIM }}>Current Strength</p>
            <p className="text-[30px] font-extrabold leading-none">{currentStrength || '—'}</p>
          </div>
          <div>
            <p className="text-[10.5px] tracking-[0.2em] uppercase" style={{ color: SLIDE_DIM }}>Set Goal</p>
            <p className="text-[30px] font-extrabold leading-none" style={{ color: '#FF4D77' }}>{setGoal || '—'}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 content-start">
          {STAT_ROWS.map((s) => {
            const value = Number(rows[s.key]) || 0
            const delta = value - (Number(s.previous) || 0)
            return (
              <div
                key={s.key}
                className="rounded-[11px] px-3 py-2.5 min-w-0"
                style={{ background: 'rgba(244,245,247,0.06)', border: '1px solid rgba(244,245,247,0.12)' }}
              >
                <p className="text-[10px] tracking-[0.12em] uppercase truncate" style={{ color: SLIDE_DIM }}>{s.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[21px] font-extrabold tabular-nums">{rows[s.key] || 0}</span>
                  <span
                    className="text-[11px] font-bold tabular-nums"
                    style={{ color: delta >= 0 ? '#3DDCA0' : '#FF6B6B' }}
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (tabKey === 'activities') {
    const list = data.activities.filter((a) => a.title || a.description)
    return stage(
      list.length ? (
        <div className="grid grid-cols-2 gap-3 content-start">
          {list.slice(0, 6).map((a, i) => (
            <div key={a.id} className="flex gap-3 min-w-0">
              <span className="text-[26px] font-extrabold leading-none tabular-nums shrink-0" style={{ color: 'rgba(255,77,119,0.55)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-bold leading-snug truncate">{a.title || 'Untitled'}</p>
                <p className="text-[12.5px] leading-snug line-clamp-2" style={{ color: SLIDE_DIM }}>{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : <Placeholder>No activities added yet.</Placeholder>
    )
  }

  if (tabKey === 'newInductions') {
    if (data.newInductions.skipped) return stage(<Placeholder>No inductions this month.</Placeholder>)
    const list = data.newInductions.entries.filter((e) => e.name)
    return stage(
      list.length ? (
        <div className="grid grid-cols-3 gap-3 content-start">
          {list.slice(0, 6).map((e) => (
            <div
              key={e.id}
              className="rounded-[12px] px-3.5 py-3 min-w-0"
              style={{ background: 'rgba(124,58,237,0.16)', border: '1px solid rgba(244,245,247,0.14)' }}
            >
              <p className="text-[15px] font-bold leading-tight truncate">{e.name}</p>
              <p className="text-[12px] truncate" style={{ color: SLIDE_DIM }}>{e.organization || '—'}</p>
              <p className="text-[10.5px] tracking-[0.12em] uppercase mt-1 truncate" style={{ color: '#FF7A9C' }}>{e.category || '—'}</p>
            </div>
          ))}
        </div>
      ) : <Placeholder>No inductions added yet.</Placeholder>
    )
  }

  if (tabKey === 'upcoming') {
    return stage(
      <div className="h-full flex flex-col justify-center">
        <RichBody html={data.upcoming.html} empty="Add planned events in the Upcoming editor." />
      </div>
    )
  }

  const { mainHeading, line1, line2 } = data.conclusion
  return stage(
    <div className="h-full flex flex-col items-center justify-center text-center">
      <p className="text-[42px] font-extrabold leading-none tracking-[-0.02em]">
        {mainHeading || <span style={{ color: 'rgba(244,245,247,0.35)' }}>Thank You</span>}
      </p>
      {line1 && <p className="text-[17px] mt-3" style={{ color: SLIDE_DIM }}>{line1}</p>}
      {line2 && <p className="text-[17px]" style={{ color: SLIDE_DIM }}>{line2}</p>}
      <span className="mt-5 h-px w-16" style={{ background: '#F0003F' }} />
    </div>
  )
}

/* ============================================================
   MEMBER CARD — used by Head Table + Leadership Team
   ============================================================ */
function MemberCard({ row, designations, onChange, onRemove }) {
  return (
    <div className="relative rounded-[16px] p-4" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(21,42,70,0.14)' }}>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[var(--ltrt-text-secondary)] hover:bg-[rgba(232,60,91,0.12)] hover:text-[var(--ltrt-danger)] transition-colors"
      >
        <X size={13} strokeWidth={2.4} />
      </button>

      <label className="flex items-center gap-2 mb-1.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={row.checked}
          onChange={(e) => onChange({ ...row, checked: e.target.checked })}
          className="h-[16px] w-[16px] rounded accent-[var(--ltrt-red)] cursor-pointer"
        />
        <span className="text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)]">Name</span>
      </label>
      <Input value={row.name} onChange={(e) => onChange({ ...row, name: e.target.value })} placeholder="Enter name" className="mb-3" />

      <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Designation</label>
      {designations.length > 0 ? (
        <Select value={row.designation} onChange={(e) => onChange({ ...row, designation: e.target.value })} className="mb-3">
          <option value="">Select designation...</option>
          {designations.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
        </Select>
      ) : (
        <Input value={row.designation} onChange={(e) => onChange({ ...row, designation: e.target.value })} placeholder="Enter designation" className="mb-3" />
      )}

      <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Photo</label>
      <FileUpload accept="image/*" value={row.photo} onChange={(name) => onChange({ ...row, photo: name })} />
    </div>
  )
}

export default function SlidePreparation() {
  const { user } = useAuth()
  const { designations } = useDesignations()
  const chapterName = user?.chapter || 'MYSTICS'
  const [month, setMonth] = useState(thisMonth())
  const [activeTab, setActiveTab] = useState('intro')
  const [data, setData] = useState(() => blankData(chapterName))
  const [previewTab, setPreviewTab] = useState(null)
  const [deckOpen, setDeckOpen] = useState(false)
  const [editingSlideId, setEditingSlideId] = useState(null)
  /* Sections stay locked until the one before them is saved with Save & Next. */
  const [unlocked, setUnlocked] = useState(['intro'])

  const [slides, setSlides] = useState(() => mockSlidePreparations.map((s) => ({ ...s, data: blankData(chapterName) })))
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const activeIndex = TABS.findIndex((t) => t.key === activeTab)
  const isLast = activeIndex === TABS.length - 1

  const filtered = useMemo(() => {
    if (!query.trim()) return slides
    const q = query.toLowerCase()
    return slides.filter((s) => fmtMonth(s.month).toLowerCase().includes(q) || s.user.toLowerCase().includes(q))
  }, [slides, query])
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * perPage, current * perPage)

  function goNext() {
    if (isLast) return
    const next = TABS[activeIndex + 1].key
    setUnlocked((u) => (u.includes(next) ? u : [...u, next]))
    setActiveTab(next)
  }

  function cancelTab() {
    setData((d) => ({
      ...d,
      [activeTab]:
        activeTab === 'intro' || activeTab === 'upcoming' ? { html: '' } :
        activeTab === 'headTable' ? seedHeadTable(chapterName) :
        activeTab === 'leadershipTeam' ? [] :
        activeTab === 'chapterStats' ? blankChapterStats() :
        activeTab === 'activities' ? [blankActivity()] :
        activeTab === 'newInductions' ? { skipped: false, entries: [blankInduction()] } :
        { mainHeading: '', line1: '', line2: '' },
    }))
  }

  function finalUpdate() {
    if (editingSlideId) {
      setSlides((s) => s.map((row) => (row.id === editingSlideId ? { ...row, month, date: today(), data } : row)))
    } else {
      setSlides((s) => [...s, { id: nextSlideId++, month, date: today(), user: user?.name || 'Admin', data }])
    }
    setEditingSlideId(null)
    setData(blankData(chapterName))
    setActiveTab('intro')
    setUnlocked(['intro'])
  }

  function editSlide(row) {
    setEditingSlideId(row.id)
    setMonth(row.month)
    setData(row.data)
    setActiveTab('intro')
    setUnlocked(TABS.map((t) => t.key))
  }

  function removeSlide() {
    setSlides((s) => s.filter((row) => row.id !== confirmDelete.id))
    if (editingSlideId === confirmDelete.id) {
      setEditingSlideId(null)
      setData(blankData(chapterName))
      setActiveTab('intro')
      setUnlocked(['intro'])
    }
    setConfirmDelete(null)
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
          style={{ background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(232,60,91,0.28)', color: 'var(--ltrt-red)' }}
        >
          <AlertTriangle size={15} strokeWidth={2.2} /> Slide Preparation Locked
        </span>
      </div>

      <PageHeader title="Slide Preparation" subtitle="Enter chapter data below — the monthly slide deck builds itself" />

      <div className="glass-red rounded-[16px] px-5 py-3.5 mb-5">
        <h3 className="text-white font-bold text-[15px] tracking-[0.02em]">BNI - {chapterName.toUpperCase()}</h3>
      </div>

      <SectionCard icon={TABS[activeIndex].icon} title={TABS[activeIndex].label}>
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => {
                const isActive = t.key === activeTab
                const isLocked = !unlocked.includes(t.key)
                return (
                  <button
                    key={t.key}
                    type="button"
                    disabled={isLocked}
                    title={isLocked ? 'Save the previous section to unlock' : undefined}
                    onClick={() => !isLocked && setActiveTab(t.key)}
                    className={`px-4 py-2 rounded-full text-[12.5px] font-semibold transition-all duration-200 inline-flex items-center gap-1.5 ${isLocked ? 'cursor-not-allowed' : ''}`}
                    style={
                      isActive
                        ? { background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)', color: '#fff', boxShadow: '0 6px 16px rgba(212,0,63,0.28)' }
                        : isLocked
                          ? { color: 'rgba(110,126,149,0.75)', background: 'rgba(110,126,149,0.10)', border: '1px solid rgba(110,126,149,0.22)' }
                          : { color: 'var(--ltrt-red)', background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(212,0,63,0.28)' }
                    }
                  >
                    {isLocked && <Lock size={12} strokeWidth={2.4} />}
                    {t.label}
                  </button>
                )
              })}
            </div>
            <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="!w-auto" />
          </div>

          {activeTab === 'intro' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-4">Intro Screen</h4>
              <RichTextEditor key={editingSlideId + '-intro'} initialHtml={data.intro.html} onChange={(html) => setData((d) => ({ ...d, intro: { html } }))} />
            </div>
          )}

          {activeTab === 'headTable' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-4">Head Table</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                {data.headTable.map((row) => (
                  <MemberCard
                    key={row.id}
                    row={row}
                    designations={designations}
                    onChange={(next) => setData((d) => ({ ...d, headTable: d.headTable.map((r) => (r.id === row.id ? next : r)) }))}
                    onRemove={() => setData((d) => ({ ...d, headTable: d.headTable.filter((r) => r.id !== row.id) }))}
                  />
                ))}
              </div>
              <Button type="button" variant="secondary" onClick={() => setData((d) => ({ ...d, headTable: [...d.headTable, blankMember()] }))}>
                <Plus size={15} strokeWidth={2.4} /> Add Head Table Member
              </Button>
            </div>
          )}

          {activeTab === 'leadershipTeam' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-4">Leadership Team</h4>
              {data.leadershipTeam.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                  {data.leadershipTeam.map((row) => (
                    <MemberCard
                      key={row.id}
                      row={row}
                      designations={designations}
                      onChange={(next) => setData((d) => ({ ...d, leadershipTeam: d.leadershipTeam.map((r) => (r.id === row.id ? next : r)) }))}
                      onRemove={() => setData((d) => ({ ...d, leadershipTeam: d.leadershipTeam.filter((r) => r.id !== row.id) }))}
                    />
                  ))}
                </div>
              )}
              <Button type="button" variant="secondary" onClick={() => setData((d) => ({ ...d, leadershipTeam: [...d.leadershipTeam, blankMember()] }))}>
                <Plus size={15} strokeWidth={2.4} /> Add Leadership Team Member
              </Button>
            </div>
          )}

          {activeTab === 'chapterStats' && (
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)]">Chapter Stats</h4>
                <button type="button" className="text-[12.5px] font-semibold text-[var(--ltrt-red)] hover:underline">Click to view</button>
                <span
                  className="ml-auto inline-flex items-center gap-4 px-4 py-1.5 rounded-full text-[12.5px] font-bold"
                  style={{ background: 'rgba(217,167,42,0.22)', color: '#7A5A12' }}
                >
                  <span className="flex items-center gap-1.5">
                    Current Strength:
                    <input
                      type="number"
                      value={data.chapterStats.currentStrength}
                      onChange={(e) => setData((d) => ({ ...d, chapterStats: { ...d.chapterStats, currentStrength: e.target.value } }))}
                      className="w-14 bg-transparent outline-none border-b border-[#7A5A12]/40 text-center"
                    />
                  </span>
                  <span className="flex items-center gap-1.5">
                    Set Goal:
                    <input
                      type="number"
                      value={data.chapterStats.setGoal}
                      onChange={(e) => setData((d) => ({ ...d, chapterStats: { ...d.chapterStats, setGoal: e.target.value } }))}
                      className="w-14 bg-transparent outline-none border-b border-[#7A5A12]/40 text-center"
                    />
                  </span>
                </span>
              </div>

              <TableFrame>
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-red)' }}>Stat</th>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-red)' }}>Goal</th>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-success)' }}>{fmtMonth(month)}</th>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-red)' }}>Previous Month</th>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-red)' }}>Comparison</th>
                      <th className={`${tableHeadCellClass} !text-white`} style={{ background: 'var(--ltrt-red)' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAT_ROWS.map((s, i) => {
                      const current = data.chapterStats.rows[s.key]
                      const comparison = (Number(current) || 0) - (Number(s.previous) || 0)
                      return (
                        <tr key={s.key} style={{ background: i % 2 === 0 ? 'rgba(217,167,42,0.10)' : 'transparent' }}>
                          <td className="py-2.5 px-3.5 text-[13.5px] font-medium text-[var(--ltrt-text)] border-t border-[rgba(21,42,70,0.08)] whitespace-nowrap">{s.label}</td>
                          <td className="py-2 px-3.5 border-t border-[rgba(21,42,70,0.08)]"><Input value={s.goal} disabled className="!bg-[rgba(21,42,70,0.08)] !text-[var(--ltrt-text-secondary)]" /></td>
                          <td className="py-2 px-3.5 border-t border-[rgba(21,42,70,0.08)]">
                            <Input
                              type="number"
                              value={current}
                              onChange={(e) => setData((d) => ({ ...d, chapterStats: { ...d.chapterStats, rows: { ...d.chapterStats.rows, [s.key]: e.target.value } } }))}
                            />
                          </td>
                          <td className="py-2 px-3.5 border-t border-[rgba(21,42,70,0.08)]"><Input value={s.previous} disabled className="!bg-[rgba(21,42,70,0.08)] !text-[var(--ltrt-text-secondary)]" /></td>
                          <td className="py-2.5 px-3.5 text-[13.5px] font-semibold border-t border-[rgba(21,42,70,0.08)]" style={{ color: comparison >= 0 ? 'var(--ltrt-success)' : 'var(--ltrt-danger)' }}>
                            {comparison > 0 ? `+${comparison}` : comparison}
                          </td>
                          <td className="py-2 px-3.5 border-t border-[rgba(21,42,70,0.08)]"><Input value={s.total} disabled className="!bg-[rgba(21,42,70,0.08)] !text-[var(--ltrt-text-secondary)]" /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </TableFrame>
            </div>
          )}

          {activeTab === 'activities' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-4">Activities (Up to 8 slides allowed)</h4>
              <div className="space-y-4 mb-4">
                {data.activities.map((row) => (
                  <div key={row.id} className="rounded-[16px] p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(21,42,70,0.14)' }}>
                    <Field label="Title">
                      <Input value={row.title} onChange={(e) => setData((d) => ({ ...d, activities: d.activities.map((r) => (r.id === row.id ? { ...r, title: e.target.value } : r)) }))} placeholder="Enter title" />
                    </Field>
                    <Field label="Description">
                      <Textarea rows={3} value={row.description} onChange={(e) => setData((d) => ({ ...d, activities: d.activities.map((r) => (r.id === row.id ? { ...r, description: e.target.value } : r)) }))} placeholder="Enter description" />
                    </Field>
                    <Field label="Image/Video (Max 30 sec & Max 2 MB)">
                      <FileUpload accept="image/*,video/*" value={row.file} onChange={(name) => setData((d) => ({ ...d, activities: d.activities.map((r) => (r.id === row.id ? { ...r, file: name } : r)) }))} />
                    </Field>
                    <Button
                      type="button" variant="danger"
                      onClick={() => setData((d) => ({ ...d, activities: d.activities.filter((r) => r.id !== row.id) }))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                style={{ background: 'linear-gradient(135deg, #9C6ADE, #7C3AED 60%, #5B21B6)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)' }}
                disabled={data.activities.length >= 8}
                onClick={() => setData((d) => ({ ...d, activities: [...d.activities, blankActivity()] }))}
              >
                + Add More
              </Button>
            </div>
          )}

          {activeTab === 'newInductions' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)]">New Inductions</h4>
                <button
                  type="button"
                  onClick={() => setData((d) => ({ ...d, newInductions: { ...d.newInductions, skipped: !d.newInductions.skipped } }))}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-bold text-white"
                  style={{ background: data.newInductions.skipped ? 'var(--ltrt-text-secondary)' : 'var(--ltrt-warning)' }}
                >
                  {data.newInductions.skipped ? 'Skipped' : 'Skip'}
                </button>
              </div>

              {data.newInductions.skipped ? (
                <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] italic">New inductions skipped for this month.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {data.newInductions.entries.map((row) => (
                      <div key={row.id} className="rounded-[16px] p-4" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(21,42,70,0.14)' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                          <Field label="Name">
                            <Input value={row.name} onChange={(e) => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: d.newInductions.entries.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)) } }))} placeholder="Enter name" />
                          </Field>
                          <Field label="Organization">
                            <Input value={row.organization} onChange={(e) => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: d.newInductions.entries.map((r) => (r.id === row.id ? { ...r, organization: e.target.value } : r)) } }))} placeholder="Enter organization" />
                          </Field>
                          <Field label="Category">
                            <Input value={row.category} onChange={(e) => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: d.newInductions.entries.map((r) => (r.id === row.id ? { ...r, category: e.target.value } : r)) } }))} placeholder="Enter designation" />
                          </Field>
                        </div>
                        <Field label="Upload Photo">
                          <FileUpload accept="image/*" value={row.photo} onChange={(name) => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: d.newInductions.entries.map((r) => (r.id === row.id ? { ...r, photo: name } : r)) } }))} />
                        </Field>
                        <Button
                          type="button" variant="danger" className="mt-3"
                          onClick={() => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: d.newInductions.entries.filter((r) => r.id !== row.id) } }))}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="secondary" onClick={() => setData((d) => ({ ...d, newInductions: { ...d.newInductions, entries: [...d.newInductions.entries, blankInduction()] } }))}>
                    <Plus size={15} strokeWidth={2.4} /> Add Another Induction
                  </Button>
                </>
              )}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-1">Upcoming</h4>
              <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-4">Planned events and programs.</p>
              <RichTextEditor key={editingSlideId + '-upcoming'} initialHtml={data.upcoming.html} onChange={(html) => setData((d) => ({ ...d, upcoming: { html } }))} />
            </div>
          )}

          {activeTab === 'conclusion' && (
            <div>
              <h4 className="text-[19px] font-bold text-[var(--ltrt-navy)] mb-4">Conclusion / Thank You</h4>
              <div className="space-y-4 max-w-xl">
                <Field label="Main Heading">
                  <Input value={data.conclusion.mainHeading} onChange={(e) => setData((d) => ({ ...d, conclusion: { ...d.conclusion, mainHeading: e.target.value } }))} />
                </Field>
                <Field label="Line 1">
                  <Input value={data.conclusion.line1} onChange={(e) => setData((d) => ({ ...d, conclusion: { ...d.conclusion, line1: e.target.value } }))} />
                </Field>
                <Field label="Line 2">
                  <Input value={data.conclusion.line2} onChange={(e) => setData((d) => ({ ...d, conclusion: { ...d.conclusion, line2: e.target.value } }))} />
                </Field>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2.5 pt-5 mt-5 border-t border-[rgba(21,42,70,0.10)]">
            <Button
              type="button"
              style={{ background: 'linear-gradient(135deg, #9C6ADE, #7C3AED 60%, #5B21B6)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)' }}
              onClick={() => setPreviewTab(activeTab)}
            >
              Preview
            </Button>
            {isLast ? (
              <Button type="button" onClick={finalUpdate}>Final Update</Button>
            ) : (
              <Button type="button" onClick={goNext}>Save &amp; Next</Button>
            )}
            <Button type="button" variant="danger" onClick={cancelTab}>Cancel</Button>
          </div>
        </div>
      </SectionCard>

      <div className="mt-6">
        <SectionCard icon={ListChecks} title="View Details">
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[var(--ltrt-text-secondary)]">Show</span>
                <Select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }} className="!w-auto !py-2 !px-3">
                  {ENTRY_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
                <span className="text-[13px] text-[var(--ltrt-text-secondary)]">entries</span>
              </div>
              <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Search..." className="!w-full sm:!w-56" />
            </div>

            <TableFrame>
              <table className="w-full min-w-[680px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={`${tableHeadCellClass} text-center`}>Slide Show</th>
                  <th className={tableHeadCellClass}>Month</th>
                  <th className={`${tableHeadCellClass} text-center`}>Edit</th>
                  <th className={`${tableHeadCellClass} text-center`}>Delete</th>
                  <th className={tableHeadCellClass}>Date</th>
                  <th className={tableHeadCellClass}>User</th>
                </TableHead>
                <tbody>
                  {visible.map((row, i) => (
                    <TableRow key={row.id}>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>{(current - 1) * perPage + i + 1}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <button
                            onClick={() => { setData(row.data); setDeckOpen(true) }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)' }}
                          >
                            <Play size={13} fill="currentColor" strokeWidth={0} />
                          </button>
                        </div>
                      </td>
                      <td className={`${tableCellClass} font-semibold`}>{fmtMonth(row.month)}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center"><IconButton icon={Pencil} tone="emerald" title="Edit" onClick={() => editSlide(row)} /></div>
                      </td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center"><IconButton icon={Trash2} tone="red" title="Delete" onClick={() => setConfirmDelete(row)} /></div>
                      </td>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]`}>{row.date}</td>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]`}>{row.user}</td>
                    </TableRow>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <EmptyState icon={Sparkles} text="No data available" subtitle={query ? 'No slides match your search.' : 'Complete the wizard above and click Final Update to see it listed here.'} />
              )}
            </TableFrame>
            <Pagination page={current} pages={pages} onChange={setPage} />
          </div>
        </SectionCard>
      </div>

      {/* Section preview — the single slide as it will be projected */}
      <Modal
        open={!!previewTab}
        onClose={() => setPreviewTab(null)}
        title={`Slide Preview — ${TABS.find((t) => t.key === previewTab)?.label ?? ''}`}
        stage
      >
        {previewTab && (
          <SectionSlide tabKey={previewTab} data={data} chapter={chapterName.toUpperCase()} month={fmtMonth(month)} />
        )}
      </Modal>

      {/* Full deck — every section, one slide after another */}
      <Modal open={deckOpen} onClose={() => setDeckOpen(false)} title="Slide Deck Preview" stage>
        <div className="space-y-4">
          {TABS.map((t) => (
            <SectionSlide key={t.key} tabKey={t.key} data={data} chapter={chapterName.toUpperCase()} month={fmtMonth(month)} />
          ))}
        </div>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete slide <strong className="text-[var(--ltrt-navy)]">{fmtMonth(confirmDelete?.month)}</strong>? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={removeSlide}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
