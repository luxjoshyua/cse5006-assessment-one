"use client"

export interface Props {
  open: boolean
  onClick: () => void
  controls: string
}

export default function MenuButton({ open, onClick, controls }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls={controls}
      className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-md border border-border text-fg md:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative block h-4 w-5" aria-hidden="true">
        <span
          className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-500 ${
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-500 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-500 ${
            open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
          }`}
        />
      </span>
    </button>
  )
}
