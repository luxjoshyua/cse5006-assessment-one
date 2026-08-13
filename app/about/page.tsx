import VideoEmbed from "@/components/VideoEmbed"
import { STUDENT, SITE_METADATA, VIDEO_ID } from "@/config/constants"

export const metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted">{SITE_METADATA.DESCRIPTION}</p>
      </header>

      <section
        aria-labelledby="project-heading"
        className="flex flex-col gap-3 border-t border-border pt-6"
      >
        <h2 id="project-heading" className="text-lg font-semibold">
          The project
        </h2>
        <p className="text-sm text-muted">
          The application gathers posts from RSS feeds and presents them in one
          place for students and staff to read inside the LMS, rather than
          visiting each source separately. Posts are listed for quick scanning,
          and each opens to a full view.
        </p>
        <p className="text-sm text-muted">
          The application is backed by a PostgreSQL database accessed through
          Prisma, with a REST API providing CRUD operations over feeds and
          items, operational endpoints for health and metrics, and an RSS
          endpoint for external clients. The whole stack runs in Docker.
        </p>
        <p className="text-sm text-muted">
          Assessment 3 builds a data-driven web app that builds on the frontend
          and backend work completed in Assessments 1 and 2.
        </p>
      </section>

      <section
        aria-labelledby="video-heading"
        className="flex flex-col gap-4 border-t border-border pt-6"
      >
        <div className="flex flex-col gap-1">
          <h2 id="video-heading" className="text-lg font-semibold">
            How to use this site
          </h2>
          <p className="text-sm text-muted">
            A short walkthrough of the interface and its main features.
          </p>
        </div>
        <VideoEmbed
          videoId={VIDEO_ID}
          title="Walkthrough of the RSS Server and LMS frontend"
        />
      </section>

      <section
        aria-labelledby="author-heading"
        className="flex flex-col gap-3 border-t border-border pt-6"
      >
        <h2 id="author-heading" className="text-lg font-semibold">
          Author
        </h2>
        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Name</dt>
            <dd>{STUDENT.NAME}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Student number</dt>
            <dd>{STUDENT.ID}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Subject</dt>
            <dd>
              {SITE_METADATA.SUBJECT} — {SITE_METADATA.UNIVERSITY}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
