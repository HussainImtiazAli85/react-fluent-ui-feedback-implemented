import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  SearchBox,
  Persona,
  PersonaSize,
  IconButton,
  CommandBar,
  ICommandBarItemProps,
  IButtonStyles,
  Panel,
  ChoiceGroup,
  IChoiceGroupOption,
  mergeStyles,
  useTheme as useFluentTheme,
} from '@fluentui/react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

const getHeaderStyles = (bgColor: string) => mergeStyles({
  backgroundColor: bgColor,
  borderBottom: '1px solid #edebe9',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 0.3px 0.9px rgba(0, 0, 0, 0.1), 0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
});

const containerStyles = mergeStyles({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0',
});

const logoContainerStyles = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  ':hover': {
    opacity: 0.8,
  },
});

export default function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { currentTheme, setTheme } = useTheme();
  const fluentTheme = useFluentTheme();
  const [searchValue, setSearchValue] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavItemStyles = (isActive: boolean): IButtonStyles => ({
    root: {
      backgroundColor: isActive ? fluentTheme.palette.themeLighter : 'transparent',
      borderBottom: isActive ? `3px solid ${fluentTheme.palette.themePrimary}` : '3px solid transparent',
      borderRadius: 0,
      height: 'auto',
    },
    label: {
      color: isActive ? fluentTheme.palette.themePrimary : fluentTheme.palette.neutralPrimary,
      fontWeight: isActive ? 600 : 400,
    },
    rootHovered: {
      backgroundColor: fluentTheme.palette.neutralLighter,
    },
  });

  const navItems: ICommandBarItemProps[] = [
    {
      key: 'home',
      text: t('nav.home'),
      href: '/',
      onClick: (e) => {
        e?.preventDefault();
        window.location.href = '/';
      },
      buttonStyles: getNavItemStyles(location.pathname === '/'),
    },
    {
      key: 'about',
      text: t('nav.about'),
      href: '/about',
      onClick: (e) => {
        e?.preventDefault();
        window.location.href = '/about';
      },
      buttonStyles: getNavItemStyles(location.pathname === '/about'),
    },
    {
      key: 'departments',
      text: t('nav.departments'),
      href: '/departments',
      onClick: (e) => {
        e?.preventDefault();
        window.location.href = '/departments';
      },
      buttonStyles: getNavItemStyles(location.pathname === '/departments' || location.pathname.startsWith('/department/')),
      subMenuProps: {
        items: [
          {
            key: 'dept1',
            text: 'Department 1',
            href: '/department/dept1',
            onClick: (e) => {
              e?.preventDefault();
              window.location.href = '/department/dept1';
            },
          },
          {
            key: 'dept2',
            text: 'Department 2',
            href: '/department/dept2',
            onClick: (e) => {
              e?.preventDefault();
              window.location.href = '/department/dept2';
            },
          },
        ],
      },
    },
    {
      key: 'resources',
      text: t('nav.resources'),
      href: '/resources',
      onClick: (e) => {
        e?.preventDefault();
        window.location.href = '/resources';
      },
      buttonStyles: getNavItemStyles(location.pathname === '/resources'),
    },
    {
      key: 'contact',
      text: t('nav.contact'),
      href: '/contact',
      onClick: (e) => {
        e?.preventDefault();
        window.location.href = '/contact';
      },
      buttonStyles: getNavItemStyles(location.pathname === '/contact'),
    },
  ];

  const themeOptions: IChoiceGroupOption[] = [
    { key: 'default', text: t('theme.default') },
    { key: 'dark', text: t('theme.dark') },
    { key: 'teal', text: t('theme.teal') },
  ];

  const languageOptions: IChoiceGroupOption[] = [
    { key: 'en', text: t('language.english') },
    { key: 'ar', text: t('language.arabic') },
  ];

  const handleThemeChange = (_?: FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      setTheme(option.key as ThemeType);
    }
  };

  const handleLanguageChange = (_?: FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      i18n.changeLanguage(option.key);
      localStorage.setItem('appLanguage', option.key);
    }
  };

  const logoStyles = mergeStyles({
    width: '40px',
    height: '40px',
    background: `linear-gradient(135deg, ${fluentTheme.palette.themePrimary} 0%, ${fluentTheme.palette.themeDark} 100%)`,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 600,
  });

  return (
    <>
      <header className={getHeaderStyles(fluentTheme.palette.white)}>
        <div className={containerStyles}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }} styles={{ root: { height: '64px' } }}>
            <IconButton
              iconProps={{ iconName: 'GlobalNavButton' }}
              title="Menu"
              ariaLabel="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
              styles={{
                root: {
                  display: 'block',
                  '@media (min-width: 768px)': {
                    display: 'none',
                  },
                },
                rootHovered: {
                  backgroundColor: fluentTheme.palette.neutralLighter,
                },
              }}
            />

            <Link to="/" className={logoContainerStyles}>
              <div className={logoStyles}>
                <span>C</span>
              </div>
              <Stack tokens={{ childrenGap: 0 }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: fluentTheme.palette.neutralPrimary,
                  lineHeight: '24px'
                }}>
                  {t('header.title')}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: fluentTheme.palette.neutralSecondary,
                  lineHeight: '16px'
                }}>
                  {t('header.subtitle')}
                </span>
              </Stack>
            </Link>

            <Stack.Item grow styles={{ root: { display: 'none', '@media (min-width: 768px)': { display: 'flex' }, justifyContent: 'center' } }}>
              <CommandBar
                items={navItems}
                styles={{
                  root: {
                    padding: 0,
                    minWidth: '400px',
                    backgroundColor: 'transparent',
                    border: 'none',
                  },
                }}
              />
            </Stack.Item>

            <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
              <SearchBox
                placeholder={t('header.search')}
                value={searchValue}
                onChange={(_, newValue) => setSearchValue(newValue || '')}
                styles={{ root: { width: 200 } }}
              />

              <IconButton
                iconProps={{ iconName: 'Ringer' }}
                title={t('header.notifications')}
                ariaLabel={t('header.notifications')}
                styles={{
                  rootHovered: {
                    backgroundColor: fluentTheme.palette.neutralLighter,
                  },
                }}
              />

              <IconButton
                iconProps={{ iconName: 'Settings' }}
                title={t('header.settings')}
                ariaLabel={t('header.settings')}
                onClick={() => setIsPanelOpen(true)}
                styles={{
                  rootHovered: {
                    backgroundColor: fluentTheme.palette.neutralLighter,
                  },
                }}
              />

              <Persona
                text="John Doe"
                secondaryText="Engineering"
                size={PersonaSize.size32}
                styles={{ root: { cursor: 'pointer' } }}
              />
            </Stack>
          </Stack>
        </div>
      </header>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText={t('header.settings')}
        closeButtonAriaLabel={t('common.close')}
        isLightDismiss
      >
        <Stack tokens={{ childrenGap: 32 }}>
          <Stack tokens={{ childrenGap: 12 }}>
            <ChoiceGroup
              label={t('theme.title')}
              selectedKey={currentTheme}
              options={themeOptions}
              onChange={handleThemeChange}
              className="settings-theme-choicegroup"
            />
          </Stack>

          <Stack tokens={{ childrenGap: 12 }}>
            <ChoiceGroup
              label={t('language.title')}
              selectedKey={i18n.language}
              options={languageOptions}
              onChange={handleLanguageChange}
              className="settings-language-choicegroup"
            />
          </Stack>
        </Stack>
      </Panel>

      <Panel
        isOpen={isMobileMenuOpen}
        onDismiss={() => setIsMobileMenuOpen(false)}
        headerText="Menu"
        closeButtonAriaLabel="Close"
        isLightDismiss
      >
        <Stack tokens={{ childrenGap: 8 }}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                setIsMobileMenuOpen(false);
                item.onClick?.(e);
              }}
              className={mergeStyles({
                padding: '12px 16px',
                textDecoration: 'none',
                color: fluentTheme.palette.neutralPrimary,
                display: 'block',
                borderRadius: '4px',
                fontWeight: location.pathname === item.href ? 600 : 400,
                backgroundColor: location.pathname === item.href ? fluentTheme.palette.neutralLighter : 'transparent',
                ':hover': {
                  backgroundColor: fluentTheme.palette.neutralLighter,
                },
              })}
            >
              {item.text}
            </a>
          ))}
        </Stack>
      </Panel>
    </>
  );
}
