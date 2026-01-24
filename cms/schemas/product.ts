import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "specs",
      title: "Specs Summary",
      type: "string",
      description: "e.g. 7kW · Type 2 · 1-Phase",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      options: {
        list: [
          { title: "GridEnergy", value: "gridenergy" },
          { title: "GridCharge", value: "gridcharge" },
          { title: "GridDrive", value: "griddrive" },
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Inverter", value: "inverter" },
          { title: "Battery", value: "battery" },
          { title: "Meter", value: "meter" },
          { title: "AC Charger", value: "ac-charger" },
          { title: "DC Charger", value: "dc-charger" },
          { title: "Software", value: "software" },
          { title: "Container ESS", value: "container-ess" },
        ],
      },
    }),
    defineField({
      name: "link",
      title: "Product Page Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "image",
    },
  },
});
