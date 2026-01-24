import { defineType, defineField } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner/Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Partner", value: "partner" },
          { title: "Certification", value: "certification" },
          { title: "Customer", value: "customer" },
        ],
      },
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
