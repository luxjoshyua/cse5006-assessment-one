import Collapsible from "@/components/Collapsible"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        RSS Server &amp; LMS
      </h1>
      <p className="max-w-2xl text-muted">
        Frontend interface for sourcing, displaying and organising feed content.
      </p>
      <section aria-labelledby="about-project" className="flex flex-col gap-3">
        <h2
          id="about-project"
          className="text-sm font-semibold tracking-wide text-muted uppercase"
        >
          About this project
        </h2>
        <Collapsible title="What is this application?" defaultOpen>
          A frontend interface for an RSS Server that feeds syndicated content
          into a Learning Management System. This stage is frontend-only; sample
          posts stand in for live feed data.
        </Collapsible>
        <Collapsible title="What can I do here?">
          Browse feed posts on the Feeds page, open any post for the full
          article, and adjust the theme and feed density in Settings.
        </Collapsible>
        <Collapsible title="What's coming next?">
          Assessment 2 introduces the backend, a database, and live RSS feeds,
          which will replace the sample content shown here.
        </Collapsible>
      </section>
    </div>
  )
}
