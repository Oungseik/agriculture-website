---
name: Moshi Moshi — Living Fields
description: Peaceful photographic fields and crop-first product reading.
colors:
  evergreen: '#193c2e'
  field-green: '#426729'
  field-green-deep: '#304d1d'
  harvest-gold: '#d1a51e'
  white: '#ffffff'
  reading-paper: '#f6f7f3'
  quiet-green: '#53685a'
  reading-rule: '#d9e2d7'
  about-ground: '#edf1e8'
typography:
  display:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(48px, 4.49vw, 74px)'
    fontWeight: 400
    lineHeight: 1
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(34px, 3.06vw, 48px)'
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: '-0.025em'
  title:
    fontFamily: 'Alata, sans-serif'
    fontSize: '35px'
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: 'Lato, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: 'Lato, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.65
rounded:
  photo: '3px'
  thumbnail: '4px'
  action: '999px'
spacing:
  compact: '16px'
  group: '22px'
  choices: '28px'
  section-start: '40px'
  article: '52px'
components:
  primary-link:
    backgroundColor: '{colors.field-green}'
    textColor: '{colors.white}'
    rounded: '{rounded.action}'
    padding: '10px 28px'
    height: '50px'
  primary-link-hover:
    backgroundColor: '{colors.field-green-deep}'
    textColor: '{colors.white}'
  focus-panel:
    backgroundColor: '{colors.white}'
    textColor: '{colors.evergreen}'
    rounded: '{rounded.photo}'
  reading-section:
    backgroundColor: '{colors.reading-paper}'
    textColor: '{colors.evergreen}'
---

# Design System: Moshi Moshi

## Overview

**Creative North Star: "Living Fields"**

A peaceful, farm-and-nature-led site with photographic depth and clear English product reading. Morning fields carry the atmosphere; evergreen humanist sans text and white controls keep the information legible. This is an informational product range, not a sales catalog or an agronomic teaching board.

The built system uses restrained green controls, a harvest-gold sun identity and flat, spacious reading sections. Brand and bottle artwork are adaptations, not original packaging evidence. This file records the homepage composition and reusable system implemented in `src/routes/+page.svelte` and `src/routes/layout.css`. Production asset provenance, exact prompts, recorded timestamps and processing limitations are retained in `assets/provenance.json`.

**Key Characteristics:**

- Independently authored crop photography, separate from semantic text and controls.
- Humanist sans typography with a clear reading hierarchy.
- White navigation and product surfaces against natural photographic depth.
- One interruptible, user-triggered crop transition; no ongoing decorative motion.

## Colors

### Primary

- **Field Green:** Actions, selected crop underline and keyboard focus.
- **Deep Field Green:** Reading links and action hover.

### Secondary

- **Harvest Gold:** The adapted sun-spiral identity; not a certification badge.

### Neutral

- **Evergreen:** Headings and main text.
- **White:** Navigation, focus strip, footer and primary-action lettering.
- **Reading Paper:** The full product-reading field.
- **Quiet Green:** Secondary text and identification caveats.
- **Reading Rule:** One-pixel boundaries between product articles.
- **About Ground:** The quiet green-toned About section.

**The Identity Is Not Evidence Rule.** Illustration colours and packaging adaptations never establish a product fact.

## Typography

Display and section headings use self-hosted **Alata**. Body text, navigation, controls and product-strip names use self-hosted **Lato**, regular and bold. Both retain sans-serif fallbacks. Fonts come from their Fontsource packages; no runtime font-service request is required.

Display sizing contracts on smaller screens: the intermediate desktop range uses a 42–52px clamp; mobile uses `clamp(35px, 7.9vw, 57px)` with 1.08 line height. Section headings remain prominent; mobile product-article titles are 30px. Body reading is 18px, article paragraphs become 17px on mobile, and notes are 16px. Prose blocks stay below approximately 66–70 characters where the layout permits.

**The One Reading Voice Rule.** Do not introduce serif catalog cards or institutional display lettering into this sans-led world.

