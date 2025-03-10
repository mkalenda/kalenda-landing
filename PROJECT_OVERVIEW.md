# Kalenda.ai Landing Page

## Project Overview

This repository contains the source code for the Kalenda.ai landing page, a modern web application built to showcase Kalenda's AI and automation services. The landing page is designed to present the company's offerings in a clean, professional manner while providing potential clients with easy access to information and contact options.

## Technology Stack

The project is built using the following technologies:

- **Next.js 14**: A React framework for building server-rendered applications
- **TypeScript**: For type-safe JavaScript development
- **Tailwind CSS**: For utility-first styling
- **Lucide React**: For high-quality icons
- **Radix UI**: For accessible UI components

## Project Structure

The project follows the Next.js App Router structure:

- `app/`: Contains the main application pages and layouts
  - `layout.tsx`: The root layout component that wraps all pages
  - `page.tsx`: The main landing page component
  - `globals.css`: Global CSS styles
  - `fonts/`: Custom font files (Geist)
- `components/`: Reusable UI components
  - `home-page.tsx`: The main component for the landing page
  - `service-card.tsx`: Component for displaying service offerings
  - `contact-form.tsx`: Form component for user inquiries
  - `header.tsx`: Site navigation header
  - `footer.tsx`: Site footer
  - `ui/`: UI component library (buttons, cards, inputs, etc.)
- `lib/`: Utility functions and data
  - `data.ts`: Contains content data for the site
  - `utils.ts`: Helper functions
- `public/`: Static assets

## Features

The landing page includes the following sections:

1. **Hero Section**: Introduces the company with a compelling headline and call-to-action
2. **Services Section**: Showcases the company's service offerings with icons and descriptions
3. **About Section**: Provides information about the company and its approach
4. **Contact Section**: Allows visitors to get in touch via a contact form

## Content

Kalenda.ai focuses on providing innovative AI solutions and automation for businesses. The services offered include:

- System Engineering
- Process Automation
- Custom Software Development
- AI Solutions
- Cybersecurity
- Data Analysis and Business Intelligence

The content is presented in Czech language, targeting the Czech market.

## Design

The design follows modern web principles with:

- Clean, minimalist aesthetic
- Responsive layout for all device sizes
- Subtle animations and transitions
- Accessible UI components
- Custom typography using Geist font

## Development

This project was bootstrapped with `create-next-app` and uses the Next.js App Router architecture. It implements client-side components where interactivity is needed, while leveraging server components for static content.
