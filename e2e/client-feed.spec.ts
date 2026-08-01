import { test, expect } from "@playwright/test"

/**
 * Test for the client-side feed viewing use case.
 * Uses getByRole queries to find elements by their ARIA roles and accessible names.
 */
test.describe("Client use case: retrieving and viewing feed content", () => {
  test("the RSS client fetches items from the server and renders them", async ({
    page,
  }) => {
    await page.goto("/client")

    await expect(
      page.getByRole("heading", { name: "RSS Client", level: 1 }),
    ).toBeVisible()

    // The client fetches on mount; items should appear without interaction.
    const items = page.getByRole("listitem")
    await expect(items.first()).toBeVisible()

    // Fetching again should keep content rendered and update request stats.
    await page.getByRole("button", { name: "Fetch from server" }).click()
    await expect(page.getByText("Total requests")).toBeVisible()
    await expect(items.first()).toBeVisible()
  })

  test("a feed item can be opened from the feeds list", async ({ page }) => {
    await page.goto("/feeds")

    const firstLink = page.getByRole("link", { name: /.+/ }).filter({
      hasNotText: /Home|Feeds|Client|About|Settings|Dashboard|Skip/,
    })

    const title = await firstLink.first().textContent()
    await firstLink.first().click()

    await expect(page).toHaveURL(/\/feeds\/.+/)
    await expect(
      page.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible()
    if (title) {
      await expect(
        page.getByRole("heading", { level: 1, name: title.trim() }),
      ).toBeVisible()
    }
  })

  test("the dashboard reports feed and request metrics", async ({ page }) => {
    await page.goto("/dashboard")

    await expect(
      page.getByRole("heading", { name: "Dashboard", level: 1 }),
    ).toBeVisible()
    await expect(page.getByText("RSS feeds")).toBeVisible()
    await expect(page.getByText("Total requests")).toBeVisible()
    await expect(page.getByText("Unique clients")).toBeVisible()
  })
})
