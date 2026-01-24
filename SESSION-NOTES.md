# Session Notes - 24-01-2026

## Styling Approach Discussion

### The Problem

Mixed styling approaches caused padding/spacing to break:

| Approach | Example |
|----------|---------|
| Inline styles | `style={{ padding: "16px" }}` |
| Tailwind classes | `className="p-4"` |
| shadcn components | `<Button variant="outline">` |

When combined on same element, specificity conflicts caused unpredictable rendering.

### What Happened

1. shadcn `Button` has default padding/height
2. Added Tailwind classes that fought with those defaults
3. Some classes won, some lost = inconsistent UI
4. NavigationMenuTrigger text went invisible (color came from CSS variables)

### The Fix

Pure inline styles for custom-designed components.

### Proposed Rule

**Choose one approach per component:**

| Approach | When to Use |
|----------|-------------|
| Pure inline styles | Custom components with specific Figma designs |
| shadcn defaults | Standard UI patterns (modals, dropdowns) |
| Tailwind only | Simple layouts, utility classes |

---

## Responsive Breakpoints

| Viewport | Max Content Width |
|----------|-------------------|
| 1920px+ | 1536px |
| 1440px | 1280px |
| 1024px | 896px |
| 768px | 576px |
| Phone | 16px padding (full width) |

---

## TODO

- [ ] Debate styling approach tonight
