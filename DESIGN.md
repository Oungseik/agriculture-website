---
name: Moshi Moshi — Living Fields
description: Peaceful crop photography and spacious product reading.
colors:
  evergreen: '#193c2e'
  field-green: '#426729'
  field-green-deep: '#304d1d'
  white: '#ffffff'
  reading-paper: '#f6f7f3'
  quiet-green: '#53685a'
  reading-rule: '#d9e2d7'
  field-soft: '#eaf0e3'
  on-dark-muted: '#cfdbc7'
  dark-rule: '#45634f'
typography:
  display:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(52px, 6vw, 88px)'
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: '-0.03em'
  product-display:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(42px, 4.2vw, 62px)'
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(34px, 3.2vw, 48px)'
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: '-0.025em'
  reading-headline:
    fontFamily: 'Alata, sans-serif'
    fontSize: 'clamp(28px, 2.3vw, 34px)'
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Alata, sans-serif'
    fontSize: '23px'
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Lato, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.55
  reading:
    fontFamily: 'Lato, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: 'Lato, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.55
rounded:
  photo: '0px'
  action: '4.8px'
spacing:
  compact: '16px'
  group: '24px'
  block: '32px'
  split: '64px'
components:
  primary-action:
    backgroundColor: '{colors.field-green}'
    textColor: '{colors.white}'
    rounded: '{rounded.action}'
    padding: '0 16px 0 20px'
    height: '48px'
  primary-action-hover:
    backgroundColor: '{colors.field-green-deep}'
    textColor: '{colors.white}'
  hero-action:
    backgroundColor: '{colors.reading-paper}'
    textColor: '{colors.evergreen}'
    rounded: '{rounded.action}'
    padding: '0 16px 0 20px'
    height: '48px'
  reading-link:
    textColor: '{colors.evergreen}'
    typography: '{typography.label}'
    height: '44px'
  main-navigation:
    backgroundColor: '{colors.reading-paper}'
    textColor: '{colors.evergreen}'
  breadcrumbs:
    textColor: '{colors.quiet-green}'
  contents-navigation:
    textColor: '{colors.quiet-green}'
  faq-disclosure:
    textColor: '{colors.evergreen}'
    padding: '20px 0'
---

# Design System: Moshi Moshi

## Overview

**Creative North Star: "Living Fields"**

A peaceful, farm-and-nature-led world: morning fields provide atmosphere, evergreen text provides clarity, and the gold sun-spiral identifies Moshi Moshi. Self-hosted humanist sans typography and generous space keep crop photography and product reading approachable.

The implemented system is flat and photographic. Pale reading paper carries the main content, field-soft green separates supporting areas, and a deep evergreen footer closes the page. The existing sun artwork and illustrative bottles remain adaptations, not original packaging evidence. Asset provenance and processing limitations remain in `assets/provenance.json`.

**Key Characteristics:**

- Large rectangular crop photographs with semantic, selectable text.
- Self-hosted Alata headings and Lato reading text.
- Flat product links and restrained green actions.
- Shared navigation, clear reading landmarks, and native disclosures.

This file records reusable visual decisions from the built routes and components. Homepage and product-page strategy remains in `.impeccable/surfaces/src-routes-page-svelte.md`.

## Colors

The palette pairs evergreen ink with pale natural surfaces. The frontmatter records the implemented CSS colours; the gold identity stays in the existing sun artwork.

### Primary

- **Field Green:** Primary actions, highlighted headline text, hover feedback, and keyboard focus.
- **Deep Field Green:** Opaque primary-action hover.

### Secondary

- **Harvest Gold:** The adapted sun-spiral mark, retained as an identity asset rather than a new UI accent token.

### Neutral

- **Evergreen:** Main text, headings, the hero readability scrim, and the footer ground.
- **White:** Primary-action lettering.
- **Reading Paper:** The page, shared header, crop navigation, and pale hero text and action.
- **Quiet Green:** Body copy, captions, breadcrumbs, and contents links.
- **Reading Rule:** Fine boundaries between reading sections and navigation areas.
- **Field Soft:** Crop-navigation hover and focus feedback, the About ground, and photographic fallbacks.
- **On Dark Muted / Dark Rule:** Legible secondary footer text and its quiet divider; On Dark Muted also softens the hero text-link underline.

**The Identity Is Not Evidence Rule.** Illustration colours and packaging adaptations never establish a product fact.

## Typography

Alata supplies the relaxed heading voice; Lato supplies body text, navigation, and controls. Alata regular and Lato regular/bold are imported from Fontsource and self-hosted, with sans-serif fallbacks.

The display and product-display roles serve their respective openings; headline serves broad section introductions, reading-headline serves product reading, and title names photographic product links. Body is the shared baseline; reading increases paragraph leading. Product prose stays near 68 characters per line and introductory copy near 38–48, where the layout permits.

Responsive type follows the source rather than one universal scale: homepage display becomes `clamp(36px, 9vw, 64px)` with 1.12 line-height at 760px; product display becomes `clamp(40px, 9vw, 56px)`. Product-link titles become 21px and long reading paragraphs 17px on mobile. Captions and breadcrumb text stay smaller than body copy.

**The One Reading Voice Rule.** Keep the self-hosted Alata/Lato pairing across crop browsing and product reading.

## Layout

The shared container occupies 88% of the viewport and is capped at 1280px. Broad image/text compositions use two equal columns, generous gaps, and clear section spacing. The header content is 64px tall on desktop and 60px on mobile, with a 1px bottom rule; the footer groups the identity and navigation in three desktop columns, with two navigation columns below the identity on mobile.

