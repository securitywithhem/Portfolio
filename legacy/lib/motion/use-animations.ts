import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animations } from "./animations";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: Apply scroll-reveal animation to element
 * Usage: const ref = useScrollReveal(); <div ref={ref}>Content</div>
 */
export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      animations.scrollReveal(element);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, []);

  return ref;
};

/**
 * Hook: Stagger animate children on load
 * Usage: const ref = useStaggerIn(); <div ref={ref}><Item/><Item/></div>
 */
export const useStaggerIn = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      animations.staggerIn(ref.current);
    }
  }, []);

  return ref;
};

/**
 * Hook: Apply hover lift to element
 * Usage: const ref = useHoverLift(); <div ref={ref}>Hover me</div>
 */
export const useHoverLift = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      animations.hoverLift(element);
    }
  }, []);

  return ref;
};

/**
 * Hook: Apply hover elevation (lift + shadow) to element
 * Usage: const ref = useHoverElevate(); <div ref={ref}>Card</div>
 */
export const useHoverElevate = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      animations.hoverElevate(element);
    }
  }, []);

  return ref;
};

/**
 * Hook: Apply magnetic hover effect to element
 * Usage: const ref = useMagneticHover(); <div ref={ref}>Magnetic</div>
 */
export const useMagneticHover = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      animations.magneticHover(ref.current);
    }
  }, []);

  return ref;
};

/**
 * Hook: Apply parallax scroll effect
 * Usage: const ref = useParallax(0.5); <div ref={ref}>Parallax content</div>
 */
export const useParallax = (factor = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      animations.parallax(element, factor);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [factor]);

  return ref;
};

/**
 * Hook: Cleanup all GSAP animations for this component
 * Use in cleanup to prevent memory leaks
 */
export const useGSAPCleanup = () => {
  useEffect(() => {
    return () => {
      gsap.killTweensOf("*");
    };
  }, []);
};

/**
 * Hook: Respect prefers-reduced-motion
 * Returns true if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};
