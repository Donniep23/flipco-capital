# Flipco Capital - Development Todos

## Completed Tasks
- [x] Create Supabase integration for global data sync
- [x] Enable editing all text content from admin portal
- [x] Add drag-and-drop image uploaders to all admin pages
- [x] Fix cross-device sync issues
- [x] Add investment opportunities → homepage sync
- [x] Add investment opportunities → projects page sync (Upcoming tab)
- [x] **UI Fixes (Version 11)**:
  - [x] Navigation links now darker bold black (text-slate-900 font-semibold)
  - [x] Start Investing button links to contact form
  - [x] Reserve Your Spot button links to contact form
  - [x] Schedule Consultation button links to contact form
  - [x] Removed image hover scale effect on projects page (no more expanding over description)
  - [x] ROI displays 30% in demo section
- [x] **Deployed to Netlify (Version 14)**:
  - [x] Site is now live at: https://same-zbf9n8rlt2m-latest.netlify.app
  - [x] Accessible from any device or browser
- [x] **Email Configuration (Version 15)**:
  - [x] Configured Resend API for contact form emails
  - [x] Admin receives notifications at aisitebuilder000@gmail.com
  - [x] Users receive thank you emails after form submission
- [x] **Projects Admin Enhancement (Version 17)**:
  - [x] Added "Add New Project" button to create projects
  - [x] Added delete button for each project
  - [x] Created editable project template with sensible defaults
  - [x] Investment opportunities show under "From Opportunities" section
  - [x] Projects sync to database with localStorage fallback
- [x] **Investor Approval Workflow (Version 19)**:
  - [x] Registration no longer auto-redirects to dashboard
  - [x] Investors saved to database with "pending" status
  - [x] Login checks approval status before allowing access
  - [x] New Investor Approvals admin page to approve/reject applications
  - [x] Email notifications sent on approval/rejection
  - [x] Clear messaging for pending/rejected users at login

## Current Version
- **Version 19**: Investor Approval Workflow
- **Live URL:** https://same-zbf9n8rlt2m-latest.netlify.app
- **Admin Portal:** https://same-zbf9n8rlt2m-latest.netlify.app/admin

## Admin Portal Pages
- `/admin` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/edit/projects` - Projects Editor (with add/delete)
- `/admin/edit/investment-opportunities` - Investment Opportunities Manager
- `/admin/edit/site-settings` - Global Site Settings
- `/admin/edit/faq` - FAQ Editor
- `/admin/edit/investor-approvals` - **NEW** Approve/reject investor applications

## Investor Workflow
1. User registers at `/register` - application submitted
2. Admin reviews at `/admin/edit/investor-approvals`
3. Admin approves or rejects (email sent automatically)
4. Only approved investors can login at `/login`

## Database Tables (Supabase)
- `investment_opportunities` - Investment opportunity listings
- `projects` - Project data including synced opportunities
- `site_settings` - Global site configuration
- `faq_items` - FAQ content
- `contact_submissions` - Contact form entries
- `contractor_approvals` - Contractor applications
- `investor_users` - Investor registrations (with status: pending/approved/rejected)

## Notes
- All changes are now visible on any device/browser via the Netlify deployment
- The site uses Supabase for data storage, so changes made in the admin portal will sync across all devices
- Run `ADD-ALL-MISSING-TABLES.sql` in Supabase SQL Editor if any tables are missing
- Run `ADD-INVESTOR-APPROVAL-COLUMN.sql` to add password_hash column for investor login
