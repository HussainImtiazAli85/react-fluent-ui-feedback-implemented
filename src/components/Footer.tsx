import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Text,
  Icon,
  mergeStyles,
} from '@fluentui/react';

const footerStyles = mergeStyles({
  backgroundColor: '#1f1f1f',
  color: '#d0d0d0',
  padding: '48px 24px',
});

const containerStyles = mergeStyles({
  maxWidth: '1440px',
  margin: '0 auto',
});

const linkStyles = mergeStyles({
  color: '#d0d0d0',
  textDecoration: 'none',
  fontSize: '14px',
  ':hover': {
    color: '#fff',
  },
});

const logoStyles = mergeStyles({
  width: '40px',
  height: '40px',
  background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
  borderRadius: '4px',
  display: 'flex',  
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 600,
});

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={footerStyles}>
      <div className={containerStyles}>
        <Stack tokens={{ childrenGap: 32 }}>
          <Stack horizontal tokens={{ childrenGap: 48 }} wrap>
            <Stack tokens={{ childrenGap: 16 }} styles={{ root: { flex: '1 1 250px' } }}>
              <Stack className='footer-logo' horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                <div className={logoStyles}>
                  <span>C</span>
                </div>
                <Text variant="large" styles={{ root: { color: '#fff', fontWeight: 600 } }}>
                  {t('header.title')}
                </Text>
              </Stack>
              <Text variant="small" styles={{ root: { color: '#d0d0d0' } }}>
                {t('footer.description')}
              </Text>
            </Stack>

            <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: '1 1 150px' } }}>
              <Text variant="medium" styles={{ root: { color: '#fff', fontWeight: 600 } }}>
                Quick Links
              </Text>
              <Stack tokens={{ childrenGap: 8 }}>
                <Link to="/about" className={linkStyles}>{t('nav.about')}</Link>
                <Link to="/departments" className={linkStyles}>{t('nav.departments')}</Link>
                <Link to="/resources" className={linkStyles}>{t('nav.resources')}</Link>
              </Stack>
            </Stack>

            <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: '1 1 150px' } }}>
              <Text variant="medium" styles={{ root: { color: '#fff', fontWeight: 600 } }}>
                {t('footer.support')}
              </Text>
              <Stack tokens={{ childrenGap: 8 }}>
                <a href="#" className={linkStyles}>{t('quickLinks.helpCenter')}</a>
                <a href="#" className={linkStyles}>{t('quickLinks.it')}</a>
                <a href="#" className={linkStyles}>{t('quickLinks.hr')}</a>
                <Link to="/contact" className={linkStyles}>{t('nav.contact')}</Link>
              </Stack>
            </Stack>

            <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: '1 1 200px' } }}>
              <Text variant="medium" styles={{ root: { color: '#fff', fontWeight: 600 } }}>
                Contact
              </Text>
              <Stack tokens={{ childrenGap: 8 }}>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="Mail" styles={{ root: { fontSize: 16 } }} />
                  <Text variant="small" styles={{ root: { color: '#d0d0d0' } }}>info@company.com</Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="Phone" styles={{ root: { fontSize: 16 } }} />
                  <Text variant="small" styles={{ root: { color: '#d0d0d0' } }}>+1 (555) 123-4567</Text>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                  <Icon iconName="MapPin" styles={{ root: { fontSize: 16 } }} />
                  <Text variant="small" styles={{ root: { color: '#d0d0d0' } }}>123 Business Ave, Suite 100</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            styles={{ root: { borderTop: '1px solid #3a3a3a', paddingTop: '24px' } }}
          >
            <Text variant="small" styles={{ root: { color: '#8a8a8a' } }}>
              {t('footer.copyright')}
            </Text>

            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <a
                href="#"
                className={mergeStyles({
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#3a3a3a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d0d0d0',
                  ':hover': {
                    backgroundColor: '#0078d4',
                    color: '#fff',
                  },
                })}
              >
                <Icon iconName="Globe" />
              </a>
              <a
                href="#"
                className={mergeStyles({
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#3a3a3a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d0d0d0',
                  ':hover': {
                    backgroundColor: '#0078d4',
                    color: '#fff',
                  },
                })}
              >
                <Icon iconName="LinkedInLogo" />
              </a>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </footer>
  );
}
