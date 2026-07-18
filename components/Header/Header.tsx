import HeaderNav from "@/components/HeaderNav"
import { SITE_METADATA } from "@/config/constants"

export interface Props {
  title?: string
}

const DEFAULT_TITLE = SITE_METADATA.ASSESSMENT_TITLE

export default function Header({ title = DEFAULT_TITLE }: Props) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <HeaderNav />
      </div>
    </header>
  )
}
