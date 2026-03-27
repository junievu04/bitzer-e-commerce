# Commercial Pages Documentation (Public Website)

This document describes all customer-facing pages and key behaviors on the public website.

## 1. Overview

Production website:

- [https://bitzer-e-commerce.vercel.app/](https://bitzer-e-commerce.vercel.app/)

Main navigation:

- Home
- Products
- Services
- About
- Contact
- Cart

Additional website capabilities:

- Language switch (`vi/en`)
- Product recommendation chatbot
- Quick-contact buttons (Zalo/Messenger/Hotline depending on UI configuration)

## 2. Home Page (`/`)

### Page content

- Hero banners
- Brand/service introduction blocks
- Dynamic sections for statistics/projects/news
- CTA blocks linking to products, services, and contact

### Main functions

- Introduces DAITIN brand positioning
- Drives users to high-conversion pages (products/services/contact)

## 3. Product Listing (`/products`)

### Page content

- Product list/grid
- Category filters
- Product sorting options
- Text search
- Infinite scroll for loading more items

### Main functions

- Browse product catalog quickly
- Find products by specific criteria
- Navigate to product detail pages for full information

## 4. Product Detail (`/products/[slug]`)

### Page content

- Product image gallery with lightbox
- Name, category, price, stock status
- Brief and detailed description (expand/collapse)
- Technical specifications
- Related/suggested products

### Main functions

- **Add to cart**
- **Contact for consultation**: redirects to contact page with product data in query string
- Displays translated content when translation data is available

## 5. Cart Page (`/cart`)

### Page content

- Selected product list
- Quantity, unit price, line total
- Order subtotal and final total

### Main functions

- Increase/decrease quantity
- Remove single item
- Clear entire cart
- Click **Contact to order** to open contact form (`/contact?from=cart`) with auto-filled order details

## 6. Services Listing (`/services`)

### Page content

- List of all available services
- Section title and introduction text

### Main functions

- Quick service discovery
- Navigate to individual service detail pages

## 7. Service Detail (`/services/[slug]`)

### Page content

- Hero image and service name
- Brief description
- Detailed description paragraphs
- Feature/highlight list
- Registration CTA

### Main functions

- Click **Register now** to open contact page
- Automatically passes service data to contact form via query string

## 8. Contact Page (`/contact`)

### Page content

- Company contact information (address, hotline, email, etc.)
- Contact form fields:
  - Full name
  - Email
  - Phone number
  - Address
  - Message

### Main functions

- Submit inquiry through backend action (`submitContact`)
- Auto-prefill message content when user comes from:
  - Cart page
  - Product detail page
  - Service detail page

## 9. About Page (`/about`)

### Page content

- Company/brand introduction sections
- Dynamic layout blocks with media and brand content

### Main functions

- Communicates brand value, capabilities, and credibility

## 10. Suggested Customer Journeys

- **Product purchase flow:** Home -> Products -> Product Detail -> Cart -> Contact
- **Service registration flow:** Home/Services -> Service Detail -> Contact
- **Brand trust flow:** Home -> About -> Contact

## 11. Operational Notes

- Product/service image URLs must be valid.
- Some products may not have a fixed price; UI will show "Contact".
- Public content depends on admin-managed data and dynamic layout configuration.
- Contact form requires stable SMTP configuration for successful delivery.
