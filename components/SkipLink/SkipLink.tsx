export interface Props {
  targetId?: string
  label?: string
}

export default function SkipLink( {
  targetId = "main",
  label = "Skip to content",
}: Props ) {
  return (
    <a
      href={`#${ targetId }`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
    >
      {label}
    </a>
  )
}
