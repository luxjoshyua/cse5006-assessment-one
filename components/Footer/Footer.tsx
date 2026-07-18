import { STUDENT, SITE_METADATA } from "@/config/constants"

export interface Props {
  studentName?: string
  studentId?: string
}

export default function Footer({
  studentName = STUDENT.NAME,
  studentId = STUDENT.ID,
}: Props) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          {studentName} — {studentId}
        </p>
        <p>
          {SITE_METADATA.UNIVERSITY} · {SITE_METADATA.SUBJECT} ·{" "}
          {SITE_METADATA.YEAR}
        </p>
      </div>
    </footer>
  )
}
