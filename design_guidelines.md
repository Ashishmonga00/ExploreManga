# Manga Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from popular manga platforms like MyAnimeList, MangaDex, and Crunchyroll for their clean, content-focused designs that prioritize readability and easy navigation.

## Core Design Elements

### Color Palette
**Dark Mode Primary** (default):
- Background: 220 15% 8%
- Surface: 220 12% 12% 
- Primary: 280 100% 70% (vibrant purple for manga theme)
- Text: 0 0% 95%
- Muted text: 0 0% 65%

**Light Mode**:
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 280 100% 55%
- Text: 220 15% 15%
- Muted text: 220 10% 45%

### Typography
- **Primary Font**: Inter (clean, readable for UI elements)
- **Display Font**: Poppins (for manga titles and headings)
- **Body**: 16px base, line-height 1.6
- **Headings**: Bold weights (600-700)

### Layout System
- **Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16 units
- **Grid**: 12-column responsive grid
- **Containers**: max-width-7xl with px-4 for mobile, px-8 for desktop

### Component Library

**Navigation**:
- Fixed header with search bar prominently placed
- Clean logo on left, navigation links center, search on right
- Mobile: hamburger menu with slide-out drawer

**Cards (MangaCard)**:
- Cover image with 3:4 aspect ratio
- Overlay gradient for title visibility
- Hover effects: subtle scale (105%) and shadow increase
- Title, author, and genre badges

**Data Display**:
- Category grids with 2-3 columns on mobile, 4-6 on desktop
- Manga details: two-column layout (cover + info, chapters list below)
- Chapter lists: clean rows with chapter numbers and titles

**Forms**:
- Search bar: rounded corners, subtle border, focus ring in primary color
- Clean input styling consistent with dark/light themes

## Page-Specific Guidelines

**Homepage**:
- Hero section with featured manga slider (3-4 items visible)
- "Popular" and "Recently Added" sections in grid layouts
- Minimal text, focus on visual manga covers

**Category Pages**:
- Breadcrumb navigation
- Filter/sort options in subtle sidebar or top bar
- Responsive grid of manga cards

**Manga Details**:
- Large cover image (fixed aspect ratio)
- Information panel with clean typography hierarchy
- Tabbed interface for chapters, details, and reviews

**Contact Page**:
- Simple form with consistent styling
- Contact information in clean cards

## Images
- **Manga Covers**: 3:4 aspect ratio, high quality
- **Hero Images**: Rotating featured manga backgrounds with dark overlay
- **Category Thumbnails**: Representative manga artwork
- **Placeholder Images**: Simple geometric patterns in brand colors for missing covers

## Accessibility
- Consistent dark mode across all form inputs
- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements
- Screen reader friendly navigation structure

## Animations
- Minimal, purposeful animations only
- Subtle hover effects on cards and buttons
- Smooth page transitions with React Router
- Loading states for API calls