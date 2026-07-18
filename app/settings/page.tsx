import ThemeToggle from "@/components/ThemeToggle"
import DensityToggle from "@/components/DensityToggle"

export const metadata = {
  title: "Settings",
}

export default function SettingsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted">
          Adjust how the interface looks and how feed content is displayed.
          Preferences are saved to this browser.
        </p>
      </header>

      <section
        aria-labelledby="appearance-heading"
        className="flex flex-col gap-4 border-t border-border pt-6"
      >
        <div className="flex flex-col gap-1">
          <h2 id="appearance-heading" className="text-lg font-semibold">
            Appearance
          </h2>
          <p className="text-sm text-muted">
            Switch between light and dark themes.
          </p>
        </div>
        <ThemeToggle />
      </section>

      <section
        aria-labelledby="density-heading"
        className="flex flex-col gap-4 border-t border-border pt-6"
      >
        <div className="flex flex-col gap-1">
          <h2 id="density-heading" className="text-lg font-semibold">
            Feed density
          </h2>
          <p className="text-sm text-muted">
            Comfortable spacing, or compact to fit more posts on screen.
          </p>
        </div>
        <DensityToggle />
      </section>
    </div>
  )
}
