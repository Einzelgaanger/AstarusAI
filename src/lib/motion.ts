import { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const easeOut = [0.33, 1, 0.68, 1] as const;

export const fadeInUp = (delay = 0, distance = 40): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay, ease },
  },
});

export const fadeInLeft = (delay = 0, distance = 32): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease },
  },
});

export const fadeInRight = (delay = 0, distance = 32): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: easeOut },
  },
});

export const staggerContainer = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: ease },
};

