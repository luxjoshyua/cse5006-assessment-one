import RssClient from "@/components/RssClient"

export const metadata = {
  title: "RSS Client — RSS Server & LMS",
}

export default function ClientPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">RSS Client</h1>
        <p className="max-w-2xl text-muted">
          A client that connects to the RSS Server over its API, retrieves feed
          items, and reports live request statistics. Each fetch is logged by
          the server and reflected in the request count below.
        </p>
      </header>
      <RssClient />
    </div>
  )
}
