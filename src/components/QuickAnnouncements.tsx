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
}

const announcements: Announcement[] = [
  {
    id: 1,
    titleKey: 'quickAnnouncements.systemMaintenance',
    messageKey: 'quickAnnouncements.maintenanceMsg',
    time: '2 hours ago',
    type: 'warning',
    icon: 'Warning',
  },
  {
    id: 2,
    titleKey: 'quickAnnouncements.newPolicy',
    messageKey: 'quickAnnouncements.policyMsg',
    time: '5 hours ago',
    type: 'info',
    icon: 'Info',
  },
  {
    id: 3,
    titleKey: 'quickAnnouncements.holidaySchedule',
    messageKey: 'quickAnnouncements.holidayMsg',
    time: '1 day ago',
    type: 'success',
    icon: 'Calendar',
  },
  {
    id: 4,
    titleKey: 'quickAnnouncements.securityAlert',
    messageKey: 'quickAnnouncements.securityMsg',
    time: '2 days ago',
    type: 'urgent',
    icon: 'Shield',
  },
  {
    id: 5,
    titleKey: 'quickAnnouncements.teamMeeting',
    messageKey: 'quickAnnouncements.meetingMsg',
    time: '3 days ago',
    type: 'info',
    icon: 'People',
  },
];

const getStyles = (theme: any) => mergeStyleSets({
  container: {
    backgroundColor: theme.palette.white,
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    height: '100%',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '480px',
    overflowY: 'auto',
    paddingRight: '4px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#0078d4 #f3f2f1',
  },
  card: {
    padding: '16px',
    backgroundColor: theme.palette.white,
    borderRadius: '8px',
    boxShadow: '0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateX(4px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
const cardTokens: IStackTokens = { childrenGap: 12 };
const contentTokens: IStackTokens = { childrenGap: 4 };

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

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack tokens={headerTokens}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
            {t('quickAnnouncements.title')}
          </Text>
          <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary } }}>
            {t('quickAnnouncements.subtitle')}
          </Text>
        </Stack>
        <Link to="/announcements" style={{ textDecoration: 'none' }} className="view-all-link">
          <FluentLink styles={{ root: { fontSize: '13px', fontWeight: 600 } }}>
            {t('quickAnnouncements.viewAll')} <Icon iconName="ChevronRight" styles={{ root: { fontSize: 10, marginLeft: '2px' } }} />
          </FluentLink>
        </Link>
      </Stack>

      <div className={styles.scrollContainer}>
        {announcements.map((announcement) => {
          const colors = getTypeColor(announcement.type);
          return (
            <Stack
              key={announcement.id}
              horizontal
              tokens={cardTokens}
              verticalAlign="start"
              className={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.icon;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.palette.neutralQuaternaryAlt;
              }}
            >
              <div
                className={styles.iconContainer}
                style={{ backgroundColor: colors.bg }}
              >
                <Icon iconName={announcement.icon} styles={{ root: { fontSize: 18, color: colors.icon } }} />
              </div>
              <Stack tokens={contentTokens} styles={{ root: { flex: 1 } }}>
                <Text variant="medium" styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}>
                  {t(announcement.titleKey)}
                </Text>
                <Text variant="small" styles={{ root: { color: theme.palette.neutralSecondary, fontSize: '13px' } }}>
                  {t(announcement.messageKey)}
                </Text>
                <Text variant="small" styles={{ root: { color: theme.palette.neutralTertiary, fontSize: '11px', marginTop: '4px' } }}>
                  {announcement.time}
                </Text>
              </Stack>
            </Stack>
          );
        })}
      </div>
    </Stack>
  );
}
