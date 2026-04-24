import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ImageIcon, Camera, Video } from "lucide-react";
import { cn } from "../lib/utils.js";
import { DotGrid } from "./dot-grid.js";

const imgPlaceholderVariants = cva(
  "relative overflow-hidden rounded-img border border-border flex items-center justify-center",
  {
    variants: {
      theme: {
        light: "bg-sand-3",
        dark: "bg-dark-3 border-dark-6",
      },
      aspect: {
        "16/9": "aspect-video",
        "4/3": "aspect-[4/3]",
        "1/1": "aspect-square",
        "3/4": "aspect-[3/4]",
      },
    },
    defaultVariants: {
      theme: "light",
      aspect: "16/9",
    },
  },
);

const ICONS = {
  image: ImageIcon,
  camera: Camera,
  video: Video,
} as const;

export type ImgPlaceholderIcon = keyof typeof ICONS;

export interface ImgPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imgPlaceholderVariants> {
  /** Label text shown below the icon. */
  label?: string;
  /** Which Lucide icon to display. Defaults to "image". */
  icon?: ImgPlaceholderIcon;
}

/**
 * ImgPlaceholder — aspect-ratio box for image layout scaffolding.
 *
 * Uses `DotGrid` as the background texture, a Lucide icon, and
 * optional label text. Intended for design/dev mockups — swap out
 * with a real `<img>` or `<Image>` in production.
 *
 * @example
 * <ImgPlaceholder aspect="16/9" label="Hero · Lifestyle shoot" />
 * <ImgPlaceholder aspect="1/1" icon="camera" theme="dark" label="Product render" />
 */
const ImgPlaceholder = React.forwardRef<HTMLDivElement, ImgPlaceholderProps>(
  ({ theme, aspect, icon = "image", label, className, ...props }, ref) => {
    const IconComponent = ICONS[icon];
    const isDark = theme === "dark";

    return (
      <div
        ref={ref}
        className={cn(imgPlaceholderVariants({ theme, aspect }), className)}
        {...props}
      >
        <DotGrid
          color={isDark ? "var(--dark-6)" : "var(--sand-5)"}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <IconComponent
            className={cn(
              "w-6 h-6",
              isDark ? "text-dark-8" : "text-sand-8",
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {label != null && (
            <span
              className={cn(
                "font-mono text-label uppercase text-center",
                isDark ? "text-dark-9" : "text-sand-9",
              )}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    );
  },
);
ImgPlaceholder.displayName = "ImgPlaceholder";

export { ImgPlaceholder, imgPlaceholderVariants };
