import { defineType, defineField } from "sanity";

export const statsSection = defineType({
  name: "statsSection",
  title: "Numbers/Stats Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "GridPower in Numbers",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. 500+, 99.9%, 50 MW",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Systems deployed",
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
