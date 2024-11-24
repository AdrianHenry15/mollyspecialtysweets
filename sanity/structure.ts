import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Molly's Specialty Sweets Studio")
    .items([
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("faqCategory").title("Faq Categories"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          item.getId() !== "category" &&
          item.getId() !== "faqCategory" // Exclude both "category" and "faqCategory"
      ),
    ])