The homepage hero uses a full-bleed field photograph with live text in the shared container. Its content area has a minimum height of `clamp(560px, 46vw, 680px)` and 72px vertical padding; the copy is capped at 780px. At 760px, the minimum height is 560px with 64px vertical padding, and the actions wrap as space requires.

Crop navigation presents a label beside five divided links on desktop. At 1300px the label moves above the links; at 1100px thumbnails and names stack and arrows disappear. At 760px the links form two columns, with the final link spanning both. Every crop destination remains visible.

At 1100px, column gaps tighten and the photographic product grid changes from five to three columns. At 760px, image/text compositions become one column, product and related-product grids use two columns, and contents navigation becomes a wrapping list. Product summaries precede their images on mobile.

Desktop product reading reserves a 260px contents column, contracting to 220px at 1100px, beside flexible prose. Contents remain sticky 32px from the top; on mobile they return to normal document flow. Reading sections use fine separators and 36px vertical padding, contracting to 28px on mobile. Common actions and text links retain a 44px or larger interaction height.

## Elevation & Depth

Photographs provide depth; tonal surfaces and fine rules provide structure. The shipped primary actions, product links, header, reading sections, and footer have no decorative shadows or enclosing card elevation.

The homepage photograph carries an evergreen readability gradient, strongest behind the text (82% to 22% opacity across the image). At 760px, a uniform 74% evergreen scrim preserves contrast across the mobile crop.

**The Flat Reading Rule.** Keep long reading sections visually continuous, using space and fine rules for separation.

## Shapes

Photography has square corners. Primary actions are small rectangles with gently softened corners, using the action radius from the frontmatter. Inline arrows clarify destinations; there are no enclosing shells around photographic product links.

The sun-spiral and bottle silhouettes come from the retained raster artwork. Bottle labels combine crop-specific colour with semantic label text.

## Components

### Actions and reading links

The shared Button component uses its default variant and large size for prominent product-page section anchors. An inline arrow accompanies the label. Hover uses opaque deep field green; active feedback moves the action by 1px. The primary action uses the frontmatter's 48px height and arrow-aware padding.

The homepage hero uses the same Button's secondary variant and large size, with reading-paper background and evergreen lettering scoped to the hero. It retains the primary action's dimensions and active feedback; hover mixes 5% evergreen into the paper. The accompanying text link stays pale and thickens its underline on hover.

Reading links use an underline, a small inline arrow, and a 44px minimum interaction height. Hover changes the text to field green. Keyboard focus uses a 3px field-green outline with a 5px offset; the hero uses reading-paper focus and the footer uses its lighter footer colour.

### Shared navigation

The compact header pairs a 32px sun mark and 22px bold Lato brand name with 15px navigation links spaced 24px apart. On mobile, the mark becomes 28px, the name 20px (19px at 360px), and links 14px with 16px gaps (14px at 360px). Brand and navigation links retain 44px interaction heights. The current Home or Products link has a fine green underline; hover uses field green. Mobile retains Products and About while the brand provides the home destination. Breadcrumbs use muted text and small chevrons. The evergreen footer carries the same identity with pale links and fine boundaries.

The skip link reveals on focus and leads to the main landmark. Section targets are focusable, with scroll spacing that leaves their headings visible.

Crop navigation uses reading paper, fine dividers, an Alata label (24px, becoming 22px at 1300px), and five thumbnail/name/arrow links. Thumbnails have square corners (44px, becoming 36px on mobile); link text uses Lato (16px, becoming 15px on mobile). Hover and focus add field-soft background, and hover underlines the crop name. Background feedback uses 180ms ease-out and follows the shared reduced-motion rule.

### Photographic product links and bottle illustration

A complete photographic product item is one semantic link, with the crop image, smaller illustrative bottle, Alata product name, category, and explicit reading action. Hover slightly enlarges the crop image (1.035 scale over 240ms ease-out) and underlines the reading action. Related products use simpler image/name links.

The shared bottle uses the existing native-alpha raster and visible semantic crop labels. Its accessible name states that it is illustrative packaging; captions and the footer retain the illustration notice.

### Contents and FAQs

Contents navigation uses ordinary anchors with 44px minimum heights. Reading sections stay present without client-side interaction. FAQs use native `details` and `summary`, fine rules, a green disclosure marker, and bold summary text when open.

Button feedback uses Tailwind's 150ms standard easing. Reduced motion removes transitions and animations, disables the photographic hover enlargement, and restores immediate scrolling.

Page navigation uses a 220ms fade for general content. A single visible crop or story preview photograph moves into its matching hero over 480ms; unrelated incoming hero images use a crop reveal. Article pages place the photograph first, then the title and introduction. The sticky header stays stationary, scroll restoration completes before capture, and reduced motion bypasses page animation.

## Do's and Don'ts

### Do:

- **Do** preserve the Moshi Moshi name, gold sun identity, evergreen text, and peaceful photographic atmosphere.
- **Do** keep imagery separate from semantic text, navigation, and product labels.
- **Do** preserve visible keyboard focus, native links and disclosures, and reduced-motion behavior.
- **Do** retain illustration notices and asset provenance when reusing the existing artwork.

### Don't:

- **Don't** treat adapted artwork as proof of actual packaging, origin, certification, or product performance.
- **Don't** flatten the interface into a raster or make reading depend on animation.
- **Don't** replace the peaceful farm world with teaching-board or institutional presentation.
