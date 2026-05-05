# Anderson Website Refactoring — Implementation Plan

## Background

Refactoring the existing Anderson construction company website: restructuring navigation, reducing the project grid, adding subpage support with differentiated header behavior, scaffolding 4 new pages, and updating footer links.

---

## Code Audit — Divergences Found

> [!IMPORTANT]
> The prompt references `styles.css` and `script.js` as separate files, but the actual codebase has **all CSS inline in a `<style>` block** (lines 9–677 of `index.html`) and **all JS inline in a `<script>` block** (lines 954–1030). There are no external `.css` or `.js` files.

### Recommended approach

**Extract CSS and JS into separate files** (`styles.css` and `script.js`) so that:
- All 5 pages can share the same stylesheet and script via `<link>` and `<script src>` tags
- Appending new styles/scripts follows the prompt's instructions naturally
- This is a structural prerequisite for multi-page operation

> [!WARNING]
> The prompt's replacement `<li>` tags do **not** include `class="header-li"`, but the existing CSS has `.header-li` rules for height/flex behavior. I will **add `class="header-li"`** to the replacement `<li>` elements so existing styling continues to work. The `<a>` tags will use `class="header-link"` as specified.

### Other minor notes
- Portrait card labels say "Residenciales/Industriales/Comerciales" (plurals). The prompt references "Residencial, Industrial, Comercial" for capacidades.html. I'll use the singular forms on the new pages as specified.
- There's no `assets/` directory. Placeholder image paths like `assets/hero-nosotros.webp` will be used as-is per the prompt — these are intentionally non-existent placeholders.
- The existing code has no megamenu-related JS event listeners (mouseenter/mouseleave on the trigger). The megamenu is purely CSS-driven (`:hover`). Task 01's JS cleanup step is a no-op.

---

## Open Questions

> [!IMPORTANT]
> **Inline → External files**: Should I extract the inline `<style>` and `<script>` blocks into `styles.css` and `script.js`? This is essentially required for the multi-page architecture to work (all 5 pages need to share the same CSS/JS). The prompt explicitly says "do not split CSS into multiple files" and "do not create a build pipeline", but creating the single `styles.css` and `script.js` files that the prompt itself references seems necessary and intended. **Please confirm.**

---

## Proposed Changes

### Task 01 — Remove Megamenu & Restructure Navigation

#### [MODIFY] [index.html](file:///c:/Users/ThinkBook/Desktop/anderson/index.html)
- Delete the `<div class="submenu-holder">` and all children (lines 713–746)
- Replace `<ul class="header-ul">` contents with 4 new `<li class="header-li">` items: Nosotros, Capacidades, Proyectos, Contacto
- Delete the other old `<li>` items (Our Services, Our Projects, News & Insights)

#### [MODIFY] CSS (inline or `styles.css`)
- Delete rules for: `.submenu-holder`, `.submenu-container`, `.submenu-title-holder`, `.submenu-title`, `.submenu-left`, `.submenu-right`, `.submenu-right a`, `.submenu-right a:hover`, `.header-li:hover .submenu-holder`, `.header.scrolled .submenu-holder`

#### [MODIFY] JS (inline or `script.js`)
- No megamenu JS exists — this is a CSS-only hover effect. No JS changes needed.
- Update mobile nav panel `innerHTML` to mirror the 4 new links.

---

### Task 02 — Reduce Homepage Project Grid

#### [MODIFY] [index.html](file:///c:/Users/ThinkBook/Desktop/anderson/index.html)
- Remove project boxes 04, 05, 06 (lines 870–872)
- Change heading from `OBRAS DESTACADAS` to `PROYECTOS SELECCIONADOS`
- Add subtitle paragraph under the heading
- Update "Ver todas" link href to `proyectos.html` and text to `Ver todos los proyectos →`

#### [MODIFY] CSS
- `.projects-grid` already uses `repeat(3, 1fr)` — no CSS change needed for the grid columns

---

### Task 03 — Header State Logic for Subpages

#### [MODIFY] [index.html](file:///c:/Users/ThinkBook/Desktop/anderson/index.html)
- Add `class="page-home"` to the `<body>` tag

#### [MODIFY] JS
- Wrap the scroll listener's transparent→solid logic so it only removes `.scrolled` on `page-home`
- For non-home pages, apply `.scrolled` class immediately on load

---

### Task 04 — Scaffold Four New Pages

#### [NEW] [nosotros.html](file:///c:/Users/ThinkBook/Desktop/anderson/nosotros.html)
- Hero band (50vh, placeholder bg image, dark gradient overlay, `3.5rem` headline)
- Sections: `#origen`, `#liderazgo`, `#valores`, `#trayectoria`, `#certificaciones`

#### [NEW] [capacidades.html](file:///c:/Users/ThinkBook/Desktop/anderson/capacidades.html)
- Hero band
- Sections: `#sectores` (portrait cards at larger size, static hover), `#capacidad-tecnica`, `#capacidad-operativa`

#### [NEW] [proyectos.html](file:///c:/Users/ThinkBook/Desktop/anderson/proyectos.html)
- Hero band
- Section: `#proyectos-grid` with 8 `article.project-card` elements

#### [NEW] [contacto.html](file:///c:/Users/ThinkBook/Desktop/anderson/contacto.html)
- Hero band
- Section: `#contacto` with 2-column layout (form + contact details)

#### [MODIFY] CSS (appended sections)
- `/* ============ SUBPAGE HERO ============ */` — shared hero band styles
- `/* ============ NOSOTROS PAGE ============ */` — sections for origen, liderazgo, valores, trayectoria, certificaciones
- `/* ============ CAPACIDADES PAGE ============ */` — larger portrait cards, static hover, icon grid, stat cards
- `/* ============ PROYECTOS PAGE ============ */` — project-card styles, responsive grid
- `/* ============ CONTACTO PAGE ============ */` — contact form, map embed, 2-col layout

#### [MODIFY] JS (appended)
- Early-return guard for portrait card shadow effect when `page-capacidades`

---

### Task 05 — Update Footer Links

#### [MODIFY] All 5 HTML files
- Servicios links → `capacidades.html#sectores`
- Empresa links → `nosotros.html#origen`, `nosotros.html#liderazgo`, `nosotros.html#valores`, `nosotros.html#trayectoria`
- Contacto CTA → `contacto.html`
- Footer will be byte-identical across all 5 pages

---

### Task 06 — Self-Verification

- Validate all 5 HTML files exist and have no unclosed tags
- All 5 pages link the same CSS and JS
- Nav links work bidirectionally
- Home page: video hero, transparent→solid header, dynamic portrait card shadows
- Capacidades: static hover on portrait cards
- Subpages: header initializes solid (no transparency flash)
- All assets still correctly referenced
- No extra files created

---

## Verification Plan

### Automated Tests
- Open each of the 5 pages in the browser and verify rendering
- Test navigation links between pages
- Verify header behavior (transparent on home, solid on subpages)
- Verify portrait card shadow behavior differences (home vs capacidades)

### Manual Checks
- Review CSS diff to confirm no existing rules were unintentionally modified
- Review JS diff to confirm only authorized changes
- Confirm all asset references are intact
