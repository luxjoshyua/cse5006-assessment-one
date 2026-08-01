import { test, expect, type APIRequestContext } from "@playwright/test"

const SLUG = "e2e-crud-item"

/**
 * Test for the server-side CRUD operations use case.
 */
async function getFeedId(request: APIRequestContext): Promise<string> {
  const res = await request.get("/api/feeds")
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body.data.length).toBeGreaterThan(0)
  return body.data[0].id
}

test.describe("Server use case: CRUD operations on feed items", () => {
  test.afterEach(async ({ request }) => {
    // Leave no test data behind, whether the test passed or failed.
    await request.delete(`/api/items/${SLUG}`)
  })

  test("creates, reads, updates and deletes an item via the API", async ({
    request,
  }) => {
    const feedId = await getFeedId(request)

    // CREATE
    const created = await request.post("/api/items", {
      data: {
        slug: SLUG,
        title: "End-to-end test item",
        link: "https://example.edu/e2e",
        summary: "Created by the Playwright server test.",
        content: "Full content for the end-to-end test item.",
        publishedAt: new Date().toISOString(),
        author: "Playwright",
        feedId,
      },
    })
    expect(created.status()).toBe(201)
    const createdBody = await created.json()
    expect(createdBody.error).toBeNull()
    expect(createdBody.data.title).toBe("End-to-end test item")
    expect(createdBody.data.author).toBe("Playwright")

    // READ
    const read = await request.get(`/api/items/${SLUG}`)
    expect(read.status()).toBe(200)
    const readBody = await read.json()
    expect(readBody.data.slug).toBe(SLUG)

    // UPDATE
    const updated = await request.patch(`/api/items/${SLUG}`, {
      data: { title: "Updated by the end-to-end test" },
    })
    expect(updated.status()).toBe(200)
    const updatedBody = await updated.json()
    expect(updatedBody.data.title).toBe("Updated by the end-to-end test")

    // DELETE
    const deleted = await request.delete(`/api/items/${SLUG}`)
    expect(deleted.status()).toBe(200)

    // CONFIRM GONE
    const missing = await request.get(`/api/items/${SLUG}`)
    expect(missing.status()).toBe(404)
    const missingBody = await missing.json()
    expect(missingBody.data).toBeNull()
    expect(missingBody.error).toBeTruthy()
  })

  test("rejects an item with missing required fields", async ({ request }) => {
    const res = await request.post("/api/items", { data: { slug: "bad" } })
    expect(res.status()).toBe(422)
    const body = await res.json()
    expect(body.error).toContain("Missing or invalid field")
  })

  test("reports healthy status with a database connection", async ({
    request,
  }) => {
    const res = await request.get("/api/health")
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.data.database).toBe("connected")
  })
})
