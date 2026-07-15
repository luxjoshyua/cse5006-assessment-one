export interface Props {
  studentName?: string
  studentId?: string
}

export default function Footer( {
  studentName = "Joshua Fielding",
  studentId = "22846849",
}: Props ) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          {studentName} — {studentId}
        </p>
        <p>La Trobe University · CSE5006 · 2026</p>
      </div>
    </footer>
  )
}
