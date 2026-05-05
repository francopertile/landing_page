# Anderson Website Refactoring — Task Tracker

## Pre-requisite: Extract inline CSS/JS to external files
- [x] Extract `<style>` block to `styles.css`
- [x] Extract `<script>` block to `script.js`
- [x] Replace inline blocks with `<link>` and `<script src>` references

## Task 01 — Remove Megamenu & Restructure Navigation
- [x] Delete `<div class="submenu-holder">` and all children
- [x] Delete megamenu CSS rules
- [x] Replace `<ul class="header-ul">` contents with 4 new nav links
- [x] Update mobile nav panel innerHTML

## Task 02 — Reduce Homepage Project Grid
- [x] Remove project boxes 04, 05, 06
- [x] Change heading to PROYECTOS SELECCIONADOS
- [x] Add subtitle paragraph
- [x] Update CTA link href and text

## Task 03 — Header State Logic for Subpages
- [x] Add `class="page-home"` to `<body>` in index.html
- [x] Wrap scroll listener logic for page-home vs subpages

## Task 04 — Scaffold Four New Pages
- [x] Create nosotros.html
- [x] Create capacidades.html
- [x] Create proyectos.html
- [x] Create contacto.html
- [x] Append subpage CSS sections to styles.css
- [x] Add capacidades portrait-card early-return in script.js

## Task 05 — Update Footer Links
- [x] Update footer in index.html
- [x] Propagate identical footer to all 4 subpages

## Task 06 — Self-Verification
- [x] Verify all 5 files exist
- [x] Verify shared CSS/JS references
- [x] Verify nav links work
- [x] Verify header behavior
- [x] Verify assets intact
- [x] Verify no extra files
