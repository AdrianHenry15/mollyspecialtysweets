import { test, expect } from "@playwright/test";

test("has title", async ({ page }: any) => {
    await page.goto("http://localhost:3000");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Molly's Specialty Sweets/);
});

test("has icons that select Order Type", async ({ page }: any) => {
    await page.goto("http://localhost:3000");

    const orderTypeIcons = await page.$$('[data-testid="order-type-icon"]');

    // Expect icons to be present
    await expect(orderTypeIcons.length).toBeGreaterThan(0);
});
