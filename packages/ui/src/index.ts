// @gridpower/ui — public re-exports
// Components are added by Phase 1 design-system sub-issues (DS.1 DS.2 DS.3 DS.4).
// Each component should be re-exported here so consumers can `import { Button } from "@gridpower/ui"`.

export { cn } from "./lib/utils.js";

// DS.1 primitives
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";
export { Input } from "./components/input";
export type { InputProps } from "./components/input";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select";
export { Checkbox } from "./components/checkbox";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { Switch } from "./components/switch";
export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";
export { Pill, pillVariants } from "./components/pill";
export type { PillProps } from "./components/pill";
export { StatusBadge, statusBadgeVariants } from "./components/status-badge";
export type { StatusBadgeProps } from "./components/status-badge";
