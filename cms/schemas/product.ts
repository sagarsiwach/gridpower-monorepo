import { defineType, defineField } from "sanity";
import { PackageIcon } from "@sanity/icons";

/**
 * Product Collection
 *
 * Catalog of GridPower products across all brands:
 * - GridEnergy: Inverters, batteries, meters, container ESS
 * - GridCharge: AC chargers, DC chargers, software
 * - GridDrive: Powertrain components (future)
 *
 * Used in solution sections and product pages.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      description: "e.g. GridSync Inverter, GridCharge AC 7kW",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short value prop (e.g. 'Hybrid inverter that syncs everything')",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "specs",
      title: "Specs Summary",
      type: "string",
      description: "Key specs for card display (e.g. '7kW · Type 2 · 1-Phase')",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      description: "Square or 4:3 ratio, transparent background preferred",
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
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "URL-friendly identifier",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "image",
      brand: "brand",
    },
    prepare({ title, subtitle, media, brand }) {
      return {
        title,
        subtitle: `${brand?.toUpperCase() || ""} · ${subtitle || ""}`,
        media,
      };
    },
  },
});
