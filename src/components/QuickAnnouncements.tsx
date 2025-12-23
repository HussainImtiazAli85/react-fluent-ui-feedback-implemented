import { Stack, Text, Icon, mergeStyleSets, useTheme, IStackTokens, Link as FluentLink } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Announcement {
  id: number;
  titleKey: string;
  messageKey: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  icon: string;
  title?: string;
  message?: string;
  iconUnicode?: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    titleKey: '',
    messageKey: '',
    time: '2 hours ago',
    type: 'warning',
    icon: 'Warning',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 11 PM to 2 AM',
    iconUnicode: '\uE7BA', // 
  },
  {
    id: 2,
    titleKey: '',
    messageKey: '',
    time: '5 hours ago',
    type: 'info',
    icon: 'Info',
    title: 'New Policy Update',
    message: 'Updated remote work policy is now available',
    iconUnicode: '\uE78B', // 
  },
  {
    id: 3,
    titleKey: '',
    messageKey: '',
    time: '1 day ago',
    type: 'success',
    icon: 'Calendar',
    title: 'Holiday Schedule',
    message: 'Office will be closed on Friday for public holiday',
    iconUnicode: '\uEA18', // 
  },
  {
    id: 4,
    titleKey: '',
    messageKey: '',
    time: '2 days ago',
    type: 'urgent',
    icon: 'Shield',
    title: 'Security Alert',
    message: 'Please update your password before end of month',
    iconUnicode: '\uE72E', // 
  },
];

const getStyles = (theme: any) => mergeStyleSets({
  container: {
    //backgroundColor: theme.palette.white,
    //padding: '18px',
   // borderRadius: '12px',
    //boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    //border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    height: '100%',

    margin: '10px',
  },
  scrollContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    width: '100%',
    padding: '12px 0 12px 8px',
    minHeight: 140,
    overflow: 'hidden',
    marginTop: '5px !important',
  },
  card: {
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    padding: '18px 18px',
    backgroundColor: theme.palette.white,
    borderRadius: '10px',
    boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderColor: theme.palette.themePrimary,
    },
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});

const headerTokens: IStackTokens = { childrenGap: 4 };

export default function QuickAnnouncements() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const getTypeColor = (type: string) => {
    const colors = {
      info: { bg: '#deecf9', icon: '#0078d4' },
      warning: { bg: '#fff4ce', icon: '#ffaa44' },
      success: { bg: '#dff6dd', icon: '#107c10' },
      urgent: { bg: '#fde7e9', icon: '#d13438' },
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  // Ensure at least 5 cards are shown
  const cardsToShow = 5;
  const filledAnnouncements = [...announcements];
  while (filledAnnouncements.length < cardsToShow) {
    filledAnnouncements.push({
      id: 1000 + filledAnnouncements.length,
      titleKey: '',
      messageKey: '',
      time: '',
      type: 'info',
      icon: 'Info',
      title: '',
      message: '',
      iconUnicode: '',
      // Add any other required fields
    });
  }

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={headerTokens}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, fontSize: '24px' } }}>
            {t('quickAnnouncements.title')}
          </Text>
          {/* <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('quickAnnouncements.subtitle')}
          </Text> */}
        </Stack>
        <Link to="/announcements" style={{ textDecoration: 'none' }} className="view-all-link">
          <FluentLink styles={{ root: { fontSize: '13px', fontWeight: 600 } }}>
            {t('quickAnnouncements.viewAll')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: 10, marginLeft: '2px' } }} />
          </FluentLink>
        </Link>
      </Stack>

      <div className={styles.scrollContainer}>
        {filledAnnouncements.map((announcement) => {
          const colors = getTypeColor(announcement.type);
          const isPlaceholder = !announcement.title && !announcement.message;
          return (
            <div
              key={announcement.id}
              className={styles.card}
              style={{
                borderColor: colors.icon,
                opacity: 1,
                pointerEvents: isPlaceholder ? 'none' : 'auto',
                borderStyle: isPlaceholder ? 'dashed' : 'solid',
                background: theme.palette.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isPlaceholder ? (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: colors.bg, marginRight: 16 }}
                  >
                    <span style={{ fontFamily: 'Segoe MDL2 Assets', fontSize: 24, color: colors.icon, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon iconName="Info" styles={{ root: { fontSize: 18, color: colors.icon } }} />
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, marginBottom: 2 } }}>
                      Network Infrastructure Upgrade
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '13px', marginBottom: 2 } }}>
                      Scheduled upgrade on Saturday from 1 AM to 5 AM. Expect brief connectivity interruptions.
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralTertiary, fontSize: '11px', marginTop: '4px' } }}>
                      Today
                    </Text>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: colors.bg, marginRight: 16 }}
                  >
                    <span style={{ fontFamily: 'Segoe MDL2 Assets', fontSize: 24, color: colors.icon, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {announcement.iconUnicode && !isNaN(parseInt(announcement.iconUnicode.replace(/\\u|u/g, ''), 16))
                        ? String.fromCharCode(parseInt(announcement.iconUnicode.replace(/\\u|u/g, ''), 16))
                        : <Icon iconName={announcement.icon} styles={{ root: { fontSize: 18, color: colors.icon } }} />}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary, marginBottom: 2 } }}>
                      {announcement.title || t(announcement.titleKey || '')}
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '13px', marginBottom: 2 } }}>
                      {announcement.message || t(announcement.messageKey || '')}
                    </Text>
                    <Text variant="small" styles={{ root: { color: theme.palette.neutralTertiary, fontSize: '11px', marginTop: '4px' } }}>
                      {announcement.time}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Stack>
  );
}
