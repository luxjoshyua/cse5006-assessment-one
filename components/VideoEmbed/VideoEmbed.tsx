export interface Props {
  videoId: string
  title: string
}

export default function VideoEmbed({ videoId, title }: Props) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="text-sm text-muted">
        {title} —{" "}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          watch on YouTube
        </a>
      </figcaption>
    </figure>
  )
}
