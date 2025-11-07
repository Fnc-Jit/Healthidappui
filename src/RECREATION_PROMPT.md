# Health ID Management App - Complete Recreation Prompt

Create a comprehensive health ID management web application with the following specifications:

## Core Features

### 1. Authentication System
- **Login Page** with hardcoded credentials (username: "hi", password: "passHere")
- Form validation with error messages
- "Remember me" checkbox functionality
- Forgot password link (shows "coming soon" toast)
- Social login buttons for Google and Apple (show "coming soon" toasts)
- Sign up link (shows "coming soon" toast)
- Mobile-responsive design that fits within viewport height with no scrolling
- Smooth transitions and loading states

### 2. Main Application Structure
- **Top Header** containing:
  - Hamburger menu icon (left) - opens side navigation sheet
  - Time-based greeting in center (Good Morning/Afternoon/Evening based on current time)
  - User avatar/logo (right) - clickable dropdown menu
  
### 3. Navigation System
Create a hamburger menu (left side sheet) and avatar dropdown menu with links to:
- **Home** - Dashboard with overview cards and recent activity
- **My Certificates** - Grid of health certificate thumbnails with health ID numbers
- **Notifications** - List of health-related notifications with unread badges
- **Settings** - Account, notification, privacy, and appearance settings
- **Help & Support** - Shows "coming soon" toast
- **Log Out** - Returns to login page

### 4. Pages to Implement

#### Home Page
- Welcome banner with user greeting
- Quick action cards for:
  - View all certificates
  - Check recent updates
  - Health records access
  - Health tracking
- Recent activity section showing latest 2 certificates with status badges

#### My Certificates Page
- Grid layout (responsive: 1 column mobile, 2-3 columns tablet/desktop)
- Display certificate cards with:
  - Certificate thumbnail/icon
  - Certificate name
  - Health ID number
  - Status badge (Valid/Expired/Pending)
  - Color-coded by status
- Certificates to include:
  - COVID-19 Vaccination Certificate
  - Annual Health Checkup Report
  - Blood Test Results
  - Dental Health Certificate
  - Eye Examination Report
  - Mental Health Assessment

#### Notifications Page
- List of notification cards with:
  - Icon (success/warning/info) with appropriate colors
  - Title and message
  - Timestamp (e.g., "2 hours ago")
  - Unread indicator (blue dot)
  - **Dismissible X button** that appears on hover
- Badge showing count of unread notifications
- Sample notifications:
  - Certificate verified
  - Certificate expiring soon
  - New health guidelines
  - Document uploaded
  - System maintenance

#### Settings Page
- **Profile Information Section:**
  - **Profile picture upload with:**
    - Avatar display (20x20 size)
    - Camera icon button overlay for changing picture
    - Upload button with icon
    - Remove button (shown only when picture exists)
    - File size validation (max 5MB)
    - Supported formats: JPG, PNG, GIF
    - Picture syncs with header avatar in real-time
  - Full name input
  - Email input
  - Phone number input
  - Save changes button
  
- **Notification Preferences Section:**
  - Email notifications toggle
  - Push notifications toggle
  - Certificate expiry alerts toggle
  
- **Privacy & Security Section:**
  - Two-factor authentication (shows "coming soon")
  - Change password (shows "coming soon")
  
- **Appearance Section:**
  - **Dark mode toggle** with theme persistence
  - **Language selector** dropdown with:
    - English
    - Hindi (हिन्दी)
    - Kannada (ಕನ್ನಡ)
  - Language preference persistence

### 5. Dark Mode Functionality
- Complete dark mode support across all pages
- Toggle switch in Settings
- Theme persistence using localStorage
- Smooth transitions between themes
- Proper dark mode colors for all components:
  - Cards, backgrounds, borders
  - Text and icons
  - Notifications and badges
  - Form inputs and buttons

### 6. Multi-Language Support
Implement comprehensive translations for **English, Hindi, and Kannada** including:
- All UI text, labels, and buttons
- Navigation items
- Page titles and descriptions
- Notification messages
- Settings options
- Toast messages
- Form placeholders and validation messages
- Time-based greetings
- Certificate names and statuses

Language persistence using localStorage with custom LanguageProvider context.

### 7. Profile Picture Management
- Upload profile picture from Settings page
- Real-time sync with header avatar
- Custom event dispatching for cross-component updates
- LocalStorage persistence
- File validation (size and type)
- Remove picture functionality
- Gradient fallback when no picture is set
- Camera icon overlay button on avatar

### 8. Technical Requirements

#### Styling & UI
- Use **Tailwind CSS v4.0** for all styling
- Modern, clean, mobile-first design
- Responsive grid layouts
- Smooth animations and transitions
- Proper spacing and typography
- Color-coded status indicators
- Hover effects and interactive states
- Card-based layouts with shadows
- Glass-morphism effects where appropriate

#### Components & Libraries
Use these specific packages:
- **lucide-react** for all icons
- **sonner@2.0.3** for toast notifications  
- **Shadcn UI components** including:
  - Button, Card, Avatar, Badge
  - Sheet (for side navigation)
  - Dropdown Menu
  - Switch, Select, Input, Label
  - Separator, Dialog
  - All necessary UI primitives

#### State Management
- React hooks (useState, useEffect, useRef)
- Custom Context providers for:
  - Theme (ThemeProvider)
  - Language (LanguageProvider)
