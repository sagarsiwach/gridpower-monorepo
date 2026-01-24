import { defineType, defineField } from "sanity";

export const weAreOpen = defineType({
  name: "weAreOpen",
  title: "We Are Open Section",
  type: "document",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      initialValue: "OUR PHILOSOPHY",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "We Are Open.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Pillar Title",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name (e.g. unlock, eye, link-2)",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "closingLine",
      title: "Closing Line",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
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
