import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as FluentThemeProvider } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import DocumentDetail from './pages/DocumentDetail';
import EventDetail from './pages/EventDetail';
import EmployeeDetail from './pages/EmployeeDetail';
import Events from './pages/Events';
import Team from './pages/Team';
import './i18n/config';

function AppContent() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    const rtlId = 'rtl-css-link';
    if (i18n.language === 'ar') {
      if (!document.getElementById(rtlId)) {
        const link = document.createElement('link');
        link.id = rtlId;
        link.rel = 'stylesheet';
        link.href = '/src/theme/rtl.css';
        document.head.appendChild(link);
      }
    } else {
      const existing = document.getElementById(rtlId);
      if (existing) existing.remove();
    }
  }, [i18n.language]);

  return (
    <FluentThemeProvider theme={theme}>
      <Router>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.white
        }}>
          <Header />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/department/:deptId" element={<DepartmentDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/announcement/:id" element={<AnnouncementDetail />} />
              <Route path="/document/:id" element={<DocumentDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FluentThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
