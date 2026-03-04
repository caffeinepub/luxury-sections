# Luxury Sections

## Current State
- 5 sections exist in the backend, all marked `isPro = true` — no free sections available
- SectionsPage has filter tabs (All / Free / Pro) and Install/Remove buttons
- Install button label says "INSTALL SECTION" with no preview capability
- No section preview modal exists

## Requested Changes (Diff)

### Add
- 5 new free sections in the backend (isPro = false): Minimal Announcement Bar, Clean Newsletter Signup, Social Proof Counter, Simple Image Banner, Feature Highlights Row
- "Add to Merchant Theme" CTA button replacing the current "INSTALL SECTION" label on free sections
- Section preview modal: clicking a section card image opens a fullscreen-style modal showing a larger preview image, section name, description, tags, and the "Add to Merchant Theme" CTA
- A "View Preview" button on each card (secondary action) that opens the modal

### Modify
- Backend: add 5 free sections (isPro = false) alongside existing 5 pro sections
- SectionsPage: rename install CTA from "INSTALL SECTION" to "Add to Merchant Theme" for free sections and pro sections alike
- Section card: add a "Preview" icon button on hover over the image that triggers the preview modal

### Remove
- Nothing removed

## Implementation Plan
1. Regenerate backend with 10 sections (5 free + 5 pro)
2. Update SectionsPage:
   - Rename CTA to "Add to Merchant Theme"
   - Add PreviewModal component (fullscreen overlay, section image, details, CTA)
   - Add hover preview trigger on card image
   - Wire modal open/close state
