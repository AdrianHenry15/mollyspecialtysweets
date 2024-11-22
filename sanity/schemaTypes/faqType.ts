import { TrolleyIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

// eslint-disable-next-line import/no-anonymous-default-export
export const faqType = defineType({
  name: "faq",
  title: "Faqs",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "blockContent",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "blockContent",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "categories",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
