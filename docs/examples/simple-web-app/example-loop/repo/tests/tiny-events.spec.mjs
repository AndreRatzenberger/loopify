import { expect, test } from "@playwright/test";

test("lists local events", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Tiny Events Board" })).toBeVisible();
  await expect(page.getByRole("article", { name: /Agent Workshop/ })).toBeVisible();
  await expect(page.getByRole("article", { name: /Poetry Picnic/ })).toBeVisible();
  await expect(page.getByRole("article", { name: /Repair Cafe/ })).toBeVisible();
});

test("filters by category", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Category").selectOption("workshop");

  await expect(page.getByRole("article", { name: /Agent Workshop/ })).toBeVisible();
  await expect(page.getByRole("article", { name: /Poetry Picnic/ })).toBeHidden();
  await expect(page.getByRole("article", { name: /Repair Cafe/ })).toBeHidden();
});

test("saves favorite events", async ({ page }) => {
  await page.goto("/");

  const favorite = page.getByRole("button", { name: /Save Agent Workshop/ });
  await favorite.click();

  await expect(favorite).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("Saved 1 favorite");
});

test("works at a 390px viewport without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 760 });
  await page.goto("/");

  await expect(page.getByRole("article", { name: /Agent Workshop/ })).toBeVisible();

  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
  }));

  expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.viewport);
  expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.viewport);
});
