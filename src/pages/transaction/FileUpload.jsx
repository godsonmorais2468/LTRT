import { useRef, useState } from 'react'
import { PageHeader, Card, Button } from '../../components/ui'

export default function FileUpload() {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])

  function onPick(e) {
    const picked = Array.from(e.target.files || [])
    setFiles((f) => [...picked.map((p, i) => ({ id: Date.now() + i, name: p.name, size: `${(p.size / 1024 / 1024).toFixed(2)} MB`, date: new Date().toISOString().slice(0, 10) })), ...f])
  }

  return (
    <div>
      <PageHeader title="File Upload" subtitle="Upload chapter slides and documents" />
      <Card className="p-8 text-center border-dashed border-2 border-[rgba(21,42,70,0.18)] mb-4">
        <div className="text-3xl mb-2">📤</div>
        <p className="text-sm text-[var(--ltrt-text-secondary)] mb-3">Drag files here, or click to browse</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={onPick} />
        <Button onClick={() => inputRef.current?.click()}>Choose Files</Button>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Uploaded Files</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left ltrt-champagne"><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Size</th><th className="py-2 pr-3">Date</th></tr></thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.id} className="border-b border-[rgba(21,42,70,0.18)]"><td className="py-2 pr-3">{f.name}</td><td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{f.size}</td><td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{f.date}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
