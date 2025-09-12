# MangaVerse - A Comprehensive Manga Reading Platform

## Overview

MangaVerse is a modern, full-stack manga reading platform built with React, Express, and TypeScript. The application provides a comprehensive manga browsing and reading experience with features like category-based organization, search functionality, detailed manga information, and a responsive design optimized for both desktop and mobile devices. The platform draws inspiration from popular manga websites like MyAnimeList and MangaDex, offering a clean, content-focused interface that prioritizes readability and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with a custom design system featuring dark/light theme support
- **Component Library**: Custom components built on Radix UI primitives for accessibility
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type-safe server-side development
- **Data Storage**: File-based JSON storage system for manga data and metadata
- **API Design**: RESTful API endpoints for manga retrieval, category management, and search
- **Development Server**: Integrated Vite development server for hot module replacement

### Data Layer Design
- **Schema Definition**: Zod schemas for runtime type validation and data structure enforcement
- **Data Source**: JSON files containing manga metadata, chapter information, and cover images
- **Storage Strategy**: File system-based storage with helper functions for data extraction and processing
- **Data Processing**: Automated extraction of genres, authors, status, and view counts from manga attributes

### UI/UX Architecture
- **Design System**: Custom theme system with CSS variables for consistent styling
- **Color Palette**: Manga-focused dark theme as default with purple accent colors
- **Typography**: Inter for UI elements and Poppins for display text
- **Layout System**: Responsive grid layouts with mobile-first approach
- **Component Strategy**: Reusable components for manga cards, category listings, and navigation

### Development Environment
- **Type Safety**: Comprehensive TypeScript configuration across frontend, backend, and shared modules
- **Path Aliases**: Configured import aliases for clean module resolution
- **Hot Reloading**: Vite-powered development server with fast refresh
- **Error Handling**: Runtime error overlays and comprehensive error boundaries

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing library
- **zod**: Runtime type validation and schema definition
- **drizzle-orm**: Type-safe ORM (configured for future PostgreSQL integration)

### UI Component Libraries
- **@radix-ui/react-***: Complete suite of accessible UI primitives including dialogs, dropdowns, navigation menus, and form controls
- **lucide-react**: Modern icon library for consistent iconography
- **class-variance-authority**: Utility for building variant-based component APIs
- **tailwindcss**: Utility-first CSS framework for rapid UI development

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking and enhanced development experience
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in development
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration

### Database and Storage
- **@neondatabase/serverless**: PostgreSQL driver (prepared for future database integration)
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx** and **tailwind-merge**: Conditional class name utilities
- **embla-carousel-react**: Carousel component for featured manga sections
- **cmdk**: Command palette component for search functionality