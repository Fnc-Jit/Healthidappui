# Emergency Response Citizen & Volunteer App

A comprehensive offline-first emergency reporting platform with multi-language support, volunteer verification, and AI assistance.

## 🌟 Features

### Core Capabilities
- **🚨 Quick Emergency Reporting** - Submit reports in under 30 seconds
- **👤 Three User Modes** - Anonymous, Citizen, and Volunteer access levels
- **🌐 Multi-Language** - English, Hindi, Kannada, Malayalam
- **📡 Offline-First** - Works without internet, syncs when connected
- **🔒 Privacy-First** - Anonymous reporting, location privacy controls
- **✅ Volunteer Verification** - Trusted witness system for report accuracy
- **🤖 AI Assistant** - Helps citizens with emergency reporting (citizen mode only)
- **📱 Responsive Design** - Works on all devices
- **🌙 Dark Mode** - Full dark theme support

### User Types

#### 1. Anonymous Users
- ✅ Quick report submission without login
- ✅ Basic emergency reporting features
- ✅ Language and theme preferences
- ❌ No report tracking
- ❌ No AI assistant

#### 2. Citizens (Registered Users)
- ✅ Full emergency reporting with tracking
- ✅ View and manage previous reports
- ✅ AI assistant for guidance
- ✅ Safety check-ins
- ✅ Notifications
- ✅ Profile management
- ✅ Optional anonymous reporting

#### 3. Volunteers
- ✅ Verify emergency reports
- ✅ View all reports in system
- ✅ Volunteer dashboard with statistics
- ✅ Reputation scoring
- ✅ Submit own reports as citizen
- ❌ No AI assistant (different workflow)

## 🏗️ Architecture

### Technology Stack
- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS v4.0
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **UI Components:** Custom component library
- **Icons:** Lucide React
- **Notifications:** Sonner

### Project Structure

```
/
├── App.tsx                          # Main router and auth state
├── components/
│   ├── Header.tsx                   # Navigation header (adapts to user mode)
│   ├── LanguageProvider.tsx         # i18n context provider
│   ├── ThemeProvider.tsx            # Dark/light theme provider
│   ├── translations.ts              # All translations (4 languages)
│   ├── pages/
│   │   ├── LoginPage.tsx           # Entry point with 3 login modes
│   │   ├── HomePage.tsx            # Main dashboard (adapts to user mode)
│   │   ├── PreviousReportsPage.tsx # Report history and management
│   │   ├── ReportsReviewedPage.tsx # Volunteer verification history
│   │   ├── SettingsPage.tsx        # User settings and preferences
│   │   └── NotificationsPage.tsx   # Notification center
│   └── ui/                          # Reusable UI components
├── database/
│   ├── schema.ts                   # Complete database schema
│   ├── config.ts                   # Supabase client configuration
│   ├── services/                   # Database service layer
│   │   ├── userService.ts         # User CRUD operations
│   │   ├── reportService.ts       # Report management
│   │   └── volunteerService.ts    # Volunteer & verification ops
│   ├── README.md                   # Database documentation
│   └── SETUP.md                    # Database setup guide
├── styles/
│   └── globals.css                 # Global styles and CSS variables
├── DATABASE_INTEGRATION_GUIDE.md   # How to integrate database
├── FLOW_HIERARCHY.md               # Visual application flow
├── PROJECT_STATUS.md               # Project status and checklist
├── QUICK_REFERENCE.md              # Quick reference guide
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emergency-response-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up database** (See `/database/SETUP.md`)
   - Create Supabase project
   - Run SQL migrations
   - Create storage buckets

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   
   Navigate to http://localhost:5173

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[DATABASE_INTEGRATION_GUIDE.md](./DATABASE_INTEGRATION_GUIDE.md)** | Complete guide to integrating Supabase database |
| **[FLOW_HIERARCHY.md](./FLOW_HIERARCHY.md)** | Visual flow diagrams and user journeys |
| **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** | Current status, features, and checklists |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Quick reference for common tasks |
| **[database/README.md](./database/README.md)** | Database schema and usage documentation |
| **[database/SETUP.md](./database/SETUP.md)** | Step-by-step database setup guide |

## 🔑 Key Concepts

### Application Flow

```
User arrives → LoginPage (Entry Point)
  │
  ├─ Option 1: Quick Report (Anonymous)
  │   └─ No login required
  │   └─ Basic emergency reporting
  │
  ├─ Option 2: User Login (Citizen)
  │   └─ Full features
  │   └─ Report tracking
  │   └─ AI assistant
  │
  └─ Option 3: Volunteer Login
      └─ Verification tools
      └─ Volunteer dashboard
      └─ All reports access
```

### User Mode Detection

```typescript
// Get current user mode
const userMode = localStorage.getItem("userMode");
// Returns: "anonymous" | "user" | "volunteer"

