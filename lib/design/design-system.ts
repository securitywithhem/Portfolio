/**
 * Premium Cybersecurity Portfolio Design System
 * Master design specification: Classy, Simple, Highly Attractive
 *
 * Design Principles:
 * 1. Refined minimalism with premium polish
 * 2. Dark professional aesthetic (hacker-elite)
 * 3. Teal/cyan accent with selective color use
 * 4. Consistent spacing and typography
 * 5. Micro-interactions on all interactive elements
 * 6. Smooth 150-300ms animations
 */

export const designSystem = {
  // ===== COLOR PALETTE =====
  colors: {
    // Backgrounds
    bg: {
      primary: "#0B0C0E", // Deep black
      secondary: "#131417", // Slightly raised
      tertiary: "#1A1B1F", // Card backgrounds
      hover: "rgba(255, 255, 255, 0.04)", // Subtle hover overlay
    },

    // Text
    text: {
      primary: "#EDEDEE", // Main text
      secondary: "#8B8D92", // Secondary text
      tertiary: "#55575D", // Tertiary/faint text
    },

    // Accent (Teal)
    accent: {
      primary: "#5EEAD4", // Main accent
      dim: "rgba(94, 234, 212, 0.12)", // Background tint
      hover: "rgba(94, 234, 212, 0.2)", // Hover state
      glow: "rgba(94, 234, 212, 0.1)", // Soft glow
    },

    // Borders
    border: {
      primary: "rgba(255, 255, 255, 0.08)", // Main border
      strong: "rgba(255, 255, 255, 0.14)", // Stronger border
    },
  },

  // ===== TYPOGRAPHY =====
  typography: {
    // Font families
    fonts: {
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },

    // Heading scales
    heading: {
      h1: { size: "clamp(2.5rem, 6vw, 4.5rem)", weight: 800, lineHeight: 1.1 },
      h2: { size: "clamp(2rem, 4vw, 3.5rem)", weight: 700, lineHeight: 1.15 },
      h3: { size: "clamp(1.5rem, 3vw, 2.25rem)", weight: 700, lineHeight: 1.2 },
      h4: { size: "1.25rem", weight: 600, lineHeight: 1.3 },
      h5: { size: "1.125rem", weight: 600, lineHeight: 1.4 },
      h6: { size: "1rem", weight: 600, lineHeight: 1.5 },
    },

    // Body text
    body: {
      lg: { size: "1.125rem", weight: 400, lineHeight: 1.7 },
      base: { size: "1rem", weight: 400, lineHeight: 1.65 },
      sm: { size: "0.9375rem", weight: 400, lineHeight: 1.6 },
      xs: { size: "0.875rem", weight: 400, lineHeight: 1.5 },
    },

    // Mono/code text
    mono: {
      base: { size: "0.875rem", weight: 400, lineHeight: 1.6 },
      sm: { size: "0.8125rem", weight: 400, lineHeight: 1.5 },
    },
  },

  // ===== SPACING =====
  spacing: {
    xs: "0.5rem", // 8px
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "2.5rem", // 40px
    "2xl": "3rem", // 48px
    "3xl": "3.5rem", // 56px
    "4xl": "4rem", // 64px
    "5xl": "5rem", // 80px
  },

  // ===== BORDER RADIUS =====
  radius: {
    none: "0",
    xs: "0.25rem", // 4px
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },

  // ===== SHADOWS =====
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",

    // Accent glow shadows
    accentGlow: "0 0 20px rgba(94, 234, 212, 0.1)",
    accentGlowHover: "0 0 30px rgba(94, 234, 212, 0.15)",
  },

  // ===== ANIMATIONS =====
  animations: {
    durations: {
      fast: "150ms",
      base: "200ms",
      normal: "300ms",
      slow: "500ms",
    },

    easing: {
      easeOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",

      // Premium easings (GSAP style)
      expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      back: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      elastic: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    },

    // Transition shortcuts
    transitions: {
      default: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      color: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      transform: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // ===== BREAKPOINTS =====
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // ===== COMPONENT TOKENS =====
  components: {
    button: {
      primary: {
        background: "#EDEDEE",
        color: "#0B0C0E",
        hoverBackground: "#5EEAD4",
        hoverColor: "#04211C",
        activeBg: "rgba(94, 234, 212, 0.8)",
        disabledBg: "rgba(255, 255, 255, 0.3)",
        disabledColor: "rgba(255, 255, 255, 0.5)",
      },

      secondary: {
        background: "transparent",
        color: "#EDEDEE",
        borderColor: "rgba(255, 255, 255, 0.14)",
        hoverBorderColor: "#5EEAD4",
        hoverColor: "#5EEAD4",
        activeBg: "rgba(94, 234, 212, 0.1)",
      },

      ghost: {
        background: "transparent",
        color: "#8B8D92",
        hoverColor: "#5EEAD4",
        hoverBg: "rgba(94, 234, 212, 0.05)",
      },

      sizing: {
        sm: { padding: "8px 16px", fontSize: "0.875rem", radius: "6px" },
        base: { padding: "12px 24px", fontSize: "1rem", radius: "8px" },
        lg: { padding: "14px 28px", fontSize: "1.125rem", radius: "10px" },
      },
    },

    card: {
      background: "#131417",
      borderColor: "rgba(255, 255, 255, 0.08)",
      hoverBorderColor: "rgba(94, 234, 212, 0.25)",
      shadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      hoverShadow: "0 10px 25px rgba(94, 234, 212, 0.05)",
    },

    input: {
      background: "#1A1B1F",
      borderColor: "rgba(255, 255, 255, 0.08)",
      focusBorderColor: "#5EEAD4",
      textColor: "#EDEDEE",
      placeholderColor: "#55575D",
    },

    badge: {
      background: "rgba(94, 234, 212, 0.12)",
      borderColor: "rgba(94, 234, 212, 0.25)",
      color: "#5EEAD4",
    },
  },

  // ===== Z-INDEX STACK =====
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// CSS Variables export for Tailwind/global styles
export const getCSSVariables = () => `
  :root {
    /* Colors */
    --bg-primary: ${designSystem.colors.bg.primary};
    --bg-secondary: ${designSystem.colors.bg.secondary};
    --text-primary: ${designSystem.colors.text.primary};
    --text-secondary: ${designSystem.colors.text.secondary};
    --accent-primary: ${designSystem.colors.accent.primary};
    --accent-dim: ${designSystem.colors.accent.dim};

    /* Spacing */
    --space-xs: ${designSystem.spacing.xs};
    --space-sm: ${designSystem.spacing.sm};
    --space-md: ${designSystem.spacing.md};
    --space-lg: ${designSystem.spacing.lg};
    --space-xl: ${designSystem.spacing.xl};

    /* Animations */
    --duration-fast: ${designSystem.animations.durations.fast};
    --duration-base: ${designSystem.animations.durations.base};
    --duration-normal: ${designSystem.animations.durations.normal};
  }
`;

export type DesignSystem = typeof designSystem;
