import { test, expect } from "@playwright/test";

test("has title", async ({ page }: any) => {
    await page.goto("http://localhost:3000");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Molly's Specialty Sweets/);
});

// test("get started link", async ({ page }: any) => {
//     await page.goto("https://playwright.dev/");

//     // Click the get started link.
//     await page.getByRole("link", { name: "Get started" }).click();

//     // Expects page to have a heading with the name of Installation.
//     await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });