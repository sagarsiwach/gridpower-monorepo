import { defineType, defineField } from "sanity";

export const solutionSection = defineType({
  name: "solutionSection",
  title: "Solution Section",
  type: "document",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      description: "GRIDENERGY or GRIDCHARGE",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. Home Energy, Office Charging",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "benefits",
      title: "Key Benefits",
      type: "array",
      of: [{ type: "string" }],
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
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video URL",
      type: "url",
    }),
    defineField({
      name: "products",
      title: "Featured Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "sectionId",
      title: "Section ID (for anchor links)",
      type: "string",
      description: "e.g. gridenergy-home, gridcharge-office",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "overline",
      media: "backgroundImage",
    },
  },
});
