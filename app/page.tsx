import Collapsible from "@/components/Collapsible"
import { SITE_METADATA } from "@/config/constants"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        {SITE_METADATA.SITE_NAME}
      </h1>
      <p className="max-w-2xl text-muted">{SITE_METADATA.DESCRIPTION}</p>
      <section aria-labelledby="about-project" className="flex flex-col gap-3">
        <h2
          id="about-project"
          className="text-sm font-semibold tracking-wide text-muted uppercase"
        >
          About this project
        </h2>
        <Collapsible title="What is this application?" defaultOpen>
          An RSS Server that collects syndicated content and delivers it into a
          Learning Management System. Feed data is stored in PostgreSQL, served
          through a REST API, and published as an RSS 2.0 document for external
          readers.
        </Collapsible>
        <Collapsible title="What can I do here?">
          Browse feed posts on the Feeds page, open any post for the full
          article, watch the RSS Client consume the server&apos;s API, and
          review system health on the Dashboard.
        </Collapsible>
        <Collapsible title="What can I monitor?">
          The dashboard reports feed and item counts, request activity by feed
          and client, response statuses, and alerts for conditions that need
          attention, all backed by request records stored in the database.
        </Collapsible>
      </section>
    </div>
  )
}
