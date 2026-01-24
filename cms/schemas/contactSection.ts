import { defineType, defineField } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Let's Talk",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "formInterests",
      title: "Form Interest Options",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["GridEnergy", "GridCharge", "GridDrive", "Partnership", "Other"],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
