import { defineType, defineField } from "sanity";

export const footerCta = defineType({
  name: "footerCta",
  title: "Footer CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Ready to Power Up?",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
