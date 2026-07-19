# Premium Portfolio Design System

## Overview

This document describes the professional design system built for a cybersecurity expert portfolio. The system emphasizes:

- **Classy minimalism** with premium polish
- **Dark professional aesthetic** (hacker-elite brand)
- **Consistent interactions** across all components
- **Smooth animations** (150-300ms durations)
- **Accessibility-first** design patterns

---

## Color Palette

### Primary Colors

- **Background**: `#0B0C0E` (Deep Black)
- **Elevated BG**: `#131417`, `#1A1B1F` (Card backgrounds)
- **Accent Primary**: `#5EEAD4` (Teal - selective use)
- **Text Primary**: `#EDEDEE` (Main text)
- **Text Secondary**: `#8B8D92` (Secondary text)
- **Text Tertiary**: `#55575D` (Faint text)

### Usage Rules

- **Accent (#5EEAD4)** is reserved for:
  - Interactive hover states
  - Important CTAs
  - Accent borders on cards
  - Badge highlights
- Never use full saturation on large areas
- Always dim accent with `rgba(94, 234, 212, 0.12)` for backgrounds

---

## Typography

### Scale

- **H1**: `clamp(2.5rem, 6vw, 4.5rem)` @ 800 weight
- **H2**: `clamp(2rem, 4vw, 3.5rem)` @ 700 weight
- **H3**: `1.25rem` @ 600 weight
- **Body Large**: `1.125rem` @ 400 weight
- **Body Base**: `1rem` @ 400 weight
- **Body Small**: `0.9375rem` @ 400 weight
- **Mono**: `0.875rem` @ 400 weight (JetBrains Mono)

### Fonts

- **Body**: `Inter` (geometric, modern, professional)
- **Mono**: `JetBrains Mono` (code, technical sections)

---

## Component Library

### ButtonPremium

Four variants with smooth 200ms transitions:

#### Variant: Primary (White → Teal)

```tsx
<ButtonPremium variant="primary" size="base">
  Primary Action
</ButtonPremium>
```

- Background: `#EDEDEE` → `#5EEAD4` on hover
- Use for main CTAs (e.g., "Download Resume")

#### Variant: Secondary (Ghost with Border)

```tsx
<ButtonPremium variant="secondary" size="base">
  Secondary Action
</ButtonPremium>
```

- Border: `rgba(255,255,255,0.14)` → `#5EEAD4` on hover
- Use for supporting actions

#### Variant: Ghost (Text Only)

```tsx
<ButtonPremium variant="ghost" size="base">
  View more
</ButtonPremium>
```

- Text: `#8B8D92` → `#5EEAD4` on hover
- Use for subtle links

#### Variant: Accent (Teal Background)

```tsx
<ButtonPremium variant="accent" size="base">
  Featured Action
</ButtonPremium>
```

- Background: `#5EEAD4` with enhanced glow on hover
- Use sparingly for premium CTAs

### Sizes

- **sm**: `px-4 py-2` @ 0.875rem
- **base**: `px-6 py-3` @ 1rem (recommended)
- **lg**: `px-8 py-4` @ 1.125rem

### Icon Support

```tsx
<ButtonPremium icon={<Icon />} iconPosition="left">
  With Icon
</ButtonPremium>
```

---

### CardPremium

Flexible card system for content containers:

#### Variant: Default

```tsx
<CardPremium>
  <CardHeader withBorder>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</CardPremium>
```

#### Variant: Elevated

Adds `shadow-lg` for depth (projects, showcases)

#### Variant: Glass

Backdrop blur effect + subtle gradient (premium features)

#### Variant: Bordered

Bold accent border for accent content

### Interactive Cards

```tsx
<CardPremium interactive>Click to expand</CardPremium>
```

- Lifts on hover (`scale: 1.02`)
- Accent border appears
- Smooth 300ms transition

---

### FeatureCard

Pre-styled card for features/capabilities:

```tsx
<FeatureCard icon="🔒" title="Feature Name" description="Feature description" />
```

### StatCard

Display metrics:

```tsx
<StatCard value="95%" label="Success Rate" trend="up" />
```

---

## Layout Components

### SectionPremium

Wrap entire sections for consistency:

```tsx
<SectionPremium
  id="projects"
  variant="default"
  spacing="normal"
  accentLine="top"
>
  <SectionHeader
    eyebrow="Portfolio"
    title="Featured Projects"
    subtitle="Security tooling and pentesting work"
  />
  <SectionGrid columns={3}>{/* cards */}</SectionGrid>
</SectionPremium>
```

### Variants

- **default**: Flat dark background
- **glass**: Gradient + backdrop blur + subtle border
- **accent**: Gradient with teal tint

### Spacing Options

- **compact**: `py-16 sm:py-24`
- **normal**: `py-20 sm:py-32` (recommended)
- **spacious**: `py-24 sm:py-40`

### Accent Lines

- **top** (default): Border-top only
- **bottom**: Border-bottom only
- **both**: Top + bottom borders
- **none**: No borders

---

## Animation Guidelines

### Durations

- **Fast**: 150ms (micro-interactions, hover feedback)
- **Base**: 200ms (button transitions, card lift)
- **Normal**: 300ms (section reveals, stagger)
- **Slow**: 500ms (hero entrance, major reveal)

### Easing Functions

- **power1.out**: Subtle (text fades, borders)
- **power2.out**: Standard (cards, buttons)
- **expo.out**: Premium (hero, heading scale)
- **back.out**: Playful (badges, icon pulse)
- **elastic.out**: Premium feel (magnetic pull)

### Built-in Patterns

- Hover lift: `y: -4px` scale `1.02` (200ms)
- Card elevation: `y: -12px` with glow shadow (300ms)
- Badge pulse: Breathing opacity (2.4s infinite)
- Cursor blink: Step animation (1s infinite)

---

## Spacing System

Based on 8px base unit:

- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 2.5rem (40px)
- **2xl**: 3rem (48px)
- **3xl**: 3.5rem (56px)
- **4xl**: 4rem (64px)
- **5xl**: 5rem (80px)

---

## Border Radius

Consistent rounding:

- **Buttons**: `rounded-md` (6px), `rounded-lg` (8px), `rounded-xl` (12px)
- **Cards**: `rounded-xl` (12px)
- **Full**: `rounded-full` (pills, badges)

---

## Shadow System

Subtle, professional shadows:

- **sm**: Minimal (inputs, focus states)
- **base**: Cards at rest
- **md**: Card hover (standard elevation)
- **lg**: Card hover (prominent elevation)
- **Glow**: Accent borders (`0_0_20px_rgba(94,234,212,0.1)`)
- **Glow Hover**: Enhanced accent (`0_0_30px_rgba(94,234,212,0.15)`)

---

## Accessibility

All components include:

- **Focus rings**: 2px `#5EEAD4` with offset
- **ARIA labels**: Icon buttons, buttons with loading state
- **Keyboard nav**: Tab-accessible all interactive elements
- **Color contrast**: WCAG AA compliant (4.5:1 ratio)
- **Motion respects**: `prefers-reduced-motion` media query

---

## Implementation Examples

### Hero Section

```tsx
<SectionPremium id="hero">
  <h1>Hero Heading</h1>
  <p>Subtitle</p>
  <ButtonGroup spacing="normal">
    <ButtonPremium variant="primary">Primary</ButtonPremium>
    <ButtonPremium variant="secondary">Secondary</ButtonPremium>
  </ButtonGroup>
</SectionPremium>
```

### Projects Section

```tsx
<SectionPremium id="projects">
  <SectionHeader eyebrow="Portfolio" title="Projects" />
  <SectionGrid columns={3}>
    {projects.map((p) => (
      <CardPremium key={p.id} interactive>
        <CardTitle>{p.title}</CardTitle>
        <CardContent>{p.desc}</CardContent>
      </CardPremium>
    ))}
  </SectionGrid>
</SectionPremium>
```

---

## Design Principles Summary

1. **Minimalism**: Remove everything non-essential
2. **Consistency**: One component, one look, everywhere
3. **Premium Polish**: Smooth animations, refined shadows
4. **Professional Dark**: Deep blacks, selective accent
5. **Readable Hierarchy**: Clear visual structure
6. **Accessible**: Contrast, focus states, motion preferences
7. **Responsive**: Clamp() for typography, grid for layouts
8. **Performant**: Hardware-accelerated transforms only

---

## Version

**Design System v1.0** - Production ready

- **Created**: 2026-07-19
- **Status**: Active
- **Compatibility**: Next.js 15+, Tailwind CSS 3+
