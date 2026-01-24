import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/**
 * GridPower CMS Configuration
 *
 * Sanity Studio v3 with custom desk structure for singletons
 *
 * Singletons: Homepage, Site Settings
 * Collections: Products
 */
export default defineConfig({
  name: "default",
  title: "GridPower CMS",
  projectId: "tzdld3jk",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Homepage")
              ),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem("product").title("Products"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