- LocalStorage for persistence:
  - Authentication state
  - Theme preference
  - Language preference
  - Profile picture
  - "Remember me" checkbox

#### File Structure
```
/App.tsx (main component with routing logic)
/components
  /Header.tsx
  /HealthCertificate.tsx
  /ThemeProvider.tsx
  /LanguageProvider.tsx
  /translations.ts
  /pages
    /LoginPage.tsx
    /HomePage.tsx
    /MyCertificatesPage.tsx
    /NotificationsPage.tsx
    /SettingsPage.tsx
  /ui
    (all shadcn components)
/styles
  /globals.css
```

### 9. Key Interactions & Behaviors

#### Notifications
- Show unread count badge in header and page
- Unread notifications have blue background tint
- Blue dot indicator for unread items
- **Small X button appears on hover** to dismiss individual notifications
- Click X to remove notification from list
- Toast confirmation when notification is dismissed
- Proper dark mode styling for notification cards

#### Profile Avatar
- Clicking avatar opens dropdown menu
- Dropdown shows user info and navigation links
- Profile picture changes reflect immediately in header
- Custom events bridge Settings page and Header component
- Gradient background when no picture is uploaded
- User icon fallback

#### Theme Switching
- Instant theme change on toggle
- Persists across sessions
- Toast notification on theme change
- All components properly styled for both themes

#### Language Switching
- Dropdown in Settings page
- All text updates immediately
- Persists across sessions  
- Toast notification on language change
- Flag/language name display

#### Form Validation
- Real-time validation on login form
- Error messages for invalid credentials
- Success toast on successful login
- All required fields validated
- Appropriate error states and messages

### 10. Mobile Optimization
- Fully responsive design (mobile-first approach)
- Touch-friendly tap targets (minimum 44x44px)
- Proper viewport settings
- No horizontal scrolling
- Login page fits within viewport height
- Hamburger menu for mobile navigation
- Stacked layouts on mobile
- Optimized font sizes for readability
- Appropriate spacing for touch devices

### 11. Accessibility
- Proper ARIA labels on buttons and interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast ratios
- Alt text for images
- Screen reader friendly

### 12. User Experience Details
- Smooth page transitions
- Loading states where appropriate
- Success/error feedback via toasts
- Hover effects on clickable items
- Active state indicators for current page
- Empty states with helpful messages
- Consistent spacing and alignment
- Visual hierarchy with proper typography
- Intuitive navigation flow

### 13. Data & Content

#### Mock Health Certificates Data
Include at least 6 certificates with:
- Certificate name
- Health ID number (format: HID-XXXX-XXXX)
- Status (Valid/Expired/Pending)
- Date added
- Icon/thumbnail
- Color coding based on status

#### Sample Notifications
Include 5+ notifications with varied types:
- Success: Certificate verified, document uploaded
- Warning: Certificate expiring soon
- Info: New guidelines, system maintenance
- Different timestamps (hours ago, days ago)
- Mix of read/unread states

### 14. Special Features

#### Profile Picture Upload
- Click camera icon or upload button to select image
- Preview immediately after selection
- Store as base64 in localStorage
- Validate file size (max 5MB)
- Accept JPG, PNG, GIF formats
- Show error toast if file too large
- Remove button to delete picture
- Sync across all instances via custom events

#### Real-time Header Updates
- Time-based greeting updates based on hour:
  - Morning: 00:00 - 11:59
  - Afternoon: 12:00 - 17:59
  - Evening: 18:00 - 23:59
- Profile picture updates immediately when changed in Settings
- Use CustomEvent API for cross-component communication

### 15. Toast Messages
Implement toast notifications for:
- Login success/failure
- Profile updates
- Theme changes
- Language changes  
- Feature "coming soon" messages
- Validation errors
- Profile picture updates
- Notification dismissals
- Logout confirmation

## Design Aesthetic
- Modern, clean interface
- Healthcare/medical theme colors (blues, greens, whites)
- Professional and trustworthy appearance
- Card-based layouts with subtle shadows
- Ample white space
- Clear visual hierarchy
- Consistent icon usage
- Smooth animations and micro-interactions
- Accessible color palette for dark and light modes

## Implementation Notes
- Use TypeScript for type safety
- Implement proper error handling
- Use React best practices (hooks, component composition)
- Optimize performance (memoization where needed)
- Clean, maintainable code structure
- Commented complex logic
- Consistent naming conventions
- No placeholder comments - full implementation required
- Mobile-first responsive design approach

## Success Criteria
✅ Fully functional authentication with hardcoded credentials  
✅ All 5 pages implemented and navigable  
✅ Complete dark mode functionality with persistence  
✅ Multi-language support (English, Hindi, Kannada) with persistence  
✅ Profile picture upload and real-time synchronization  
✅ Dismissible notifications with X button on hover  
✅ Responsive design working on mobile, tablet, and desktop  
✅ All interactive elements working (menus, dropdowns, toggles)  
✅ Toast notifications for all user actions  
✅ Theme and language persistence across sessions  
✅ Clean, modern UI matching healthcare app standards  
✅ No console errors or warnings  
✅ All translations working correctly  
✅ Proper TypeScript types throughout  

---

**Build this as a complete, production-ready application with no placeholders or incomplete features.**