// Adapt features based on mode
if (userMode === "volunteer") {
  // Show volunteer dashboard
} else if (userMode === "user") {
  // Show citizen features + AI chat
} else {
  // Show anonymous quick report only
}
```

### Database Integration Status

**Current State:** ✅ Fully functional with mock data

**Database Ready:** ✅ Complete schema, service layer, and documentation

**Next Step:** Replace mock data with database calls (see [DATABASE_INTEGRATION_GUIDE.md](./DATABASE_INTEGRATION_GUIDE.md))

## 🗄️ Database Schema

### Main Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | User accounts | Email, preferences, privacy settings |
| `volunteers` | Volunteer profiles | Verification status, reputation score |
| `emergency_reports` | All emergency reports | Case ID, location, status, priority |
| `report_verifications` | Volunteer verifications | Verification type, status, notes |
| `safety_check_ins` | User safety status | Location, status, timestamp |
| `notifications` | All notifications | Type, message, read status |
| `offline_queue` | Sync queue | Pending actions for offline support |
| `ai_chat_history` | AI conversations | User messages and responses |

See [database/README.md](./database/README.md) for complete schema documentation.

## 🌐 Internationalization

### Supported Languages
- 🇬🇧 English (en)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Kannada (kn)
- 🇮🇳 Malayalam (ml)

### Adding Translations

1. Add key to interface in `components/translations.ts`
2. Add translations for all 4 languages
3. Use in components:
   ```typescript
   import { useLanguage } from './components/LanguageProvider';
   
   function MyComponent() {
     const { t } = useLanguage();
     return <p>{t.myKey}</p>;
   }
   ```

## 🎨 Theming

### Dark/Light Mode
- Automatic detection of system preference
- Manual toggle in settings
- Persisted in localStorage
- Full component support

### Customization
- Edit `styles/globals.css` for theme tokens
- Uses CSS custom properties
- Tailwind dark mode classes

## 🔐 Security Features

- **Row Level Security (RLS)** - Database-level access control
- **Anonymous Reporting** - Privacy-first design
- **Location Privacy** - Coarse/precise location options
- **Data Encryption** - At rest and in transit
- **Input Validation** - Client and server side
- **Rate Limiting Ready** - Service layer supports rate limiting

## 📱 Offline Support

### Current Implementation
- Offline detection
- Queue UI for pending reports
- LocalStorage for persistence

### Database Integration
- Automatic sync when online
- `offline_queue` table for server-side queue
- Progressive Web App (PWA) ready

## 🧪 Testing

### Test Users (After Database Setup)

```typescript
// Citizen user
Email: citizen@test.com
Password: (set during creation)

// Volunteer user
Email: volunteer@test.com
Password: (set during creation)
```

### Test Flows

1. **Anonymous Reporting**
   - Open app
   - Click "Quick Report"
   - Submit emergency report
   - Verify case ID is generated

2. **Citizen Login**
   - Sign in with citizen credentials
   - Submit a report
   - View in "Previous Reports"
   - Use AI chat assistant
   - Update profile

3. **Volunteer Login**
   - Sign in with volunteer credentials
   - View volunteer dashboard
   - Verify a report
   - Check "Reports Reviewed" page

## 🚧 Roadmap

### Phase 1: Current ✅
- [x] Core UI components
- [x] Three-mode authentication
- [x] Emergency reporting flow
- [x] Multi-language support
- [x] Dark mode
- [x] Database schema design
- [x] Service layer implementation

### Phase 2: Database Integration 🔄
- [ ] Replace mock data with Supabase
- [ ] Implement offline sync
- [ ] Add real-time updates
- [ ] Photo upload to storage
- [ ] AI chat backend integration

### Phase 3: Advanced Features 📋
- [ ] SMS/WhatsApp intake channels
- [ ] IVR (phone) reporting
- [ ] Public dashboard
- [ ] Safety check-in reminders
- [ ] AI-powered report prioritization
- [ ] Geospatial clustering
- [ ] Push notifications

### Phase 4: Mobile Apps 📱
- [ ] React Native mobile app
- [ ] App store deployment
- [ ] Biometric authentication
- [ ] Offline-first sync optimization

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make changes**
   - Follow existing code style
   - Add translations for new text
   - Update documentation
4. **Test thoroughly**
   - Test all three user modes
   - Test offline functionality
   - Test in multiple languages
5. **Submit pull request**

### Code Style
- TypeScript for all code
- Functional components with hooks
- Tailwind for styling (no inline styles)
- Meaningful variable names
- Comments for complex logic

## 📄 License

[Your License Here]

## 👥 Team

[Your Team Information]

## 📞 Support

- **Documentation:** See `/docs` folder
- **Issues:** GitHub Issues
- **Email:** [Your Support Email]

## 🙏 Acknowledgments

- Supabase for database and authentication
- Tailwind CSS for styling system
- Lucide for icons
- React and TypeScript communities

---

## 🎯 Current Status Summary

✅ **Application:** Fully functional with mock data  
✅ **Database:** Schema designed, service layer complete  
✅ **Documentation:** Comprehensive guides available  
🔄 **Integration:** Ready to connect to Supabase  

**Next Step:** Follow [DATABASE_INTEGRATION_GUIDE.md](./DATABASE_INTEGRATION_GUIDE.md) to connect to database and go live!

---

**Built with ❤️ for emergency response**
