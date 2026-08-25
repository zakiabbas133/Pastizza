# Pastizza — Premium Restaurant Website

A production-quality restaurant website built with **React + Vite + TypeScript**.

**Brand:** Pastizza — "Fire-kissed. Flour-crafted."

## Navigation

- Overview
- Menu
- Reviews
- About
- Contact
- **Order Now** (primary CTA) + cart drawer

## Stack

- React 19 + Vite 8 + TypeScript
- React Router 7
- Framer Motion
- Lucide React
- Swiper
- CSS Modules + design tokens

## Features

- Sticky responsive navbar with animated mobile drawer
- Premium hero with CTAs
- Featured deals carousel
- Category cards → filtered menu
- Full menu with search, category & tag filters
- Pizza size pricing table (desktop) / cards (mobile)
- Individual menu item pages with size selection & add-to-cart
- Lightweight frontend cart (demo)
- Reviews with rating breakdown + carousel
- About with story, philosophy, timeline
- Contact form with validation + location cards
- 404 page
- Data-driven architecture ready for Firebase/API
- Accessible interactions & reduced-motion support
- SEO meta tags

## Run

```bash
cd Pastizza
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Project structure

```
src/
  components/   Navbar, Footer, Hero, FoodCard, DealCard, Cart, …
  pages/        Overview, Menu, Reviews, About, Contact, NotFound
  data/         menu, deals, reviews, locations, categories
  context/      CartContext
  types/        Shared TypeScript interfaces
```

Demo content only — not affiliated with any real restaurant.
