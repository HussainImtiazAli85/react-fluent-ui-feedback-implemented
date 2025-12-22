# Employee Intranet Portal - Fluent UI Edition

A modern SharePoint-style employee intranet portal built with React, Fluent UI, TypeScript, and Supabase.

## Features

### Design & Theming
- **100% Fluent UI** - Microsoft's official design system (SharePoint compatible)
- **3 Color Themes** - Default Blue, Dark Mode, and Teal (switchable via settings)
- **Theme Persistence** - Your theme choice is automatically saved
- **Settings Panel** - Click the gear icon in header to change theme and language

### Internationalization
- **Multi-language Support** - English and Arabic included
- **RTL Support** - Automatic right-to-left layout for Arabic
- **Easy Translation** - JSON-based translation files
- **Language Switcher** - Available in settings panel

### Components
- **Header** - Fluent UI CommandBar navigation with search, notifications, settings, and profile
- **Banner Slider** - Auto-rotating hero section with 4 slides
- **Quick Links** - Grid of 8 customizable quick access links with Fluent UI icons
- **News & Announcements** - DocumentCard components for company news
- **Events Calendar** - Upcoming events with calendar integration
- **New Team Members** - Persona components for new hires
- **Document Library** - DocumentCard components with category filtering
- **Footer** - Company information and links

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

The database schema is already configured with the following tables:
- `quick_links` - App shortcuts
- `news_announcements` - Company news
- `events` - Upcoming events
- `new_hires` - New employees
- `documents` - Important documents

Sample data has been pre-populated in all tables.

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Top navigation
│   ├── Banner.tsx          # Hero section
│   ├── QuickLinks.tsx      # Quick access links
│   ├── NewsAnnouncements.tsx # Company news
│   ├── Events.tsx          # Event calendar
│   ├── NewHires.tsx        # New team members
│   ├── Documents.tsx       # Document library
│   └── Footer.tsx          # Site footer
├── lib/
│   └── supabase.ts         # Supabase client
├── types/
│   └── database.ts         # TypeScript types
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## Customization

### Change Themes

The portal includes 3 pre-built themes. To add more:

1. Edit `/src/contexts/ThemeContext.tsx`
2. Add your custom theme using Fluent UI's `createTheme()`:

```typescript
const customTheme: ITheme = createTheme({
  palette: {
    themePrimary: '#your-color',
    themeDarkAlt: '#darker-shade',
    themeLighter: '#lighter-shade',
    // ... other palette colors
  },
});
```

3. Add it to the themes record and theme options

### Add Languages

1. Create a new JSON file in `/src/i18n/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json` and translate all values
3. Import and register in `/src/i18n/config.ts`
4. Add the language option to Header.tsx

### Update Content

All content is stored in Supabase. You can:
- Add/edit quick links in the `quick_links` table
- Publish news in the `news_announcements` table
- Create events in the `events` table
- Add new hires in the `new_hires` table
- Upload documents in the `documents` table

### Modify Sections

Each section is a separate component in `src/components/`. You can:
- Reorder sections by changing the order in `App.tsx`
- Remove sections by commenting them out in `App.tsx`
- Add new sections by creating new components

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Fluent UI 8** - Microsoft's design system (SharePoint compatible)
- **React Router 7** - Client-side routing
- **i18next** - Internationalization framework
- **Vite** - Build tool
- **Supabase** - Database and backend
- **SASS** - CSS preprocessing

## Design Features

- Responsive design (mobile, tablet, desktop)
- Clean, professional appearance
- Hover effects and transitions
- Accessible color contrasts
- Modern gradient accents
- Card-based layouts

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## SharePoint Framework (SPFx) Compatibility

This project is built with SPFx compatibility in mind:

- **Fluent UI 8** - The same version used in SharePoint Framework
- **Component Architecture** - Each component can be converted to an SPFx web part
- **No External Dependencies** - Uses only SPFx-compatible libraries
- **Responsive Design** - Works seamlessly in SharePoint pages
- **Theme Integration** - Can inherit SharePoint site themes

### Converting to SPFx Web Parts

Each component (QuickLinks, News, Events, etc.) can be converted to an SPFx web part:

1. Create a new SPFx web part project
2. Copy the component code
3. Replace Supabase calls with SharePoint REST API or Microsoft Graph
4. Use SPFx context instead of React Router
5. The Fluent UI components work as-is

## How to Use Theme Switcher

1. **Click the Settings icon** (gear) in the top-right header
2. **Select a theme**:
   - Default Blue - Microsoft/SharePoint style
   - Dark Mode - High contrast dark theme
   - Teal - Alternative professional theme
3. **Theme persists** - Your choice is saved automatically

## How to Use Language Switcher (RTL Support)

1. **Click the Settings icon** (gear) in the top-right header
2. **Select a language**:
   - English - Left-to-right layout
   - Arabic - Right-to-left layout
3. **Interface updates immediately** with translated content and proper text direction

## License

This project is ready for production use in your organization.
