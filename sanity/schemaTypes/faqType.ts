import { DocumentIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

// eslint-disable-next-line import/no-anonymous-default-export
export const faqType = defineType({
  name: "faq",
  title: "Faqs",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
  ],
  //   preview: {
  //     select: {
  //       title: "name",
  //       media: "image",
  //       price: "price",
  //     },
  //     prepare(select) {
  //       return {
  //         title: select.title,
  //         subtitle: `$${select.price}`,
  //         media: select.media,
  //       }
  //     },
  //   },
})
