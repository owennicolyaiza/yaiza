# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Next.js)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:dev` - Start development build locally

## Code Quality & Linting

- ESLint configuration extends Airbnb, Prettier, and React Hooks rules
- Prettier configured with single quotes and ES5 trailing commas
- Security plugin enabled for security best practices
- Run linting before commits to maintain code quality

## Project Architecture

This is a Next.js portfolio/case study website using Prismic as a headless CMS.

### Key Structure:
- **pages/** - Next.js pages including dynamic project routes at `/projects/[uid]`
- **components/** - Reusable React components with modular SCSS styling
- **lib/api.js** - Prismic API client and data fetching functions
- **context/ProjectsContext.jsx** - React Context for global project state management
- **styles/** - SCSS stylesheets with Bootstrap customizations and component-specific styles
- **public/assets/** - Static assets including videos, images, and SVG icons

### Content Types:
- `casestudy` - Individual project/case study documents in Prismic
- `homepage` - Homepage content
- `project-overview` - Projects overview page content

### Key Features:
- Responsive design with mobile detection
- Right-click context menu disabled across site
- Video content support with multiple formats
- Image carousel/slider components using Flickity
- Dynamic project routing and preview mode support

## Environment Setup

Required environment variables in `.env`:
- `CMS_PRISMIC_API_TOKEN` - Prismic API access token
- `CMS_PRISMIC_REPOSITORY_NAME` - Prismic repository name
- `CMS_PRISMIC_REPOSITORY_LOCALE` - Content locale (defaults to 'en-us')

## Development Notes

- Requires Node.js v22 or higher
- Uses React 18 with Next.js 12
- SCSS with Bootstrap customizations for styling
- Prismic integration for content management
- Context API for state management (minimal external dependencies)
- Custom video components with fallback support