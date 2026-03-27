# Admin User Guide

This document is for internal staff who manage the DAITIN website content.

## 1. Access and Login

- Login URL: `/admin-login`
- Admin credentials are configured from environment variables:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
- After successful login, users are redirected to `/admin`.
- If a user is not logged in and accesses `/admin/*`, they are automatically redirected to the login page.

## 2. Admin Interface Overview

After login, the admin area includes:

- **Left Sidebar**
  - Overview
  - Products
  - Categories
  - Services
  - Logout button
- **Top Bar**
  - Current page title
  - Search box (shown on searchable pages)
- **Main Content Area**
  - Data lists/tables
  - Action buttons
  - Add/Edit/Delete modals

## 3. Overview Page (`/admin`)

### Main functions

- Shows quick statistics:
  - Total products
  - Active categories
  - Active services
  - Out-of-stock products (`stock <= 0`)
- Provides quick links to:
  - Product management
  - Category management
  - Service management

## 4. Product Management (`/admin/products`)

### Main functions

- View product list (with pagination)
- Search by product name/slug
- Add products
- Edit products
- Delete products (with confirmation)

### Add product

Click **+ Add product** and provide:

- Product name (required)
- Auto-generated slug
- Price (VND)
- Stock quantity
- Category (required, only active categories are selectable)
- Images (one URL per line, first line is thumbnail)
- Brief description
- Detailed description
- Specifications (label/value pairs)

Language tabs:

- `Tiếng Việt` for main content
- `English` for translations (name/brief/description/specifications)

### Edit product

Click **Edit** on the target row:

- Update price, stock, description, image list, specifications
- Update English translation fields

### Delete product

- Click **Delete** and confirm
- Deletion is permanent and cannot be undone in the UI

## 5. Category Management (`/admin/categories`)

### Main functions

- View categories
- Add categories
- Delete categories (with constraints)

### Add category

Click **+ Add category** and enter:

- Category name (required)
- Auto-generated slug
- Description (optional)

New categories are created with `isActive = true` by default.

### Delete category

- A category can only be deleted when no products are assigned to it.
- If products still belong to the category, deletion is blocked and an error message is shown.

## 6. Service Management (`/admin/services`)

### Main functions

- View services
- Add services
- Edit services
- Delete services

### Add/Edit service

Click **+ Add service** or **Edit**, then fill:

- Service name (required)
- Auto-generated slug preview
- Thumbnail URL
- Image URLs (one URL per line)
- Brief description
- Detailed description (one paragraph per line)
- Features/highlights (one item per line)

### Delete service

- Click **Delete** and confirm
- The selected service is removed from the system

## 7. Search and Navigation

- The top search box supports searching by name/slug on supported pages.
- Sidebar provides fast navigation between admin modules.
- Logout ends the session and returns users to the login page.

## 8. Operating Notes

- Create categories before creating products.
- Ensure image URLs are valid so images render correctly.
- Deleted data cannot be restored via admin UI.
- If login fails, verify:
  - `AUTH_SECRET`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - Browser cookies/session