## Layout

Navigation is a slim horizontal strip (62px desktop, 72px mobile). The desktop opening uses a stable panoramic background with a left introduction and right crop focus. Its measured container starts 10.68% from the left, occupies 81.52% of the viewport, and gives the focus column 39.22% of that container. The main reading width is 78.64%, capped at 1208px.

The crop ribbon has five equal desktop choices, 28px gaps and a 3px selected underline. At 1100px, containers broaden and gaps tighten. At 760px and below, the opening stacks, the selector wraps into three columns with the last choice spanning two, and product articles and reading sections become one column. Main mobile content occupies 88% of the viewport. The header keeps both navigation links visible rather than hiding them in a menu, with a further small-header breakpoint at 380px.

Articles use flat image/text rows with one-pixel separators and 52px vertical padding. Generous section spacing separates identification, before-use reading and About. Below the opening viewport, no content depends on animation or crop selection to be present.

## Elevation & Depth

Photographs provide most of the depth. Only the crop-focus panel has a soft structural shadow: `0 5px 20px #193c2e20`. Reading articles, actions and navigation are flat. Do not add card elevation to the product-reading sequence.

## Shapes

Photographic corners are almost square, using the photo and thumbnail radii in the frontmatter. The primary action is a pill. Reading rows have no enclosing card shell. The selected underline is a rule beneath the control, not a thick accent border around a rounded card.

## Components

### Primary link

A real section anchor with an inline Lucide arrow. The desktop action uses the frontmatter's padding and minimum height; mobile uses 25px horizontal padding and a 48px minimum height. Hover darkens the green. Keyboard focus uses a 3px green outline with 5px offset.

### Reading link

Evergreen-green text, one-pixel bottom rule and a restrained inline arrow. Hover strengthens the rule without changing surrounding layout. Each link leads to an existing section or product article; no pretend endpoint exists.

### Crop selector

Five native buttons with `aria-pressed`, a named group and a polite status announcement. The image, product name, illustrative bottle label and reading destination commit through one crop-state assignment. Rice is the initial composition, not a product recommendation. Selection remains legible without motion.

### Crop transition

A temporary, accessibility-hidden photograph travels from the clicked thumbnail to the focus window using the Web Animations API (520ms, `cubic-bezier(0.16, 1, 0.3, 1)`). New selections cancel the previous flight. Scroll, resize, reduced-motion preference changes and component disposal remove it. An offscreen destination or reduced-motion preference uses an immediate state update. No animation library, scroll lock or decorative loop is installed.

Routine primary-action colour and thumbnail-hover brightness feedback use `140ms ease-out`; reduced motion disables these transitions.

### Product strip and illustration

A white semantic strip names the selected crop and links directly to its article. The smaller white bottle is a cleaned native-alpha raster, with semantic label text layered above it. Its accessible name and visible notice identify it as illustrative packaging. Never substitute generated label text for verified product copy.

### Navigation and browser surfaces

Header, range index and footer use ordinary anchors. Product and reading-section targets are focusable for keyboard navigation. The skip link leads to the range. Text selection, scrollbar colours, tap highlight and focus outline use the site palette. Reduced motion also disables smooth scrolling and routine CSS transitions.

## Do's and Don'ts

### Do:

- **Do** use separate production crop images and semantic English UI.
- **Do** preserve the sun identity, evergreen text, white reading surfaces and peaceful farm atmosphere.
- **Do** keep every product readable without JavaScript or animation.
- **Do** label packaging and crop imagery as illustrations where they could be mistaken for evidence.
- **Do** preserve keyboard-visible focus and immediate reduced-motion feedback.

### Don't:

- **Don't** flatten the website into a single raster; text, navigation and crop controls remain semantic, selectable and responsive.
- **Don't** invent application instructions, performance claims, origins or certifications.
- **Don't** replace the peaceful, photographic world with serif cards, teaching boards or a sales-heavy catalog.
- **Don't** add motion loops, hover-only navigation or an animation dependency.
