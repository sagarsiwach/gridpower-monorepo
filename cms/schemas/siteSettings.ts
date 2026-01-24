import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

/**
 * Site Settings Singleton
 *
 * Global configuration for the website:
 * - SEO: Meta tags, OG images, favicon
 * - Navigation: Logo, main menu with dropdowns
 * - Footer: Link columns, social links, copyright
 *
 * This is a singleton - only one document exists.
 * Access via documentId: "siteSettings"
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ========================================
    // SEO
    // ========================================
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "seo",
      initialValue: "GridPower",
      description: "Used in browser tab and meta tags",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "seo",
      initialValue: "The Open Energy Platform",
      description: "Appears after site name in title",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Default meta description (150-160 chars)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      group: "seo",
      description: "1200x630px. Used when pages don't have their own.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "seo",
      description: "Square PNG, 512x512px recommended",
    }),

    // ========================================
    // NAVIGATION
    // ========================================
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "navigation",
      description: "SVG or PNG with transparency",
    }),
    defineField({
      name: "logoDark",
      title: "Logo (Dark Mode)",
      type: "image",
      group: "navigation",
      description: "Optional. Used on dark backgrounds.",
    }),
    defineField({
      name: "mainNavigation",
      title: "Main Navigation",
      type: "array",
      group: "navigation",
      description: "Top-level menu items",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "URL or anchor (e.g. /products or #contact)",
            }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              description: "Leave empty for simple link",
              of: [
                {
                  type: "object",
                  name: "navChild",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "string",
                      description: "Optional. Shown in mega menu.",
                    }),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      description: "Lucide icon name (e.g. 'battery', 'zap')",
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "href" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),

    // ========================================
    // FOOTER
    // ========================================
    defineField({
      name: "footerColumns",
      title: "Footer Navigation Columns",
      type: "array",
      group: "footer",
      description: "Link columns in footer (typically 3-4)",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({
              name: "columnTitle",
              title: "Column Title",
              type: "string",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "footerLink",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                  ],
                  preview: {
                    select: { title: "label" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "columnTitle" },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      group: "footer",
      initialValue: "© 2026 GridPower. All rights reserved.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "SEO, Navigation, Footer",
      };
    },
  },
});
