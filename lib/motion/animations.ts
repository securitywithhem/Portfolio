import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium animation presets for cybersecurity portfolio.
 * Motion tier: Complex (8/10) — GSAP scroll reveals, stagger, elastic hover
 */

export const animations = {
  /**
   * Scroll reveal — fade + slide up on viewport enter
   * Easing: power2.out | Duration: 400-600ms
   */
  scrollReveal: (el: Element | Element[], options = {}) => {
    const targets = Array.isArray(el) ? el : [el];
    targets.forEach((target) => {
      gsap.from(target, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        ...options,
      });
    });
  },

  /**
   * Stagger children on load or scroll
   * Easing: power1.out | Duration: 250-350ms per item
   */
  staggerIn: (container: Element, options = {}) => {
    gsap.from(container.children, {
      opacity: 0,
      y: 12,
      duration: 0.3,
      stagger: 0.04,
      ease: "power1.out",
      ...options,
    });
  },

  /**
   * Hover micro-interaction — subtle lift
   * Duration: 150-200ms | Transform: 2px up, slight scale
   */
  hoverLift: (el: Element) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        y: -4,
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  },

  /**
   * Hover card elevation — lift + shadow growth
   * Duration: 200-300ms | Shadow: 0 12px 24px rgba(0,0,0,0.12)
   */
  hoverElevate: (el: Element) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        y: 0,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  },

  /**
   * Magnetic hover effect — element follows cursor
   * Clamp: * 0.3 (stays within bounds)
   */
  magneticHover: (el: Element) => {
    const htmlEl = el as HTMLElement;
    const xTo = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "elastic.out(1,0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "elastic.out(1,0.4)",
    });

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = htmlEl.getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (mouseEvent.clientY - rect.top - rect.height / 2) * 0.2;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    htmlEl.addEventListener("mousemove", handleMouseMove as EventListener);
    htmlEl.addEventListener("mouseleave", handleMouseLeave as EventListener);
  },

  /**
   * Smooth page transition — uses GSAP Flip for shared elements
   * Duration: 500-800ms | Easing: expo.inOut
   */
  pageTransition: async () => {
    const duration = 0.6;
    const ease = "expo.inOut";

    await gsap.to("main", {
      opacity: 0,
      duration: duration * 0.5,
      ease,
    });

    return { duration, ease };
  },

  /**
   * Parallax scroll effect — background moves slower than foreground
   * Factor: 0.5 (background moves at 50% scroll speed)
   */
  parallax: (el: Element, factor = 0.5) => {
    gsap.to(el, {
      yPercent: factor * 50,
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false,
      },
    });
  },

  /**
   * Fade in text character by character (requires SplitText)
   * Duration: 600ms | Stagger: 0.015s per char
   * ⚠ SplitText is a GSAP Club plugin — has fallback
   */
  textReveal: (el: Element) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "expo.out",
    });
  },

  /**
   * Continuous ambient rotation — subtle, looping
   * Duration: 20s | Linear, infinite
   */
  ambientRotate: (el: Element) => {
    gsap.to(el, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  },

  /**
   * Pulse animation — opacity breathing effect
   * Duration: 2s | Easing: sine.inOut
   */
  pulse: (el: Element, minOpacity = 0.7, duration = 2) => {
    gsap.to(el, {
      opacity: minOpacity,
      duration: duration / 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },

  /**
   * Bounce entrance — scale + opacity
   * Duration: 600ms | Easing: elastic.out(1, 0.5)
   */
  bounceIn: (el: Element, delay = 0) => {
    gsap.from(el, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay,
      ease: "elastic.out(1, 0.5)",
    });
  },
};

/**
 * ScrollTrigger helper — auto-cleanup on unmount
 * Use in React components via useEffect return
 */
export const createScrollTrigger = (config: ScrollTrigger.Vars) => {
  const trigger = ScrollTrigger.create(config);
  return () => trigger.kill();
};

/**
 * GSAP timeline for sequenced animations
 * Example: animate hero, then projects, then contact
 */
export const createTimeline = () => {
  return gsap.timeline({ paused: false });
};
