import { defineType, defineField } from "sanity";

export const gridDrive = defineType({
  name: "gridDrive",
  title: "GridDrive Section (Coming Soon)",
  type: "document",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      initialValue: "GRIDDRIVE",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Powertrain. Coming Soon.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      initialValue: "Register Interest",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
