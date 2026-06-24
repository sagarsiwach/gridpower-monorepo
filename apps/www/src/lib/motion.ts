/*
  motion.dev re-exports + locked easings.
  All durations and curves match DESIGN.md motion section.
  Register: Expressive-professional (marketing).
*/
export { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";

/*
  Locked easings. Use these by name, never inline cubic-bezier.
  Mirror the CSS custom properties in globals.css.
*/
export const easings = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  hover: [0.25, 1, 0.5, 1] as const,
};

/*
  Locked durations in seconds (motion.dev uses seconds, CSS uses ms).
*/
export const durations = {
  hover: 0.2,
  page: 0.4,
  reveal: 0.6,
  hero: 0.8,
  stagger: 0.04,
  nav: 0.18,
  image: 0.8,
};

/*
  Common preset transitions.
*/
export const transitions = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: durations.reveal, ease: easings.outExpo },
  },
  heroWordStagger: (index: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: durations.hero,
      ease: easings.outExpo,
      delay: index * durations.stagger,
    },
  }),
  navOpen: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: durations.nav, ease: easings.outQuart },
  },
};
