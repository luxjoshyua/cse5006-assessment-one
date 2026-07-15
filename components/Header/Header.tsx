import Nav from "@/components/Nav"
import ThemeToggle from "@/components/ThemeToggle"

export interface Props {
  title?: string
}

const DEFAULT_TITLE = "CSE5006 — Assessment 1: RSS Server & LMS Frontend"

export default function Header( { title = DEFAULT_TITLE }: Props ) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <div className="flex items-center gap-6">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
