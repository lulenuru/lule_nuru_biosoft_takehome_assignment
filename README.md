# lule_nuru_biosoft_takehome_assignment
lule_nuru_biosoft_takehome_assignment

**Biosoft Business Hub - Marketplace Application
Project Overview**
Biosoft Business Hub is a comprehensive marketplace platform that connects business owners with customers while providing powerful management tools for administrators and staff. The platform enables businesses to showcase their products after approval, manage inventory, handle orders, and coordinate with staff members who have role-based access.

## Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome or Firefox)

### Installation Steps

1. **Clone or download the repository**
   ```bash
   cd c:\Users\Admin\Desktop\lule_nuru_biosoft_takehome_assignment\biosoft-business-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
 

3. **Install Tailwind CSS and required packages** (if not already installed)
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npm install react-router-dom axios
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - The application will automatically open at `http://localhost:5173` (or the port shown in your terminal)
   - If it doesn't open automatically, manually navigate to the URL shown in your terminal

3. **Login with test credentials**

   **Super Admin:**
   - Email: `admin@biosoft.com`
   - Password: `admin123`

   **Business Owner:**
   - Email: `business@biosoft.com`
   - Password: `business123`

   **Staff Member:**
   - Email: `staff@biosoft.com`
   - Password: `staff123`


## Application Access Points

Once the application is running, you can access:

- **Login Page**: `http://localhost:5173/`
- **Public Marketplace**: `http://localhost:5173/marketplace`
- **Registration**: `http://localhost:5173/register`
- **Super Admin Dashboard**: Login as admin → Auto-redirects to `/superadmin/dashboard`
- **Business Owner Dashboard**: Login as business owner → Auto-redirects to `/business/dashboard`
- **Staff Dashboard**: Login as staff → Auto-redirects to `/staff/dashboard`

**Project Goals**
-Authentication (Create a multi-role marketplace platform)
-Product management (Enable business owners to register and manage their stores)
-Data source (use mock data)
-Permission Awareness (Implement role-based access control for staff members)
-Public Product Listing (Offer a public-facing marketplace for customers)
-Form validation, responsive design, error handling and loading states

**System Architecture**
**User Roles & Hierarchy**
**Super Admin**

-Highest level of access
-Approves/rejects business registrations
-Approves/rejects product listings
-Manages all users in the system
-Views all businesses and products
-Cannot be suspended or deleted

**Business Owner**

-Registers their business (requires admin approval)
-Adds and manages products (requires admin approval)
-Manages staff with different roles
-Processes and tracks orders
-Views business analytics and reports

**Staff Members (Role-based access)**

-Manager: Full access to products, orders, reports, team overview
-Sales: Access to products, orders, personal sales tracking
-Support: Access to orders, customer queries
-Marketing: Access to products, campaigns, analytics
-Inventory: Access to products, stock management, suppliers

**Public Users**

-Browse approved products without login
-Search and filter products
-View product details and ratings

**Design Philosophy**
**Color Scheme**
-Primary: Grey shades for professionalism
-Accent: Baby pink (#FFC0CB tones) for warmth and uniqueness
-Status Colors:
-Green for approved/active/completed
-Yellow for pending/processing
-Red for rejected/suspended/cancelled
-Blue for informational links

**UI/UX Principles**
-Clean, modern interface with ample white space
-Responsive design for all screen sizes
-Consistent navigation patterns across roles
-Contextual actions (buttons near relevant content)
-Confirmation dialogs for destructive actions
-Clear visual feedback for all interactions

**Project Structure**
src/
├── assets/            # Static assets like images and fonts
├── components/        # Reusable UI components
├── pages/            # Page components for routing
├── App.jsx           # Main app component
└── main.jsx          # Entry point for React

**Features**
-Business Registration: Business owners can register and provide details about their business. Super admins can approve or reject registrations.
-Product Management: Business owners can add, update, and remove products. Products require approval from super admins before becoming visible in the marketplace.
Order Processing: Business owners can view and manage orders. Staff members can be assigned to assist with order fulfillment.
-Role-based Access: Different staff roles have varying levels of access and capabilities within the platform.
-Analytics and Reporting: Business owners can view analytics related to their sales, orders, and customer behavior.
-Search and Filter: Customers can view and search for products and apply filters to find products that meet their needs.
-Responsive Design: The application is accessible on both desktop and mobile devices, with a design that adapts to different screen sizes.

**Technologies Used**
-Frontend: React, Vite, JavaScript, HTML, CSS, Next.js
-Routing: React Router for navigating between pages
-Styling: CSS Modules, Styled Components, or other CSS-in-JS solutions

**Challenges Faced**
-Short project timeline
