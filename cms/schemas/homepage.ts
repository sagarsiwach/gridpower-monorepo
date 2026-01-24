import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

/**
 * Homepage Singleton
 *
 * Contains all content for the homepage including:
 * - Hero carousel slides (8 slides for GridEnergy + GridCharge)
 *
 * This is a singleton - only one document exists.
 * Access via documentId: "homepage"
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fields: [
    // ========================================
    // HERO CAROUSEL
    // ========================================
    defineField({
      name: "heroSlides",
      title: "Hero Carousel Slides",
      description: "Full-screen hero slides. Recommended: 8 slides (4 GridEnergy + 4 GridCharge)",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Hero Slide",
          fields: [
            defineField({
              name: "overline",
              title: "Brand/Overline",
              type: "string",
              description: "GRIDENERGY or GRIDCHARGE",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              description: "Main headline. Keep punchy (5-7 words)",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              rows: 3,
              description: "Supporting text. 2-3 sentences max.",
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
              description: "e.g. 'Explore Home Energy'",
            }),
            defineField({
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
              description: "Anchor link (e.g. #gridenergy-home) or page URL",
            }),
            defineField({
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              description: "16:9 ratio, min 1920x1080px",
            }),
            defineField({
              name: "backgroundVideo",
              title: "Background Video URL",
              type: "url",
              description: "Optional. MP4 URL. Overrides image if set.",
            }),
          ],
          preview: {
            select: {
              title: "headline",
              subtitle: "overline",
              media: "backgroundImage",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
        subtitle: "Hero carousel and page content",
      };
    },
  },
});
