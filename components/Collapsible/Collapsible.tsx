export interface Props {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
}: Props) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-lg border border-border bg-surface"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 font-medium marker:content-none">
        <span>{title}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="border-t border-border px-4 py-3 text-sm text-muted">
        {children}
      </div>
    </details>
  )
}
